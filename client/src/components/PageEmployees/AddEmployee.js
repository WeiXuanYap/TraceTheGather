import React, { useState } from 'react'
import styled from 'styled-components'
import IconButton from '../IconButton'
import addIcon from '../../assets/AddEmployee.svg'
import Modal from '../Modal'
import TextButton from '../TextButton'
import {
  StyledInput,
  Label,
  InputGroup,
  ButtonContainer,
} from '../Form/Form.styled'

const Error = styled.div`
font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 30px;
  /* or 150% */

  display: flex;
  align-items: center;

  color: #ff0000;
  padding-left: 2em;
  margin-bottom: -10px;`

export default function AddEmployee() {
  const [showAddEmployee, setShowAddEmployee] = useState(false)

  const [name, setName] = useState('')
  const [did, setDid] = useState('')
  const [mobileNum, setMobileNum] = useState('')
  const [kind, setKind] = useState('')
  const [homeNum, setHomeNum] = useState('')
  const [officeNum, setOfficeNum] = useState('')

  const [error, setError] = useState('')


  //Adding an employee
  const handleAdd = async (e) => {
    e.preventDefault()

    try {
      const body = {
        did: did,
        name: name,
        mobilenum: mobileNum,
        kind: kind,
        homenum: homeNum,
        officenum: officeNum,
      }
      const response = await fetch('/api/employees', {
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
      <IconButton src={addIcon} onClick={() => setShowAddEmployee(true)}>
        Add Employee
      </IconButton>

      {showAddEmployee && (
        <Modal>
          <form>
            <InputGroup>
              <Label>Name</Label>
              <StyledInput
                placeholder="Employee Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Mobile Contact</Label>
              <StyledInput
                placeholder="Contact Number"
                type="text"
                value={mobileNum}
                onChange={(e) => setMobileNum(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Role</Label>
              <StyledInput
                placeholder="Role"
                type="text"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Department ID</Label>
              <StyledInput
                placeholder="Department ID"
                type="text"
                value={did}
                onChange={(e) => setDid(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Home Contact</Label>
              <StyledInput
                placeholder="Home Number"
                type="text"
                value={homeNum}
                onChange={(e) => setHomeNum(e.target.value)}
              />
            </InputGroup>
            <InputGroup>
              <Label>Office Contact</Label>
              <StyledInput
                placeholder="Office Number"
                type="text"
                value={officeNum}
                onChange={(e) => setOfficeNum(e.target.value)}
              />
            </InputGroup>
          </form>
          {error && <Error>{error}</Error>}
          <ButtonContainer>
            <TextButton
              enabled={false}
              onClick={() => setShowAddEmployee(false)}
            >
              Cancel
            </TextButton>
            <TextButton enabled={true} onClick={handleAdd}>
              Confirm
            </TextButton>
            
          </ButtonContainer>
        </Modal>
      )}
    </>
  )
}
