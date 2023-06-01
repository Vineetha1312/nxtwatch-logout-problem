import {Component} from 'react'
import {HiFire} from 'react-icons/hi'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {
  TrendingContainer,
  TrendingTopContainer,
  TrendingLogoContainer,
} from './styledComponent'

import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'
import TrendingVideoItem from '../TrendingVideoItem'
import MenuItems from '../MenuItems'
import Header from '../Header'

const trendingApiStatus = {
  initial: 'INITIAL',
  isProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class TrendingRoute extends Component {
  state = {trendingVideosList: [], trendingApi: trendingApiStatus.initial}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({trendingApi: trendingApiStatus.inProgress})
    const trendingApiUrl = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(trendingApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedTrendingList = data.videos.map(eachItem => ({
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        id: eachItem.id,
        thumbnailUrl: eachItem.thumbnail_url,
        publishedAt: eachItem.published_at,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        trendingVideosList: updatedTrendingList,
        trendingApi: trendingApiStatus.success,
      })
    } else {
      this.setState({trendingApi: trendingApiStatus.failure})
    }
  }

  onClickRetry = () => this.getTrendingVideos()

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  render() {
    const {trendingVideosList} = this.state
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const trendingHeading = isDarkTheme
            ? 'trending-heading-dark'
            : 'trending-heading-light'
          const trendingBgClass = isDarkTheme
            ? 'trending-container-dark'
            : 'trending-container-light'

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

          const renderTrendingVideosList = () => (
            <div className="trending-route">
              <TrendingTopContainer outline={isDarkTheme}>
                <TrendingLogoContainer outline={isDarkTheme}>
                  <HiFire color="#ff0000" size={25} />
                </TrendingLogoContainer>
                <h1 className={trendingHeading}>Trending</h1>
              </TrendingTopContainer>
              <ul className={trendingBgClass}>
                {trendingVideosList.map(eachItem => (
                  <TrendingVideoItem
                    key={eachItem.id}
                    trendingVideoItemDetails={eachItem}
                  />
                ))}
              </ul>
            </div>
          )

          const renderTrendingRoute = () => {
            const {trendingApi} = this.state

            switch (trendingApi) {
              case trendingApiStatus.success:
                return renderTrendingVideosList()
              case trendingApiStatus.failure:
                return failureView()
              case trendingApiStatus.inProgress:
                return this.renderLoader()
              default:
                return null
            }
          }

          return (
            <TrendingContainer outline={isDarkTheme} data-testid="trending">
              <Header />
              <div className="trending-bottom-section">
                <MenuItems />
                {renderTrendingRoute()}
              </div>
            </TrendingContainer>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default TrendingRoute
