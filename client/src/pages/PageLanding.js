import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import largeLogo from '../assets/large_logo.svg'
import styled from 'styled-components'
import { InputGroup, Label, StyledInput } from '../components/Form/Form.styled'

const CenteredDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 90px;
`

const LargeText = styled.p`
  margin: 0;
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 500;
  font-size: 62px;
  line-height: 16px;
  /* or 23% */

  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 1.25px;
  text-transform: capitalize;

  color: #000000;
  padding: 40px;
`

const LogInButton = styled.div`
  cursor: pointer;
  width: 4.5em;
  /* Blue 2 */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;

  background: #2d9cdb;
  border-radius: 4px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin-left: 278px;
  margin-top: 20px;
`

const Text = styled.p`
  margin: 0;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  /* /Gray / White */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`

export default function PageLanding({ setAuth }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function loginUser(credentials) {
    try {
      return await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser({
        username: username,
        password: password,
      })

      const parseRes = await response.json()
      console.log(parseRes.id)

      if (parseRes.jwtToken) {
        localStorage.setItem('token', parseRes.jwtToken)
        setAuth = true
        console.log('Logged in Successfully')
        navigate(`/admin`)
      } else {
        setAuth = false
        console.log(parseRes)
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <CenteredDiv>
      <img src={largeLogo} alt="logo" />
      <LargeText> TracetheGather </LargeText>
      <form>
        <InputGroup>
          <Label> User ID</Label>
          <StyledInput
            type="text"
            id="email"
            name="username"
            placeholder="Employee Email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup padding={'5px 30px'}>
          <Label> Password </Label>
          <StyledInput
            width={'20em'}
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>
        <div>
          <LogInButton type="submit" onClick={handleSubmit}>
            <Text> Log In </Text>
          </LogInButton>
        </div>
      </form>
    </CenteredDiv>
  )
}
