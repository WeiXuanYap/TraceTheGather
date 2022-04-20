import React from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from './IconButton'
import houseIcon from '../assets/House.svg'
import logoutIcon from '../assets/Logout.svg'
import userIcon from '../assets/User.svg'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 1%;
  right: 1%;
`

export default function Return(props) {
  const navigate = useNavigate()

  const logout = async (e) => {
    e.preventDefault()
    try {
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Container>
      {props.fromEmployees && (
        <IconButton
          src={userIcon}
          size={'13px'}
          onClick={() => navigate('/employees')}
        >
          Return to Employee Page
        </IconButton>
      )}
      <IconButton
        src={houseIcon}
        size={'13px'}
        padding={'10px 10px 0 30px'}
        onClick={() => navigate('/admin')}
      >
        Return to Admin Page
      </IconButton>
      <IconButton
        src={logoutIcon}
        size={'13px'}
        padding={'10px 10px 0 30px'}
        onClick={(e) => logout(e)}
      >
        Logout
      </IconButton>
    </Container>
  )
}
