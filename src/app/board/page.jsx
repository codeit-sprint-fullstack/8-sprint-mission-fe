"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import user from './Logo/user.svg';
import liker from './Logo/ic_heart.svg';
import item from './Logo/item.png';
import best from './Logo/best.svg';
import search from './Logo/search.svg'
import Link from 'next/link';
import { Chathura } from 'next/font/google';


const boardPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("orderBy");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`);
      const data = await response.json();
      
      setPosts(data);
    }
    fetchData();
  },[]);
  const likeChange = async (postId, currentLikes) => {
    const updateLikes = currentLikes + 1;
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({likes: updateLikes }),
      });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? {...post, likes: updateLikes }: post
        )
      );
    }
    catch(error){
      console.log("좋아요 실행 실패"+error);
    }
  };
  const searchChange = (e) =>{
    setSearchTerm(e.target.value);
  };

  const searchBar = posts.filter((post) => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const typePosts = [...searchBar].sort((a,b) => {
    if(type === "orderBy"){
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
    if(type === "likes"){
      return b.likes - a.likes;
    }
    return 0;
  });

  const typeChange = (e) => {
    setType(e.target.value);
  };

  const sortPost = [...posts];
  
  sortPost.sort((a,b) => b.likes - a.likes);
  
  const bestPost = sortPost.slice(0, 3);


  return (
    <div className='pr-[360px] pl-[360px] pt-[20px] bg-[#fff]'>
      <div>
        <div className='text-[#111827] font-bold mb-[24px]'>
          베스트 게시글
        </div>
        <div className='flex justify-between gap-[24px]'>
          {bestPost.map((post) =>{
            return (
              
              <div key={post.id} className='flex-1 bg-[#F9FAFB] bg-gray-50 mr-[24px] ml-[24px] pr-[24px] pl-[24px] rounded'>
                <div className='flex bg-[#3692FF] w-[100px] pr-[24px] pl-[24px] rounded-b-2xl mb-[10px]'>
                  <Image src={best}  alt="베스트"></Image>
                  <div className='text-[#FFF] text-[16px] font-bold leading-[25px] font-pretendard'>best</div>
                </div>
                <div className='flex justify-between mb-[26px]'>
                  <div className='text-[#1F2937] font-bold'>{post.title}</div>
                  <Image src={item} width={50} height={50} alt="물품" className='border'></Image>
                </div>

                <div className='flex justify-between text-center mb-[10px]'>
                  <div className='flex gap-[8px] text-[#4B5563] text-[14px]'>
                    <div>{post.author}</div>
                    <div className='flex ' onClick={() => likeChange(post.id, post.likes)}>
                      <Image src={liker} alt="좋아요"></Image>
                      <div>{post.likes > 9999 ? "9999+": post.likes}</div>
                    </div>
                  </div>

                  <div className='flex gap-[8px] text-[#4B5563] text-[14px]'>
                    <div>{post.createdAt}</div>
                  </div> 
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='min-w-[630px]'>
        <div className='flex justify-between  items-center text-center h-[42px] mt-[40px]'>
          <div className='text-[#1F2937] text-[20px] font-bold'>게시글</div>
          <Link href={"/newBoard"}>
            <button className='bg-[#3692FF] pr-[23px] pl-[23px] pt-[12px] pb-[12px] font-semibold text-[#fff] text-[16px] rounded'>글쓰기</button>
          </Link>
        </div>
        
        <div className='text-[#9CA3AF] flex gap-2 items-center text-center'>
          <div className='relative w-full'>
            <Image
              src={search}
              alt='검색'
              width={20}
              height={20}
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <input 
              type='text' 
              value={searchTerm} 
              placeholder='검색할 상품을 입력해주세요' 
              onChange={searchChange}
              className='bg-[#F3F4F6] mt-[24px] h-[40px] mb-[24px] pl-[48px] pr-[16px] pt-[9px] pb-[9px] w-full rounded'
            />
          </div>
          <select 
            value={type}
            onChange={typeChange}
            className='border border-[#ESE7EB] w-[10%] mt-[20px] h-[42px] mb-[20px] text-[#1F2937] text-[16px] rounded'
          >
            <option value="orderBy">최신 순</option>
            <option value="likes">좋아요 순</option>
          </select>
        </div>

        <div className='pb-[100px]'>
          {typePosts.map((post)=>{
            return (
              <div key={post.id} className='bg-[#FCFCFC] mb-[24px] w-full border-b border-[#ESE7EB]'>
                <Link href={`/board/${post.id}`} className='flex justify-between h-[80px] mb-16px'>
                  <div className='text-[#1F2937] font-semibold  text-[26px]'>{post.title}</div>
                  <Image src={item} width={48} height={48} alt="물품" className='h-[48px]'></Image>
                </Link>

                <div className='flex justify-between items-center text-center'>
                  <div className='flex gap-[8px] text-[14px]' >
                    <Image src={user} alt='유저' width={40} height={40} className='bg-[#9CA3AF] rounded-full'></Image>
                    <div className='text-[#4B5563]'>{post.author}</div>
                    <div className='text-[#9CA3AF]'>{post.createdAt}</div>
                  </div>

                  <div className='flex gap-[8px] pb-[15px] ' onClick={() => likeChange(post.id, post.likes)} >
                    <Image src={liker} alt="좋아요"></Image>
                    <div className='text-[#4B5563] w-[45px]'>{post.likes > 9999 ? "9999+": post.likes}</div>
                  </div> 
                </div>
              </div>
            );
          })}
          
        </div>
      </div>
    </div>
  )
}

export default boardPage