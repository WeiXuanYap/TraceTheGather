import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 70%;
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-top: 10px;
  padding: 5px 15px;
`

export default function SearchInput(props) {
  return (
    <div style={{ paddingTop: '100px' }}>
      <StyledInput placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  )
}
