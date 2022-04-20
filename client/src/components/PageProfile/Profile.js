import React, { useEffect } from 'react'
import { Header, Data, ProfileBox } from './styles/Profile.styled'

export default function Profile(props) {
  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <ProfileBox>
      <div key={props.emp.eid}>
        <Header> Name </Header>
        <Data> {props.emp.ename}</Data>
        <Header> Employee ID </Header>
        <Data> {props.emp.eid}</Data>
        <Header> Employee Email </Header>
        <Data> {props.emp.email}</Data>
        <Header> Mobile Contact </Header>
        <Data> +65 {props.emp.mobile_num}</Data>
        <Header> Home Contact </Header>
        <Data> +65 {props.emp.home_num}</Data>
        <Header> Office Contact </Header>
        <Data> {props.emp.office_num}</Data>
        <Header> Department </Header>
        <Data> {props.emp.did}</Data>
        <Header> Department ID </Header>
        <Data> {props.emp.did}</Data>
        <Header> Role </Header>
        <Data> {props.emp.role}</Data>
      </div>
    </ProfileBox>
  )
}
