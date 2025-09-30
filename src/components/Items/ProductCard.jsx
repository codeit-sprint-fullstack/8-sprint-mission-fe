import Image from "next/image";

function ProductCard({ name = "", price = 0, favoriteCount = 0 }) {
  return (
    <li className="flex flex-col">
      <div className="relative mb-4 rounded-lg bg-gray-50">
        <Image
          src="/img_default.svg"
          alt="상품 기본 이미지"
          className="w-full h-full rounded-lg shadow"
          width={220}
          height={220}
        />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-medium text-gray-800">{name}</h2>
        <p className="text-base font-bold text-gray-800">
          {price.toLocaleString()}원
        </p>

        <div className="flex items-center gap-1">
          <button>
            <Image
              src="/ic_heart.svg"
              alt="찜하기 아이콘"
              className="w-4 h-4"
              width={16}
              height={16}
            />
          </button>
          <p className="text-xs font-medium text-gray-600">{favoriteCount}</p>
        </div>
      </div>
    </li>
  );
}

export default ProductCard;
