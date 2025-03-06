import { InitialInputs } from 'components';

export function SignIn() {
  return (
    <InitialInputs
      title="Login"
      buttonText="Acessar"
      linkText="Criar uma conta"
      url="/register"
    />
  );
}
