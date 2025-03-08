import { Header } from './header'
import { render, screen } from '@testing-library/react'
import { AuthContext } from 'contexts'
jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>
}))

const TestComponent = () => {
  return (
    <AuthContext.Provider value={{ user: { avatarUrl: 'test' } }}>
      <Header />
    </AuthContext.Provider>
  )
}

describe('Header', () => {
  const renderComp = () => render(<TestComponent />)

  it('should render successfully', async () => {
    renderComp()
    expect(screen.getByAltText(/imagem do usuário/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /chamados/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /clientes/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /perfil/i })).toBeInTheDocument()
  })
})
