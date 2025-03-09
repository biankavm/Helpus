import styles from './title.module.scss'

export function Title({ children, name }) {
  return (
    <div className={styles.title}>
      {children}
      <span> {name} </span>
    </div>
  )
}
