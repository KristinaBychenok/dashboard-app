import classes from './UserItem.module.css'

const UserItem = (props) => {
  const { id, name, username, email } = props.userData
  const city = props.userData.address.city

  const editItemHandler = () => {
    props.onOpenEditForm(id)
  }

  const deleteItemHandler = () => {
    props.onDeleteUser(id)
  }

  return (
    <tbody>
      <tr className={classes.wraper}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{username}</td>
        <td>{email}</td>
        <td>{city}</td>
        <td>
          <button className={classes.edit_button} onClick={editItemHandler}>
            edit
          </button>
        </td>
        <td>
          <button className={classes.delete_button} onClick={deleteItemHandler}>
            delete
          </button>
        </td>
      </tr>
    </tbody>
  )
}

export default UserItem
