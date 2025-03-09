import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { Header, Title } from 'components'
import styles from './dashboard.module.scss'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export function Dashboard() {
  return (
    <>
      <Header />

      <div className={`${styles.content} ${styles.additionalStyle}`}>
        <Title name="Tickets">
          <FiMessageSquare size={25} />
        </Title>

        <>
          <Link to="/newticket" className={styles.newTicket}>
            <FiPlus color="fff" size={25} />
            Novo chamado
          </Link>
          {/* <div className={`${styles.container} ${styles.dashboard}`}>
            <h1> teste </h1>
          </div> */}

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
              <tr>
                <td data-label="Cliente"> Mercadinho da Esquina </td>
                <td data-label="Assunto"> Troca de freezer </td>
                <td data-label="Status"> Em aberto </td>
                <td data-label="Cadastrado em"> 25/02/2025</td>
                <td data-label="#">
                  <button style={{ backgroundColor: '#00BFFF' }}>
                    <FiSearch color="fff" size={17} className={styles.action} />
                  </button>
                  <button style={{ backgroundColor: '#FFD700' }}>
                    <FiEdit2 color="fff" size={17} className={styles.action} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      </div>
    </>
  )
}
