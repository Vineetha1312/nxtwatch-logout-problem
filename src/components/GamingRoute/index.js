import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'
import GamingVideoItem from '../GamingVideoItem'
import MenuItems from '../MenuItems'
import Header from '../Header'
import {
  GameContainer,
  GameTopContainer,
  GameLogoContainer,
} from './styledComponent'

const gameApiStatus = {
  initial: 'INITIAL',
  isProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {gamingVideosList: [], gameApi: gameApiStatus.initial}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({gameApi: gameApiStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const gamingApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(gamingApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedGamingList = data.videos.map(eachItem => ({
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        gamingVideosList: updatedGamingList,
        gameApi: gameApiStatus.success,
      })
    } else {
      this.setState({gameApi: gameApiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getGamingVideos()
  }

  render() {
    const {gamingVideosList} = this.state
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const gamingHeading = isDarkTheme
            ? 'gaming-heading-dark'
            : 'gaming-heading-light'
          const gamingBgClass = isDarkTheme
            ? 'gaming-container-dark'
            : 'gaming-container-light'
          const failureView = () => {
            const failureImage = isDarkTheme
              ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
            const headingClass = isDarkTheme
              ? 'oops-heading-dark'
              : 'oops-heading-light'

            return (
              <div className="failure-section">
                <img
                  src={failureImage}
                  alt="failure view"
                  className="failure-image"
                />
                <h1 className={headingClass}>Oops! Something Went Wrong</h1>
                <p className="oops-text">
                  We are having some trouble to complete your request.
                </p>
                <p className="oops-text">Please try again.</p>
                <button
                  className="game-retry-button"
                  type="button"
                  onClick={this.onClickRetry}
                >
                  Retry
                </button>
              </div>
            )
          }

          const renderGameItemsList = () => (
            <div className="game-route">
              <GameTopContainer outline={isDarkTheme}>
                <GameLogoContainer outline={isDarkTheme}>
                  <SiYoutubegaming color="#ff0000" size={25} />
                </GameLogoContainer>
                <h1 className={gamingHeading}>Gaming</h1>
              </GameTopContainer>
              <ul className={gamingBgClass}>
                {gamingVideosList.map(eachItem => (
                  <GamingVideoItem
                    key={eachItem.id}
                    gamingVideoDetails={eachItem}
                  />
                ))}
              </ul>
            </div>
          )

          const renderGameRoute = () => {
            const {gameApi} = this.state

            switch (gameApi) {
              case gameApiStatus.success:
                return renderGameItemsList()
              case gameApiStatus.failure:
                return failureView()
              case gameApiStatus.inProgress:
                return this.renderLoader()
              default:
                return null
            }
          }

          return (
            <GameContainer outline={isDarkTheme} data-testid="gaming">
              <Header />
              <div className="gaming-bottom-section">
                <MenuItems />
                {renderGameRoute()}
              </div>
            </GameContainer>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default GamingRoute
