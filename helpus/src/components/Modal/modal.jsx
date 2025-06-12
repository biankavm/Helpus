import styles from './modal.module.scss'
import { FiX } from 'react-icons/fi'

export function Modal({ content, onClose }) {
  function handleColorStatus(status) {
    if (status === 'Aberto') return [styles.badgeAberto]
    if (status === 'Em progresso') return [styles.badgeProgresso]
    if (status === 'Atendido') return [styles.badgeAtendido]
  }

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
              Cliente: <i>{content.client}</i>
            </span>
          </div>

          <div className={styles.modalRow}>
            <span>
              {' '}
              Assunto: <i>{content.subject}</i>
            </span>

            <span>
              {' '}
              Cadastrado em: <i>{content.created}</i>
            </span>
          </div>

          <div className={styles.modalRow}>
            <span>
              {' '}
              Status:{' '}
              <i className={handleColorStatus(content.status)}>
                {content.status}
              </i>
            </span>
          </div>

          {content.complement && (
            <>
              <h3> Complemento </h3>
              <p>{content.complement}</p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
