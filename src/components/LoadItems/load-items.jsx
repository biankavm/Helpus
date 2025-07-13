import { Header, TitleWithChildren } from 'components'
import commonStyles from '../../shared/common-styles.module.scss'

export function LoadItems({ name, icon, text }) {
  return (
    <div>
      <Header />
      <div className={`content ${commonStyles.additionalStyle}`}>
        <TitleWithChildren name={name} icon={icon} />

        <div className={commonStyles.container}>
          <span> {text} </span>
        </div>
      </div>
    </div>
  )
}
