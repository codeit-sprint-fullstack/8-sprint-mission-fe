import Image from 'next/image';

const EmptyBoard = ({ type }: { type: 'comment' | 'article' | 'inquiry' }) => {
  let content: React.ReactNode;
  switch (type) {
    case 'comment':
      content = (
        <div className="text-secondary-400 text-center text-base leading-[26px] font-normal">
          아직 댓글이 없어요, <br />
          지금 댓글을 달아보세요!
        </div>
      );
      break;
    case 'article':
      content = (
        <div className="text-secondary-400 text-center text-base leading-[26px] font-normal">
          아직 게시글이 없어요, <br />
          지금 게시글을 만들어보세요!
        </div>
      );
      break;
    case 'inquiry':
      content = (
        <div className="text-secondary-400 text-center text-base leading-[26px] font-normal">
          아직 문의가 없어요
        </div>
      );
      break;
    default:
      break;
  }

  let image: string;
  if (type === 'comment' || type === 'article') {
    image = '/Img_replyEmpty.svg';
  } else {
    image = '/img_inquiry_empty.svg';
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <Image src={image} alt={image} width={140} height={140} />
        {content}
      </div>
    </div>
  );
};

export default EmptyBoard;
