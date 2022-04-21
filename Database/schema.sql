DROP TABLE IF EXISTS Employees, Admin, Junior, Booker, Senior, Manager, Health_Declaration,
Departments, Meeting_Rooms, Updates, Joins, Books, Approves CASCADE;

/*
Should we add INITIALLY DEFERRABLE IMMEDIATE to our constraints?
*/

CREATE TABLE Departments (
   did INTEGER PRIMARY KEY,
   dname varchar(50)
);
 
CREATE TABLE Employees (
   eid SERIAL,
   ename VARCHAR(50),
   email TEXT UNIQUE,
   home_num VARCHAR(50),
   mobile_num VARCHAR(50),
   office_num VARCHAR(50),
   resigned_date DATE,
   role VARCHAR(50) NOT NULL CHECK(role IN ('Junior', 'Senior', 'Manager', 'Admin')),
   did INTEGER NOT NULL DEFAULT 0,
   password VARCHAR(200) NOT NULL,
   PRIMARY KEY (eid),
   FOREIGN KEY (did) REFERENCES Departments (did) ON UPDATE CASCADE ON DELETE SET DEFAULT
);

CREATE TABLE Admin (
   eid INTEGER PRIMARY KEY,
   FOREIGN KEY (eid) REFERENCES Employees (eid)
);
 
CREATE TABLE Junior (
   eid INTEGER PRIMARY KEY,
   FOREIGN KEY (eid) REFERENCES Employees (eid) ON UPDATE CASCADE
);
 
CREATE TABLE Booker (
   eid INTEGER PRIMARY KEY,
   FOREIGN KEY (eid) REFERENCES Employees (eid) ON UPDATE CASCADE 
);
 
CREATE TABLE Senior (
   eid INTEGER PRIMARY KEY,
   FOREIGN KEY (eid) REFERENCES Booker (eid) ON UPDATE CASCADE
); 
 
CREATE TABLE Manager (
   eid INTEGER PRIMARY KEY,
   FOREIGN KEY (eid) REFERENCES Booker (eid) ON UPDATE CASCADE
);
 
CREATE TABLE Health_Declaration (
    eid INTEGER REFERENCES Employees ON DELETE CASCADE,
    date DATE,
    temp NUMERIC CHECK (temp < 43 AND temp > 34),
    fever BOOLEAN,
    PRIMARY KEY (date, eid),
    CONSTRAINT has_fever CHECK ((temp <= 37.5 AND fever = FALSE) OR (temp > 37.5 AND fever = TRUE))
);

 
CREATE TABLE Meeting_Rooms (
   floor INTEGER,
   room INTEGER,
   rname varchar(50),
   did INTEGER NOT NULL REFERENCES Departments,
   PRIMARY KEY (room, floor)
);
 
 
CREATE TABLE Updates (
   date DATE,
   floor INTEGER,
   room INTEGER,
   new_cap INTEGER,
   eid INTEGER REFERENCES Manager ON DELETE CASCADE,
   PRIMARY KEY (date, room, floor),
   FOREIGN KEY (room, floor) REFERENCES Meeting_Rooms (room, floor),
   CONSTRAINT positive_capacity CHECK (new_cap > 0)
);
 
CREATE TABLE Books (
   eid INTEGER NOT NULL REFERENCES Booker ON DELETE CASCADE,
   date DATE,
   time TIME,
   floor INTEGER,
   room INTEGER,
   PRIMARY KEY(date, time, floor, room),
   FOREIGN KEY (room, floor) REFERENCES Meeting_Rooms (room, floor) ON DELETE CASCADE
);

CREATE TABLE Joins (
   eid INTEGER REFERENCES Employees ON DELETE CASCADE,
   date DATE,
   time TIME, 
   floor INTEGER,
   room INTEGER,
   PRIMARY KEY(eid, date, time, floor, room),
   FOREIGN KEY (date, time, floor, room) REFERENCES Books (date, time, floor, room) ON DELETE CASCADE
);
 
CREATE TABLE Approves (
   aid INTEGER REFERENCES Manager ON DELETE CASCADE,
   date DATE,
   time TIME,
   floor INTEGER,
   room INTEGER,
   PRIMARY KEY(date, time, floor, room),
   FOREIGN KEY (date, time, floor, room) REFERENCES Books (date, time, floor, room) ON DELETE CASCADE
);


