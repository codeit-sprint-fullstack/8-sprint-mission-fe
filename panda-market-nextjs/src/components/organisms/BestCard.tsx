import Image from "next/image";
import Text from "../atoms/Text";
import Link from "next/link";

export default function BestCard({
  id,
  title,
  image,
  nickname,
  createdAt,
  likeCount,
}: {
  id: string;
  title: string;
  image: string;
  nickname: string;
  createdAt: string;
  likeCount: number;
}) {
  return (
    <div className="p-[0_24px_16px_24px] w-full max-w-[384px] bg-secondary-50 rounded-lg">
      <Link href={`/free-board/${id}`}>
        <div>
          <Image
            src="/free-board/best-article-badge.svg"
            alt="베스트 게시글"
            width={102}
            height={30}
            style={{ width: "102", height: "30" }}
          />
        </div>
        <div className="flex items-center justify-between gap-2 m-[16px_0_18px]">
          <Text
            styleName="text-2lg-bold"
            content={title}
            addClassName="break-keep"
          />
          <div className="p-3 bg-white rounded-[6px] border border-secondary-200">
            <Image
              src={image}
              alt={title}
              width={48}
              height={44}
              style={{ width: "48", height: "44" }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Text
              styleName="text-md-regular"
              color="text-secondary-600"
              content={nickname}
            />
            {/* 좋아요 컴포넌트 분리 요망 */}
            <div className="flex items-center gap-1">
              <Image
                width={16}
                height={16}
                src="/product-list/like-icon.svg"
                alt="좋아요"
                style={{ width: "16", height: "16" }}
              />
              <Text
                styleName="text-md-regular"
                color="text-secondary-500"
                content={likeCount}
              />
            </div>
          </div>
          <Text
            styleName="text-md-regular"
            color="text-secondary-400"
            content={createdAt}
          />
        </div>
      </Link>
    </div>
  );
}
