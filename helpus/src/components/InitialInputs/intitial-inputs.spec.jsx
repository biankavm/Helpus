import { render, screen } from '@testing-library/react';
import { InitialInputs } from './initial-inputs';

describe('InitialInputs', () => {
  const renderComp = () =>
    render(
      <InitialInputs
        title="Test"
        buttonText="test acess"
        linkText="test login"
      />
    );

  it('should render succesfully', () => {
    renderComp();
    const title = screen.getByRole('heading', { name: /test/i });
    const inputEmail = screen.getByPlaceholderText(/email@email.com/i);
    const inputPassword = screen.getByPlaceholderText('********');
    const button = screen.getByRole('button', { name: /test acess/i });
    const link = screen.getByText(/test login/i);
    expect(title).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
