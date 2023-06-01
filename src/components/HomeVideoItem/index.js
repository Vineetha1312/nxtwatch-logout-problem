import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const HomeVideoItem = props => {
  const {videoCardDetails} = props
  const {
    id,
    thumbnailUrl,
    title,
    profileImageUrl,
    name,
    viewCount,
    publishedAt,
  } = videoCardDetails
  const publishedDate = formatDistanceToNow(new Date(publishedAt))
  return (
    <NxtwatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const videoTitleText = isDarkTheme ? 'video-title-text-dark' : ''
        return (
          <Link to={`videos/${id}`} className="link-item">
            <li className="video-card-container">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-image"
              />
              <div className="name-title-section">
                <img
                  src={profileImageUrl}
                  className="profile-image"
                  alt="channel logo"
                />
                <div>
                  <p className={`video-title ${videoTitleText}`}>{title}</p>
                  <p className="name">{name}</p>
                  <div className="name-title-section">
                    <p className="name">{viewCount} Views</p>
                    <p className="dot">.</p>
                    <p className="name"> {publishedDate}</p>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default HomeVideoItem
