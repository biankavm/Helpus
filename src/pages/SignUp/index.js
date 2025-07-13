import { InitialInputs } from 'components'
import { useState } from 'react'

export function SignUp() {
  const [name, setName] = useState('')

  return (
    <InitialInputs
      title="Cadastro"
      buttonText="Cadastrar"
      linkText="Já possui uma conta? Faça login."
      url="/"
      origin="signup"
      name={name}
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </InitialInputs>
  )
}
