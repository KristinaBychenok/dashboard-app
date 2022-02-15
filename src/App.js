import Dashboard from './components'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

import { fetchUsersData } from './store/users/users-actions'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsersData())
  }, [dispatch])

  return <Dashboard />
}

export default App
