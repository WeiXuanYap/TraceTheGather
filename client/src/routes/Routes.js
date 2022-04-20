import React from 'react'
import { Route, Routes as Switch } from 'react-router-dom'

import AdminPage from '../pages/PageAdmin'
import PageDepartments from '../pages/PageDepartments'
import LandingPage from '../pages/PageLanding'
import PageEmployees from '../pages/PageEmployees'
import ProtectedRoutes from './ProtectedRoutes'
import PageProfile from '../pages/PageProfile'
import PageMeetingsJoin from '../pages/PageMeetingsJoin'
import PageBookings from '../pages/PageBookings'
import PageMeetingsApproval from '../pages/PageMeetingsApproval'

export const Routes = () => (
  <Switch>
    <Route path="/" element={<LandingPage />} />
    <Route element={<ProtectedRoutes />}>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/departments" element={<PageDepartments />} />
      <Route path="/employees" element={<PageEmployees />} />
      <Route path="/profile/:id" element={<PageProfile />} />
      <Route path="/meetings/join/:id" element={<PageMeetingsJoin />} />
      <Route
        path="/meetings/approvals/:id"
        element={<PageMeetingsApproval />}
      />
      <Route path="/bookings/:id" element={<PageBookings />} />
    </Route>
    <Route path="*" element={<LandingPage />} />
  </Switch>
)
