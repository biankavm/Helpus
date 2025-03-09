import { Header, Title } from 'components'
import styles from './profile.module.scss'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from 'assets/avatar.png'
import { AuthContext } from 'contexts/auth'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || avatar)
  const [imageAvatar, setImageAvatar] = useState(null)
  const [name, setName] = useState(user && user.name)
  const [email, setEmail] = useState(user && user.email)

  function handleFile(e) {
    const image = e.target.files[0]

    if (image) {
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        console.log(image)
        console.log(URL.createObjectURL(image))
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image)) // envia a url da imagem pro firebase
      } else {
        toast.error('Envie uma imagem do tipo PNG ou JPEG')
        setImageAvatar(null)
        return
      }
    }
  }

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

              <input type="file" accept="image/*" onChange={handleFile} />
              <br />

              <img
                src={avatarUrl}
                alt="Foto de perfil do usuário."
                width={250}
                height={250}
              />
            </label>

            <label> Nome </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label> Email </label>
            <input type="text" value={email} disabled />
            <button type="submit"> Salvar </button>
          </form>
        </div>
        <div className={styles.container}>
          <button className={styles.logoutButton} onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
      <span> {email} </span>
    </>
  )
}
