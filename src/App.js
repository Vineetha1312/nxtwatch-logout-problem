import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import NxtwatchContext from './context/NxtwatchContext'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {isDarkTheme: false}

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  render() {
    const {isDarkTheme} = this.state
    return (
      <NxtwatchContext.Provider
        value={{isDarkTheme, toggleTheme: this.toggleTheme}}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
