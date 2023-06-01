import {HiMoon} from 'react-icons/hi'
import {BiMenu} from 'react-icons/bi'
import {FiLogIn, FiSun} from 'react-icons/fi'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {withRouter, Link} from 'react-router-dom'
import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const lightThemeLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
const darkThemeLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <NxtwatchContext.Consumer>
      {value => {
        const {isDarkTheme, toggleTheme} = value
        const onToggleTheme = () => {
          toggleTheme()
        }
        const navBgContainer = isDarkTheme
          ? 'nav-container-dark'
          : 'nav-container-light'
        const themeIcon = isDarkTheme ? (
          <FiSun size={25} color="#ffffff" />
        ) : (
          <HiMoon size={25} />
        )
        const nxtwatchLogo = isDarkTheme ? darkThemeLogo : lightThemeLogo
        const logoutButton = isDarkTheme
          ? 'logout-button-dark'
          : 'logout-button-light'
        const logoutBg = isDarkTheme
          ? 'logout-container-dark'
          : 'logout-container-light'
        const logoutText = isDarkTheme
          ? 'logout-text-dark'
          : 'logout-text-light'

        return (
          <nav className={navBgContainer}>
            <Link to="/" className="link-type">
              <img
                src={nxtwatchLogo}
                alt="website logo"
                className="nxtwatch-logo"
              />
            </Link>
            <div className="nav-items">
              <button
                type="button"
                className="nav-theme-button"
                onClick={onToggleTheme}
                data-testid="theme"
              >
                {themeIcon}
              </button>
              <button type="button" className="nav-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="profile-icon"
                />
              </button>
              <button type="button" className="menu-icon-button">
                <BiMenu size={25} />
              </button>
              <Popup
                modal
                trigger={
                  <button type="button" className="menu-icon-button">
                    <FiLogIn size={25} />
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <div className={logoutBg}>
                    <p className={logoutText}>
                      Are you sure, you want to logout?
                    </p>
                    <div className="logount-buttons">
                      <button
                        type="button"
                        onClick={() => close()}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
              <Popup
                modal
                trigger={
                  <button className={logoutButton} type="button">
                    Logout
                  </button>
                }
                className="popup-content"
              >
                {close => (
                  <div className={logoutBg}>
                    <p className={logoutText}>
                      Are you sure, you want to logout?
                    </p>
                    <div className="logount-buttons">
                      <button
                        type="button"
                        onClick={() => close()}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="logout-btn"
                        onClick={onClickLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </nav>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default withRouter(Header)
