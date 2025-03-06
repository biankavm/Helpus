import { InitialInputs } from 'components';
import { useState } from 'react';

export function SignUp() {
  const [name, setName] = useState('');
  return (
    <InitialInputs
      title="Sign Up"
      buttonText="Cadastrar"
      linkText="Já possui uma conta? Faça login."
      url="/"
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </InitialInputs>
  );
}
