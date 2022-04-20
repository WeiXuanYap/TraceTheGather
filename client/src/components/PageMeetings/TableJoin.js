import React, { useState } from 'react'
import ConfirmationText from '../ConfirmationText'
import { ButtonContainer } from '../Form/Form.styled'
import Modal from '../Modal'
import { TableContainer, Row, Data, Header } from '../Table/Table.styled'
import TextButton from '../TextButton'

export default function TableJoin(props) {
  const headers = ['Meeting ID', 'Room ID', 'Room Name', 'Date', 'Time', '']
  const [showConfirm, setShowConfirm] = useState(Infinity)

  return (
    <>
      <TableContainer>
        <tbody>
          <Row>
            {headers.map((hdr) => (
              <Header key={hdr}> {hdr} </Header>
            ))}
          </Row>
          {props.data.map((mtg, index) => (
            <Row key={mtg.did}>
              <Data> {index + 1} </Data>
              <Data>{mtg.did}</Data>
              <Data>{mtg.dname}</Data>
            </Row>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
