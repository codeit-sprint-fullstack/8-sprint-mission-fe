import React from 'react'
import Image from 'next/image'
import facebook from './Logo/facebook.svg'
import twitter from './Logo/twitter.svg'
import youtude from './Logo/youtude.svg'
import instagram from './Logo/instagram.svg'

const Footer = () => {
  return (
    <div>
      <footer className='flex min-h-[150px] pl-[400px] pr-[400px] pt-[32px] pb-[32px] bg-[#111827] justify-between items-center'>     
        <div> @codeit-2025</div>
        <div className='flex gap-[30px]'>
          <div>Privacy Policy</div>
          <div>FAQ</div>
        </div>
        <div className='flex gap-[12px] top-1'>
          <Image src={facebook} alt='facebook'/>
          <Image src={twitter} alt='twitter'/>
          <Image src={youtude} alt='youtude'/>
          <Image src={instagram } alt='facebook'/>
        </div>
      </footer>
    </div>
  )
}

export default Footer