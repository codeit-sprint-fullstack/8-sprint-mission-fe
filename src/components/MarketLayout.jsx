import { Outlet } from 'react-router-dom'
import Navbar from './navbar.jsx'
import Footer from './footer.jsx'

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