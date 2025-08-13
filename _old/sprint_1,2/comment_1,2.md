# Sprint 1,2 피드백

## 총평
CSS, HTML, 이미지 파일을 체계적으로 분리해주셨고 심화 과정인 reset.css도 활용하셨네요!
다만, Figma에서 이미지를 잘못 받으셔서 복잡한 중첩구조로 인해 유지보수가 어려운 코드가 되었어요. 이 과정에서 의미 없는 클래스 명이 사용되었고요(frame, group-1 등)
Figma에서 레이어별로 이미지를 저장하지 말고 통으로 저장해서 사용하셔야할 것 같아요. 한땀한땀 고생하셨을 것 같은데 노력이 하신 모습이 느껴지네요 👍

### 개선사항 #1
```html
<link rel="stylesheet" href="./css/main/globals.css" />
<link rel="stylesheet" href="./css/main/styleguide.css" />
<link rel="stylesheet" href="./css/main/style.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@4.0.1/reset.min.css"/>
```

title 태그가 빠져있네요. 요구사항에 '판다마켓'으로 설정하라고 되어있었으니 참고해주세요!

### 개선사항 #2
```html
        <div class="gnb">
          <div class="frame-5">
            <div class="group-61">
              <a href=index.html rel="noopener noreferrer">
```
index.html 이 아닌 루트 '/' 로 이동하는 요구사항이 있었습니다.

### 개선사항 #3
```css
  flex-direction: row;
  justify-content: center;
  width: 100%;
  cursor: pointer;
```
현재 전체 페이지에서 cursor pointer가 잡히는데, 클릭 요소에만 pointer 추가하는 것이 좋을 것 같아요.

### 개선사항 #5
```html
              </a>
              </div>
            </div>
            <div class="text-wrapper">판다마켓</div>
```
'판다마켓' 글자도 로고의 포함이라는 생각이 들어서, 클릭 이벤트를 이미지를 포함하여 함께 해주는건 어떨까요?


### 개선사항 #6
```html
                  <div class="ellipse-wrapper"><div class="ellipse"></div></div>
                  <div class="view">
                    <div class="overlap-2">
                      <img class="vector" src="img/vector-10.svg" />
```
접근성을 위해 alt 텍스트를 추가해보시면 어떨까요? 참고로 프론트엔드 라이브러리인 React 에서는 img 태그에서 alt 속성을 강제하고 있습니다~

### 개선사항 #7
```html
              <a href="faq.html"><div class="text-wrapper-5">FAQ</div></a>
            </div>
            <div class="frame-7">
              <a href="https://www.facebook.com/" target="_blank"><img class="img-2" src="img/ic-facebook.svg" /></a>
```
다른 곳에서 잘 사용해주셨느넫, rel="noopener noreferrer" 을 이 부분에도 추가하면 좋을 것 같습니다.

### 개선사항 #8
```css
.screen .div {
  background-color: #fbfbfb;
  width: 1920px;
  height: 3608px;
```
고정값을 사용하게 된다면 해당 값 이하의 화면에서는 스크롤이 발생할 수 밖에 없을 것 같아요.
따라서 1920보다 작은 화면에서는 가운데 정렬이 안되고 있습니다!
또한 1920 이상으로 키웠을 때도 화면 색상이 적용되어야하는 요구사항이 있었는데 이 부분도 같이 고민해보시면 좋을 것 같아요. max-width 속성과 width: 100%, auto margin 속성을 활용해 보시면 어떨까요?

### 개선사항 #9
```css
  gap: 10px;
  padding: 32px 200px;
  position: absolute;
  top: 3448px;
```
블럭을 쌓듯이 컴포넌트를 위에서 아래로 쌓는 방식으로 구현하면 absolute를 사용하지 않아도 되어요. 특별한 경우가 아니라면 absolute는 document flow에서 벗어나기 때문에 잘 사용하지 않는 편이고 footer의 경우는 특히 사용하지 않을 것 같습니다~!

### 개선사항 #10
```html
            <div class="frame-3">
              <div class="frame-3">
                <div class="frame-4">
                  <div class="text-wrapper-2">이메일</div>
```
시멘틱한 사용을 위해 label 태그를 사용해보셔도 좋을 것 같아요. 특히 input 과 id 값을 맞출 수 있기 때문에 접근성 향상에 도움이 됩니다. 이메일 뿐만 아니라 비슷한 구조를 가진 곳에서는 label이 더 잘 맞을 것 같아요.