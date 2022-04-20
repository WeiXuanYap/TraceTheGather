import styled from 'styled-components'

export const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;

  width: 384px;
  height: 136px;

  /* Primary / 500 - Accent */

  background: #2196f3;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 5px 5px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
`

export const ButtonContainer = styled.div`
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 76px;
`

export const StyledText = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 30px;
  line-height: 16px;
  /* or 40% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1.25px;
  text-transform: uppercase;

  /* White / High Emphasis */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 10px;
`
