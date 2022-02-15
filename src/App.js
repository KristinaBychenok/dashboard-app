import Dashboard from './components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchUsersData } from './store/users/users-actions'

function App() {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.users)

  useEffect(() => {
    dispatch(fetchUsersData())
  }, [dispatch])

  return <Dashboard />
}

export default App
