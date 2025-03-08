import { useContext } from 'react';
import { AuthContext } from 'contexts';

export function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }
  return (
    <div>
      <h1> Página dashboard </h1>
      <button onClick={handleLogout}> Deslogar </button>
    </div>
  );
}
