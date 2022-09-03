import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import cross from '../../assets/cross.svg'
import tick from '../../assets/tick.svg'
import ConfirmationText from '../ConfirmationText'
import {
  InputGroup,
  Label,
  ButtonContainer,
  StyledInput,
} from '../Form/Form.styled'
import Loading from '../Loading'
import Modal from '../Modal'
import TextButton from '../TextButton'

const Uncompleted = styled.div`
  cursor: pointer;
  width: 204px;
  height: 204px;
  background: #eb5757;
  /* 6 dp */

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
`

const Image = styled.img`
  padding-top: 40px;
`

const Completed = styled.div`
  width: 204px;
  height: 204px;
  background: #27ae60;
  /* 6 dp */

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2), 0px 1px 18px rgba(0, 0, 0, 0.12),
    0px 6px 10px rgba(0, 0, 0, 0.14);
  border-radius: 4px;
  z-index: -1;
`

const RightDiv = styled.div`
  position: absolute;
  right: 5%;
  top: 20%;
`
const LoadingDiv = styled.div`
  position: absolute;
  left: 500px;
  top: 10%;
`

const BigText = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 300;
  font-size: 24px;
  line-height: 36px;
  /* or 150% */

  text-align: center;
  padding-top: 0.5em;

  /* White / High Emphasis */

  color: #ffffff;
`
const SmallLabel = styled.p`
  margin: 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  /* or 125% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.4px;
  padding-left: 4em;

  /* White / Medium Emphasis */

  color: rgba(255, 255, 255, 0.7);
`

const SickText = styled.p`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  /* or 150% */

  display: flex;
  align-items: center;

  color: #ff0000;
  padding-left: 4em;
  margin-bottom: -10px;
`

export default function HealthDec(props) {
  const [completed, setCompleted] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const [temp, setTemp] = useState(36.5)
  const [showAddTemp, setShowAddTemp] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const { id } = useParams()
  const date = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split('T')[0]

  const getHealth = async () => {
    try {
      setShowLoading(true)
      const response = await fetch(`/api/employees/${id}/health_declaration_status`)
      const jsonData = await response.json()
      console.log(jsonData)
      setCompleted(jsonData)
    } catch (err) {
      console.error(err.message)
    } finally {
      setShowLoading(false)
    }
  }

  const declareHealth = async (e) => {
    e.preventDefault()
    try {
      const body = {
        temp: temp,
        date: date,
      }
      const response = await fetch(`/api/employees/${id}/health_declaration`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(response)
      window.location.reload()
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    getHealth()
  }, [])

  return (
    <>
      {showLoading ? (
        <LoadingDiv>
          <Loading />
        </LoadingDiv>
      ) : (
        <RightDiv>
          {completed.length !== 0 ? (
            <Completed>
              <Image src={tick} alt="tick" />
              <BigText> Completed </BigText>
              <SmallLabel> Health Declaration</SmallLabel>
            </Completed>
          ) : (
            <Uncompleted onClick={() => setShowAddTemp(true)}>
              <Image src={cross} alt="cross" />
              <BigText> Uncompleted </BigText>
              <SmallLabel> Health Declaration</SmallLabel>
            </Uncompleted>
          )}
          {showAddTemp && (
            <Modal>
              <form>
                <InputGroup>
                  <Label> Temperature (in degrees)</Label>
                  <StyledInput
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                  />
                </InputGroup>
                {temp >= 37.6 && (
                  <SickText> You are too sick to work!</SickText>
                )}
                <ButtonContainer>
                  <TextButton
                    enabled={false}
                    onClick={() => setShowAddTemp(false)}
                  >
                    Cancel
                  </TextButton>
                  <TextButton
                    enabled={true}
                    onClick={() => setShowConfirm(true)}
                  >
                    Confirm
                  </TextButton>
                </ButtonContainer>
              </form>
            </Modal>
          )}
          {showConfirm && (
            <Modal width="40%">
              <form>
                <ConfirmationText>
                  Confirm declaration of temperature?
                </ConfirmationText>
                <ConfirmationText>
                  You will not be able to redeclare afterwards.
                </ConfirmationText>
                <ButtonContainer>
                  <TextButton
                    enabled={false}
                    onClick={() => setShowConfirm(false)}
                  >
                    Cancel
                  </TextButton>
                  <TextButton enabled={true} onClick={declareHealth}>
                    Confirm
                  </TextButton>
                </ButtonContainer>
              </form>
            </Modal>
          )}
        </RightDiv>
      )}
    </>
  )
}
