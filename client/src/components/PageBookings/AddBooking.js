import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import IconButton from '../IconButton'
import Modal from '../Modal'
import addIcon from '../../assets/add_room.svg'
import {
  StyledInput,
  Label,
  InputGroup,
  ButtonContainer,
} from '../Form/Form.styled'
import TextButton from '../TextButton'

export default function AddBooking(props) {
  const id = useParams()

  const date = new Date(
    new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000
  )
    .toISOString()
    .split('T')[0]

  const [showAddBookings, setShowAddBookings] = useState(false)

  const [floor, setFloor] = useState('')
  const [room, setRoom] = useState('')
  const [rname, setRname] = useState('')
  const [roomCapacity, setRoomCapacity] = useState('')
  const [did, setDid] = useState('')

  //Adding a department
  const handleBook = async (e) => {
    e.preventDefault()
    try {
      const body = {
        floor: floor,
        room: room,
        rname: rname,
        room_capacity: roomCapacity,
        did: did,
        mid: props.emp.eid,
        date: date,
      }
      console.log(body)
      const response = await fetch(`/api/employees/${id}/rooms`, {
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

  return (
    <>
      <IconButton src={addIcon} onClick={() => setShowAddBookings(true)}>
        Add Room
      </IconButton>

      {showAddBookings && (
        <Modal>
          <form>
            <InputGroup>
              <Label> Floor </Label>
              <StyledInput
                placeholder="Floor"
                type="text"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label> Room </Label>
              <StyledInput
                placeholder="Room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label> Room Name </Label>
              <StyledInput
                placeholder="Room Name"
                type="text"
                value={rname}
                onChange={(e) => setRname(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label> Room Capacity </Label>
              <StyledInput
                placeholder="Room Capacity"
                type="text"
                value={roomCapacity}
                onChange={(e) => setRoomCapacity(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label> Department ID (Of Room) </Label>
              <StyledInput
                placeholder="Department ID"
                type="text"
                value={did}
                onChange={(e) => setDid(e.target.value)}
              />
            </InputGroup>
            <ButtonContainer>
              <TextButton
                enabled={false}
                onClick={() => setShowAddBookings(false)}
              >
                Cancel
              </TextButton>
              <TextButton enabled={true} onClick={handleBook}>
                Confirm
              </TextButton>
            </ButtonContainer>
          </form>
        </Modal>
      )}
    </>
  )
}
