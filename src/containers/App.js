import React from 'react'
import {inject, observer} from 'mobx-react'
import api from '../api'
import styles from './App.css'

function submit (event, store) {
  const {value} = event.target.querySelector('input')

  event.preventDefault()

  if (!value) {
    return
  }

  store.checkAddingAbility(value)

  if (!store.error) {
    api(`users/${value}`).then(store.addUser)
  }
}

function App ({store}) {
  return (
    <div className={store.fetching ? styles.fetching : styles.normal}>
      <form onSubmit={event => submit(event, store)}>
        <input
          type='text'
          placeholder='Type github username...'
          tabIndex='0'
          autoFocus />
        <button type='submit'>Add</button>
      </form>
      {store.error &&
        <p className={styles.error}>
          {store.error}&nbsp;
          <button
            type='button'
            onClick={() => store.handleError('')}>
            Close
          </button>
        </p>
      }
      {store.users.map(user => (
        <p key={user.login}>
          <a href={user.url}>{user.name}</a>&nbsp;
          <small>{user.login}</small>&nbsp;
          <button onClick={() => store.deleteUser(user)}>
            Delete
          </button>
        </p>
      ))}
    </div>
  )
}

export default inject('store')(
  observer(App)
)
