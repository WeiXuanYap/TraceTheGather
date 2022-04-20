import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/PageProfile/Profile'
import Return from '../components/Return'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'

export default function PageProfile() {
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
            <EmpSidebar isSelectedProfile={true} emp={emp} />
            <MainDiv>
              <Return emp={emp} fromEmployees={true} />
              <Profile emp={emp} />
            </MainDiv>
          </div>
        ))}
    </>
  )
}
