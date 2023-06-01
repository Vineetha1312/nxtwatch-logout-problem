import {Link} from 'react-router-dom'
import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const GamingVideoItem = props => {
  const {gamingVideoDetails} = props
  const {thumbnailUrl, title, viewCount, id} = gamingVideoDetails

  return (
    <NxtwatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const gameTitle = isDarkTheme ? 'game-title-dark' : 'game-title-light'

        return (
          <Link to={`videos/${id}`} className="link-item">
            <li className="game-item">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="game-thumbnail"
              />
              <p className={gameTitle}>{title}</p>
              <p className="game-views">{viewCount} Watching Worldwide</p>
            </li>
          </Link>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default GamingVideoItem
