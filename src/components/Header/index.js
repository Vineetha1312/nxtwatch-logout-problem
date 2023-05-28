import {HiMoon} from 'react-icons/hi'
import {BiMenu} from 'react-icons/bi'
import {FiLogIn, FiSun} from 'react-icons/fi'
import {Cookies} from 'js-cookie'
import {withRouter} from 'react-router-dom'
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

        return (
          <nav className={navBgContainer}>
            <img
              src={nxtwatchLogo}
              alt="nxt watch logo"
              className="nxtwatch-logo"
            />
            <div className="nav-items">
              <button
                type="button"
                className="nav-theme-button"
                onClick={onToggleTheme}
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
              <button
                type="button"
                className="menu-icon-button"
                onClick={onClickLogout}
              >
                <FiLogIn size={25} />
              </button>
              <button
                className="logout-button"
                type="button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </nav>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default withRouter(Header)
