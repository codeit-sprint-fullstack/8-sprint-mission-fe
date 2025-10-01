import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteButton from "./_client/DeleteButton";
import CommentInput from "./_client/CommentInput";
import CommentItem from "./_client/CommentItem";
import ActionMenu from "./_client/ActionMenu";
import Image from "next/image";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
export const dynamic = "force-dynamic";

async function getArticle(id) {
  const res = await fetch(`${API_BASE}/articles/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("게시글 조회 실패");
  return res.json();
}
async function getComments(articleId) {
  const res = await fetch(
    `${API_BASE}/articles/${articleId}/comments?take=50`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) return { list: [], nextCursor: null };
  return res.json();
}
export default async function ArticleDetailPage({ params }) {
  const { id } = await params;
  const [article, commentsRes] = await Promise.all([
    getArticle(id),
    getComments(id),
  ]);
  if (!article) notFound();
  const defaultLike = 992;
  const defaultName = "총명한 판다";
  const title = article.title ?? "(제목 없음)";
  const content = article.content ?? "";
  const createdAt = article.createdAt ?? article.created_at ?? null;
  const comments = Array.isArray(commentsRes?.list) ? commentsRes.list : [];

  return (
    <div className="mx-auto w-full max-w-[920px] px-4 py-8">
      <header className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[20px] font-semibold leading-7 break-words">
              {title}
            </h1>
            <div className="mt-2 flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Image
                  src="/defalut_avata.png"
                  alt="작성자 프로필"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="truncate">{defaultName}</span>
              </div>
              <time dateTime={createdAt || undefined}>
                {createdAt ? new Date(createdAt).toLocaleDateString() : "—"}
              </time>
              <span className="w-px self-stretch bg-gray-200" />
              <span className="inline-flex items-center gap-1 rounded-[35px] border border-gray-200 bg-white px-3 py-1 text-gray-600">
                <Image
                  src="/ic_heart.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="inline-block"
                />
                <span className="text-sm">{defaultLike}</span>
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <ActionMenu articleId={id} editHref={`/board/${id}/edit`} />
          </div>
        </div>
      </header>

      <article className="border-none whitespace-pre-wrap bg-white p-4 text-[15px] leading-7 text-gray-800">
        {content}
      </article>

      <section className="mt-10">
        <h2 className="mb-3 text-[14px] font-semibold text-gray-700">
          댓글달기
        </h2>
        <CommentInput articleId={id} />
      </section>

      <section className="mt-6 space-y-6">
        {comments.length > 0 ? (
          comments.map((c) => (
            <CommentItem
              key={c.id}
              articleId={id}
              comment={{
                id: c.id,
                content: c.content ?? "",
                author:
                  c.author?.nickname ??
                  c.nickname ??
                  c.authorName ??
                  "총명하지 않은 판다",
                createdAt: c.createdAt ?? c.created_at ?? null,
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Image
              src="/reply_empty.png"
              alt="댓글 없음"
              width={151}
              height={208}
              className="mb-3"
            />
            <p>아직 등록된 댓글이 없습니다.</p>
          </div>
        )}
      </section>

      <div className="mt-10 flex justify-center">
        <Link
          href="/board"
          className="inline-flex items-center gap-2 rounded-full bg-[#3692FF] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
        >
          목록으로 돌아가기{" "}
          <span aria-hidden>
            <Image src="/ic_back.png" alt="" width={19} height={16} />
          </span>
        </Link>
      </div>
    </div>
  );
}
