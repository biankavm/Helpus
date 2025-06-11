import { Header, Title } from 'components'
import styles from './dashboard.module.scss'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter
} from 'firebase/firestore'

import { db } from '../../services/firebase-connection'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import '../general.css'

const listRef = collection(db, 'tickets')

export function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [loadTickets, setLoadTickets] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)

  function formatDate(date) {
    const dateObject = new Date(date)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()
    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    async function loadTickets() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5)) // passa a lista de tickets, ordena por data de criação e limita a 5

      const querySnapshot = await getDocs(q)
      await updateState(querySnapshot)
      setLoadTickets(false)
    }

    loadTickets()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (isCollectionEmpty) setIsEmpty(true)

    let listTickets = []
    querySnapshot.forEach((doc) => {
      listTickets.push({
        id: doc.id,
        client: doc.data().client,
        subject: doc.data().subject,
        status: doc.data().status,
        created: formatDate(doc.data().created),
        createdFormatted: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
        complement: doc.data().complement
      })
    })

    setTickets(listTickets)
  }

  if (loadTickets) {
    return (
      <div>
        <Header />
        <div className={`content ${styles.additionalStyle}`}>
          <TitleWithChildren />

          <div className={styles.container}>
            <span> Buscando chamados...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />

      <div className={`content ${styles.additionalStyle}`}>
        <TitleWithChildren />

        <>
          {tickets.length === 0 ? (
            <div className={styles.container}>
              <span> Nenhum chamado encontrado.</span>
              <ButtonNewTicket />
            </div>
          ) : (
            <>
              <ButtonNewTicket />

              <table>
                <thead>
                  <tr>
                    <th scope="col"> Cliente </th>
                    <th scope="col"> Assunto </th>
                    <th scope="col"> Status </th>
                    <th scope="col"> Cadastrado em </th>
                    <th scope="col"> # </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente"> {ticket.client} </td>
                        <td data-label="Assunto"> {ticket.subject} </td>
                        <td data-label="Status">
                          <span
                            className={styles.badge}
                            style={{ backgroundColor: '#999' }}
                          >
                            {ticket.subject}
                          </span>
                        </td>
                        <td data-label="Cadastrado em">
                          {' '}
                          {ticket.createdFormatted}{' '}
                        </td>
                        <td data-label="#">
                          <button
                            style={{ backgroundColor: '#86B89D' }}
                            className={styles.action}
                          >
                            <FiSearch size={17} />
                          </button>
                          <button
                            style={{ backgroundColor: '#F4B183' }}
                            className={styles.action}
                          >
                            <FiEdit2 size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </>
          )}
        </>
      </div>
    </>
  )
}

function ButtonNewTicket() {
  return (
    <Link to="/newticket" className={styles.newTicket}>
      <FiPlus color="fff" size={25} />
      Novo chamado
    </Link>
  )
}

function TitleWithChildren() {
  return (
    <Title name="Tickets">
      <FiMessageSquare size={25} />
    </Title>
  )
}
