import React, { useState } from 'react'
import { TableContainer, Row, Header, Data, Icon } from '../Table/Table.styled'
import { ButtonContainer } from '../Form/Form.styled'
import trash from '../../assets/Trashcan.svg'
import greyedTrash from '../../assets/GreyedTrash.svg'
import Modal from '../Modal'
import ConfirmationText from '../ConfirmationText'
import TextButton from '../TextButton'

export default function TableDepartments(props) {
  const headers = ['#', 'ID', 'Department Name', 'No. of Employees', '']
  const [showConfirm, setShowConfirm] = useState(Infinity)

  //Deleting a department with id
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/departments/${id}`, {
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
          {props.data
            .filter((dpt) => {
              if (dpt.did > 0) {
                return dpt
              }
              return null
            })
            .map((dpt, index) => (
              <Row key={dpt.did}>
                <Data> {index + 1} </Data>
                <Data>{dpt.did}</Data>
                <Data>{dpt.dname}</Data>
                <Data>
                  {dpt.employee_number > 0 ? (
                    <Icon src={greyedTrash} alt="delete" />
                  ) : (
                    <Icon
                      src={trash}
                      alt="delete"
                      onClick={() => setShowConfirm(dpt.did)}
                    />
                  )}
                </Data>

                {showConfirm === dpt.did && (
                  <Modal width="50%" margin="100px auto">
                    <ConfirmationText>
                      Are you sure you want to remove the '{dpt.dname}'
                      department?
                    </ConfirmationText>
                    <ButtonContainer>
                      <TextButton onClick={() => setShowConfirm(Infinity)}>
                        Cancel
                      </TextButton>
                      <TextButton
                        enabled={true}
                        onClick={() => handleDelete(dpt.did)}
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
