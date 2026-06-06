import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LandingPage from '../features/landingPage/App.jsx'
import { SeatMap } from '../features/eventMap/SeatMap.jsx'
import LoginPage from '../features/auth/loginPage/LoginPage.jsx'
import RegisterPage from '../features/auth/registerpage/RegisterPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage></LoginPage>
  </StrictMode>,
)
