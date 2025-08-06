export   function getArticleList({page = 1, pageSize=10, keyword ='전자'}){
    const url = new URL( 'https://panda-market-api-crud.vercel.app/articles' );
    url.searchParams.append('page',page);
    url.searchParams.append('pageSize',pageSize);
    if(keyword){
        url.searchParams.append('keyword',keyword);
    }       
    return fetch(url.toString(), {
      method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ERROR! : ${res.status}`);
      }

      const contentType = res.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
          throw new Error('서버 응답이 JSON 형식이 아닙니다.');
      }
    })
    .catch((error) => {
      console.error('getArticleList 함수 에러 발생:', error.message);
      return null;
    });
}

export function getArticle(id) {
    if(!id){
        throw new Error('게시글 ID를 입력해주세요');
    }
    const url = `https://panda-market-api-crud.vercel.app/articles/${id}`;

    return fetch(url,{
      method:'GET',
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP ERROR! : ${res.status}`);
      }

      const contentType = res.headers.get('Content-Type');

      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
          throw new Error('서버 응답이 JSON 형식이 아닙니다.');
      }
    })
    .catch((error) => {
      console.error('getArticle 함수 에러 발생:', error.message);
      return null;
    });
}


export function createArticle({title,content,image}) {
    const url = 'https://panda-market-api-crud.vercel.app/articles';

    return fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify({title,content,image}),
    })
    .then((res) => {
      const contentType = res.headers.get('Content-Type');

      if (!res.ok) {
          throw new Error(`HTTP ERROR! : ${res.status}`);
        }
        
      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
        return res.text().then((text) => {
          console.warn('서버 응답이 JSON 형식이 아닙니다. 결과 본문 출력:');
          console.log('응답 본문:', text);
          return text;
        });
      }
    })
    .catch((error) => {
      console.error('createArticle 함수 에러 발생:', error.message);
      return null;
    });
}


export  function deleteArticle(id) {
    if (!id) {
        throw new Error('게시글 ID를 입력해주세요');
    }

    return fetch(`https://panda-market-api-crud.vercel.app/articles/${id}`,{
        method: 'DELETE',
    })
     .then((res)=>{
        const contentType = res.headers.get('Content-Type');

      if (!res.ok) {
        throw new Error(`HTTP ERROR! : ${res.status}`);
      }

      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error('deleteArticle 함수 에러 발생:', err.message);
      return null;
    });
}

