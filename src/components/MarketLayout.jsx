import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function MarketLayout(){
  return (
    <>
      <Navbar />
      <div className="main-offset">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}