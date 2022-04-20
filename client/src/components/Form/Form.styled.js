import styled from 'styled-components'

export const StyledInput = styled.input`
  border-style: dotted;
  width: 100%;
`

export const Label = styled.label`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  /* identical to box height, or 120% */

  letter-spacing: 1.5px;
  text-transform: uppercase;

  /* Black / High Emphasis */

  color: rgba(0, 0, 0, 0.87);

  mix-blend-mode: normal;
  margin: 0;
`

export const InputGroup = styled.div`
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const ButtonContainer = styled.div`
  padding: 30px 0 20px 0;
  display: flex;
  justify-content: space-evenly;
`
