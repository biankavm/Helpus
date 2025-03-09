import { useContext } from 'react'
import { AuthContext } from 'contexts'
import { Header, Title } from 'components'
import styles from './dashboard.module.scss'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import '../general.css'
export function Dashboard() {
  return (
    <>
      <Header />

      <div className={`content ${styles.additionalStyle}`}>
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
                <td data-label="Status">
                  <span
                    className={styles.badge}
                    style={{ backgroundColor: '#999' }}
                  >
                    Em aberto
                  </span>
                </td>
                <td data-label="Cadastrado em"> 25/02/2025</td>
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

              <tr>
                <td data-label="Cliente"> MiniJusao </td>
                <td data-label="Assunto"> Troca de freezer </td>
                <td data-label="Status">
                  <span
                    className={styles.badge}
                    style={{ backgroundColor: '#999' }}
                  >
                    Em aberto
                  </span>
                </td>
                <td data-label="Cadastrado em"> 25/02/2025</td>
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
            </tbody>
          </table>
        </>
      </div>
    </>
  )
}
