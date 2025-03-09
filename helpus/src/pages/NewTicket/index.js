import { Header, Title } from 'components'
import { FiPlusCircle } from 'react-icons/fi'
import '../general.css'

export function NewTicket() {
  return (
    <>
      <Header />
      <div className="content">
        <Title name="Novo Chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="formProfile"></form>
        </div>
      </div>
    </>
  )
}
