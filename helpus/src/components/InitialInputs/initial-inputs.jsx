import styles from './initial-inputs.module.scss';
import logo from 'assets/my-logo5.png';

import { useContext, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from 'contexts';

export function InitialInputs({
  children = null,
  title,
  buttonText,
  linkText,
  url,
  origin,
  name = '',
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const conditional =
    origin === 'signin' ? { email, password } : { name, email, password };

  const isFormValid = () => {
    return Object.values(conditional).every((value) => value.trim() !== '');
  };

  const { signIn, signUp, loadingAuth } = useContext(AuthContext);
  async function handleSubmit(e) {
    e.preventDefault();

    if (isFormValid() && origin === 'signin') {
      signIn(email, password);
    }

    if (isFormValid() && origin === 'signup') {
      await signUp(name, email, password);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.containerLogin}>
        <div className={styles.containerLoginArea}>
          <img
            src={logo}
            alt="Garota sorrindo usando uma roupa verde e um headseat azuul."
          />
        </div>
        <FormProvider onSubmit={() => {}}>
          <form onSubmit={handleSubmit}>
            <h1> {title} </h1>

            {children}
            <input
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
              {loadingAuth ? 'Carregando...' : buttonText}
            </button>
          </form>
        </FormProvider>

        <Link to={url}> {linkText} </Link>
      </div>
    </div>
  );
}
