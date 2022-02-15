import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import classes from './UserList.module.css'

import UserItem from './UserItem'
import Card from '../UI/Card'
import { usersActions } from '../../store/users/users-slice'

const UserList = (props) => {
  const dispatch = useDispatch()
  const usersItems = useSelector((state) => state.users.users)
  const [sortOder, setSortOder] = useState('')

  const editUserDataHandler = (id) => {
    props.onOpenEditForm(id)
  }

  const deleteUserHandler = (id) => {
    props.onOpenDeleteMessage(id)
  }

  const sortHandler = () => {
    setSortOder(!sortOder)
    dispatch(usersActions.sortUsersInStore(sortOder))
  }

  return (
    <Card>
      <div className={classes.userList_header}>
        <h2>User List</h2>
        <button onClick={props.onOpenForm}>Add new</button>
      </div>
      <div className={classes.userList_table}>
        <table>
          <thead>
            <tr className={classes.table_head}>
              <th>Id</th>
              <th>Name</th>
              <th className={classes.sort} onClick={sortHandler}>
                UserName
                <img src="sort.png" alt="sort"></img>
              </th>
              <th>Email</th>
              <th>City</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          {usersItems.map((user) => (
            <UserItem
              key={user.id}
              userData={user}
              onOpenEditForm={editUserDataHandler}
              onDeleteUser={deleteUserHandler}
            />
          ))}
        </table>
      </div>
    </Card>
  )
}

export default UserList
