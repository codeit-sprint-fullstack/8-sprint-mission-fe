# Sprint 3 피드백

## 총평
많이 개선하셨고 깔끔하고 좋은 코드를 작성해주셨습니다! 모듈화와 캡슐화에 대해 고민하시는 듯 보여 이번에는 '관심사 분리'에 대해 생각해보면 어떨까 싶습니다. 지난 멘토링 시간에 해커톤에서 리액트를 사용할 것 같다고 하셔서 리액트 쪽 관심사 분리로 블로그 글을 가져와봤습니다. https://happysisyphe.tistory.com/62

고생 많으셨습니다~

### 개선사항 #1
```javascript
1. 페이지별 스크립트 분리 -> 함수는 공통의 파일에 저장하되, 이벤트 리스너는 각각의 파일에서 호출한다.
2. 이벤트 위임을 이용 -> 엘리먼트 전체에서 일어날 수 있는 이벤트를, 자식 엘리먼트 아디든 클릭할 때 발동
```jsx
document.addEventListener('click', function(e) {
```
1. 지금도 잘 나누어 주셨어요! 만약에 저라면 개인적으로 검증 로직을 각각 개별 구현하지 않고 Validator 클래스를 따로 만들어서 검증 로직을 관리하도록 할 것 같아요.
2. document.getElementById('login-button')로 특정 엘리먼트에 이벤트 리스너를 등록하는 방법이 있을 것 같아요. 이렇게 하면 조금 더 명확하고 직관적이지만, 여러 개의 엘리먼트에 이벤트 리스너를 등록해야 하는 경우에는 작성하신 방법으로 하는게 더 효율적일 수 있겠네요.

login.html 과 signup.html 에 중복 코드가 많이 있는데 템플릿화 하면 어떨까요?


### 개선사항 #2
```html
        <div class="input-item">
          <label for="passwordConfirmation">비밀번호 확인</label>
          <div class="input-wrapper">
            <input
```
비밀번호와 비밀번호 확인의 값이 같은지 확인하는 로직이 동작하지 않는 것 같아요~

### 개선사항 #3
```html
                  </div>
                </div>
              </div>
              <div class="btn-large"><div class="text-wrapper-6">로그인</div></div>
```
버튼의 경우 태그를 사용하여 더 시멘틱하게 하면 웹표준 향상에 도움이 될 것 같아요.

그리고 input에 에러가 있을 경우 버튼 비활성화 처리 되어야합니다!

왜 시멘틱하게 코드를 작성하면 좋을까요? 여기에 대해서 한 번쯤 고민해 보셔도 좋겠습니다.

https://seo.tbwakorea.com/blog/what-is-semantic-tag/

### 개선사항 #4
```html
    <meta property="og:image" content="https://gentle-hummingbird-9868af.netlify.app/images/home/bottom-banner-image.png" />
    <meta property="og:url" content="https://gentle-hummingbird-9868af.netlify.app/login.html" />
    <meta property="og:locale" content="ko_KR" />
    <meta property="og:type" content="Shopping" />
```

Shopping이라는 타입을 잘 본 기억이 없어서 대표적으로 많이 쓰는 타입들 한 번 확인해보셔도 좋을 것 같아요. https://codingeverybody.kr/html-open-graph-protocol/#og-type-details

### 개선사항 #5
```html

  }

  footer {
```
모바일 사이즈의 푸터의 정렬을 맞춰보는 코드를 추가하면 어떨까요?