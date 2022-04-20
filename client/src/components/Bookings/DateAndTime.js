import React, { useState } from 'react'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function Booking() {
  const [startDate, setStartDate] = useState(new Date())
  const [timeStart, setTimeStart] = useState('08:00')
  const [timeEnd, setTimeEnd] = useState('09:00')

  const handleBook = async (e) => {
    e.preventDefault()
    try {
      const body = {
        floor: floor,
        room: room,
        date: startDate,
        start_hour: timeStart,
        end_hour: timeEnd,
        eid: id,
      }
      const response = await fetch(
        'http://localhost:3000/employees/:id/rooms/book',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      )
      console.log(response)

      window.location.reload()
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div class="container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        inline
      />
      <input
        id="time"
        label="Start Time"
        type="time"
        defaultValue={timeStart}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1800, // 30 min
        }}
        onChange={(e) => setTimeStart(e.target.value)}
      />
      <input
        id="time"
        label="End Time"
        type="time"
        defaultValue={timeEnd}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 1800, // 30 min
        }}
        onChange={(e) => setTimeEnd(e.target.value)}
      />
      <button onClick={handleBook}> Confirm </button>
    </div>
  )
}
