import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import commonStyles from '../../shared/common-styles.module.scss'

export function AddButton({ to, text }) {
  return (
    <Link to={to} className={commonStyles.newTicket}>
      <FiPlus color="fff" size={25} />
      {text}
    </Link>
  )
}
