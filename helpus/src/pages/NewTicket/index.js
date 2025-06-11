import { Header, Title } from 'components'
import { FiPlusCircle } from 'react-icons/fi'
import '../general.css'
import styles from './newticket.module.scss'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'contexts'
import { db } from 'services/firebase-connection'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export function NewTicket() {
  const { user } = useContext(AuthContext)
  const [customers, setCustomers] = useState([])

  const [complement, setComplement] = useState('')
  const [subject, setSubject] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState('')
  const [edit, setEdit] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()
  const listRef = collection(db, 'customers')

  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  function handleSelectChange(e) {
    setSubject(e.target.value)
  }

  function handleCustomerChange(e) {
    setCustomerSelected(e.target.value)
  }

  useEffect(() => {
    ;(async () => {
      await getDocs(listRef)
        .then((snapshot) => {
          let listCustomers = []
          snapshot.forEach((doc) => {
            listCustomers.push({
              id: doc.id,
              fantasyName: doc.data().fantasyName
            })
          })
          if (listCustomers.length === 0) {
            console.log('No matching documents.')
            setCustomers([{ id: '1', fantasyName: 'Freela' }])
            setLoadCustomer(false)
            return
          }
          setCustomers(listCustomers)
          setLoadCustomer(false)

          if (id) loadId()
        })
        .catch((error) => {
          console.error('Error getting documents: ', error)
          setLoadCustomer(false)
          setCustomers([{ id: '1', fantasyName: 'Freela' }])
        })
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function loadId() {
    const docRef = doc(db, 'tickets', id)
    await getDoc(docRef)
      .then((snapshot) => {
        setSubject(snapshot.data().subject)
        setComplement(snapshot.data().complement)
        setStatus(snapshot.data().status)
        setCustomerSelected(snapshot.data().clientId)

        setEdit(true)
      })
      .catch((error) => {
        console.log(error)
        setEdit(false)
      })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (edit) {
      const docRef = doc(db, 'tickets', id)
      await updateDoc(docRef, {
        subject: subject,
        complement: complement,
        status: status,
        clientId: customerSelected
      })
        .then(() => {
          toast.success('Chamado atualizado!')
          setComplement('')
          setCustomerSelected('')
          navigate('/dashboard')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Ops! Erro ao atualizar. Tente novamente!')
        })
      return
    }

    const selectedCustomer = customers.find(
      (customer) => customer.id === customerSelected
    )

    if (!selectedCustomer) {
      toast.error('Selecione um cliente!')
      return
    }

    await addDoc(collection(db, 'tickets'), {
      created: new Date(),
      client: selectedCustomer.fantasyName,
      clientId: selectedCustomer.id,
      userId: user.uid,
      subject: subject,
      complement: complement,
      status: status
    })
      .then(() => {
        toast.success('Chamado registrado!')
        setComplement('')
        setCustomerSelected('')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Ops! Erro ao registrar. Tente novamente!')
      })
  }

  return (
    <>
      <Header />
      <div className="content">
        <Title name={id ? 'Editar Chamado' : 'Novo Chamado'}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="formProfile" onSubmit={handleSubmit}>
            <label> Clientes </label>

            {loadCustomer ? (
              <input
                type="text"
                disabled={true}
                value="Carregando clientes..."
              />
            ) : (
              <select value={customerSelected} onChange={handleCustomerChange}>
                <option value="">Selecione um cliente</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.fantasyName}
                    </option>
                  )
                })}
              </select>
            )}

            <label> Assunto </label>
            <select value={subject} onChange={handleSelectChange}>
              <option value="Suporte"> Suporte </option>
              <option value="Visita Técnica"> Visita Técnica </option>
              <option value="Financeiro"> Financeiro </option>
            </select>

            <label> Status </label>
            <div className={styles.status}>
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === 'Aberto'}
              />
              <span> Aberto </span>

              <input
                type="radio"
                name="radio"
                value="Em progresso"
                onChange={handleOptionChange}
                checked={status === 'Em progresso'}
              />
              <span> Em progresso </span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === 'Atendido'}
              />
              <span> Atendido </span>
            </div>

            <label> Complemento </label>
            <textarea
              typeof="text"
              placeholder="Descreva seu problema (opcional)"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            <button> Registrar </button>
          </form>
        </div>
      </div>
    </>
  )
}
