import './index.css'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'
import NxtwatchContext from '../../context/NxtwatchContext'

const TrendingVideoItem = props => {
  const {trendingVideoItemDetails} = props
  const {
    name,
    id,
    thumbnailUrl,
    publishedAt,
    title,
    viewCount,
  } = trendingVideoItemDetails

  return (
    <NxtwatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const darkModeTitle = isDarkTheme ? 'trending-video-title-dark' : ''

        const publishedDate = formatDistanceToNow(new Date(publishedAt))

        return (
          <Link to={`videos/${id}`} className="link-item">
            <div className="trending-video-list-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="trending-thumbnail"
              />
              <div className="trending-video-details">
                <h1 className={`trending-video-title-light ${darkModeTitle}`}>
                  {title}
                </h1>
                <p className="trending-video-name-light">{name}</p>
                <div className="trending-video-details-section">
                  <p className="trending-video-name-light">{viewCount} Views</p>
                  <p className="trending-video-name-light">.</p>
                  <p className="trending-video-name-light">{publishedDate}</p>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default TrendingVideoItem
