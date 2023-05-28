import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'
import NxtwatchContext from '../../context/NxtwatchContext'

const darkLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
const lightLogo =
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

class LoginForm extends Component {
  state = {username: '', password: '', isPasswordShown: false, errorText: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({errorText: errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickCheckbox = () => {
    this.setState(prevState => ({isPasswordShown: !prevState.isPasswordShown}))
  }

  render() {
    const {username, password, isPasswordShown, errorText} = this.state
    const passwordType = isPasswordShown ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const nxtwatchLogo = isDarkTheme ? darkLogo : lightLogo
          const loginCardBgClass = isDarkTheme
            ? 'login-card-bg-light'
            : 'login-card-bg-dark'
          const loginBgClass = isDarkTheme ? 'login-bg-dark' : 'login-bg-light'

          return (
            <div className={loginBgClass}>
              <div className={loginCardBgClass}>
                <img
                  src={nxtwatchLogo}
                  alt="nxt watch logo"
                  className="nxtwatch-logo"
                />
                <form className="form-container" onSubmit={this.submitForm}>
                  <label className="label-text" htmlFor="username">
                    USERNAME
                  </label>
                  <input
                    type="text"
                    className="input-element"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={this.onChangeUsername}
                  />
                  <label className="label-text" htmlFor="password">
                    PASSWORD
                  </label>
                  <input
                    type={passwordType}
                    className="input-element"
                    placeholder="Password"
                    id="Password"
                    value={password}
                    onChange={this.onChangePassword}
                  />
                  <div className="checkbox-section">
                    <input
                      type="checkbox"
                      checked={isPasswordShown}
                      onChange={this.onClickCheckbox}
                      id="checkbox"
                    />
                    <label className="checkbox-label" htmlFor="checkbox">
                      Show Password
                    </label>
                  </div>
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </form>
                <p className="error-msg">{errorText}</p>
              </div>
            </div>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default LoginForm
