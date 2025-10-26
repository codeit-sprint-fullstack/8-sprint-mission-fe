'use client';

//라이브러리
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

//훅
import {
  getProduct,
  patchProduct,
  deleteProduct,
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '@/api/ProductService';
import useAsync from '@/hooks/useAsync';
import url from '@/api/backendUrl.js';

//컴포넌트
import MainFrame from '@/components/organism/mainFrame';
import { DropdownList } from '@/components/molecules/Dropdown/Dropdown';
import DeleteModal from '@/components/molecules/DeleteModal/DeleteModal';
import Input from '@/components/molecules/Input/Input';
import Button from '@/components/Atoms/Button/Button';

//이미지
import Image from 'next/image';
import moreImg from './ic_more.svg';
import userPanda from '@/images/userPanda.svg';
import heartIcon from './ic_heart.svg';
import noComment from './ic_noComment.svg';
import backIcon from './ic_back.svg';
//import productDefault from '../../../../public/images/items/product_default.png';
const productDefault = '/images/items/product_default.png';

//스타일
import styles from './item.module.css';

function ProductDetail({ product, setModalOpen }) {
  const router = useRouter();
  const { id } = useParams();

  const productImageURL =
    product.images?.length > 0 ? `${url}/uploads/${product.images[0]}` : productDefault;
  return (
    <div className={styles.productDetailBox}>
      <div className={styles.productDetail}>
        <div className={styles.productImageBox}>
          {product.images && (
            <img src={productImageURL} alt="productImage" className={styles.productImage} />
          )}
        </div>
        <div className="flex flex-col justify-between gap-[40px] w-[100%]">
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col gap-[16px]">
              <div className={styles.titleDiv}>
                <div>
                  <p className={styles.title}>{product.name}</p>
                  <p className={styles.price}>{product.price.toLocaleString() + '원'}</p>
                </div>
                <DropdownList
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
                </DropdownList>
              </div>
              <div className={styles.dividerH}></div>
            </div>
            <div className={styles.productInfo}>
              <div className={styles.productInfoContent}>
                <label>상품 소개</label>
                <p>{product.description}</p>
              </div>
              <div className={styles.productInfoContent}>
                <label>상품 태그</label>
                <div className="inline-flex gap-[8px]    ">
                  {product.tags.map((tag) => {
                    return (
                      <div className={styles.tag} key={product.tags.indexOf(tag)}>
                        <p>{`#${tag}`}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className={styles.userDiv}>
              <Image src={userPanda} alt="profile_image" className={styles.articleUserProfile} />
              <div className="flex flex-col gap-[2px]">
                <p className={styles.userName}>{product.userName}</p>
                <p className={styles.date}>{product.createdAt}</p>
              </div>
            </div>
            <div className="flex">
              <div className={styles.dividerV24}></div>
              <div className={styles.favoriteDiv}>
                <Image src={heartIcon} alt="favoriteIcon" className={styles.heartIcon} />
                <p className={styles.favoriteCntText}>{product.favoriteCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.dividerH}></div>
    </div>
  );
}

function CommentList({ list, handlePatch, handleDelete }) {
  const [editId, setEditId] = useState('');
  const [commentEdit, setCommentEdit] = useState('');

  return (
    <ul className={styles.commentList}>
      {list.map((comment) => (
        <li key={comment.id}>
          {editId === comment.id ? (
            <div>
              <textarea
                className={styles.editCommentInput}
                value={commentEdit}
                onChange={(e) => {
                  setCommentEdit(e.target.value);
                }}
                rows={3}
              />
              <div className={styles.editInfoDiv}>
                <div className={styles.commentInfoDiv}>
                  <Image
                    src={userPanda}
                    alt="profile"
                    className={styles.commentUserProfile}
                  ></Image>
                  <div className={styles.editBtnDiv}>
                    <p className={styles.commentuserName}>{comment.userName}</p>
                    <p className={styles.commentDate}>{comment.createdAt}</p>
                  </div>
                </div>
                <button
                  className={styles.cancle}
                  onClick={() => {
                    setCommentEdit('');
                    setEditId('');
                  }}
                >
                  취소
                </button>
                <Button
                  className={styles.edit}
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
            <div className={styles.comment}>
              <div className={styles.commentContentDiv}>
                <p>{comment.content}</p>
                <DropdownList
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
                </DropdownList>
              </div>
              <div className={styles.commentInfoDiv}>
                <Image src={userPanda} alt="profile" className={styles.commentUserProfile}></Image>
                <div>
                  <p className={styles.commentuserName}>{comment.userName}</p>
                  <p className={styles.commentDate}>{comment.createdAt}</p>
                </div>
              </div>
              <div className={styles.dividerH}></div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function ProductPage({}) {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    images: [],
    tags: [],
    favoriteCount: 0,
    userName: '',
    createdAt: '',
  });
  const [commentInput, setCommnetInput] = useState('');
  const [comments, setCommnets] = useState([]);

  const [isLoading, error, write] = useAsync(createComment);

  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      setProduct(await getProduct(id));
      setCommnets(await getComments(id));
    };
    handleLoad();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentInput.length > 0 && !isLoading) {
      const body = {
        content: commentInput,
        userName: '댓글판다',
      };
      const res = await write(id, body);
      console.log(res);
      setCommnets([res, ...comments]);
      setCommnetInput('');
    }
  };

  const handleDeleteProduct = () => {
    deleteProduct(id);
    router.push('/products');
  };

  const handlePatchComment = async (commentId, content) => {
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

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setCommnets(comments.filter((e) => e.id !== commentId));
  };

  return (
    <>
      <MainFrame>
        <div className={styles.frame}>
          <ProductDetail product={product} setModalOpen={setModalOpen} />
          <form className={styles.commnetForm} onSubmit={handleSubmit}>
            <Input
              label="문의하기"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              rows={3}
              value={commentInput}
              onChange={(e) => setCommnetInput(e.target.value)}
            />
            <div className={styles.buttonDiv}>
              <Button className={styles.button} disabled={commentInput.length <= 0 || isLoading}>
                {isLoading ? '등록 중..' : '등록'}
              </Button>
            </div>
          </form>
          {comments && comments.length > 0 ? (
            <CommentList
              list={comments}
              handlePatch={handlePatchComment}
              handleDelete={handleDeleteComment}
            />
          ) : (
            <div className={styles.noComment}>
              <Image src={noComment} alt="no_comment" className={styles.noCommentImg} />
              <p>아직 문의가 없어요.</p>
            </div>
          )}
          <div className={styles.backButtonDiv}>
            <Button to="/products" className={styles.backButton}>
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
