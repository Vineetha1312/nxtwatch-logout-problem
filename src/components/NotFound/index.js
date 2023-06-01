import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const NotFound = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const notfoundBgClass = isDarkTheme
        ? 'notfound-container-dark'
        : 'notfound-container-light'
      const notFoundImg = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
      const notFoundHeading = isDarkTheme
        ? 'notfound-heading-dark'
        : 'notfound-heading-light'

      return (
        <div className={notfoundBgClass}>
          <img src={notFoundImg} alt="not found" className="notfound-image" />
          <h1 className={notFoundHeading}>Page Not Found</h1>
          <p className="notfound-text">
            We are sorry, the page you requested could not be found.
          </p>
        </div>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default NotFound
