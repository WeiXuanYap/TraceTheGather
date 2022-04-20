import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MeetingTabs from '../components/PageMeetings/MeetingTabs'
import TableJoin from '../components/PageMeetings/TableJoin'
import Return from '../components/Return'
import SearchInput from '../components/SearchInput'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'

export default function PageMeetingsJoin() {
  const { id } = useParams()
  const [employees, setEmployees] = useState([])
  const [meetings, setMeetings] = useState([])
  const [search, setSearch] = useState('')
  const date = new Date()

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees')
      const jsonData = await response.json()
      //console.log(jsonData)
      setEmployees(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

  const getMeetings = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/employees/${id}/${date}/view-future-meeting/`
      )
      const jsonData = await response.json()
      console.log(jsonData)
      setMeetings(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getMeetings()
  }, [])

  return (
    <>
      {employees
        .filter((emp) => String(emp.eid) === String(id))
        .map((emp) => (
          <div key={emp.eid}>
            <EmpSidebar isSelectedMeetings={true} emp={emp} />
            <MainDiv>
              <SearchInput
                placeholder={'Search Meetings to Join/Leave'}
                onChange={(e) => setSearch(e.target.value)}
              />
              <MeetingTabs emp={emp} joinSelected={true} />
              <Return emp={emp} />
              <TableJoin
                data={meetings.filter((mtg) => {
                  for (const property in mtg) {
                    if (
                      String(mtg[property])
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return mtg
                    }
                  }
                })}
              />
            </MainDiv>
          </div>
        ))}
    </>
  )
}
