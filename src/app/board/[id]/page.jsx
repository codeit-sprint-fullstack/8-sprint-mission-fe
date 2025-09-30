"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dot from '../Logo/dot.svg'
import user from '../Logo/user.svg'
import liker from '../Logo/ic_heart.svg'
import nonCom from '../Logo/commnet.png'
import { Fascinate_Inline } from 'next/font/google'

const postPage = () => {
  const { id } = useParams();
  const router = useRouter();
  
  const [post, setPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [comments, setComments] = useState([]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [commentMenu, setcommentMenu] = useState(false);
  const [addCommentMenu, setAddCommentMenu] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState(""); 

  const [AddId, setAddId] = useState(null);
  const [AddContent, setAddContent] = useState("");

  const postAuthorChange = (e) => setCommentAuthor(e.target.value);
  const postContentChange = (e) => setCommentContent(e.target.value);
  const titleChange = (e) => setNewTitle(e.target.value);


  useEffect(() => {
    const fetchData = async () => {
      const resPost = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
      const dataPost = await resPost.json();
      setPost(dataPost);
      
      const resComments = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?postId=${id}`);
      const dataComments = await resComments.json();
      setComments(dataComments);
    };
    fetchData();
  },[id]);

  const addComment = async (e) => {
    e.preventDefault();
    const newComment = {
      postId: id,
      commentAuthor,
      commentContent,
      createdAt: new Date().toISOString(),
    };
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    });
    const saved = await res.json();
    setComments((prev) => [...prev, saved]);
    setCommentAuthor("");
    setCommentContent("");
  };
  
  const deleteComment = async (cid) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${cid}`,{ method: "DELETE"});
    setComments((prev) => prev.filter((c) => c.id !== cid));
    setcommentMenu(null);
  };

  const addUpdateComment = async(cid) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${cid}`,{
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentContent: AddContent }),
    });
    setComments((prev) =>
      prev.map((c) => (c.id === cid ? { ...c, commentContent: AddContent } : c))
    );  
    setAddCommentMenu(null);
    setAddContent("");
    setAddId(null);
  };

  const deletePost = async() => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {method: "DELETE"});

    const resComments =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments?postId=${id}`);
    const dataComments = await resComments.json();
    await Promise.all(
      dataComments.map((c) => 
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${c.id}`, {method: "DELETE"})
      )
    );
    router.push("/board")

  };
  
  const updatePostTitle = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle}),
    });
    setPost((prev) => ({ ...prev, title: newTitle })); 
    setAddMode(false);
  }
  if(!post) return<div>Loading....</div>

  return (
    <div>
      <div className='mr-[360px] ml-[360px]'>
        <div className='flex justify-between text-[#1F2937] text-[32px] font-bold mt-[32px]'>
          <div>
            {addMode ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={titleChange}
                  className="border p-2 rounded"
                />
                <button onClick={updatePostTitle} className="p-[23px] pt-[12px] pb-[12px] bg-[#9CA3AF] text-[16px] rounded-xl font-normal w-[110px]">
                  저장
                </button>
                <button onClick={() => setAddMode(false)} className="p-[23px] pt-[12px] pb-[12px] bg-[#9CA3AF] text-[16px] rounded-xl font-normal w-[110px]">
                  취소
                </button>
              </div>
            ) : (
              <span>{post.title}</span>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setMenuOpen((prev) => !prev)}>
              <Image src={dot} alt="더보기" />
            </button>

            {menuOpen && (
              <div className="absolute text-[16px] text-[#6B7280] right-0 mt-2 w-32 bg-white border borderounded-xl rounde-[#6B7280] rd">
                <button
                  onClick={() => {
                    setNewTitle(post.title);
                    setAddMode(true);
                    setMenuOpen(false);
                  }}
                  className="w-full p-[32px] pt-[16px] pb-[16px] text-normal rounded-t-xl"
                >
                  수정하기
                </button>
                <button
                  onClick={deletePost}
                  className="w-full py-3 p-[32px] pt-[16px] pb-[16px] text-normal rounded-b-xl"
                >
                  삭제하기
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='flex border-b pb-[16px] '>
          <div className='flex items-center gap-[12px]'>
            <Image src={user} alt='유저' width={40} height={40} className='bg-[#9CA3AF] rounded-full'></Image>
            <div className='text-[#4B5563] text-[14px]'>{post.author}</div>
            <div className='text-[#9CA3AF] text-[14px] '>{post.createdAt}</div>
            <div className='border-r h-1/2 pr-[20px]'></div>
          </div>
          <div className='flex border rounded-full p-[12px] ml-[32px] pt-[5px] pb-[5px] items-center text-[16px] gap-2'>
            <Image src={liker} alt='좋아요' width={32} height={32}></Image>
            <div className='text-[#6B7280]'>{post.likes}</div>
          </div>
        </div>
        <div className='mt-[24px] mb-[32px] text-[#1F2937] text-[26px]'>{post.content}</div>
        
      

        <form onSubmit={addComment} className='text-[#111827] text-[16px]'>
          <div>
            <div className='mb-[5px]'>작성자</div>
            <input
              type='text'
              value={commentAuthor}
              onChange={postAuthorChange}
              placeholder='작성자'
              required
              className='w-full mb-[16px] text-[#9CA3AF] bg-[#F3F4F6] text-[16px] p-[23px] pt-[16px] pb-[16px] rounded'
            />
          </div>
          <div>
            <div className='mb-[5px]'>댓글달기</div>
            <textarea
              type='text'
              value={commentContent}
              onChange={postContentChange}
              placeholder='댓글을 입력해주세요.'
              required
              className= 'w-full h-[200px] mb-[16px] text-[#9CA3AF] bg-[#F3F4F6] text-[16px] p-[23px] pt-[16px] pb-[16px] rounded'
            />
          </div>
          <div className='flex flex-row-reverse mb-[40px]'>
            <button type='submit' className='p-[23px] pt-[12px] pb-[12px] bg-[#9CA3AF] rounded-xl'> 등록 </button>
          </div>
        </form>
        
        <div className='mb-[42px] text-[#1F2937] bg-[#E5E7EB]'>
          {comments.length === 0 ?(
          <div>
            <div className='flex flex-col text-center items-center justify-center'> 
              <Image src={nonCom} alt='댓글없' className='mb-[16px]'></Image>
              <div>아직 댓글이 없어요.</div>
              <div>지금 댓글을 달아보세요!</div>
            </div>
          </div>
          )
          :(
            <div>
              {comments.map((c) => (
                <div key={c.id} className="border-b py-3">
                  <div className="flex justify-between items-start">
                    {addCommentMenu === c.id ? (
                      <div className="flex-1">
                        <textarea
                          className="w-full border p-2 rounded"
                          value={AddContent}
                          onChange={(e) => setAddContent(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => addUpdateComment(c.id)}>저장</button>
                          <button onClick={() => setAddCommentMenu(null)}>취소</button>
                        </div>
                      </div>) :(
                      <div>
                        <div>{c.commentContent}</div>
                        <div className="flex items-center gap-2 text-sm mt-1">
                          <Image src={user} alt='유저' width={40} height={40} className='bg-[#9CA3AF] rounded-full'></Image>
                          <div>{c.commentAuthor}</div>
                          <div>{c.createdAt}</div>
                        </div>

                      </div>
                      
                    )}

                    <div className="relative mr-[10px]">
                      <button onClick={() => setcommentMenu(commentMenu === c.id ? null : c.id)}>
                        <Image src={dot} alt="더보기" />
                      </button>

                      {commentMenu === c.id && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow">
                          <button
                            onClick={() => {
                              setAddCommentMenu(c.id);
                              setAddContent(c.commentContent);
                              setcommentMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left"
                          >
                            수정하기
                          </button>
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="w-full px-4 py-2 text-left"
                          >
                            삭제하기
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          )
        }
          
        </div>
        <div className='flex justify-center mb-[300px]'>
          <Link href='/board'>
            <div className='text-center rounded-2xl bg-[#3692FF]  mb-[300px] font-bold  p-[64px] pt-[12px] pb-[12px]'>목록으로 돌아가기</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default postPage