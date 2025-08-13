# Sprint 4 피드백

## 총평
역시, 고수의 향기가 물씬 풍기는 코드였습니다!

지금처럼만 하신다면 쑥쑥 성장하실꺼 같아서 기대되네요!! 고생하셨습니다 :)

### 개선사항 #1
```javascript
// default export 선언
const article_service = {
    getArticleList,
    getArticle,
    createArticle,
    patchArticle,
    deleteArticle
}
export default article_service;
```
코드레벨 최상단에는 import를 , 가장 하단에는 export 코드를 작성하는게 일반적입니다 :)

지금의 코드는 아래와 같은 문제점이 있을수 있어요!

가독성 저해 : 해당 파일의 코드를 읽는 사람입장에서 보면 정의도 안된 함수들을 먼저 접하게 됩니다 😢
호이스팅에 의존하는 코드 : 지금 코드에서는 호이스팅으로 인해 문제가 발생하진 않았지만 호이스팅 의존성 = 나쁜 코딩 습관이 될 수 있어요!

### 개선사항 #2
```javascript
    return await fetch(url)
        .then(response => {
            if (!response.ok) {
                console.error(response.status)
            }
            return response.json()
        })
        .catch(error => console.error(error));
```
async/await와 프로미스 체이닝 ( .then ) 혼용이 된 패턴을 사용하셨어요!

해당 코드는 다음과 같은 문제가 있습니다.

이중 Promise 래핑
fetch()는 이미 Promise를 반환
async 함수도 자동으로 Promise를 반환
await로 Promise를 unwrap하고 다시 .then()으로 wrap하는 무의미한 코드
에러처리
지금 코드에서 respose.ok가 정상이 아닐때 콘솔만 찍고 있는데, 실제 운영레벨이라면 throw new Error를 통해 에러핸들링을 해줘야 합니다.
추가로 분기문에서 if문에서 에러가 확인되었어도 response.json()을 시도하기때문에 정상적이지 않은 상황에서 호출되면 에러가 발생할꺼라 예상되네요!
프로미스 체이닝을 통해서 함수를 구현한다면 아래의 샘플코드처럼 작성되면 좋습니다.
```javascript
function getArticleList(params) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Failed to fetch articles:', error);
            throw error;
        });
}
```

### 개선사항 #3
```javascript
// Article 목록을 가져오는 함수
async function getArticle() {
    const url = new URL("https://panda-market-api-crud.vercel.app/articles");
```
실용적인 팁으로 API요청의 BaseURL ( https://panda-market-api-crud.vercel.app ) 이 모두 같은 상황이네요!

이런경우 테스트때문에 URL이 변경되난 상황을 고려한다면 해당 BaseURL은 상수로 빼놓고 처리하면 모든 코드를 수정하지 않아도 되서 수정에 용이해요! ( 추후에 환경변수 개념을 배우신다면 환경변수로 처리되면 더욱 좋겠죠 ! )

### 개선사항 #4
아마 Sprint 요구사항때문에 개별함수로 하나씩 만드셨을꺼라 생각이되는데,

클린코드 관점에서 바라보면 클래스 방식으로 만들었다면 더욱더 좋을꺼 같아요!

```javascript
class ArticleService {
    async getArticles() { ... }
    async getArticle() { ... }
}

export default new ArticleService();
```

### 개선사항 #5
```javascript
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(article_data),
        headers: {'Content-Type': 'application/json'}
    })
```

개발 성향에 차이일순 있는데, 개인적으론 함수의 인자값이 길어지면 가독성이 떨어진다고 생각해요!

```javascript

const option = {
  method: 'POST',
  body: JSON.stringify(article.data),
  headers: {'Content-Type': 'application/json' }
}

return fetch(url, option)
   .then(...)
```

위의 코드처럼 코드가 큰 인자값은 따로 명확하게 변수로 선언해서 함수에 넣어주면 더 가독성이 좋은거 같더라구요! ㅎㅎ

### 개선사항 #6
```javascript
    pagesize: 10,
    keyword: "",
};
const article_response_1 = await article_service.getArticleList(article_list_data)
```

await 코드, 특히나 통신호출을 하는 함수라면 운영레벨에서 try ~ catch는 필수입니다!

만약,, 네트워크가 일시적으로 불안정하거나 서버의 이슈로 해당 함수에서 에러가 발생하게 되면, 아래 코드들 모두 실행이 되지 않고 종료될꺼에요!