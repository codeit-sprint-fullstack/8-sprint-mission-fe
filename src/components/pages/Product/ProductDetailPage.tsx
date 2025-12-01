'use client';

//라이브러리
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

//훅
import { getProduct, patchProduct, deleteProduct, addFavorite } from '@/api/ProductService';
import { API_URL } from '@/config/config';
import { convertDateToKRString } from '@/utils/convertDate';

//컴포넌트
import MainFrame from '../../organisms/MainFrame';
import Button from '@/components/atoms/Button';
import { DropdownButton } from '../../mocules/Dropdown';
import DeleteModal from '../../mocules/DeleteModal';

//이미지
import Image from 'next/image';
import moreImg from '@/images/products/detail/ic_more.svg';
import userProfilePanda from '@/images/ic_profile.svg';
import heartIcon from '@/images/ic_heart.svg';
import productDefault from '@/images/products/product_default.png';
import backIcon from '@/images/products/detail/ic_back.svg';

//상수
import { ProductResponse } from '@/constants/productType';
import CommentForm from '@/components/features/comment/CommentForm';
import { createProductComment, getProductComments } from '@/api/CommnetServices';

//이 컴포넌트는 분리해서 서버 컴포넌트로 만들어도 될 것 같습니다.
export default function ProductDetailPage({}) {
  return (
    <>
      <MainFrame>
        <div className="w-full h-fit my-[24px] mx-auto mb-[319px] px-[16px] py-0">
          <ProductInfo />
          <CommentForm
            type="product"
            getComments={getProductComments}
            createComment={createProductComment}
          />
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
    </>
  );
}

interface ProductInfoProps {
  product: ProductResponse;
  setModalOpen: (setting: boolean) => void;
  handleFavoriteClick: () => void;
}

function ProductInfo({}) {
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

  const [isModalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      if (typeof id === 'string') {
        setProduct(await getProduct(id));
      }
    };
    handleLoad();
  }, []);

  const handleDeleteProduct = () => {
    if (typeof id === 'string') {
      //(수정필요) -삭제 성공 여부 판단 필요
      deleteProduct(id);
      router.push('/items');
    }
  };

  const handleFavoriteClick = async () => {
    addFavorite(product.id); // 좋아요 추가 api 요청
    setProduct((prev) => ({
      ...prev,
      favoriteCount: product.favoriteCount + 1,
    }));
  };

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
            {/* pb이 안들어가는 버그   */}
            <div className="!pb-[16px] border-b-1 border-[var(--Cool-Gray-200)]">
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
            <div className="flex border-l-1 border-[var(--Cool-Gray-200)]">
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
      <DeleteModal
        message="정말로 상품을 삭제하시겠어요?"
        isOpen={isModalOpen}
        onConfirm={handleDeleteProduct}
        onCancel={() => setModalOpen(false)}
      />
      {/* <div className={styles.dividerH}></div> */}
    </div>
  );
}
