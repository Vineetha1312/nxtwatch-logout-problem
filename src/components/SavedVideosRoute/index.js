import {HiFire} from 'react-icons/hi'

import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'
import TrendingVideoItem from '../TrendingVideoItem'
import MenuItems from '../MenuItems'
import Header from '../Header'
import {
  SaveContainer,
  SaveTopContainer,
  SaveLogoContainer,
} from './styledComponent'

const SavedVideosRoute = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {isDarkTheme, savedVideosList} = value

      const saveHeading = isDarkTheme
        ? 'save-heading-dark'
        : 'save-heading-light'
      const saveBgClass = isDarkTheme
        ? 'save-container-dark'
        : 'save-container-light'
      const noVideosHeading = isDarkTheme
        ? 'no-saved-videos-heading-dark'
        : 'no-saved-videos-heading-light'
      const noVideosText = isDarkTheme
        ? 'no-saved-videos-text-dark'
        : 'no-saved-videos-text-light'

      const renderNoSavedVideos = () => (
        <div className="no-saved-videos">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
            className="no-saved-videos-img"
          />
          <h1 className={noVideosHeading}>No saved videos found</h1>
          <p className={noVideosText}>
            You can save your videos while watching them
          </p>
        </div>
      )

      const renderSavedVideos = () => (
        <div className="saved-videos-route">
          <SaveTopContainer outline={isDarkTheme}>
            <SaveLogoContainer outline={isDarkTheme}>
              <HiFire color="#ff0000" size={25} />
            </SaveLogoContainer>
            <h1 className={saveHeading}>Saved Videos</h1>
          </SaveTopContainer>
          <ul className={saveBgClass}>
            {savedVideosList.map(eachItem => (
              <TrendingVideoItem
                key={eachItem.id}
                trendingVideoItemDetails={eachItem}
              />
            ))}
          </ul>
        </div>
      )

      return (
        <SaveContainer outline={isDarkTheme} data-testid="savedVideos">
          <Header />
          <div className="saved-videos-bottom">
            <MenuItems />
            {savedVideosList.length > 0
              ? renderSavedVideos()
              : renderNoSavedVideos()}
          </div>
        </SaveContainer>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default SavedVideosRoute
