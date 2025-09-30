import React from 'react'
import Image from 'next/image'
import home from './Logo/pandaFace.svg'
import Link from 'next/link'

const Header = () => {
  return (
    <div>
      <nav className='flex justify-between items-center px-[200px] bg-[#fff] border py-[10px] text-center ' >
        <div className='flex items-center gap-[32px]'>
          <div className='flex items-center gap-[10px]'>
            <Image 
              src={home} 
              width={40} 
              height={40} 
              alt='메인 로고'
            />
            <Link href="/" className='text-[#3692FF] font-bold leadin-normal text-[25px]' >
              판다마켓
            </Link>
          </div>
          <div className='flex gap-[30px] leadin-normal text-center font-bold '> 
            <Link href="/board" className='text-[#3692FF] text-[16px]'>자유게시판</Link>
            <Link href="/market" className='text-[#4B5563] text-[16px]'>중고마켓</Link>
          </div>
        </div>
        <button className='bg-[#3692FF] rounded px-[16px] py-[8px] rounded-md'> 로그인 </button>

      </nav>

    </div>
  )
}

export default Header