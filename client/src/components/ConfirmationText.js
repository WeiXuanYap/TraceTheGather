import React from 'react'
import styled from 'styled-components'

const StyledText = styled.label`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-top: 20px;
  color: #000000;
`
export default function ConfirmationText(props) {
  return <StyledText> {props.children} </StyledText>
}
