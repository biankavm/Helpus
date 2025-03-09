import { Header, Title } from 'components'
import styles from './profile.module.scss'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from 'assets/avatar.png'
import { AuthContext } from 'contexts/auth'
import { useContext, useState } from 'react'

export function Profile() {
  const { user } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || avatar)

  return (
    <>
      <Header />
      <div className={styles.content}>
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>

        <div className={styles.container}>
          <form className={styles.formProfile}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input type="file" accept="image/*" />
              <br />

              <img
                src={avatar}
                alt="Foto de perfil do usuário."
                width={250}
                height={250}
              />
            </label>

            <label> Nome </label>
            <input type="text" placeholder="Seu nome" />

            <label> Email </label>
            <input type="text" placeholder="teste@teste.com" disabled />

            <button type="submit"> Salvar </button>
          </form>
        </div>
        <div className={styles.container}>
          <button className={styles.logoutButton}> Sair </button>
        </div>
      </div>
    </>
  )
}
