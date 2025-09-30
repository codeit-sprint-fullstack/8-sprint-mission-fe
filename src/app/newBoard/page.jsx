"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

const newBoard = () => {

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const titleChange = (e) => setTitle(e.target.value);
  const authorChange = (e) => setAuthor(e.target.value);
  const contentChange = (e) => setContent(e.target.value);
  
  const submit = async (e) => {
    e.preventDefault();
    try{
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`,{
        method:"POST",
        headers: {
          "Content-Type": "aplication/json"
        },
        body: JSON.stringify({
          title,
          author,
          content,
          likes: 0,
          createdAt: new Date().toISOString().slice(0,10),
        }),
      });
      router.push("/board");
    } 
    catch(error){
      console.error("게시글 작성 실패", error);
    }
  };

  return (
    <div className='mr-[360px] ml-[360px] mt-[20px] bg-[#fff] pb-[600px]'>
      <form onSubmit={submit}>
        <div className='flex justify-between'>
          <div className='text-[#1F2937] text-[20px] font-semibold'>게시글 쓰기</div>
          <button type='submit' className='text-[#F3F4F6] text-[16px] p-[23px] pb-[12px] pt-[12px] bg-[#9CA3AF] rounded'>등록</button>
        </div>
        <div className='flex text-[#1F2937] gap-[10px] text-size-[18px] font-semibold  mb-[24px]'>
          <div className='w-full '>
            <div className='mb-[12px]'>*제목</div>
            <input 
              type='text'
              placeholder='제목을 입력해주세요'
              value={title}
              onChange={titleChange}
              required
              className='p-[24px] text-[#9CA3AF] bg-[#F3F4F6] w-full rounded'
              />
          </div>
          <div className='w-full'>
            <div className='mb-[12px]'>*작성자</div>
            <input
              type='text'
              placeholder='닉네임을 입력해주세요'
              value={author}
              onChange={authorChange}
              required
              className='p-[24px] text-[#9CA3AF] bg-[#F3F4F6] w-full rounded'
            />
          </div>
        </div>
        <div>
          <div className='text-[#1F2937] text-size-[18px] font-semibold'>
            <div className='mb-[12px]'>*내용</div>
            <textarea
              type='text'
              placeholder='내용을 입력해주세요'
              value={content}
              onChange={contentChange}
              required
              className='bg-[#F3F4F6] min-h-[300px] w-full p-[24px] text-[#9CA3AF] rounded'
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default newBoard