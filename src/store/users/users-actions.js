import { usersActions } from './users-slice'

export const fetchUsersData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://my-json-server.typicode.com/KristinaBychenok/Dashboard/users'
      )

      if (!response.ok) {
        throw new Error('Could not fetch users data!')
      }

      const data = await response.json()

      return data
    }

    try {
      const usersData = await fetchData()
      dispatch(usersActions.replaceUsersStore(usersData))
    } catch (err) {
      console.log('Could not fetch users data!')
    }
  }
}

export const sendUserData = (user) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        'https://my-json-server.typicode.com/KristinaBychenok/Dashboard/users',
        {
          method: 'POST',
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            username: user.username,
            address: {
              city: user.address.city,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )

      if (!response.ok) {
        throw new Error('Sending users data failed.')
      }

      const data = await response.json()

      return data
    }

    try {
      const newUser = await sendRequest()
      dispatch(usersActions.addUserToStore(newUser))
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const editUserData = (itemId, user) => {
  return async (dispatch) => {
    const sendEditingRequest = async () => {
      await fetch(
        'https://my-json-server.typicode.com/KristinaBychenok/Dashboard/users',
        {
          method: 'PUT',
          body: JSON.stringify({
            id: itemId,
            name: user.name,
            email: user.email,
            username: user.username,
            address: {
              city: user.address.city,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      )
    }

    try {
      const editedUser = {
        id: itemId,
        name: user.name,
        email: user.email,
        username: user.username,
        address: {
          city: user.address.city,
        },
      }
      dispatch(usersActions.editUserInStore(editedUser))
      await sendEditingRequest()
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const deleteUser = (itemId) => {
  return async (dispatch) => {
    const sendDeletingRequest = async () => {
      await fetch(
        `https://my-json-server.typicode.com/KristinaBychenok/Dashboard/users/${itemId}`,
        {
          method: 'DELETE',
        }
      )
    }

    try {
      dispatch(usersActions.deleteUserFromStore(itemId))
      await sendDeletingRequest()
    } catch (err) {
      console.log(err.message)
    }
  }
}
