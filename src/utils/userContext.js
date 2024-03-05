import { createContext } from 'react'

const UserContext = createContext({
  user: {
    name: 'Dummy name',
    login: 'dummy@gmail.com',
  },
})

UserContext.displayName = 'UserContext'

export default UserContext
