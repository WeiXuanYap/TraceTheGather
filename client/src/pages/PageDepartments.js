import React, { useState, useEffect } from 'react'
import AddDepartment from '../components/PageDepartments/AddDepartment'
import AdminSidebar from '../components/Sidebar/AdminSidebar'
import SearchInput from '../components/SearchInput'
import TableDepartments from '../components/PageDepartments/TableDepartments'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Return from '../components/Return'

export default function PageDepartments() {
  const [departments, setDepartments] = useState([])
  const [search, setSearch] = useState('')

  const getDepartments = async () => {
    try {
      const response = await fetch('http://localhost:8080/departments')
      const jsonData = await response.json()

      console.log(jsonData)

      setDepartments(jsonData)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getDepartments()
  }, [])

  return (
    <>
      <AdminSidebar isSelectedDepartment={true} />
      <MainDiv>
        <Return />
        <SearchInput
          placeholder="Search Departments"
          onChange={(e) => setSearch(e.target.value)}
        />
        <AddDepartment />
        <TableDepartments
          data={departments.filter((dpt) => {
            for (const property in dpt) {
              if (
                String(dpt[property])
                  .toLowerCase()
                  .includes(search.toLowerCase())
              ) {
                return dpt
              }
            }
          })}
        />
      </MainDiv>
    </>
  )
}
