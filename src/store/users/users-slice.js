import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    replaceUsersStore(state, action) {
      state.users = action.payload
    },
    addUserToStore(state, action) {
      const newUser = action.payload
      state.users.push({
        id: state.users.length + 1,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        address: {
          city: newUser.address.city,
        },
      })
    },
    editUserInStore(state, action) {
      const editingUser = action.payload

      const editingUserItem = state.users.find(
        (item) => item.id === editingUser.id
      )
      const index = state.users.indexOf(editingUserItem)

      state.users[index] = {
        id: editingUser.id,
        name: editingUser.name,
        email: editingUser.email,
        username: editingUser.username,
        address: {
          city: editingUser.address.city,
        },
      }
    },
    deleteUserFromStore(state, action) {
      const itemId = action.payload

      state.users = state.users.filter((item) => item.id !== itemId)
    },
    sortUsersInStore(state, actions) {
      // const sortedUsers = actions.payload.map((item) => item)

      if (actions.payload) {
        state.users = state.users.sort((a, b) => {
          if (a.username > b.username) {
            return 1
          }
          if (a.username < b.username) {
            return -1
          }
          return 0
        })
      } else {
        state.users = state.users.sort((a, b) => {
          if (a.username < b.username) {
            return 1
          }
          if (a.username > b.username) {
            return -1
          }
          return 0
        })
      }
    },
  },
})

export const usersActions = usersSlice.actions

export default usersSlice
