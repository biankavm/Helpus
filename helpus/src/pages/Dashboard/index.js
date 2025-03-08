import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { Header } from 'components'

export function Dashboard() {
  const { logout } = useContext(AuthContext)

  async function handleLogout() {
    await logout()
  }
  return (
    <div>
      <Header />
      <h1> Página dashboard </h1>
      <button onClick={handleLogout}> Deslogar </button>
    </div>
  )
}
