import React, { useState } from 'react'
import Profile from '../../components/MainEmployees/Profile'
import Button from '../../components/Sidebar/SidebarButton'
import Sidebar from '../../components/Sidebar/Sidebar'
import Booking from '../../components/Bookings/DateAndTime'

export default function MainEmployees() {
  const [currentTab, setCurrentTab] = useState(1)
  const sections = ['Profile', 'Meetings', 'Bookings']

  function TabPage(tabID) {
    switch (tabID) {
      case 1:
        return <Profile />
      case 2:
        return <h1> Meetings </h1>
      case 3:
        return <Booking />
      default:
        return <h1> Default </h1>
    }
  }
  return (
    <>
      {sections.map((section, index) => {
        const isSelected = sections.indexOf(section) === currentTab - 1
        return (
          <Button
            key={index}
            onClick={() => setCurrentTab(index + 1)}
            isSelected={isSelected}
          >
            {section}
          </Button>
        )
      })}
      {TabPage(currentTab)}
    </>
  )
}
