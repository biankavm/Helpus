import { Header, Title } from 'components'
import styles from './profile.module.scss'
import { FiSettings, FiUpload } from 'react-icons/fi'
import avatar from 'assets/avatar.png'
import { AuthContext } from 'contexts/auth'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from 'services/firebase-connection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage' // para manipular arquivos, nesse caso a foto do usuario
import { TitleWithChildren } from '../../components'
import '../general.css'

export function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || avatar)
  const [imageAvatar, setImageAvatar] = useState(null)
  const [name, setName] = useState(user && user.name)
  const [loadingSave, setLoadingSave] = useState(false)

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

  async function handleSubmit(e) {
    e.preventDefault()
    setLoadingSave(true)
    const docRef = doc(db, 'users', user.uid)
    if (imageAvatar === null && name !== '') {
      // atualizar apenas o nome do user
      await updateDoc(docRef, { name: name }).then(() => {
        let data = {
          ...user,
          name: name
        }
        setUser(data)
        storageUser(data)
        setLoadingSave(false)
        toast.success('Atualizado com sucesso!')
      })
    } else if (imageAvatar !== null && name !== '') {
      // atualizar nome e foto
      handleUpload()
    }
  }

  async function handleUpload() {
    const currentUid = user.uid
    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`)
    uploadBytes(uploadRef, imageAvatar) // referencia do arquivo e o arquivo que será enviado
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then(async (downloadURL) => {
          let urlPhoto = downloadURL
          const docRef = doc(db, 'users', user.uid)
          await updateDoc(docRef, { name: name, avatarUrl: urlPhoto })
            .then(() => {
              let data = {
                ...user,
                name: name,
                avatarUrl: urlPhoto
              }
              setUser(data) // salva no contexto do usuário no firebase
              storageUser(data) // salva no localstorage
              setLoadingSave(false)
              toast.success('Atualizado com sucesso!')
            })
            .catch((error) => {
              toast.error('Erro ao atualizar o perfil')
              console.log(error)
            })
        })
      })
  }

  return (
    <>
      <Header />
      <div className="content">
        <TitleWithChildren name="Minha Conta" icon={<FiSettings size={25} />} />

        <div className="container">
          <form className={styles.formProfile} onSubmit={handleSubmit}>
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
            <input type="text" value={user && user.email} disabled />
            <button type="submit">
              {loadingSave ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
        <div className={styles.container}>
          <button className={styles.logoutButton} onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </>
  )
}
