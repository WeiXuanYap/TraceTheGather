import React from 'react'
import styled from 'styled-components'

const ModalContainer = styled.div`
  /* Add Animation */
  @keyframes animatetop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }

  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
`

const ModalContent = styled.div`
  width: ${(props) => props.width ?? '35%'};
  margin: ${(props) => props.margin ?? '30px auto'};

  position: relative;
  background-color: #fefefe;
  padding: 10px;
  border: 1px solid #888;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
`

export default function Modal(props) {
  return (
    <ModalContainer onClick={props.onClick}>
      <ModalContent width={props.width} margin={props.margin}>
        {props.children}
      </ModalContent>
    </ModalContainer>
  )
}
