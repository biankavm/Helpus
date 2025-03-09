import { Header, Title } from 'components'
import { FiUser } from 'react-icons/fi'
import styles from './customers.module.scss'
import { useState } from 'react'
import { db } from 'services/firebase-connection'
import { collection, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export function Customers() {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')

  async function handleRegister(e) {
    e.preventDefault()

    if (name !== '' && cnpj !== '' && address !== '') {
      await addDoc(collection(db, 'customers'), {
        fantasyName: name,
        cnpj: cnpj,
        address: address
      })
        .then(() => {
          setName('')
          setCnpj('')
          setAddress('')
          toast.success(`Cliente ${name} cadastrado com sucesso!`)
        })
        .catch((error) => {
          console.error('Error adding document: ', error)
          toast.error('Erro ao fazer o cadastro! Tente novamente.')
        })
    } else {
      toast.error('Preencha todos os campos!')
    }
  }

  return (
    <>
      <Header />
      <div className={styles.content}>
        <Title name="Novo Cliente">
          <FiUser size={25} />
        </Title>

        <div className={styles.container}>
          <form className={styles.formProfile} onSubmit={handleRegister}>
            <label> Nome fantasia </label>
            <input
              type="text"
              placeholder="Informe o nome da empresa"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label> CNPJ </label>
            <input
              type="text"
              placeholder="Informe o CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />

            <label> Endereço </label>
            <input
              type="text"
              placeholder="Informe o endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button type="submit"> Salvar </button>
          </form>
        </div>
      </div>
    </>
  )
}
