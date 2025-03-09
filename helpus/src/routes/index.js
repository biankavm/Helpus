import { Routes, Route } from 'react-router-dom'
import { SignIn, SignUp, Dashboard, Profile, Customers } from '../pages'
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
    </Routes>
  )
}
