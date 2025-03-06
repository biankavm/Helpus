import styles from './initial-inputs.module.scss';
import logo from 'assets/my-logo5.png';
import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';

export function InitialInputs({ children, title }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.containerLogin}>
        <div className={styles.containerLoginArea}>
          <img
            src={logo}
            alt="Imagem de uma pessoa com um fone de ouvido em frente a um notebook respondendo a um chamado."
          />
        </div>
        <FormProvider onSubmit={() => {}}>
          <form>
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

            <button type="submit"> Acessar </button>
          </form>
        </FormProvider>

        <Link to="/register"> Criar uma conta </Link>
      </div>
    </div>
  );
}
