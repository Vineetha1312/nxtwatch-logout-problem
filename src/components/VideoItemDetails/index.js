import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BiLike, BiDislike} from 'react-icons/bi'
import {RiPlayListAddLine} from 'react-icons/ri'
import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'
import Header from '../Header'
import MenuItems from '../MenuItems'
import {VideoItemContainer, VideoContainer} from './styledComponent'

const videoItemApiStatus = {
  initial: 'INITIAL',
  isProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoItemDetails extends Component {
  state = {
    videoItemDetails: {},
    liked: false,
    disLiked: false,
    videoItemApi: videoItemApiStatus.initial,
  }

  componentDidMount() {
    this.getVideoItemData()
  }

  getVideoItemData = async () => {
    this.setState({videoItemApi: videoItemApiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const videoApiUrl = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(videoApiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedVideoItemData = {
        name: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({
        videoItemDetails: updatedVideoItemData,
        videoItemApi: videoItemApiStatus.success,
      })
    } else {
      this.setState({videoItemApi: videoItemApiStatus.failure})
    }
  }

  onClickLike = () => {
    this.setState(prevState => ({liked: !prevState.liked}))
    this.setState({disLiked: false})
  }

  onClickDisLike = () => {
    this.setState(prevState => ({disLiked: !prevState.disLiked}))
    this.setState({liked: false})
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getVideoItemData()
  }

  render() {
    const {videoItemDetails, liked, disLiked} = this.state
    const activeLikeBtnClass = liked ? 'active-video-button' : 'video-button'
    const activeLikeText = liked ? 'active-text' : ''
    const activeDisLikeBtnClass = disLiked
      ? 'active-video-button'
      : 'video-button'
    const activeDisLikeText = disLiked ? 'active-text' : ''
    const likedColor = liked ? '#2563eb' : '#64748b'
    const disLikedColor = disLiked ? '#2563eb' : '#64748b'

    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme, saveVideoItem, saved} = value
          const saveText = saved ? 'Saved' : 'Save'
          const videoTitle = isDarkTheme
            ? 'video-title-dark'
            : 'video-title-light'
          const activeSaveBtnClass = saved
            ? 'active-video-button'
            : 'video-button'
          const activeSaveText = saved ? 'active-text' : ''
          const saveColor = saved ? '#2563eb' : '#64748b'
          const onClickSaveVideo = () => {
            saveVideoItem(videoItemDetails)
          }

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
                  We are having some trouble to complete your request. Please
                  try again.
                </p>
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

          const renderVideoItemDetails = () => (
            <VideoContainer outline={isDarkTheme}>
              <div className="react-player">
                <ReactPlayer
                  url={videoItemDetails.videoUrl}
                  controls
                  width="1000px"
                  height="400px"
                />
              </div>
              <p className={videoTitle}>{videoItemDetails.title}</p>
              <div className="video-details-section">
                <div className="video-details">
                  <p className="video-text">
                    {videoItemDetails.viewCount} Views
                  </p>
                  <p className="video-text">.</p>
                  <p className="video-text">{videoItemDetails.publishedAt}</p>
                </div>
                <div className="video-details">
                  <button
                    className={activeLikeBtnClass}
                    type="button"
                    onClick={this.onClickLike}
                  >
                    <BiLike color={likedColor} size={20} />
                    <p className={`video-text ${activeLikeText}`}>Like</p>
                  </button>
                  <button
                    className={activeDisLikeBtnClass}
                    type="button"
                    onClick={this.onClickDisLike}
                  >
                    <BiDislike color={disLikedColor} size={20} />
                    <p className={`video-text ${activeDisLikeText}`}>Dislike</p>
                  </button>
                  <button
                    className={activeSaveBtnClass}
                    type="button"
                    onClick={onClickSaveVideo}
                  >
                    <RiPlayListAddLine color={saveColor} size={20} />
                    <p className={`video-text ${activeSaveText}`}>{saveText}</p>
                  </button>
                </div>
              </div>
              <hr className="horizontal-line" />
              <div className="video-details">
                <img
                  src={videoItemDetails.profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <p className={videoTitle}>{videoItemDetails.name}</p>
              </div>
              <p className="video-text">{videoItemDetails.description}</p>
            </VideoContainer>
          )

          const renderVideoItemDetailsRoute = () => {
            const {videoItemApi} = this.state

            switch (videoItemApi) {
              case videoItemApiStatus.success:
                return renderVideoItemDetails()
              case videoItemApiStatus.failure:
                return failureView()
              case videoItemApiStatus.inProgress:
                return this.renderLoader()
              default:
                return null
            }
          }

          return (
            <VideoItemContainer
              outline={isDarkTheme}
              data-testid="videoItemDetails"
            >
              <Header />
              <div className="video-details-container">
                <div className="menu-items-card">
                  <MenuItems />
                </div>
                {renderVideoItemDetailsRoute()}
              </div>
            </VideoItemContainer>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default VideoItemDetails
