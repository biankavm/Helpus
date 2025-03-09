import { Header, Title } from 'components'
import { FiPlusCircle } from 'react-icons/fi'
import '../general.css'
import styles from './newticket.module.scss'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from 'contexts'
import { db } from 'services/firebase-connection'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

export function NewTicket() {
  const { user } = useContext(AuthContext)
  const [customers, setCustomers] = useState([])

  const [complement, setComplement] = useState('')
  const [subject, setSubject] = useState('Suporte')
  const [status, setStatus] = useState('Aberto')
  const [loadCustomer, setLoadCustomer] = useState(true)
  const [customerSelected, setCustomerSelected] = useState(0)

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
            setCustomers([{ id: 1, nomeFantasia: 'Freela' }])
            setLoadCustomer(false)
            return
          }
          setCustomers(listCustomers)
          setLoadCustomer(false)
        })
        .catch((error) => {
          console.error('Error getting documents: ', error)
          setLoadCustomer(false)
          setCustomers([{ id: 1, nomeFantasia: 'Freela' }])
        })
    })()
  }, [])
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="formProfile">
            <label> Clientes </label>

            {loadCustomer ? (
              <input
                type="text"
                disabled={true}
                value="Carregando clientes..."
              />
            ) : (
              <select value={customerSelected} onChange={handleCustomerChange}>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.fantasyName}>
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
