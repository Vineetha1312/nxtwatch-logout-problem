import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {ImCross} from 'react-icons/im'
import {PrepaidContainer, HomeBgSection} from './styledComponent'
import './index.css'
import Header from '../Header'
import NxtwatchContext from '../../context/NxtwatchContext'
import MenuItems from '../MenuItems'
import HomeVideosRoute from '../HomeVideosRoute'

class Home extends Component {
  state = {
    removePrepaid: true,
  }

  onClickPrepaidCross = () => {
    this.setState({removePrepaid: false})
  }

  renderPrepaidSection = () => (
    <PrepaidContainer data-testid="banner">
      <div className="prepaid-top-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="nxtwatch-logo"
        />
        <button
          className="prepaid-cross-button"
          type="button"
          onClick={this.onClickPrepaidCross}
          data-testid="close"
        >
          <ImCross size={10} />
        </button>
      </div>
      <p className="prepaid-text">
        Buy Nxt Watch Premium prepaid plans with UPI
      </p>
      <button type="button" className="get-now-button">
        GET IT NOW
      </button>
    </PrepaidContainer>
  )

  render() {
    const accessToken = Cookies.get('jwt_token')
    if (accessToken === undefined) {
      return <Redirect to="/login" />
    }

    const {removePrepaid} = this.state

    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          const homeBg = isDarkTheme
            ? 'home-bg-container-dark'
            : 'home-bg-container-light'

          return (
            <div className={homeBg} data-testid="home">
              <Header />
              <HomeBgSection>
                <div className="home-and-prepaid-section">
                  <div className="menu-items-card">
                    <MenuItems />
                  </div>
                  <div className="home-items-section">
                    {removePrepaid ? this.renderPrepaidSection() : null}
                    <HomeVideosRoute />
                  </div>
                </div>
              </HomeBgSection>
            </div>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Home
