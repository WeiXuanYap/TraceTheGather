import React, { Suspense } from 'react'
import { Route, Routes as Switch } from 'react-router-dom'
import Loading from '../components/Loading'

const Admin = React.lazy(() => import('../pages/PageAdmin'))
const Departments = React.lazy(() => import('../pages/PageDepartments'))
const Landing = React.lazy(() => import('../pages/PageLanding'))
const Employees = React.lazy(() => import('../pages/PageEmployees'))
const ProtectedRoutes = React.lazy(() => import('./ProtectedRoutes'))
const Profile = React.lazy(() => import('../pages/PageProfile'))
const MeetingsJoin = React.lazy(() => import('../pages/PageMeetingsJoin'))
const Bookings = React.lazy(() => import('../pages/PageBookings'))
const MeetingsApproval = React.lazy(() =>
  import('../pages/PageMeetingsApproval')
)

export const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Route path="/" element={<Landing />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/meetings/join/:id" element={<MeetingsJoin />} />
        <Route path="/meetings/approvals/:id" element={<MeetingsApproval />} />
        <Route path="/bookings/:id" element={<Bookings />} />
      </Route>
      <Route path="*" element={<Landing />} />
    </Switch>
  </Suspense>
)
