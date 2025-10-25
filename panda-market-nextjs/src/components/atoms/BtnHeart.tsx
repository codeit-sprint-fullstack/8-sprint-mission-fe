import { useItemsQuery } from "@/lib/api/product/queries";
import Image from "next/image";

interface BtnHeartProps {
  productId: string;
}

export default function BtnHeart({ productId }: BtnHeartProps) {
  const { mutate: deleteFavoriteMutation } = useItemsQuery.useDeleteFavorite();
  const { mutate: addFavoriteMutation } = useItemsQuery.useAddFavorite();
  const { data: productDetail } = useItemsQuery.useGetProductDetail(productId);

  console.log(productDetail);

  const icon = productDetail?.isFavorite
    ? "/product-list/like-icon-filled.svg"
    : "/product-list/like-icon.svg";

  const handleClick = () => {
    if (productDetail?.isFavorite) {
      deleteFavoriteMutation(productId);
    } else {
      addFavoriteMutation(productId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 cursor-pointer border border-secondary-400 rounded-[40px] px-3 py-1"
    >
      <Image src={icon} alt="like" width={24} height={24} />
      <span>{productDetail?.likeCount}</span>
    </button>
  );
}
