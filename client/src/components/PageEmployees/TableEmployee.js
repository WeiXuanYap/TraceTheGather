import React, { useState } from 'react'
import {
  Header,
  Data,
  Icon,
  ResignedText,
  TableContainerEmp,
  RowEmp,
} from '../Table/Table.styled'
import { ButtonContainer } from '../Form/Form.styled'
import { useNavigate } from 'react-router-dom'
import trash from '../../assets/Trashcan.svg'
import Modal from '../Modal'
import ConfirmationText from '../ConfirmationText'
import TextButton from '../TextButton'

export default function TableEmployee(props) {
  const headers = ['#', 'ID', 'Name', 'Role', '']
  const [showConfirm, setShowConfirm] = useState(0)
  const navigate = useNavigate()

  const today = new Date()
  //Removing an employee with id
  const handleResign = async (id) => {
    try {
      const body = {
        eid: id,
        date: today,
      }
      const response = await fetch(`http://localhost:3000/employees/resign`, {
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
      <TableContainerEmp>
        <tbody>
          <RowEmp>
            {headers.map((hdr) => (
              <Header key={hdr}> {hdr} </Header>
            ))}
          </RowEmp>
          {props.data.map((emp, index) => (
            <RowEmp key={emp.eid}>
              <Data onClick={() => navigate(`/profile/${emp.eid}`)}>
                {index + 1}
              </Data>
              <Data onClick={() => navigate(`/profile/${emp.eid}`)}>
                {emp.eid}
              </Data>
              <Data onClick={() => navigate(`/profile/${emp.eid}`)}>
                {emp.ename}
              </Data>
              <Data onClick={() => navigate(`/profile/${emp.eid}`)}>
                {emp.role}
              </Data>
              <Data>
                {emp.resigned_date ? (
                  <ResignedText> Resigned </ResignedText>
                ) : (
                  <Icon
                    src={trash}
                    alt="delete"
                    onClick={() => setShowConfirm(emp.eid)}
                  />
                )}
              </Data>

              {showConfirm === emp.eid && (
                <Modal width="50%" margin="100px auto">
                  <ConfirmationText>
                    Confirm resignation of {emp.ename}?
                  </ConfirmationText>
                  <ButtonContainer>
                    <TextButton onClick={() => setShowConfirm(0)}>
                      Cancel
                    </TextButton>
                    <TextButton
                      enabled={true}
                      onClick={() => handleResign(emp.eid)}
                    >
                      Confirm
                    </TextButton>
                  </ButtonContainer>
                </Modal>
              )}
            </RowEmp>
          ))}
        </tbody>
      </TableContainerEmp>
    </>
  )
}
