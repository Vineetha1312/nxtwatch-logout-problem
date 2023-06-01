import React from 'react'

const NxtwatchContext = React.createContext({
  isDarkTheme: false,
  toggleTheme: () => {},
  savedVideosList: [],
  saveVideoItem: () => {},
  removeVideoItem: () => {},
  isHomeButtonActive: false,
  isTrendingButtonActive: false,
  isGamingButtonActive: false,
  isSaveButtonActive: false,
  onClickHome: () => {},
  onClickGaming: () => {},
  onClickTrending: () => {},
  onClickSave: () => {},
  saved: false,
})

export default NxtwatchContext
