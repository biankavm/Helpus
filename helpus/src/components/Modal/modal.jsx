import styles from './modal.module.scss'
import { FiX, FiUser, FiFileText, FiCalendar, FiCircle } from 'react-icons/fi'
import { handleColorStatus } from '../../shared'
import commonStyles from '../../shared/common-styles.module.scss'

export function Modal({ content, onClose }) {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        className={styles.modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalContainerClose} onClick={onClose}>
          <FiX size={20} color="#fff" />
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className={styles.modalInfoCard}>
            <div className={styles.modalRow}>
              <div className={`${styles.modalIcon} ${styles.client}`}>
                <FiUser />
              </div>
              <div>
                <span className={styles.modalLabel}>Cliente</span>
                <div className={styles.modalValue}>{content.client}</div>
              </div>
            </div>

            <div className={styles.modalRow}>
              <div className={`${styles.modalIcon} ${styles.subject}`}>
                <FiFileText />
              </div>
              <div>
                <span className={styles.modalLabel}>Assunto</span>
                <div className={styles.modalValue}>{content.subject}</div>
              </div>
            </div>

            <div className={styles.modalRow}>
              <div className={`${styles.modalIcon} ${styles.date}`}>
                <FiCalendar />
              </div>
              <div>
                <span className={styles.modalLabel}>Cadastrado em</span>
                <div className={styles.modalValue}>
                  {content.createdFormatted}
                </div>
              </div>
            </div>

            <div className={styles.modalRow}>
              <div className={`${styles.modalIcon} ${styles.status}`}>
                <FiCircle />
              </div>
              <div>
                <span className={styles.modalLabel}>Status</span>
                <div
                  className={`${styles.modalValue} ${
                    styles.status
                  } ${handleColorStatus(content.status, commonStyles)}`}
                >
                  {content.status}
                </div>
              </div>
            </div>
          </div>

          {content.complement && (
            <div className={styles.modalComplement}>
              <h3>Complemento</h3>
              <p>{content.complement}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
