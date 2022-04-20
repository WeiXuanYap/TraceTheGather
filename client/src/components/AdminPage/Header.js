import React from 'react'
import logo from '../../assets/Logo.png'
import {
  BigText,
  CenteredDiv,
  LargeLogo,
  SmallText,
} from './styles/Header.styled'

export default function Header() {
  return (
    <CenteredDiv>
      <LargeLogo src={logo} alt="logo" />
      <BigText> TraceTheGather </BigText>
      <SmallText>
        WELCOME TO THE ADMIN PAGE, VIEW ADMIN INFO USING THE BUTTONS BELOW
      </SmallText>
    </CenteredDiv>
  )
}
