import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MeetingTabs from '../components/PageMeetings/MeetingTabs'
import TableApprovals from '../components/PageMeetings/TableApprovals'
import Return from '../components/Return'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'

export default function PageMeetingsJoin() {
  const { id } = useParams()
  const [employees, setEmployees] = useState([])

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

  return (
    <>
      {employees
        .filter((emp) => String(emp.eid) === String(id))
        .map((emp) => (
          <div key={emp.eid}>
            <EmpSidebar isSelectedMeetings={true} emp={emp} />
            <MainDiv>
              <MeetingTabs emp={emp} approvalsSelected={true} />
              <Return emp={emp} />
              <TableApprovals data={emp} />
            </MainDiv>
          </div>
        ))}
    </>
  )
}
