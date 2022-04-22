import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Return from '../components/Return'
import EmpSidebar from '../components/Sidebar/EmpSidebar'
import { MainDiv } from '../components/Sidebar/styles/AdminSidebar.styled'
import Loading from '../components/Loading'
import TableBookings from '../components/PageBookings/TableBookings'
import SearchInput from '../components/SearchInput'
import AddBooking from '../components/PageBookings/AddBooking'

export default function PageBookings() {
  const { id } = useParams()
  const [employees, setEmployees] = useState([])
  const [bookings, setBookings] = useState([])
  const [search, setSearch] = useState('')
  const [showLoading, setShowLoading] = useState(true)

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

  const getBookings = async () => {
    try {
      setShowLoading(true)
      const response = await fetch(`/api/employees/${id}/rooms`)
      const jsonData = await response.json()
      console.log(jsonData)
      setBookings(jsonData)
    } catch (err) {
      console.error(err.message)
    } finally {
      setShowLoading(false)
    }
  }

  useEffect(() => {
    getBookings()
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
              <EmpSidebar isSelectedBookings={true} emp={emp} />
              <MainDiv>
                <Return emp={emp} />
                <SearchInput
                  placeholder="Search Room Bookings"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <AddBooking emp={emp} />
                <TableBookings
                  data={bookings.filter((bkg) => {
                    for (const property in bkg) {
                      if (
                        String(bkg[property])
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return bkg
                      }
                    }
                  })}
                />
              </MainDiv>
            </div>
          ))
      )}
    </>
  )
}
