import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className='flex pr-[360px] pl-[360px] justify-between  text-3xl font-bold'>
      <Link href="/board" className='bg-[#3692FF] p-[30px] rounded-full' >게시판 이동 </Link>
      <Link href="/market" className='bg-[#3692FF] p-[30px] rounded-full'>마켓 이동</Link>
    </div>
  )
}

export default HomePage