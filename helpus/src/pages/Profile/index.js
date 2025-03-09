import { Header, Title } from 'components'
import styles from './profile.module.scss'
import { FiSettings } from 'react-icons/fi'

export function Profile() {
  return (
    <>
      <Header />
      <div className={styles.content}>
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>
      </div>
    </>
  )
}
