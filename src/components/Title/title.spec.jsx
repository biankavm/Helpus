import { render, screen } from '@testing-library/react'
import { Title } from '.'

describe('Title', () => {
  const renderComp = () => {
    return render(
      <Title name="Minha conta">
        <span>Test</span>
      </Title>
    )
  }

  it('should render correctly', () => {
    renderComp()
    expect(screen.getByText(/minha conta/i)).toBeInTheDocument()
    expect(screen.getByText(/test/i)).toBeInTheDocument()
  })
})
