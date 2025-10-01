import React from 'react'
import ic_search from '/public/ic_search.svg';
import Image from 'next/image';

const Search = () => {
  return (
    <div className='max-w-[1054px] w-full h-10.5 px-4 py-[9px] bg-gray-100 rounded-xl flex gap-1'>
      <Image src={ic_search} alt='search_icon'></Image>
      <input type="text" placeholder='검색할 상품을 입력해주세요' className='max-w-5xl w-full' />
    </div>
  )
}

export default Search