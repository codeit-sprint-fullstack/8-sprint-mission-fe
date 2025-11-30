'use client';

//라이브러리
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

//훅
import { getProduct, patchProduct, deleteProduct, addFavorite } from '@/api/ProductService';
import {
  getProductComments,
  createProductComment,
  updateComment,
  deleteComment,
} from '@/api/CommnetServices';
import useAsync from '@/hooks/useAsync';
import { API_URL } from '@/config/config';
import { convertDateToKRString } from '@/utils/convertDate';

//컴포넌트
import MainFrame from '../../organisms/MainFrame';
import TextArea from '../../mocules/TextArea';
import Button from '../../atoms/Button';
import { DropdownButton } from '../../mocules/Dropdown';
import DeleteModal from '../../mocules/DeleteModal';

//이미지
import Image from 'next/image';
import moreImg from '@/images/products/detail/ic_more.svg';
import userProfilePanda from '@/images/ic_profile.svg';
import heartIcon from '@/images/ic_heart.svg';
import noComment from '@/images/products/detail/ic_noComment.svg';
import backIcon from '@/images/products/detail/ic_back.svg';
import productDefault from '@/images/products/product_default.png';

//상수
import { ProductResponse } from '@/constants/productType';
import { CommentResponce } from '@/constants/commnetType';

//이 컴포넌트는 분리해서 서버 컴포넌트로 만들어도 될 것 같습니다.
export default function ProductDetailPage({}) {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductResponse>({
    id: '',
    name: '',
    description: '',
    price: 0,
    tags: [],
    images: [],
    favoriteCount: 0,
    userName: '',
    userId: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [commentInput, setCommnetInput] = useState<string>('');
  const [comments, setCommnets] = useState<CommentResponce[]>([]);

  const [isLoading, error, write] = useAsync(createProductComment);

  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      if (typeof id === 'string') {
        setProduct(await getProduct(id));
        setCommnets(await getProductComments(id));
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

  const handleDeleteProduct = () => {
    if (typeof id === 'string') {
      deleteProduct(id);
      router.push('/products');
    }
  };

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

  const handleFavoriteClick = async () => {
    addFavorite(product.id); // 좋아요 추가 api 요청
    setProduct((prev) => ({
      ...prev,
      favoriteCount: product.favoriteCount + 1,
    }));
  };

  return (
    <>
      <MainFrame>
        <div className="w-full h-fit my-[24px] mx-auto mb-[319px] px-[16px] py-0">
          <ProductInfo
            product={product}
            setModalOpen={setModalOpen}
            handleFavoriteClick={handleFavoriteClick}
          />
          <form onSubmit={handleSubmit} className="flex flex-col gap-[16px] mb-[40px]">
            <TextArea
              name="commnetWrite"
              label="문의하기"
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
          ) : (
            <div className="w-fit h-fit flex flex-col items-center mt-[40px] mx-auto">
              <Image src={noComment} alt="no_comment" className="w-[196px] h-[196px]" />
              <p>아직 문의가 없어요.</p>
            </div>
          )}
          <div className="flex flex-col items-center mt-[48px] mx-auto">
            <Button
              to="/products"
              className="text-[16px] font-semibold rounded-full px-[33.5px] py-[14.5px]"
            >
              <p>목록으로 돌아가기</p>
              <Image src={backIcon} alt="back_button" />
            </Button>
          </div>
        </div>
      </MainFrame>
      <DeleteModal
        message="정말로 상품을 삭제하시겠어요?"
        isOpen={isModalOpen}
        onConfirm={handleDeleteProduct}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
}

interface ProductInfoProps {
  product: ProductResponse;
  setModalOpen: (setting: boolean) => void;
  handleFavoriteClick: () => void;
}

function ProductInfo({ product, setModalOpen, handleFavoriteClick }: ProductInfoProps) {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="mb-[40px]">
      <div className="w-full h-fit flex flex-col gap-[24px] mb-[24px] md:flex-row md:mb-[32px] xl:mb-[40px]">
        <div className="rounded-[24px] overflow-hidden w-full aspect-[1/1] md:max-w-[500px] md:max-h-[500px]">
          {product.images?.length > 0 ? (
            <img
              src={`${API_URL}/uploads/${product.images[0]}`}
              alt="productImage"
              className="w-full h-full object-cover"
            />
          ) : (
            <Image src={productDefault} alt="productImage" className="object-cover" />
          )}
        </div>
        <div className="flex flex-col justify-between gap-[40px] w-[100%]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[16px]">
              <div className="w-full flex justify-between">
                <div>
                  <p className="text-[20px] font-[700]">{product.name}</p>
                  <p className="text-[--Cool-Gray-800] text-[40px] font-semibold">
                    {product.price.toLocaleString() + '원'}
                  </p>
                </div>
                <DropdownButton
                  list={[
                    {
                      name: '수정하기',
                      onClick: () => {
                        router.push(`/products/${id}/edit`);
                      },
                    },
                    {
                      name: '삭제하기',
                      onClick: () => {
                        setModalOpen(true);
                      },
                    },
                  ]}
                >
                  <Image src={moreImg} alt="more_button_icon" />
                </DropdownButton>
              </div>
              {/* <div className={styles.dividerH}></div> */}
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col gap[16px]">
                <label className="text-[var(--Cool-Gray-600)] text-[16px] font-semibold">
                  상품 소개
                </label>
                <p className="text-[var(--Cool-Gray-600)] text-[16px] font-normal">
                  {product.description}
                </p>
              </div>
              <div className="flex flex-col gap[16px]">
                <label>상품 태그</label>
                <div className="inline-flex gap-[8px]">
                  {product.tags.map((tag) => {
                    return (
                      <div
                        key={product.tags.indexOf(tag)}
                        className="w-fit px-[16px] py-[6px] rounded-[26px] bg-[var(--Cool-Gray-100)] text-[var(--Cool-Gray-800)] text-[16px] font-normal"
                      >
                        <p>{`#${tag}`}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-fit h-fit flex gap-[16px] my-[16px]">
              <Image src={userProfilePanda} alt="profile_image" className="w-[40px] h-[40px]" />
              <div className="flex flex-col gap-[2px]">
                <p className="text-[var(--Cool-Gray-600)] text-[16px] font-medium">
                  {product.userName}
                </p>
                <p className="text-[var(--Cool-Gray-400)] text-[14px] font-normal">
                  {convertDateToKRString(product.createdAt)}
                </p>
              </div>
            </div>
            <div className="flex">
              {/* <div className={styles.dividerV24}></div> */}
              <button
                onClick={handleFavoriteClick}
                className="w-fit h-[40px] px-[12px] py-[4px] flex items-center gap-[4px] rounded-[35px] border border-[var(--Cool-Gray-200)]"
              >
                <Image src={heartIcon} alt="favoriteIcon" className="w-[32px] h-[32px]" />
                <p className="text-[var(--Cool-Gray-500)] text-[16px] font-medium">
                  {product.favoriteCount}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles.dividerH}></div> */}
    </div>
  );
}

interface CommentListProps {
  commentList: CommentResponce[];
  handlePatch: (commentId: string, content: string) => void;
  handleDelete: (commentId: string) => void;
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
