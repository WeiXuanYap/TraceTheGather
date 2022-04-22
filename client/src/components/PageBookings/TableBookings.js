import React, { useState } from 'react'
import { TableContainer, Row, Header, Data, Icon } from '../Table/Table.styled'
import { ButtonContainer } from '../Form/Form.styled'
import trash from '../../assets/Trashcan.svg'
import bookDisabled from '../../assets/book_disabled.svg'
import bookEnabled from '../../assets/book_enabled.svg'
import cancelDisabled from '../../assets/cancel_disabled.svg'
import cancelEnabled from '../../assets/cancel_enabled.svg'
import changeCap from '../../assets/change_capacity.svg'
import Modal from '../Modal'
import ConfirmationText from '../ConfirmationText'
import TextButton from '../TextButton'

export default function TableBookings(props) {
  const headers = ['Department ID', 'Room Name', '']
  const [showConfirm, setShowConfirm] = useState('')

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

  return (
    <>
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
                <Icon
                  src={cancelEnabled}
                  alt="cancel"
                  onClick={() => setShowConfirm(bkg.rname)}
                />
                <Icon
                  src={bookEnabled}
                  alt="cancel"
                  onClick={() => setShowConfirm(bkg.did)}
                />
                <Icon
                  src={changeCap}
                  alt="cancel"
                  onClick={() => setShowConfirm(bkg.did)}
                />
              </Data>
              {showConfirm === bkg.rname && (
                <Modal width="50%" margin="100px auto">
                  <ConfirmationText>
                    Are you sure you want to remove the '{bkg.rname}'
                    department?
                  </ConfirmationText>
                  <ButtonContainer>
                    <TextButton onClick={() => setShowConfirm(Infinity)}>
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
            </Row>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
