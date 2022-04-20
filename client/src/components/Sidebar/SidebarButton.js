import React from 'react'
import { Text, Container } from './styles/Button.styled'

export default function SidebarButton(props) {
  return (
    <Container
      onClick={props.onClick}
      isSelected={props.isSelected}
      type={props.type ?? 'button'}
    >
      {props.isSelected ? (
        <img src={props.iconSelected} alt="highlighted icon" />
      ) : (
        <img src={props.iconDefault} alt="default icon" />
      )}
      <Text isSelected={props.isSelected}> {props.text} </Text>
    </Container>
  )
}
