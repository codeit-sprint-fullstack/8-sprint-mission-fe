import { emailInput, passwordInput, nicknameInput, passwordCheckInput } from "./validation.js";

/**
 * 비밀번호 보기 버튼 클릭 시 비밀번호 표시 여부 토글
 * @returns {void}
 */
export const togglePasswordVisibility = () => {
  const toggleButtons = document.querySelectorAll(".input-password-toggle");
  const commonPath = "../assets/img/auth/";

  toggleButtons.forEach((toggleButton) => {
    const passwordInput = toggleButton.parentElement.querySelector(".input-password");

    toggleButton.addEventListener("click", () => {
      // input type 토글
      const passwordType = passwordInput.type === "password";
      passwordInput.type = passwordType ? "text" : "password";

      // 비밀번호 아이콘 토글
      const iconSrc = passwordType ? "visible-icon.svg" : "hidden-icon.svg";
      toggleButton.querySelector("img").src = `${commonPath}${iconSrc}`;
    });
  });
};

/**
 * 팝업 표시
 * @param {string} errorMessage 
 * @returns {void}
 */
export const showPopup = (errorMessage) => {
  const popup = document.querySelector("#popup");
  const content = popup.querySelector(".popup-content");
  content.textContent = errorMessage;
  popup.classList.add("active");
};

/**
 * 팝업 닫기
 * @returns {void}
 */
const closePopup = () => {
  const popup = document.querySelector("#popup");
  popup.classList.remove("active");
};

/**
 * 팝업 오버레이 클릭 시 팝업 닫기
 * @returns {void}
 */
export const closeClickOverlay = () => {
  const popup = document.querySelector("#popup");
  const popupBtn = document.querySelector(".popup-btn");

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  });

  popupBtn.addEventListener("click", closePopup);
};

/**
 * 에러 메시지 추가
 * @param {HTMLInputElement} inputElement 
 * @param {string} errorMessage 
 * @returns {void}
 */
export const showError = (inputElement, errorMessage) => {
  inputElement.classList.add("error");
  let messageElement = inputElement.parentElement.querySelector("p");

  if (!messageElement) {
    // 에러메시지가 존재하지 않을 경우 생성
    messageElement = document.createElement("p");
    inputElement.parentElement.appendChild(messageElement);
  }

  messageElement.textContent = errorMessage; // 에러메시지가 존재하더라도 다른 에러가 작성될 수 있으므로 if문 밖에 작성.
};

/**
 * 에러 메시지 제거
 * @param {HTMLInputElement} inputElement 
 * @returns {void}
 */
export const removeError = (inputElement) => {
  inputElement.classList.remove("error");
  const messageElement = inputElement.parentElement.querySelector("p");
  messageElement?.remove(); // 에러메시지가 존재하면 제거
};

/**
 * 버튼 활성화 여부 확인
 * @returns {boolean}
 */
export const isBtnDisabled = () => {
  const authInputs = [
    { element: emailInput },
    { element: passwordInput },
    { element: nicknameInput },
    { element: passwordCheckInput }
  ];

  /**
   * some 메서드를 통해 에러 클래스명을 가지고 있거나 값이 비어있는 경우 true를 반환
   * 모두 만족하지 않아야 false를 반환하고 disabled 속성이 비활성화 됨.
   */
  const isInputHasErrorOrEmpty = authInputs.some(({element}) => {
    return element?.classList.contains("error") || element?.value === "";
  });

  return isInputHasErrorOrEmpty;
};