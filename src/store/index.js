import {types} from 'mobx-state-tree'

const User = types.model({
  login: types.string,
  url: types.string,
  name: types.string
})

const Store = types
  .model({
    error: types.string,
    fetching: types.boolean,
    users: types.array(User)
  })
  .actions(self => {
    function checkAddingAbility (login) {
      const exists = self.users.find(user => user.login === login)

      if (exists) {
        self.error = `${login} already exists`
        return
      }

      self.error = ''
      self.fetching = true
    }

    function addUser ({login, name, html_url: url}) {
      self.fetching = false
      self.users.push({login, name, url})
    }

    function deleteUser (user) {
      self.users.splice(self.users.indexOf(user), 1)
    }

    function handleError (error) {
      self.error = error
    }

    return {
      addUser,
      deleteUser,
      handleError,
      checkAddingAbility
    }
  })

export default Store
