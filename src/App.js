import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import NxtwatchContext from './context/NxtwatchContext'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import './App.css'

class App extends Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
    isHomeButtonActive: false,
    isTrendingButtonActive: false,
    isGamingButtonActive: false,
    isSaveButtonActive: false,
    saved: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  onClickHome = () => {
    this.setState(prevState => ({
      isHomeButtonActive: !prevState.isHomeButtonActive,
    }))
    this.setState({
      isTrendingButtonActive: false,
      isGamingButtonActive: false,
      isSaveButtonActive: false,
    })
  }

  onClickSave = () => {
    this.setState(prevState => ({
      isSaveButtonActive: !prevState.isSaveButtonActive,
    }))
    this.setState({
      isTrendingButtonActive: false,
      isGamingButtonActive: false,
      isHomeButtonActive: false,
    })
  }

  onClickTrending = () => {
    this.setState(prevState => ({
      isTrendingButtonActive: !prevState.isTrendingButtonActive,
    }))
    this.setState({
      isHomeButtonActive: false,
      isGamingButtonActive: false,
      isSaveButtonActive: false,
    })
  }

  onClickGaming = () => {
    this.setState(prevState => ({
      isGamingButtonActive: !prevState.isGamingButtonActive,
    }))
    this.setState({
      isHomeButtonActive: false,
      isTrendingButtonActive: false,
      isSaveButtonActive: false,
    })
  }

  saveVideoItem = videoItemDetails => {
    const {savedVideosList} = this.state

    const videoObject = savedVideosList.find(
      eachItem => eachItem.id === videoItemDetails.id,
    )
    if (videoObject) {
      this.setState({saved: true})
    } else {
      const updatedVideosList = [...savedVideosList, videoItemDetails]
      this.setState({savedVideosList: updatedVideosList})
      this.setState(prevState => ({saved: !prevState.saved}))
    }
  }

  render() {
    const {
      isDarkTheme,
      isHomeButtonActive,
      isTrendingButtonActive,
      isGamingButtonActive,
      isSaveButtonActive,
      savedVideosList,
      saved,
    } = this.state
    return (
      <NxtwatchContext.Provider
        value={{
          isDarkTheme,
          isHomeButtonActive,
          isTrendingButtonActive,
          isGamingButtonActive,
          isSaveButtonActive,
          onClickSave: this.onClickSave,
          onClickHome: this.onClickHome,
          onClickTrending: this.onClickTrending,
          onClickGaming: this.onClickGaming,
          toggleTheme: this.toggleTheme,
          saveVideoItem: this.saveVideoItem,
          savedVideosList,
          saved,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
