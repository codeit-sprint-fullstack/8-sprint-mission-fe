//라이브러리
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

//훅
import { updateComment, deleteComment } from '@/api/CommnetServices';
import useAsync from '@/hooks/useAsync';
import { convertDateToKRString } from '@/utils/convertDate';

//컴포넌트
import TextArea from '../../mocules/TextArea';
import Button from '../../atoms/Button';
import { DropdownButton } from '../../mocules/Dropdown';

//이미지
import Image from 'next/image';
import moreImg from '@/images/products/detail/ic_more.svg';
import userProfilePanda from '@/images/ic_profile.svg';
import noComment from '@/images/products/detail/ic_noComment.svg';
import noComment2 from '@/images/articles/detail/ic_noComment.svg';

//상수
import { CommentRequest, CommentResponce } from '@/constants/commnetType';

interface CommentListProps {
  commentList: CommentResponce[];
  handlePatch: (commentId: string, content: string) => void;
  handleDelete: (commentId: string) => void;
}

interface CommentFormProps {
  type: 'article' | 'product';
  getComments: (id: string) => Promise<CommentResponce[]>;
  createComment: (id: string, data: CommentRequest) => Promise<CommentResponce>;
}

export default function CommentForm({ type, getComments, createComment }: CommentFormProps) {
  const { id } = useParams();
  const [commentInput, setCommnetInput] = useState<string>('');
  const [comments, setCommnets] = useState<CommentResponce[]>([]);

  const [isLoading, error, write] = useAsync(createComment);

  const [isModalOpen, setModalOpen] = useState(false);

  const handlePatchComment = async (commentId: string, content: string) => {
    const body = {
      content: content,
    };
    const res = await updateComment(commentId, body);
    setCommnets(
      comments.map((e) => {
        return e.id === commentId ? { ...e, content } : e;
      })
    );
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    setCommnets(comments.filter((e) => e.id !== commentId));
  };

  useEffect(() => {
    const handleLoad = async () => {
      if (typeof id === 'string') {
        setCommnets(await getComments(id));
      }
    };
    handleLoad();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentInput.length > 0 && !isLoading) {
      const body = {
        content: commentInput,
        userName: '댓글판다',
      };
      if (typeof id === 'string') {
        const res = await write(id, body);
        console.log(res);
        if (res) {
          setCommnets([res, ...comments]);
          setCommnetInput('');
        }
      }
    }
  };

  return (
    <div className="w-full h-fit">
      <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] mb-[40px]">
        <TextArea
          name="commnetWrite"
          label={type === 'article' ? '댓글달기' : '문의하기'}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          rows={3}
          value={commentInput}
          onChange={(e) => setCommnetInput(e.target.value)}
        />
        <div className="flex flex-end">
          <Button
            disabled={commentInput.length <= 0 || isLoading}
            className="px-[23px] py-[12px] rounded-[8px]"
          >
            {isLoading ? '등록 중..' : '등록'}
          </Button>
        </div>
      </form>
      {comments && comments.length > 0 ? (
        <CommentList
          commentList={comments}
          handlePatch={handlePatchComment}
          handleDelete={handleDeleteComment}
        />
      ) : type === 'article' ? (
        <div className="w-fit h-fit flex flex-col items-center mt-[40px] mx-auto">
          <Image src={noComment2} alt="no_comment" className="w-[196px] h-[196px]" />
          <p className="text-center text-[var(--Cool-Gray-400)] text-[14px] font-[400]">
            아직 댓글이 없어요.
            <br />
            지금 댓글을 달아보세요!
          </p>
        </div>
      ) : (
        <div className="w-fit h-fit flex flex-col items-center mt-[40px] mx-auto">
          <Image src={noComment} alt="no_comment" className="w-[196px] h-[196px]" />
          <p className="text-center text-[var(--Cool-Gray-400)] text-[14px] font-[400]">
            아직 문의가 없어요.
          </p>
        </div>
      )}
    </div>
  );
}

function CommentList({ commentList, handlePatch, handleDelete }: CommentListProps) {
  const [editId, setEditId] = useState('');
  const [commentEdit, setCommentEdit] = useState('');

  return (
    <ul className="w-full h-fit flex flex-col gap-[24px]">
      {commentList.map((comment) => (
        <li key={comment.id}>
          {editId === comment.id ? (
            <div>
              <textarea
                rows={3}
                value={commentEdit}
                onChange={(e) => {
                  setCommentEdit(e.target.value);
                }}
                className="w-full flex px-[24px] py-[16px] resize-none overflow-hidden items-start gap-[10px] self-stretch rounded-[12px] border-0 bg-[var(--Cool-Gray-100)] mb-[16px]"
              />
              <div className="flex justify-between items-center">
                <div className="w-full flex gap-[8px] mb-[12px]">
                  <Image src={userProfilePanda} alt="profile" className="w-[32px] h-[32px]"></Image>
                  <div className="flex items-center gap-[16px]">
                    <p className="text-[var(--Cool-Gray-600)] text-[12px] font-normal">
                      {comment.userName}
                    </p>
                    <p className="text-[var(--Cool-Gray-400)] text-[12px] font-normal">
                      {convertDateToKRString(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <button
                  className="px-[23px] py-[12px]"
                  onClick={() => {
                    setCommentEdit('');
                    setEditId('');
                  }}
                >
                  취소
                </button>
                <Button
                  className="px-[23px] py-[12px]"
                  onClick={() => {
                    handlePatch(comment.id, commentEdit);
                    setEditId('');
                  }}
                >
                  수정 완료
                </Button>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-[8px] bg-[#fcfcfc]">
              <div className="w-full flex justify-between">
                <p>{comment.content}</p>
                <DropdownButton
                  list={[
                    {
                      name: '수정하기',
                      onClick: () => {
                        setCommentEdit(comment.content);
                        setEditId(comment.id);
                      },
                    },
                    {
                      name: '삭제하기',
                      onClick: () => {
                        handleDelete(comment.id);
                      },
                    },
                  ]}
                >
                  <Image src={moreImg} alt="more_button_icon" />
                </DropdownButton>
              </div>
              <div className="w-full flex gap-[8px] mb-[12px]">
                <Image src={userProfilePanda} alt="profile" className="w-[32px] h-[32px]"></Image>
                <div className="w-fit flex flex-col gap-[4px]">
                  <p className="text-[var(--Cool-Gray-600)] text-[12px] font-normal">
                    {comment.userName}
                  </p>
                  <p className="text-[var(--Cool-Gray-400)] text-[12px] font-normal">
                    {convertDateToKRString(comment.createdAt)}
                  </p>
                </div>
              </div>
              {/* <div className={styles.dividerH}></div> */}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
