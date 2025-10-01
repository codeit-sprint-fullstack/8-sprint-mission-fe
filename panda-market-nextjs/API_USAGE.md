# Codeit Sprint Mission Backend API 문서

## 프로젝트 개요

- 프레임워크: Express.js
- 데이터베이스: PostgreSQL + Prisma ORM
- 포트: 8000 (기본값)
- CORS: localhost:3000, 127.0.0.1:3000 허용

## .env 구성

PORT=8080
DATABASE_URL="postgresql://계정@localhost:5432/panda-market?schema=public"
CORS_ORIGIN_DEV=http://localhost:3000

## 데이터 모델

### Article (게시글)

```prisma
model Article {
  id        String    @id @default(uuid())
  title     String
  content   String
  likes     Int?
  author   String?
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  comments  Comment[]
}
```

### Comment (댓글)

```prisma
model Comment {
  id        String   @id @default(uuid())
  content   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  article   Article? @relation(fields: [articleId], references: [id])
  articleId String?

  product   Product? @relation(fields: [productId], references: [id])
  productId String?
}
```

---

## 현재 라우트 목록

### 게시글 (Articles) 라우트

- `GET /articles` - 게시글 목록 조회
- `GET /best-articles` - 인기 게시글 3개 조회
- `GET /articles/:id` - 게시글 상세 조회
- `POST /articles` - 게시글 등록
- `PATCH /articles/:id` - 게시글 수정
- `DELETE /articles/:id` - 게시글 삭제

### 댓글 (Comments) 라우트

- `GET /articles/:articleId/comments` - 게시글 댓글 목록 조회
- `POST /articles/:articleId/comments` - 게시글 댓글 등록
- `PATCH /articles/:articleId/comments/:commentId` - 게시글 댓글 수정
- `DELETE /articles/:articleId/comments/:commentId` - 게시글 댓글 삭제

---

## API 엔드포인트

### 1. 게시글 (Articles) API

#### 1.1 게시글 목록 조회

- URL: `GET /articles`
- 설명: 게시글 목록을 페이지네이션과 검색 기능으로 조회
- 쿼리 파라미터:
  - `page` (optional): 페이지 번호 (기본값: 1)
  - `pageSize` (optional): 페이지당 항목 수 (기본값: 10)
  - `orderBy` (optional): 정렬 기준 ("recent" | "old" | "like") (기본값: "recent")
  - `keyword` (optional): 검색 키워드 (제목, 내용에서 검색)

응답 예시:

```json
{
  "articles": [
    {
      "id": "uuid",
      "title": "게시글 제목",
      "content": "게시글 내용",
      "likes": 5,
      "author": "작성자",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalCount": 30
}
```

#### 1.2 최고 인기 게시글 조회

- URL: `GET /best-articles`
- 설명: 좋아요 수가 높은 상위 3개 게시글 조회

응답 예시:

```json
[
  {
    "id": "uuid",
    "title": "인기 게시글",
    "content": "내용",
    "likes": 100,
    "author": "작성자",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 1.3 게시글 상세 조회

- URL: `GET /articles/:id`
- 설명: 특정 게시글의 상세 정보 조회
- 경로 파라미터:
  - `id`: 게시글 ID (UUID)

응답 예시:

```json
{
  "id": "uuid",
  "title": "게시글 제목",
  "content": "게시글 내용",
  "likes": 5,
  "author": "작성자",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

에러 응답 (404):

```json
{
  "message": "게시글을 찾을 수 없습니다."
}
```

#### 1.4 게시글 등록

- URL: `POST /articles`
- 설명: 새 게시글 등록
- 요청 본문:

```json
{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "author": "작성자" // optional, 기본값: "익명"
}
```

응답: 201 Created

```json
{
  "id": "uuid",
  "title": "게시글 제목",
  "content": "게시글 내용",
  "likes": 0,
  "author": "작성자",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

에러 응답 (400):

```json
{
  "message": "제목과 내용은 필수 입력 항목입니다."
}
```

#### 1.5 게시글 수정

- URL: `PATCH /articles/:id`
- 설명: 게시글 정보 수정
- 경로 파라미터:
  - `id`: 게시글 ID (UUID)
- 요청 본문:

```json
{
  "title": "수정된 제목",
  "content": "수정된 내용",
  "author": "수정된 작성자"
}
```

응답: 200 OK

```json
{
  "id": "uuid",
  "title": "수정된 제목",
  "content": "수정된 내용",
  "likes": 5,
  "author": "수정된 작성자",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z"
}
```

에러 응답 (404):

```json
{
  "message": "게시글을 찾을 수 없습니다."
}
```

에러 응답 (400):

```json
{
  "message": "수정할 데이터가 없습니다."
}
```

#### 1.6 게시글 삭제

- URL: `DELETE /articles/:id`
- 설명: 게시글 삭제
- 경로 파라미터:
  - `id`: 게시글 ID (UUID)

응답: 204 No Content

에러 응답 (404):

```json
{
  "message": "게시글을 찾을 수 없습니다."
}
```

---

### 2. 댓글 (Comments) API

#### 2.1 상품 댓글 목록 조회

- URL: `GET /products/:productId/comments`
- 설명: 특정 상품의 댓글 목록 조회
- 경로 파라미터:
  - `productId`: 상품 ID (UUID)

응답 예시:

```json
[
  {
    "id": "uuid",
    "content": "댓글 내용",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2.2 상품 댓글 등록

- URL: `POST /products/:productId/comments`
- 설명: 상품에 댓글 등록
- 경로 파라미터:
  - `productId`: 상품 ID (UUID)
- 요청 본문:

```json
{
  "content": "댓글 내용"
}
```

응답: 201 Created

```json
{
  "id": "uuid",
  "content": "댓글 내용",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "productId": "product-uuid"
}
```

#### 2.3 상품 댓글 수정

- URL: `PATCH /products/:productId/comments/:commentId`
- 설명: 상품 댓글 수정
- 경로 파라미터:
  - `productId`: 상품 ID (UUID)
  - `commentId`: 댓글 ID (UUID)
- 요청 본문:

```json
{
  "content": "수정된 댓글 내용"
}
```

응답: 200 OK

```json
{
  "id": "uuid",
  "content": "수정된 댓글 내용",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

에러 응답 (404):

```json
{
  "message": "댓글을 찾을 수 없습니다."
}
```

#### 2.4 상품 댓글 삭제

- URL: `DELETE /products/:productId/comments/:commentId`
- 설명: 상품 댓글 삭제
- 경로 파라미터:
  - `productId`: 상품 ID (UUID)
  - `commentId`: 댓글 ID (UUID)

응답: 204 No Content

에러 응답 (404):

```json
{
  "message": "댓글을 찾을 수 없습니다."
}
```

#### 2.5 게시글 댓글 목록 조회

- URL: `GET /articles/:articleId/comments`
- 설명: 특정 게시글의 댓글 목록 조회
- 경로 파라미터:
  - `articleId`: 게시글 ID (UUID)

응답 예시:

```json
[
  {
    "id": "uuid",
    "content": "댓글 내용",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### 2.6 게시글 댓글 등록

- URL: `POST /articles/:articleId/comments`
- 설명: 게시글에 댓글 등록
- 경로 파라미터:
  - `articleId`: 게시글 ID (UUID)
- 요청 본문:

```json
{
  "content": "댓글 내용"
}
```

응답: 201 Created

```json
{
  "id": "uuid",
  "content": "댓글 내용",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z",
  "articleId": "article-uuid"
}
```

#### 2.7 게시글 댓글 수정

- URL: `PATCH /articles/:articleId/comments/:commentId`
- 설명: 게시글 댓글 수정
- 경로 파라미터:
  - `articleId`: 게시글 ID (UUID)
  - `commentId`: 댓글 ID (UUID)
- 요청 본문:

```json
{
  "content": "수정된 댓글 내용"
}
```

응답: 200 OK

```json
{
  "id": "uuid",
  "content": "수정된 댓글 내용",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T01:00:00.000Z",
  "articleId": "article-uuid"
}
```

#### 2.8 게시글 댓글 삭제

- URL: `DELETE /articles/:articleId/comments/:commentId`
- 설명: 게시글 댓글 삭제
- 경로 파라미터:
  - `articleId`: 게시글 ID (UUID)
  - `commentId`: 댓글 ID (UUID)

응답: 204 No Content

---

## 공통 에러 응답

### 404 Not Found

```json
{
  "message": "404 NOT FOUND"
}
```

### 500 Internal Server Error

```json
{
  "message": "500 SERVER ERROR"
}
```
