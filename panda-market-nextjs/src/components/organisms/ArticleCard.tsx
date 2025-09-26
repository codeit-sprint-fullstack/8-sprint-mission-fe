import Link from "next/link";
import Text from "../atoms/Text";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface ArticleCardProps {
  id: string;
  title: string;
  image: string;
  avatarImage: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
}

export default function ArticleCard({
  id,
  title,
  image,
  nickname,
  avatarImage,
  createdAt,
  likeCount,
}: ArticleCardProps) {
  return (
    <div className="bg-(--background-color) border-b border-secondary-200 p-1 pb-5">
      <Link href={`/free-board/${id}`} className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Text
            styleName="text-2lg-bold"
            content={title}
            addClassName="break-keep"
          />
          <Image
            src={image}
            alt={title}
            width={48}
            height={44}
            style={{ width: "48", height: "44" }}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="rounded-lg">
              <AvatarImage
                src={avatarImage}
                alt="@shadcn"
                width={24}
                height={24}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Text styleName="text-md-regular" content={nickname} />
            <Text styleName="text-md-regular" content={createdAt} />
          </div>
          <div className="flex items-center gap-1">
            <Image
              width={16}
              height={16}
              src="/product-list/like-icon.svg"
              alt="좋아요"
              style={{ width: "16", height: "16" }}
            />
            <Text styleName="text-md-regular" content={likeCount} />
          </div>
        </div>
      </Link>
    </div>
  );
}
