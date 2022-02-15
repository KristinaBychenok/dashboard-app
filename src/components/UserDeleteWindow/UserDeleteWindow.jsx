import Modal from '../UI/Modal'
import Card from '../UI/Card'

import classes from './UserDeleteWindow.module.css'

const UserDeleteWindow = (props) => {
  return (
    <Modal onClose={props.onCancle}>
      <Card>
        <div className={classes.deleteForm_header}>
          <h2>Delete</h2>
        </div>
        <div className={classes.deleteForm_message}>
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div className={classes.deleteForm_buttons}>
          <button
            type="button"
            className={classes.cancle}
            onClick={props.onCancle}
          >
            Cancle
          </button>
          <button className={classes.delete} onClick={props.onDeleteUser}>
            Delete
          </button>
        </div>
      </Card>
    </Modal>
  )
}

export default UserDeleteWindow
