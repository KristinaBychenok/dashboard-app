import { useState } from 'react'

import Card from '../UI/Card'
import Modal from '../UI/Modal'

import classes from './UserForm.module.css'

const isNotEmpty = (value) => value.trim() !== ''
const isEmail = (value) => value.includes('@')

const UserForm = (props) => {
  // Name
  const [enteredName, setEnteredName] = useState('')
  const [isValidName, setIsValidName] = useState(false)
  const [isBlurName, setIsBlurName] = useState(false)

  const isInvalidNameInput = !isValidName && isBlurName

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value)
    setIsValidName(isNotEmpty(event.target.value))
  }
  const nameBlurHandler = () => {
    setIsBlurName(true)
  }

  // Email
  const [enteredEmail, setEnteredEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isBlurEmail, setIsBlurEmail] = useState(false)

  const isInvalidEmailInput = !isValidEmail && isBlurEmail

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
    setIsValidEmail(
      isNotEmpty(event.target.value) && isEmail(event.target.value)
    )
  }
  const emailBlurHandler = () => {
    setIsBlurEmail(true)
  }

  // Form
  const isValidForm =
    !isInvalidNameInput && isBlurName && !isInvalidEmailInput && isBlurEmail

  const submitFormHandler = (event) => {
    event.preventDefault()

    if (isValidForm) {
      const user = {
        name: enteredName,
        email: enteredEmail,
        username: '',
        address: {
          city: '',
        },
      }

      props.onAddUser(user)

      setEnteredName('')
      setEnteredEmail('')
      props.onCancle()
    }
  }

  return (
    <Modal onClose={props.onCancle}>
      <Card>
        <form onSubmit={submitFormHandler}>
          <div className={classes.userForm_header}>
            <h2>Form</h2>
          </div>
          <div className={classes.userForm_inputs}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
            ></input>
            {isInvalidNameInput && (
              <p className={classes.error}>Please, enter your name.</p>
            )}
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            ></input>
            {isInvalidEmailInput && (
              <p className={classes.error}>Please, enter valid email.</p>
            )}
          </div>
          <div className={classes.userForm_buttons}>
            <button
              type="button"
              className={classes.cancle}
              onClick={props.onCancle}
            >
              Cancle
            </button>
            <button className={classes.submit}>Submit</button>
          </div>
        </form>
      </Card>
    </Modal>
  )
}

export default UserForm
