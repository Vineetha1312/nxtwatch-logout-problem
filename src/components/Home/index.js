import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = () => {
  const accessToken = Cookies.get('jwt_token')
  if (accessToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header />
      <h1>Hi, Vineetha B</h1>
    </div>
  )
}

export default Home
