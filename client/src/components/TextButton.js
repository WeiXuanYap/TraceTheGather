import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border-radius: 8px;
  padding: 0px 10px;
  background: ${(props) => (props.enabled ? '#A2EA96' : '#C6C6C6')};
`

const Text = styled.label`
  cursor: pointer;
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  /* or 150% */

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`

export default function TextButton(props) {
  return (
    <Button enabled={props.enabled} onClick={props.onClick}>
      <Text>{props.children} </Text>
    </Button>
  )
}
