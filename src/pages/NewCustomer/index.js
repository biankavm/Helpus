import { Header, Title } from 'components'
import { FiUser } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { db } from 'services/firebase-connection'
import { collection, addDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { TitleWithChildren } from '../../components'
import '../general.css'
import { useParams, useNavigate } from 'react-router-dom'

export function NewCustomer() {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [address, setAddress] = useState('')
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      loadCustomer()
    }
  }, [id])

  async function loadCustomer() {
    setLoading(true)
    const docRef = doc(db, 'customers', id)

    await getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data()
          setName(data.fantasyName)
          setCnpj(data.cnpj)
          setAddress(data.address)
          setEdit(true)
        } else {
          toast.error('Cliente não encontrado!')
          navigate('/customers')
        }
      })
      .catch((error) => {
        console.error('Error getting document: ', error)
        toast.error('Erro ao carregar cliente!')
        navigate('/customers')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  async function handleRegister(e) {
    e.preventDefault()

    if (name !== '' && cnpj !== '' && address !== '') {
      setLoading(true)

      if (edit) {
        // Atualizar cliente existente
        const docRef = doc(db, 'customers', id)
        await updateDoc(docRef, {
          fantasyName: name,
          cnpj: cnpj,
          address: address
        })
          .then(() => {
            toast.success(`Cliente ${name} atualizado com sucesso!`)
            navigate('/customers')
          })
          .catch((error) => {
            console.error('Error updating document: ', error)
            toast.error('Erro ao atualizar cliente! Tente novamente.')
          })
          .finally(() => {
            setLoading(false)
          })
      } else {
        // Criar novo cliente
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
          .finally(() => {
            setLoading(false)
          })
      }
    } else {
      toast.error('Preencha todos os campos!')
    }
  }

  if (loading && id) {
    return (
      <>
        <Header />
        <div className="content">
          <TitleWithChildren name="Carregando..." icon={<FiUser size={25} />} />
          <div className="container">
            <span>Carregando dados do cliente...</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="content">
        <TitleWithChildren
          name={edit ? 'Editar Cliente' : 'Novo Cliente'}
          icon={<FiUser size={25} />}
        />

        <div className="container">
          <form className="formProfile" onSubmit={handleRegister}>
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

            <button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
