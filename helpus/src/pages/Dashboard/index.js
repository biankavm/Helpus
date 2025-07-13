import { Header, LoadItems, Modal, AddButton } from 'components'
import styles from './dashboard.module.scss'
import { FiMessageSquare, FiSearch, FiEdit2, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import {
  collection,
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { db } from '../../services/firebase-connection'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import '../general.css'
import { handleColorStatus } from '../../shared'
import commonStyles from '../../shared/common-styles.module.scss'
import { TitleWithChildren } from '../../components'
const listRef = collection(db, 'tickets')

export function Dashboard() {
  const [tickets, setTickets] = useState([])
  const [loadTickets, setLoadTickets] = useState(true)
  const [isEmpty, setIsEmpty] = useState(false)
  const [lastDoc, setLastDoc] = useState()
  const [loadingMore, setLoadingMore] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)

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
      setTickets([])
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

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

    setTickets((tickets) => [...tickets, ...listTickets])
    setLastDoc(lastDoc)
    setLoadingMore(false)
  }

  async function handleLoadMore() {
    setLoadingMore(true)
    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDoc),
      limit(5)
    ) // o startAfter pega o último documento da lista e pula para o próximo

    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
    // setLoadingMore(false)
  }

  if (loadTickets) {
    return (
      <LoadItems
        name="Chamados"
        icon={<FiMessageSquare size={25} />}
        text="Buscando chamados..."
      />
      // <div>
      //   <Header />
      //   <div className={`content ${styles.additionalStyle}`}>
      //     <TitleWithChildren
      //       name="Chamados"
      //       icon={<FiMessageSquare size={25} />}
      //     />

      //     <div className={styles.container}>
      //       <span> Buscando chamados...</span>
      //     </div>
      //   </div>
      // </div>
    )
  }

  function handleOpenModal(ticket) {
    setModalOpen(true)
    setSelectedTicket(ticket)
  }

  async function handleDeleteTicket(id) {
    const docRef = doc(db, 'tickets', id)
    const docSnapshot = await getDoc(docRef)

    if (docSnapshot.exists()) {
      const confirm = window.confirm(
        'Tem certeza que deseja deletar este chamado?'
      )

      console.log(confirm)

      if (confirm) {
        await deleteDoc(docRef)
          .then(() => {
            toast.success('Chamado deletado com sucesso!')
            setTickets(tickets.filter((ticket) => ticket.id !== id))
          })
          .catch(() => {
            toast.error('Erro ao deletar chamado. Tente novamente!')
          })
      }
    }
  }

  return (
    <>
      <Header />

      <div className={`content ${styles.additionalStyle}`}>
        <TitleWithChildren
          name="Chamados"
          icon={<FiMessageSquare size={25} />}
        />

        <>
          {tickets.length === 0 ? (
            <div className={styles.container}>
              <span> Nenhum chamado encontrado.</span>
              <AddButton to="/newticket" text="Novo chamado" />
            </div>
          ) : (
            <>
              <AddButton to="/newticket" text="Novo chamado" />

              <table>
                <thead>
                  <tr>
                    <th scope="col"> Cliente </th>
                    <th scope="col"> Assunto </th>
                    <th scope="col"> Status </th>
                    <th scope="col"> Cadastrado em </th>
                    <th scope="col"></th>
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
                            className={`${
                              commonStyles.badge
                            } ${handleColorStatus(
                              ticket.status,
                              commonStyles
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado em">
                          {' '}
                          {ticket.createdFormatted}{' '}
                        </td>
                        <td>
                          <button
                            style={{ backgroundColor: '#86B89D' }}
                            className={commonStyles.action}
                            onClick={() => handleOpenModal(ticket)}
                          >
                            <FiSearch size={17} />
                          </button>
                          <Link
                            to={`/newticket/${ticket.id}`}
                            style={{ backgroundColor: '#F4B183' }}
                            className={commonStyles.action}
                          >
                            <FiEdit2 size={17} />
                          </Link>

                          <button
                            style={{ backgroundColor: '#fa7f72' }}
                            className={commonStyles.action}
                            onClick={() => handleDeleteTicket(ticket.id)}
                          >
                            <FiTrash size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && (
                <h3 className={styles.loadingMore}>
                  {' '}
                  Buscando mais chamados...
                </h3>
              )}
              {!loadingMore && !isEmpty && (
                <button className={styles.buttonMore} onClick={handleLoadMore}>
                  {' '}
                  Mostrar mais{' '}
                </button>
              )}
            </>
          )}
        </>
        {modalOpen && (
          <Modal content={selectedTicket} onClose={() => setModalOpen(false)} />
        )}
      </div>
    </>
  )
}
