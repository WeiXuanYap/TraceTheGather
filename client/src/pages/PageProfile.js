import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Profile from '../components/PageProfile/Profile'
import Return from '../components/Return'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Loading from '../components/Loading'
import HealthDec from '../components/PageProfile/HealthDec'

export default function PageProfile() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [employees, setEmployees] = useState([])
  const [showLoading, setShowLoading] = useState(false)

  const checkUser = async() => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      })

      const parseRes = await res.json()
      console.log(parseRes)

      if (parseRes.id !== id && parseRes.role !== 'Admin') {
        navigate(`/profile/${parseRes.id}`)
      }
            
    } catch (err) {
      console.error(err.message)
    }
  }

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
    checkUser()
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
                <HealthDec emp={emp} />
              </MainDiv>
            </div>
          ))
      )}
    </>
  )
}
