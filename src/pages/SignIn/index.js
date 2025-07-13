import { InitialInputs } from 'components'
import { AuthContext } from 'contexts'
import { useContext } from 'react'

export function SignIn() {
  const { signIn } = useContext(AuthContext)

  return (
    <InitialInputs
      title="Login"
      buttonText="Acessar"
      linkText="Não possui uma conta? Crie uma agora!"
      url="/register"
      origin="signin"
    />
  )
}
