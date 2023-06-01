import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import {FiSearch} from 'react-icons/fi'
import HomeVideoItem from '../HomeVideoItem'
import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const homeApiStatus = {
  initial: 'INITIAL',
  isProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeVideosRoute extends Component {
  state = {
    search: '',
    homeVideosList: [],
    NoSearchItemFind: true,
    homeApi: homeApiStatus.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  getHomeVideos = async () => {
    this.setState({homeApi: homeApiStatus.inProgress})
    const {searchInput} = this.state
    const homeApiUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(homeApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedVideosList = data.videos.map(eachItem => ({
        title: eachItem.title,
        id: eachItem.id,
        viewCount: eachItem.view_count,
        thumbnailUrl: eachItem.thumbnail_url,
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        publishedAt: eachItem.published_at,
      }))
      this.setState({
        homeVideosList: updatedVideosList,
        homeApi: homeApiStatus.success,
      })
    } else {
      this.setState({homeApi: homeApiStatus.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({search: event.target.value})
  }

  enterSearchInput = () => {
    const {search, homeVideosList} = this.state
    const filterAllVideos = homeVideosList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(search.toLowerCase()),
    )
    if (filterAllVideos.length > 0) {
      this.setState({homeVideosList: filterAllVideos}, this.getHomeVideos)
    } else {
      this.setState({NoSearchItemFind: false})
    }
  }

  renderHomeVideos = () => {
    const {homeVideosList} = this.state

    return (
      <ul className="home-videos-list">
        {homeVideosList.map(eachItem => (
          <HomeVideoItem key={eachItem.id} videoCardDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  onClickRetry = () => this.getHomeVideos()

  render() {
    const {search, NoSearchItemFind} = this.state
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          const searchInputClass = isDarkTheme
            ? 'search-input-element-dark'
            : ''
          const searchButtonClass = isDarkTheme ? 'search-button-dark' : ''
          const NosearchHeading = isDarkTheme
            ? 'search-results-heading-dark'
            : 'search-results-heading-light'
          const homeRouteBg = isDarkTheme
            ? 'home-bg-container-dark'
            : 'home-bg-container-light'

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
                  className="retry-button"
                  type="button"
                  onClick={this.onClickRetry}
                >
                  Retry
                </button>
              </div>
            )
          }

          const renderHomeVideosList = () => (
            <>
              {NoSearchItemFind ? (
                this.renderHomeVideos()
              ) : (
                <div className="no-searchresults-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                    alt="no videos"
                    className="no-searchresults-img"
                  />
                  <h1 className={NosearchHeading}>No Search results found</h1>
                  <p className="no-searchresults-text">
                    Try different key words or remove search filter
                  </p>
                  <button type="button" className="retry-button">
                    Retry
                  </button>
                </div>
              )}
            </>
          )

          const renderHomeRoute = () => {
            const {homeApi} = this.state

            switch (homeApi) {
              case homeApiStatus.success:
                return renderHomeVideosList()
              case homeApiStatus.failure:
                return failureView()
              case homeApiStatus.inProgress:
                return this.renderLoader()
              default:
                return null
            }
          }

          return (
            <div className={homeRouteBg} data-testid="home">
              <div className="input-element-container">
                <input
                  type="search"
                  className={`search-input-element ${searchInputClass}`}
                  placeholder="Search"
                  value={search}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  type="button"
                  className={`search-button ${searchButtonClass}`}
                  onClick={this.enterSearchInput}
                  data-testid="searchButton"
                >
                  <FiSearch size={15} color="#616e7c" />
                </button>
              </div>
              {renderHomeRoute()}
            </div>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default HomeVideosRoute
