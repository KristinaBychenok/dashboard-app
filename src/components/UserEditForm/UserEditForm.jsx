import { useState } from 'react'
import { useSelector } from 'react-redux'

import Modal from '../UI/Modal'
import Card from '../UI/Card'

import classes from './UserEditForm.module.css'

const isNotEmpty = (value) => value.trim() !== ''
const isEmail = (value) => value.includes('@')

const UserEditForm = (props) => {
  const aditingItem = useSelector((state) =>
    state.users.users.find((item) => item.id === props.id)
  )
  const aditingItemIndex = useSelector((state) =>
    state.users.users.indexOf(aditingItem)
  )
  // Name
  const name = useSelector((state) => state.users.users[aditingItemIndex].name)
  const [enteredName, setEnteredName] = useState(name)
  const [isValidName, setIsValidName] = useState(true)

  const isInvalidNameInput = !isValidName

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value)
    setIsValidName(isNotEmpty(event.target.value))
  }

  // Email
  const email = useSelector(
    (state) => state.users.users[aditingItemIndex].email
  )
  const [enteredEmail, setEnteredEmail] = useState(email)
  const [isValidEmail, setIsValidEmail] = useState(true)

  const isInvalidEmailInput = !isValidEmail

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value)
    setIsValidEmail(
      isNotEmpty(event.target.value) && isEmail(event.target.value)
    )
  }

  // UserName
  const username = useSelector(
    (state) => state.users.users[aditingItemIndex].username
  )
  const [enteredUsername, setEnteredUsername] = useState(username || '')

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }

  // City
  const city = useSelector(
    (state) => state.users.users[aditingItemIndex].address.city
  )
  const [enteredCity, setEnteredCity] = useState(city || '')

  const cityChangeHandler = (event) => {
    setEnteredCity(event.target.value)
  }

  // Form
  const isValidForm = !isInvalidNameInput && !isInvalidEmailInput

  const submitFormHandler = (event) => {
    event.preventDefault()

    if (isValidForm) {
      const user = {
        name: enteredName,
        email: enteredEmail,
        username: enteredUsername,
        address: {
          city: enteredCity,
        },
      }

      props.onEditItem(user)
      props.onCancle()
    }
  }
  return (
    <Modal onClose={props.onCancle}>
      <Card>
        <form onSubmit={submitFormHandler}>
          <div className={classes.userForm_header}>
            <h2>Edit</h2>
          </div>
          <div className={classes.userForm_inputs}>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={enteredName}
              onChange={nameChangeHandler}
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
            ></input>
            {isInvalidEmailInput && (
              <p className={classes.error}>Please, enter valid email.</p>
            )}

            <label htmlFor="username">UserName</label>
            <input
              id="username"
              type="text"
              value={enteredUsername}
              onChange={usernameChangeHandler}
            ></input>

            <label htmlFor="city">City</label>
            <input
              id="city"
              type="text"
              value={enteredCity}
              onChange={cityChangeHandler}
            ></input>
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

export default UserEditForm
