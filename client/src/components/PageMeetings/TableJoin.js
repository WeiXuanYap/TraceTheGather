import React, { useState } from 'react'
import ConfirmationText from '../ConfirmationText'
import { ButtonContainer } from '../Form/Form.styled'
import Modal from '../Modal'
import { TableContainer, Row, Data, Header } from '../Table/Table.styled'
import TextButton from '../TextButton'

export default function TableJoin(props) {
  const headers = ['Floor', 'Room', 'Date', 'Time']
  const [showConfirm, setShowConfirm] = useState(Infinity)

  return (
    <>
      <TableContainer marginTop="60px">
        <tbody>
          <Row>
            {headers.map((hdr) => (
              <Header key={hdr}> {hdr} </Header>
            ))}
          </Row>
          {props.data.map((mtg, index) => (
            <Row key={index}>
              <Data> {mtg.floor} </Data>
              <Data>{mtg.room}</Data>
              <Data>
                {new Date(Date.parse(mtg.date))
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, '-')}
              </Data>
              <Data>{mtg.start_hour}</Data>
            </Row>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
