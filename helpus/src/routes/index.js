import { Routes, Route } from 'react-router-dom'
import {
  SignIn,
  SignUp,
  Dashboard,
  Profile,
  Customers,
  NewTicket
} from '../pages'
import { Private } from './Private'

export default function RoutesApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route
        path="/dashboard"
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path="/profile"
        element={
          <Private>
            <Profile />
          </Private>
        }
      />

      <Route
        path="/customers"
        element={
          <Private>
            <Customers />
          </Private>
        }
      />
      <Route
        path="/newticket"
        element={
          <Private>
            <NewTicket />
          </Private>
        }
      />

      <Route
        path="/newticket/:id"
        element={
          <Private>
            <NewTicket />
          </Private>
        }
      />
    </Routes>
  )
}
