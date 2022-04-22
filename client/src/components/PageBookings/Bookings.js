import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import Booking from './DateAndTime'
import SearchInput from '../SearchInput'
import AddBooking from './AddBooking'
import { TableContainer, Row, Header, Data, Icon } from '../Table/Table.styled'
import {
  ButtonContainer,
  InputGroup,
  Label,
  StyledInput,
} from '../Form/Form.styled'
import bookDisabled from '../../assets/book_disabled.svg'
import bookEnabled from '../../assets/book_enabled.svg'
import cancelDisabled from '../../assets/cancel_disabled.svg'
import cancelEnabled from '../../assets/cancel_enabled.svg'
import changeCap from '../../assets/change_capacity.svg'
import Modal from '../Modal'
import ConfirmationText from '../ConfirmationText'
import TextButton from '../TextButton'

const ButtonGroup = styled.div`
  display: flex;
  gap: 2.5em;
  justify-content: flex-end;
`

export default function Bookings(props) {
  const headers = ['Department ID', 'Room Name', '']
  const [showCancel, setShowCancel] = useState('')
  const [showChangeCap, setShowChangeCap] = useState('')
  const [newCapacity, setNewCapacity] = useState()
  const [showBook, setShowBook] = useState(false)
  const [booking, setBooking] = useState({})

  const navigate = useNavigate()
  const { id } = useParams()

  //Deleting a department with id
  const cancelBooking = async (id) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      })
      console.log(response)

      window.location.reload()
    } catch (err) {
      console.error(err.message)
    }
  }

  const changeCapacity = async (id) => {
    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      })
      console.log(response)

      window.location.reload()
    } catch (err) {
      console.error(err.message)
    }
  }

  const handleBook = (bkg) => {
    setShowBook(true)
    setBooking(bkg)
  }

  return (
    <>
      {showBook ? (
        <Booking data={booking} />
      ) : (
        <>
          <AddBooking emp={props.emp} />
          <TableContainer>
            <tbody>
              <Row>
                {headers.map((hdr) => (
                  <Header key={hdr}> {hdr} </Header>
                ))}
              </Row>
              {props.data.map((bkg, index) => (
                <Row key={index}>
                  <Data>{bkg.did}</Data>
                  <Data>{bkg.rname}</Data>
                  <Data>
                    <ButtonGroup>
                      <Icon
                        src={cancelEnabled}
                        alt="cancel"
                        onClick={() => setShowCancel(bkg.rname)}
                      />
                      <Icon
                        src={bookEnabled}
                        alt="confirm booking"
                        onClick={() => handleBook(bkg)}
                      />
                      <Icon
                        src={changeCap}
                        alt="change capacity"
                        onClick={() => setShowChangeCap(bkg.rname)}
                      />
                    </ButtonGroup>
                  </Data>
                  {showCancel === bkg.rname && (
                    <Modal width="50%" margin="100px auto">
                      <ConfirmationText>
                        Are you sure you want to cancel this booking?
                      </ConfirmationText>
                      <ButtonContainer>
                        <TextButton onClick={() => setShowCancel('')}>
                          Cancel
                        </TextButton>
                        <TextButton
                          enabled={true}
                          onClick={() => cancelBooking(bkg.did)}
                        >
                          Confirm
                        </TextButton>
                      </ButtonContainer>
                    </Modal>
                  )}
                  {showChangeCap === bkg.rname && (
                    <Modal width="50%" margin="100px auto">
                      <form>
                        <InputGroup>
                          <Label> Old Capacity </Label>
                          <StyledInput value={bkg.room_capacity} />
                        </InputGroup>
                        <InputGroup>
                          <Label> New Capacity </Label>
                          <StyledInput
                            placeholder="New Capacity of Room"
                            type="text"
                            onChange={(e) => setNewCapacity(e)}
                          />
                        </InputGroup>
                      </form>
                      <ButtonContainer>
                        <TextButton onClick={() => setShowChangeCap('')}>
                          Cancel
                        </TextButton>
                        <TextButton
                          enabled={true}
                          onClick={() => changeCapacity(bkg.did)}
                        >
                          Confirm
                        </TextButton>
                      </ButtonContainer>
                    </Modal>
                  )}
                </Row>
              ))}
            </tbody>
          </TableContainer>{' '}
        </>
      )}
    </>
  )
}
