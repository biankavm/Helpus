import styles from './header.module.scss'
import AvatarImg from 'assets/avatar.png'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from 'contexts'

import { FiUser, FiHome, FiSettings } from 'react-icons/fi'

export function Header() {
  const { user } = useContext(AuthContext)
  console.log(user.avatarUrl)
  return (
    <div className={styles.sidebar}>
      <div>
        <img
          src={user.avatarUrl ? user.avatarUrl : AvatarImg}
          alt="Imagem do usuário"
        />
      </div>

      <Link to="/dashboard">
        <FiHome color="#fff" size={24} />
        Chamados
      </Link>

      <Link to="/customers">
        <FiUser color="#fff" size={24} />
        Clientes
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} />
        Perfil
      </Link>
    </div>
  )
}
