import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SidebarButton from './SidebarButton'
import EmployeeIconDefault from '../../assets/Sidebar/employees.svg'
import EmployeeIconSelected from '../../assets/Sidebar/employees_selected.svg'
import ProfileIcon from '../../assets/Sidebar/profile.svg'
import ProfileIconSelected from '../../assets/Sidebar/profile_selected.svg'
import CalendarIcon from '../../assets/Sidebar/calendar.svg'
import CalendarIconSelected from '../../assets/Sidebar/calendar_selected.svg'
import {
  Logo,
  LeftContainer,
  Name,
  Line,
  SmallText,
} from './styles/AdminSidebar.styled'
import logo from '../../assets/Logo.png'

export default function EmpSidebar(props) {
  const navigate = useNavigate()
  const [user, setUser] = useState("");

  const checkAdmin = async() => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      })

      const parseRes = await res.json()
      setUser(parseRes.role)
            
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    checkAdmin()
  }, [])

  return (
    <LeftContainer>
    {console.log(user)}
      {user === 'Admin' && <SmallText> Admin Access </SmallText>}
      <Logo src={logo} alt="logo" />

      <div key={props.emp.eid}>
        <Name> {props.emp.ename} </Name>
        <Line />
        <SidebarButton
          iconDefault={ProfileIcon}
          iconSelected={ProfileIconSelected}
          text="Profile"
          isSelected={props.isSelectedProfile}
          onClick={() => navigate(`/profile/${props.emp.eid}`)}
        />
        <SidebarButton
          iconDefault={EmployeeIconDefault}
          iconSelected={EmployeeIconSelected}
          text="My Meetings"
          isSelected={props.isSelectedMeetings}
          onClick={() => navigate(`/meetings/join/${props.emp.eid}`)}
        />
        <SidebarButton
          iconDefault={CalendarIcon}
          iconSelected={CalendarIconSelected}
          text="My Bookings"
          isSelected={props.isSelectedBookings}
          onClick={() => navigate(`/bookings/${props.emp.eid}`)}
        />
      </div>
    </LeftContainer>
  )
}
