import DropDown from '@/components/common/DropDown';
import Image from 'next/image';
import { Product } from '@/types/product';
import TagChip from '@/components/common/TagChip';
import HeartTag from '@/components/common/HeartTag';
import { convertTz } from '@/libs/day';

const DetailProductCart = ({
  name = '',
  description = '',
  price = 0,
  tags = [],
  likeCount = 0,
  createdAt = '',
  onEdit = () => {},
  onDelete = () => {},
}: Omit<Product, 'id'> & { onEdit: () => void; onDelete: () => void }) => {
  return (
    <div className="flex w-full items-center gap-6">
      <Image src="/img_product.svg" alt="img_product" width={486} height={486} />
      <div className="flex w-full flex-col gap-[62px]">
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-4 pb-4">
              <div className="text-secondary-800 text-2xl leading-[32px] font-semibold">{name}</div>
              <div className="text-secondary-800 text-[40px] font-semibold">
                {price.toLocaleString('ko-KR')}
              </div>
            </div>
            <DropDown
              type="modify"
              handlers={{ edit: onEdit, delete: onDelete }}
              selected={''}
              onChange={() => {}}
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-secondary-600 text-base leading-[26px] font-semibold">
              상품 소개
            </div>
            <div className="text-secondary-600 text-base leading-[26px] font-normal">
              {description}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-secondary-600 text-base leading-[26px] font-semibold">
              상품 태그
            </div>
            <div className="flex items-center gap-2">
              {tags.map((tag) => (
                <TagChip key={tag} type="view" tag={tag} onClick={() => {}} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image src="/icons/ic_profile.svg" alt="ic_profile" width={40} height={40} />
            <div className="flex flex-col">
              <div className="text-secondary-600 text-sm leading-[24px] font-medium">
                총명한판다
              </div>
              <div className="text-coolGray-400 text-sm leading-[24px] font-normal">
                {convertTz(createdAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1"
              height="34"
              viewBox="0 0 1 34"
              fill="none"
            >
              <path d="M0.5 0V34" stroke="#E5E7EB" />
            </svg>
            <HeartTag like={likeCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductCart;
