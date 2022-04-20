import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LandingPage from '../pages/PageLanding'

export default function ProtectedRoutes() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch('http://localhost:8080/verify', {
        method: 'POST',
        headers: { jwt_token: localStorage.token },
      })

      const parseRes = await res.json()

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    checkAuthenticated()
  }, [])

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  return <>{isAuthenticated ? <Outlet /> : <LandingPage setAuth={setAuth} />}</>
}
