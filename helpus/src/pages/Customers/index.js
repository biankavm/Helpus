import { Header, TitleWithChildren } from '../../components'
import { FiUser } from 'react-icons/fi'
import commonStyles from '../../shared/common-styles.module.scss'
import { useState, useEffect } from 'react'
import { LoadItems, AddButton } from '../../components'
import { Link } from 'react-router-dom'
import { FiEdit2, FiTrash } from 'react-icons/fi'
import { db } from '../../services/firebase-connection'
import {
  collection,
  query,
  getDocs,
  orderBy,
  limit,
  startAfter
} from 'firebase/firestore'

const listRef = collection(db, 'customers')

export function Customers() {
  const [loadCustomers, setLoadCustomers] = useState(true)
  const [customers, setCustomers] = useState([])
  const [isEmpty, setIsEmpty] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [lastCustomer, setLastCustomer] = useState()

  useEffect(() => {
    async function loadCustomers() {
      const q = query(listRef, orderBy('fantasyName', 'desc'), limit(5))
      const querySnapshot = await getDocs(q)
      setCustomers([])
      await updateState(querySnapshot)
      setLoadCustomers(false)
    }

    loadCustomers()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function updateState(querySnapshot) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (isCollectionEmpty) setIsEmpty(true)

    let listCustomers = []
    querySnapshot.forEach((doc) => {
      listCustomers.push({
        id: doc.id,
        fantasyName: doc.data().fantasyName,
        cnpj: doc.data().cnpj,
        address: doc.data().address
      })
    })

    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]

    setCustomers((actualCustomers) => [...actualCustomers, ...listCustomers])
    setLastCustomer(lastDoc)
    setLoadingMore(false)
  }

  async function handleLoadMore() {
    setLoadingMore(true)
    const q = query(
      listRef,
      orderBy('fantasyName', 'desc'),
      startAfter(lastCustomer),
      limit(5)
    )

    const querySnapshot = await getDocs(q)
    await updateState(querySnapshot)
  }

  if (loadCustomers) {
    return (
      <LoadItems
        name="Clientes"
        icon={<FiUser size={25} />}
        text="Buscando clientes..."
      />
    )
  }

  function handleDeleteCustomer(id) {
    console.log(id)
  }

  return (
    <>
      <Header />
      <div className={`content ${commonStyles.additionalStyle}`}>
        <TitleWithChildren name="Clientes" icon={<FiUser size={25} />} />

        <>
          {customers.length === 0 ? (
            <div className={commonStyles.container}>
              <span> Nenhum cliente encontrado.</span>
              <AddButton to="/newcustomer" text="Novo cliente" />
            </div>
          ) : (
            <>
              <AddButton to="/newcustomer" text="Novo cliente" />

              <table>
                <thead>
                  <tr>
                    <th scope="col"> Nome Fantasia </th>
                    <th scope="col"> CNPJ </th>
                    <th scope="col"> Endereço </th>
                    <th scope="col"></th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Nome Fantasia">
                          {customer.fantasyName}
                        </td>
                        <td data-label="CNPJ"> {customer.cnpj} </td>
                        <td data-label="Endereço"> {customer.address} </td>

                        <td>
                          <Link
                            to={`/newcustomer/${customer.id}`}
                            style={{ backgroundColor: '#F4B183' }}
                            className={commonStyles.action}
                          >
                            <FiEdit2 size={17} />
                          </Link>

                          <button
                            style={{ backgroundColor: '#fa7f72' }}
                            className={commonStyles.action}
                            onClick={() => handleDeleteCustomer(customer.id)}
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
                <h3 className={commonStyles.loadingMore}>
                  Buscando mais clientes...
                </h3>
              )}
              {!loadingMore && !isEmpty && (
                <button
                  className={commonStyles.buttonMore}
                  onClick={handleLoadMore}
                >
                  Mostrar mais
                </button>
              )}
            </>
          )}
        </>
      </div>
    </>
  )
}
