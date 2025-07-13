import styles from './title.module.scss'
import { FiMessageSquare } from 'react-icons/fi'
export function Title({ children, name }) {
  return (
    <div className={styles.title}>
      {children}
      <span> {name} </span>
    </div>
  )
}

export function TitleWithChildren({ name, icon }) {
  return <Title name={name}>{icon && icon}</Title>
}
