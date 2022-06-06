import React from 'react'

const GlobalContext = React.createContext({
  userToken: '',
  update: (data) => {},
})

export default GlobalContext
