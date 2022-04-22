import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/PageProfile/Profile'
import Return from '../components/Return'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Loading from '../components/Loading'

export default function PageProfile() {
  const { id } = useParams()
  const [employees, setEmployees] = useState([])
  const [showLoading, setShowLoading] = useState(false)

  const getEmployees = async () => {
    try {
      setShowLoading(true)
      const response = await fetch('/api/employees')
      const jsonData = await response.json()
      //console.log(jsonData)
      setEmployees(jsonData)
    } catch (err) {
      console.error(err.message)
    } finally {
      setShowLoading(false)
    }
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        employees
          .filter((emp) => String(emp.eid) === String(id))
          .map((emp) => (
            <div key={emp.eid}>
              <EmpSidebar isSelectedProfile={true} emp={emp} />
              <MainDiv>
                <Return emp={emp} fromEmployees={true} />
                <Profile emp={emp} />
              </MainDiv>
            </div>
          ))
      )}
    </>
  )
}
