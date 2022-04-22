import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NavButtons from '../components/AdminPage/NavButtons'
import Header from '../components/AdminPage/Header'

export default function PageAdmin() {
  const navigate = useNavigate(); 

  const checkAdmin = async() => {
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      })

      const parseRes = await res.json()
      console.log(parseRes)

      if (parseRes.role !== 'Admin') {
        navigate(`/profile/${parseRes.id}`)
      }
            
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    checkAdmin()
  }, [])

  return (
    <div>
      <Header />
      <NavButtons />
    </div>
  )
}
