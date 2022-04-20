import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  StyledButton,
  ButtonContainer,
  StyledText,
} from './styles/NavButtons.styled'

export default function NavButtons() {
  const navigate = useNavigate()

  return (
    <div>
      <ButtonContainer>
        <StyledButton
          type="button"
          className="btn btn-dark"
          onClick={() => navigate('/employees')}
        >
          <StyledText> VIEW EMPLOYEES </StyledText>
        </StyledButton>
        <StyledButton
          type="button"
          className="btn btn-dark"
          onClick={() => navigate('/departments')}
        >
          <StyledText> VIEW DEPARTMENTS </StyledText>
        </StyledButton>
      </ButtonContainer>
    </div>
  )
}
