import { useContext } from 'react'
import UserContext from '../utils/userContext'
const Footer = () => {
  const { user } = useContext(UserContext)
  return (
    <h4 className="p-6 m-5 ml-0 mr-0 bg-slate-400">
      This site is developed by - Aadarsh Kumar Jha
    </h4>
  )
}

export default Footer
