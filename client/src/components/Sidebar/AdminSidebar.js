import React from 'react'
import { useNavigate } from 'react-router-dom'
import SidebarButton from './SidebarButton'
import EmployeeIconDefault from '../../assets/Sidebar/employees.svg'
import EmployeeIconSelected from '../../assets/Sidebar/employees_selected.svg'
import DepartmentIconSelected from '../../assets/Sidebar/departments_selected.svg'
import DepartmentIconDefault from '../../assets/Sidebar/departments.svg'
import {
  Logo,
  LeftContainer,
  Name,
  Line,
  SmallText,
} from './styles/AdminSidebar.styled'
import logo from '../../assets/Logo.png'

export default function AdminSidebar(props) {
  const navigate = useNavigate()

  return (
    <LeftContainer>
      <SmallText> Admin Access </SmallText>
      <Logo src={logo} alt="logo" />
      <Name> Admin Staff </Name>
      <Line />
      <SidebarButton
        iconDefault={EmployeeIconDefault}
        iconSelected={EmployeeIconSelected}
        text="Employees"
        isSelected={props.isSelectedEmployee}
        onClick={() => navigate('/employees')}
      />
      <SidebarButton
        iconDefault={DepartmentIconDefault}
        iconSelected={DepartmentIconSelected}
        text="Departments"
        isSelected={props.isSelectedDepartment}
        onClick={() => navigate('/departments')}
      />
    </LeftContainer>
  )
}
