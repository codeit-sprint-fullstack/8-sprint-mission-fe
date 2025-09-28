const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 게시글 목록 조회
 * @param {Object} params - 쿼리 파라미터
 * @param {number} params.page - 페이지 번호
 * @param {number} params.limit - 페이지당 아이템 수
 * @param {string} params.sort - 정렬 방식 ('recent' | 'likes')
 * @param {string} params.search - 검색어
 * @returns {Promise<Object>} 게시글 목록 응답
 */
export const getArticles = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);
    if (params.sort) searchParams.append('sort', params.sort);
    if (params.search) searchParams.append('search', params.search);

    const url = `${baseURL}/articles?${searchParams.toString()}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('게시글 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 베스트 게시글 조회 (최신순 3개)
 * @returns {Promise<Object>} 베스트 게시글 응답
 */
export const getBestArticles = async () => {
  try {
    const response = await fetch(`${baseURL}/articles?limit=3&sort=recent`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('베스트 게시글 조회 실패:', error);
    throw error;
  }
};

/**
 * 게시글 상세 조회
 * @param {string|number} articleId - 게시글 ID
 * @returns {Promise<Object>} 게시글 상세 정보
 */
export const getArticleById = async (articleId) => {
  try {
    const response = await fetch(`${baseURL}/articles/${articleId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('게시글 상세 조회 실패:', error);
    throw error;
  }
};

/**
 * 게시글 등록
 * @param {Object} articleData - 게시글 데이터
 * @param {string} articleData.title - 게시글 제목
 * @param {string} articleData.content - 게시글 내용
 * @returns {Promise<Object>} 생성된 게시글 정보
 */
export const createArticle = async (articleData) => {
  try {
    const response = await fetch(`${baseURL}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('게시글 등록 실패:', error);
    throw error;
  }
};

/**
 * 게시글 검색
 * @param {string} searchTerm - 검색어
 * @param {Object} additionalParams - 추가 파라미터
 * @returns {Promise<Object>} 검색 결과
 */
export const searchArticles = async (searchTerm, additionalParams = {}) => {
  return getArticles({
    search: searchTerm,
    ...additionalParams
  });
};

/**
 * 게시글 목록 조회 (정렬 옵션 포함)
 * @param {string} sortBy - 정렬 방식 ('recent' | 'likes')
 * @param {Object} additionalParams - 추가 파라미터
 * @returns {Promise<Object>} 정렬된 게시글 목록
 */
export const getArticlesSorted = async (sortBy = 'recent', additionalParams = {}) => {
  return getArticles({
    sort: sortBy,
    ...additionalParams
  });
};

/**
 * 게시글 수정
 * @param {string|number} articleId - 게시글 ID
 * @param {Object} articleData - 수정할 게시글 데이터
 * @param {string} articleData.title - 게시글 제목
 * @param {string} articleData.content - 게시글 내용
 * @returns {Promise<Object>} 수정된 게시글 정보
 */
export const updateArticle = async (articleId, articleData) => {
  try {
    const response = await fetch(`${baseURL}/articles/${articleId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('게시글 수정 실패:', error);
    throw error;
  }
};

/**
 * 게시글 삭제
 * @param {string|number} articleId - 게시글 ID
 * @returns {Promise<Object>} 삭제 결과
 */
export const deleteArticle = async (articleId) => {
  try {
    const response = await fetch(`${baseURL}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error('게시글 삭제 실패:', error);
    throw error;
  }
};
