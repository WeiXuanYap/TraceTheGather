import React, { useState, useEffect } from 'react'
import AddEmployee from '../components/PageEmployees/AddEmployee'
import AdminSideBar from '../components/Sidebar/AdminSidebar'
import TableEmployee from '../components/PageEmployees/TableEmployee'
import CheckHealth from '../components/PageEmployees/CheckHealth'
import SearchInput from '../components/SearchInput'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Return from '../components/Return'
import { ButtonContainer } from '../components/Form/Form.styled'

export default function PageEmployees() {
  const [employees, setEmployees] = useState([])
  const [search, setSearch] = useState('')

  const getEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3000/employees')
      const jsonData = await response.json()

      console.log(jsonData)

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
      <AdminSideBar isSelectedEmployee={true} />
      <MainDiv>
        <Return />
        <SearchInput
          placeholder="Search Employees"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddEmployee />
        <CheckHealth />
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
      </MainDiv>
    </>
  )
}
