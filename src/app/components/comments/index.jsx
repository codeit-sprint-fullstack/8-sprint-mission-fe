// 'use client';

import React from "react";
import Item from "./_components/Item";
import Button from "../Button";
import Image from "next/image";

const Comments = ({ data }) => {
  // const [text, setText] = useState('');
  return (
    <div>
      <form className="flex flex-col">
        <label>댓글달기</label>
        <textarea
          placeholder="댓글을 입력해주세요."
          className="bg-gray-100 resize-none p-4 rounded-lg mt-2 mb-4"
        />
        <div className="flex justify-end">
          <Button>등록</Button>
        </div>
      </form>
      {data ? (
        data.map((comment) => <Item key={comment.id} data={comment} />)
      ) : (
        <Image
          src="/reply-empty.svg"
          alt="There is no reply yet"
          width={151}
          height={208}
        />
      )}
    </div>
  );
};

export default Comments;
