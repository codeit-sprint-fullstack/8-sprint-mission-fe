import {
  setupPasswordToggle,
  setupFormValidation,
  showErrorModal,
  showErrorMessage,
  validatePassword,
  validatePasswordMatch,
  validateEmail,
  clearErrorMessage
} from './common.js';

import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle,
} from './ArticleService.js'

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct,
} from './ProductService.js';


document.addEventListener('DOMContentLoaded', () => {
  const USER_DATA = [
    { email: 'codeit1@codeit.com', password: "codeit101!" },
    { email: 'codeit2@codeit.com', password: "codeit202!" },
    { email: 'codeit3@codeit.com', password: "codeit303!" },
    { email: 'codeit4@codeit.com', password: "codeit404!" },
    { email: 'codeit5@codeit.com', password: "codeit505!" },
    { email: 'codeit6@codeit.com', password: "codeit606!" }
  ];

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const togglePassword = document.getElementById('togglePassword');
  const togglePasswordConfirm = document.getElementById('togglePasswordConfirm');
  const nicknameInput = document.getElementById('nickname');
  const passwordConfirmInput = document.getElementById('passwordConfirm');

  if (togglePassword) setupPasswordToggle('password', 'togglePassword');
  if (togglePasswordConfirm) setupPasswordToggle('passwordConfirm', 'togglePasswordConfirm');

  if (loginBtn) {
    setupFormValidation([emailInput, passwordInput], loginBtn);

    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (loginBtn.disabled) return;

      const isEmailValid = validateEmail(emailInput);
      const isPasswordValid = validatePassword(passwordInput);
      if (!isEmailValid || !isPasswordValid) {
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const user = USER_DATA.find(u => u.email === email);

      if (!user || user.password !== password) {
        showErrorModal('비밀번호가 일치하지 않습니다.');
        return;
      }

      location.href = './items.html';
    });
  }

  if (signupBtn) {
    setupFormValidation([emailInput, nicknameInput, passwordInput, passwordConfirmInput], signupBtn);

    signupBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (signupBtn.disabled) return;

      const email = emailInput.value.trim();
      const nickname = nicknameInput.value.trim();
      const password = passwordInput.value.trim();
      const confirmPassword = passwordConfirmInput.value.trim();

      if (!validateEmail(emailInput) || !validatePassword(passwordInput) || !validatePasswordMatch(passwordInput, passwordConfirmInput)) {
        return;
      }

      const isExisting = USER_DATA.some(u => u.email === email);
      if (isExisting) {
        showErrorModal('사용 중인 이메일입니다.');
        return;
      }

      showErrorModal('회원가입이 완료되었습니다.');
      setTimeout(() => {
        location.href ='./login.html';
      }, 1000);
    });

    emailInput.addEventListener('input', () => validateEmail(emailInput));
    passwordInput.addEventListener('input', () => validatePassword(passwordInput));
    passwordConfirmInput.addEventListener('input', () => validatePasswordMatch(passwordInput, passwordConfirmInput));
  }
});



async function runArticleAPIs() {
  try {
    const data = await getArticleList(1, 10, 'test');
    console.log('getArticleList 결과:', data);

    const firstArticle = data?.list?.[0];

    if (firstArticle) {
      const id = firstArticle.id;

      const article = await patchArticle(id, {
        title: '수정된 제목',
        content: '수정된 내용',
        image: 'https://example.com/updated.jpg'
      });
      console.log('patchArticle 결과:', article);
    } else {
      console.warn('Article 데이터가 없습니다. createArticle 먼저 실행하세요.');
    }

    const created = await createArticle({
      title: '테스트 제목',
      content: '테스트 내용',
      image: 'https://example.com/image.jpg'
    });
    console.log('createArticle 결과:', created);

  } catch (error) {
    console.error('Article API 에러:', error);
  }
}

async function runProductAPIs() {
  try {
    const list = await getProductList(1, 10, 'test');
    console.log('getProductList 결과:', list);

    const firstProduct = list?.list?.[0];

    if (firstProduct) {
      const id = firstProduct.id;

      const single = await getProduct(id);
      console.log('getProduct 결과:', single);

      const patched = await patchProduct(id, {
        name: '수정 상품명',
        description: '수정 설명',
        price: 9000,
        tags: ['수정태그'],
        images: ['https://example.com/updated-product.jpg']
      });
      console.log('patchProduct 결과:', patched);

      const deleted = await deleteProduct(id);
      console.log('deleteProduct 결과:', deleted);
    } else {
      console.warn('Product 데이터가 없습니다. createProduct 먼저 실행하세요.');
    }

    const created = await createProduct({
      name: '상품명',
      description: '상품 설명',
      price: 10000,
      tags: ['태그1', '태그2'],
      images: ['https://example.com/product.jpg']
    });
    console.log('createProduct 결과:', created);

  } catch (error) {
    console.error('Product API 에러:', error);
  }
}

runArticleAPIs();
runProductAPIs();