require('dotenv').config()

const path = require('path')
const pgp = require('pg-promise')()
const express = require('express')
const { json } = require('express/lib/response')
const app = express()
const cors = require('cors')
const { ssl } = require('pg/lib/defaults')
const { nextTick } = require('process')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

/*##################
  # Authentication #
  ################## */

const session = require('express-session')
//allows storing of session data
app.use(
  session({
    secret: 'secret', //encrypt the session

    resave: false, //should we resave our session information if nothing has changed

    saveUninitialized: true, //should we save our session if there is no information
  })
)

/*const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./passportConfig')

initializePassport(passport);


app.use(passport.initialize());
app.use(passport.session());

//displays flash messages
app.use(flash());*/

const jwt = require('jsonwebtoken')

const port = process.env.PORT || 8080

//UNCOMMENT THIS IF YOU WANT TO USE LOCAL DB

// const db = pgp({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DATABASE,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// })

//THIS DB is used for production, its the heroku DB and will automatically switch urls.
const cn = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
}

const db = pgp(cn)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

/*app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
  next();
});*/

/*function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

//Authenticate using passport-local
app.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req);
}
);*/

//Authenticate using JWT

const verifyJWT = (req, res, next) => {
  const token = req.header('jwt_token')

  if (!token) {
    res.send('Token required')
  } else {
    jwt.verify(token, 'jwtSecret', (err, decoded) => {
      if (err) {
        //token is invalid
        res.json({ auth: false, message: 'Failed to authenticate' })
      } else {
        //token is valid
        req.userID = decoded.id
        next()
      }
    })
  }
}

app.post('/api/verify', verifyJWT, (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
})

app.post('/api/login', (req, res) => {
  //1. destructure req.body
  const username = req.body.username
  const password = req.body.password

  db.query('SELECT * FROM Employees WHERE email = $1', [username]).then(
    (results) => {
      //check if there is a match for username/email
      if (results.length > 0) {
        const user = results[0]

        if (password == user.password) {
          req.session.user = user

          const id = user.eid
          const token = jwt.sign({ id }, 'jwtSecret', {
            expiresIn: 3000, //token expires in 50 minutes
          })
          res.json({ auth: true, id: id, jwtToken: token })
        } else {
          res.json({ auth: false, message: 'Incorrect username/password' }) //returns false value if password does not match
        }
      } else {
        res.json({ auth: false, message: 'Email is not registered' })
      }
    }
  )
})

//Get all departments
app.get('/api/departments', (req, res) => {
  db.query('SELECT * FROM departments').then((data) => {
    res.send(data)
  })
})

/**
 * Add a new deparment
 * DID - Integer
 * dname - String up to 50 characters
 */
app.post('/api/departments', (req, res) => {
  db.proc('add_department', [req.body.did, req.body.dname]).then((data) => {
    res.send(data)
  })
})

/**
 * Delete an existing department
 * ID - Integer
 */
app.delete('/api/departments/:id', (req, res) => {
  db.proc('remove_department', [req.params.id]).then((data) => {
    res.send(data)
  })
})

/* #################################################
############ Wei Xuan's components #################
#################################################### */

//Get all Employees
//employees which are not resigned will be displayed
app.get('/api/employees', (req, res) => {
  db.query(
    'SELECT * FROM Employees ORDER BY resigned_date NULLS FIRST, eid ASC'
  ).then((data) => {
    res.send(data)
  })
})
//Add a new Employee
app.post('/api/employees', (req, res) => {
  console.log(req.body)
  db.proc('add_employee', [
    req.body.name,
    req.body.mobilenum,
    req.body.kind,
    req.body.did,
    req.body.homenum,
    req.body.officenum,
  ]).then((data) => {
    res.send(data)
  })
})

//Simulate an employee resigning
app.post('/api/employees/resign', (req, res) => {
  console.log(req.body)
  db.proc('remove_employee', [req.body.eid, req.body.date]).then((data) => {
    res.send(data)
  })
})

//non_compliance function
app.post('/api/employees/non_compliance', (req, res) => {
  console.log(req.body)
  db.function('non_compliance', [req.body.start_date, req.body.end_date]).then(
    (data) => {
      res.send(data)
    }
  )
})

/**
 * Select specific employee
 * ID - Integer
 */
app.get('/api/employees/:id', (req, res) => {
  db.query('SELECT * FROM Employees WHERE eid = $1', [req.params.id]).then(
    (data) => {
      res.send(data)
    }
  )
})

/* params needed:
eid INTEGER
date DATE
temp NUMERIC
*/
app.post('/api/employees/:id/health_declaration', (req, res) => {
  db.proc(
    'declare_health',
    [req.params.id].then((data) => {
      res.send(data)
    })
  )
})

//Contact_tracing function
app.get('/api/employees/:id/contact_tracing', (req, res) => {
  db.func('contact_tracing', [req.params.id]).then((data) => {
    res.send(data)
  })
})

//Get all rooms (use Postman or just go to http://localhost:8080/rooms)
app.get('/api/employees/:id/rooms', (req, res) => {
  db.query('SELECT * FROM Meeting_Rooms').then((data) => {
    res.send(data)
  })
})

/**
 * Add a new room
 * floor - Integer
 * room - Integer
 * rname - Text
 * room_capacity - Integer
 * did - Integer (Department which the room belongs to)
 * mid - Employee ID (Trigger enforces that this must be a Manager)
 * date - Date Object
 */
app.post('/api/employees/:id/rooms', (req, res) => {
  console.log(req.body)
  db.proc('add_room', [
    req.body.floor,
    req.body.room,
    req.body.rname,
    req.body.room_capacity,
    req.body.did,
    req.body.mid,
    req.body.date,
  ]).then((data) => {
    res.send(data)
  })
})

/**
 * Change capacity of the room
 * floor - Integer
 * room - Integer
 * new_capacity - Integer
 * date - Date Object
 * mid - Employee ID (Trigger enforces that this must be a Manager)
 */
app.post('/api/employees/:id/rooms/change_capacity', (req, res) => {
  console.log(req.body)
  db.proc('change_capacity', [
    req.body.floor,
    req.body.room,
    req.body.new_capacity,
    req.body.date,
    req.body.mid,
  ]).then((data) => {
    res.send(data)
  })
})

/* 
Wei Xuan - I think it is necessary to create an interface to display the booking status
of the rooms as well to facilitate the booking/unbooking process
*/

/**
 * Book a room
 * floor - Integer
 * room - Integer
 * date - Date object
 * start_hour - Time object
 * end_hour - Time object
 * eid - Employee ID
 */
app.post('/api/employees/:id/rooms/book', (req, res) => {
  console.log(req.body)
  db.proc('book_room', [
    req.body.floor,
    req.body.room,
    req.body.date,
    req.body.start_hour,
    req.body.end_hour,
    req.params.id,
  ]).then((data) => {
    res.send(data)
  })
})

/**
 * Unbook a room
 * floor - Integer
 * room - Integer
 * date - Date object
 * start_hour - Time object
 * end_hour - Time object
 * eid - Employee ID
 */
app.post('/api/employees/:id/rooms/unbook', (req, res) => {
  console.log(req.body)
  db.proc('unbook_room', [
    req.body.floor,
    req.body.room,
    req.body.date,
    req.body.start_hour,
    req.body.end_hour,
    req.params.id,
  ]).then((data) => {
    res.send(data)
  })
})

// View future meeting of particular employee (wh-working)
/*
Note: Returns Date somehow in UTC+8 TimeZone. Sample return
[
    {
        "date": "2021-12-31T16:00:00.000Z",
        "start_hour": "01:00:00",
        "room": 1,
        "floor": 1
    }
]
We need to display the Date as 2021-01-01 in the FrontEnd! This possibly due to timezone conversion
*/

/**
 * View future meeting of particular employee from particular date
 * Date - Date Object, future meeting from this date
 * ID - Integer, Employee ID
 */
app.get('/api/employees/:id/:date/view-future-meeting/', (req, res) => {
  db.func('view_future_meeting', [req.params.date, req.params.id]).then(
    (data) => {
      res.send(data)
    }
  )
})

// View manager report if the employee is a manager - Datetime issue same as above (wh-working)
/**
 * View manager report of rooms to be approved if person is manager
 * Date - Date Object, all meeting rooms that needs to be approved from this date
 * ID - Employee ID
 */
app.get('/api/employees/:id/:date/view-manager-report', (req, res) => {
  db.func('view_manager_report', [req.params.date, req.params.id]).then(
    (data) => {
      res.send(data)
    }
  )
})

/**
 * Join meeting for specific employee
 * floor - Integer
 * room - Integer
 * date - Date object
 * start_hour - Time object
 * end_hour - Time object
 * eid - Employee ID
 */
app.post('/api/employees/join-meeting', (req, res) => {
  db.proc('join_meeting', [
    req.body.floor,
    req.body.room,
    req.body.date,
    req.body.start_hour,
    req.body.end_hour,
    req.body.eid,
  ]).then((data) => {
    res.send(data)
  })
})

/**
 * Leave meeting for specific employee
 * floor - Integer
 * room - Integer
 * date - Date object
 * start_hour - Time object
 * end_hour - Time object
 * eid - Employee ID
 */
app.delete(
  '/api/employees/:floor/:room/:date/:start_hour/:end_hour/:eid/leave-meeting',
  (req, res) => {
    db.proc('leave_meeting', [
      req.params.floor,
      req.params.room,
      req.params.date,
      req.params.start_hour,
      req.params.end_hour,
      req.params.eid,
    ]).then((data) => {
      res.send(data)
    })
  }
)

/**
 * Approve meeting if person is manager, else do nothing
 * floor - Integer
 * room - Integer
 * date - Date object
 * start_hour - Time object
 * end_hour - Time object
 * eid - Employee ID
 */
app.post('/api/employees/approve-meeting', (req, res) => {
  db.proc('approve_meeting', [
    req.body.floor,
    req.body.room,
    req.body.date,
    req.body.start_hour,
    req.body.end_hour,
    req.body.eid,
  ]).then((data) => {
    res.send(data)
  })
})

/**
 * Shows all available meetings in 1hour blocks which are not yet approved --> Users can join
 */
app.get('/api/employees/joinable-meetings', (req, res) => {
  db.func('view_joinable_meetings').then((data) => {
    res.send(data)
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})
