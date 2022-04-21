import React from 'react'
import logo from '../../assets/large_logo.svg'
import { BigText, CenteredDiv, SmallText } from './styles/Header.styled'

export default function Header() {
  return (
    <CenteredDiv>
      <img src={logo} alt="logo" />
      <BigText> TracetheGather </BigText>
      <SmallText>
        WELCOME TO THE ADMIN PAGE, VIEW ADMIN INFO USING THE BUTTONS BELOW
      </SmallText>
    </CenteredDiv>
  )
}
