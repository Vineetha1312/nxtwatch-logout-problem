import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiPlayListAddLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const MenuItems = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {
        isDarkTheme,
        isHomeButtonActive,
        onClickHome,
        onClickGaming,
        onClickTrending,
        isTrendingButtonActive,
        isGamingButtonActive,
        isSaveButtonActive,
        onClickSave,
      } = value
      const menuItemsBgClass = isDarkTheme ? 'menu-items-section-dark' : ''
      const homeIconsColor = isHomeButtonActive ? '#ff0000' : '#7e858e'
      const homeIconText = isDarkTheme ? 'icon-text-dark' : 'icon-text-light'
      const activeHomeButtonDark =
        isHomeButtonActive && isDarkTheme ? 'active-menu-button-dark' : ''

      const trendingIconsColor = isTrendingButtonActive ? '#ff0000' : '#7e858e'
      const trendingIconText = isDarkTheme
        ? 'icon-text-dark'
        : 'icon-text-light'
      const activeTrendingButtonDark =
        isTrendingButtonActive && isDarkTheme ? 'active-menu-button-dark' : ''

      const gamingIconsColor = isGamingButtonActive ? '#ff0000' : '#7e858e'
      const gamingIconText = isDarkTheme ? 'icon-text-dark' : 'icon-text-light'
      const activeGamingButtonDark =
        isGamingButtonActive && isDarkTheme ? 'active-menu-button-dark' : ''
      const contactDetails = isDarkTheme
        ? 'contact-details-text-dark'
        : 'contact-details-text-light'

      const saveIconsColor = isSaveButtonActive ? '#ff0000' : '#7e858e'
      const saveIconText = isDarkTheme ? 'icon-text-dark' : 'icon-text-light'
      const activesaveButtonDark =
        isSaveButtonActive && isDarkTheme ? 'active-menu-button-dark' : ''

      const onClickHomeItem = () => {
        onClickHome()
      }

      const onClickTrendingItem = () => {
        onClickTrending()
      }

      const onClickGamingItem = () => {
        onClickGaming()
      }

      const onClickSaveItem = () => {
        onClickSave()
      }

      const activeHomeButtonText = isHomeButtonActive ? 'active-icon-text' : ''
      const activeHomeButton = isHomeButtonActive ? 'active-menu-button' : ''
      const activeTrendingButtonText = isTrendingButtonActive
        ? 'active-icon-text'
        : ''
      const activeTrendingButton = isTrendingButtonActive
        ? 'active-menu-button'
        : ''
      const activeGamingButtonText = isGamingButtonActive
        ? 'active-icon-text'
        : ''
      const activeGamingButton = isGamingButtonActive
        ? 'active-menu-button'
        : ''

      const activesaveButtonText = isSaveButtonActive ? 'active-icon-text' : ''
      const activesaveButton = isSaveButtonActive ? 'active-menu-button' : ''

      return (
        <div className={`menu-items-section ${menuItemsBgClass}`}>
          <ul className="menu-items">
            <Link to="/" className="link-type">
              <li className="list-item">
                <button
                  className={`menu-item-button ${activeHomeButton} ${activeHomeButtonDark}`}
                  type="button"
                  onClick={onClickHomeItem}
                >
                  <AiFillHome size={15} color={homeIconsColor} />
                  <p className={`${activeHomeButtonText} ${homeIconText}`}>
                    Home
                  </p>
                </button>
              </li>
            </Link>
            <Link to="/trending" className="link-type">
              <li className="list-item">
                <button
                  className={`menu-item-button ${activeTrendingButton} ${activeTrendingButtonDark}`}
                  type="button"
                  onClick={onClickTrendingItem}
                >
                  <HiFire size={15} color={trendingIconsColor} />
                  <p
                    className={`${activeTrendingButtonText} ${trendingIconText}`}
                  >
                    Trending
                  </p>
                </button>
              </li>
            </Link>
            <Link to="/gaming" className="link-type">
              <li className="list-item">
                <button
                  className={`menu-item-button ${activeGamingButton} ${activeGamingButtonDark}`}
                  type="button"
                  onClick={onClickGamingItem}
                >
                  <SiYoutubegaming size={15} color={gamingIconsColor} />
                  <p className={`${activeGamingButtonText} ${gamingIconText}`}>
                    Gaming
                  </p>
                </button>
              </li>
            </Link>
            <Link to="/saved-videos" className="link-type">
              <li className="list-item">
                <button
                  className={`menu-item-button ${activesaveButton} ${activesaveButtonDark}`}
                  type="button"
                  onClick={onClickSaveItem}
                >
                  <RiPlayListAddLine size={15} color={saveIconsColor} />
                  <p className={`${activesaveButtonText} ${saveIconText}`}>
                    Saved Videos
                  </p>
                </button>
              </li>
            </Link>
          </ul>
          <div className="menu-items">
            <p className={contactDetails}>CONTACT US</p>
            <div className="contact-icons-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-icon"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-icon"
              />
            </div>
            <p className={contactDetails}>
              Enjoy! Now to see your channels and recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default MenuItems
