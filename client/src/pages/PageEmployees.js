import React, { useState, useEffect } from 'react'
import AddEmployee from '../components/PageEmployees/AddEmployee'
import AdminSideBar from '../components/Sidebar/AdminSidebar'
import TableEmployee from '../components/PageEmployees/TableEmployee'
import CheckHealth from '../components/PageEmployees/CheckHealth'
import SearchInput from '../components/SearchInput'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Return from '../components/Return'
import Loading from '../components/Loading'

export default function PageEmployees() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [showLoading, setShowLoading] = useState(true)

  const getEmployees = async () => {
    try {
      setShowLoading(true)
      const response = await fetch('/api/employees')
      const jsonData = await response.json()

      console.log(jsonData)
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
      <AdminSideBar isSelectedEmployee={true} />
      <MainDiv>
        <Return />
        <SearchInput
          placeholder="Search Employees"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddEmployee />
        <CheckHealth />
        {showLoading ? (
          <Loading />
        ) : (
          <TableEmployee
            data={employees.filter((emp) => {
              for (const property in emp) {
                if (
                  property === 'eid' ||
                  property === 'ename' ||
                  property === 'role'
                ) {
                  if (
                    String(emp[property])
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return emp
                  }
                }
              }
            })}
          />
        )}
      </MainDiv>
    </>
  )
}
