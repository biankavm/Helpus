import styles from './modal.module.scss'
import { FiX } from 'react-icons/fi'

export function Modal({ selectedTicket, onClose }) {
  console.log(selectedTicket)
  return (
    <div className={styles.modal}>
      <div className={styles.modalContainer}>
        <button className={styles.modalContainerClose} onClick={onClose}>
          <FiX size={25} color="#fff" />
        </button>

        <main>
          <h2> Detalhes do chamado</h2>
          <div className={styles.modalRow}>
            <span>
              {' '}
              Cliente: <i>Fulano</i>
            </span>
          </div>

          <div className={styles.modalRow}>
            <span>
              {' '}
              Assunto: <i>Blablablu</i>
            </span>

            <span>
              {' '}
              Cadastrado em: <i>Blablablu</i>
            </span>
          </div>

          <div className={styles.modalRow}>
            <span>
              {' '}
              Status: <i>Blablablu</i>
            </span>
          </div>

          <h3> Complemento </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </main>
      </div>
    </div>
  )
}
