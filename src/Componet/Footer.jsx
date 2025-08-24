import '../css/Footer.css'
import faceBook from '../assets/ic_faceBook.svg'
import youTube from '../assets/ic_youtude.svg'
import twitter from '../assets/ic_twitter.svg'
import instagram from '../assets/ic_instagram.svg'

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footerLeft'>©codeit - 2024</div>
      <div className='footerCenter'>
        <div>Privacy Policy</div>
        <div>FAQ</div>
      </div>
      <div className='footerRight'>
        <img src={faceBook} alt='FaceBook' />
        <img src={youTube} alt='YouTube' />
        <img src={twitter} alt='Twitter' />
        <img src={instagram} alt='Instagram' />
      </div>
    </footer>
  )
}
