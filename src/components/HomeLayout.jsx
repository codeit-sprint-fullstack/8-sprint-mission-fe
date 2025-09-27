import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

export default function HomeLayout(){
  return (
    <>
      <Header />
      <div className="main-offset">
        <Outlet />
      </div>
      <Footer />
    </>
  )
}