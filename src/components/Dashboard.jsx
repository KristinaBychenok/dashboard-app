import { useState } from 'react'
import { useDispatch } from 'react-redux'

import UserList from './UserList'
import UserForm from './UserForm'
import UserEditForm from './UserEditForm'
import UserDeleteWindow from './UserDeleteWindow'
import {
  deleteUser,
  editUserData,
  sendUserData,
} from '../store/users/users-actions'

import './Dashboard.module.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const [addingNewUser, setAddingNewUser] = useState(false)

  const [editingUser, setEditingUser] = useState(false)
  const [editingUserId, setEditingUserId] = useState('')

  const [deletingUser, setDeletingUser] = useState(false)
  const [deletingUserId, setDeletingUserId] = useState('')

  const openFormHandler = (id) => {
    setAddingNewUser(true)
  }

  const openEditFormHandler = (id) => {
    setEditingUser(true)
    setEditingUserId(id)
  }

  const cancleFormHandler = () => {
    setAddingNewUser(false)
    setEditingUser(false)
    setDeletingUser(false)
  }

  const addNewUserHandler = (user) => {
    dispatch(sendUserData(user))
  }

  const editItemHandler = (user) => {
    dispatch(editUserData(editingUserId, user))
  }

  const openDeleteMessageHandler = (id) => {
    setDeletingUser(true)
    setDeletingUserId(id)
  }

  const deleteUserHandler = () => {
    dispatch(deleteUser(deletingUserId))
    setDeletingUser(false)
  }

  return (
    <div>
      <header>
        <h1>Dashboard</h1>
      </header>
      <UserList
        onOpenForm={openFormHandler}
        onOpenEditForm={openEditFormHandler}
        onOpenDeleteMessage={openDeleteMessageHandler}
      />
      {addingNewUser && (
        <UserForm onCancle={cancleFormHandler} onAddUser={addNewUserHandler} />
      )}
      {editingUser && (
        <UserEditForm
          id={editingUserId}
          onCancle={cancleFormHandler}
          onEditItem={editItemHandler}
        />
      )}
      {deletingUser && (
        <UserDeleteWindow
          onCancle={cancleFormHandler}
          onDeleteUser={deleteUserHandler}
        />
      )}
    </div>
  )
}

export default Dashboard
