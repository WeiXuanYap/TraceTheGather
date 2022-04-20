import React, { useState } from 'react'
import IconButton from '../IconButton'
import Modal from '../Modal'
import addIcon from '../../assets/AddDepartment.svg'
import {
  StyledInput,
  Label,
  InputGroup,
  ButtonContainer,
} from '../Form/Form.styled'
import TextButton from '../TextButton'

export default function AddDepartment() {
  const [showAddDept, setShowAddDept] = useState(false)

  const [dname, setDname] = useState('')
  const [did, setDid] = useState('')

  //Adding a department
  const handleAdd = async (e) => {
    e.preventDefault()
    try {
      const body = {
        did: did,
        dname: dname,
      }
      const response = await fetch('http://localhost:3000/departments', {
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
      <IconButton src={addIcon} onClick={() => setShowAddDept(true)}>
        Add Department
      </IconButton>

      {showAddDept && (
        <Modal>
          <form>
            <InputGroup>
              <Label> Department ID </Label>
              <StyledInput
                placeholder="Department ID"
                type="text"
                value={did}
                onChange={(e) => setDid(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label> Department Name </Label>
              <StyledInput
                placeholder="Department Name"
                type="text"
                value={dname}
                onChange={(e) => setDname(e.target.value)}
              />
            </InputGroup>
            <ButtonContainer>
              <TextButton enabled={false} onClick={() => setShowAddDept(false)}>
                Cancel
              </TextButton>
              <TextButton enabled={true} onClick={handleAdd}>
                Confirm
              </TextButton>
            </ButtonContainer>
          </form>
        </Modal>
      )}
    </>
  )
}
