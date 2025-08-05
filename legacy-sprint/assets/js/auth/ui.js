import { getAuthElements } from "./dom.js";

/**
 * 비밀번호 보기 버튼 클릭 시 비밀번호 표시 여부 토글
 * @returns {void}
 */
export const togglePasswordVisibility = () => {
  const { toggleButtons } = getAuthElements();
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
    messageElement = document.createElement("p");
    inputElement.parentElement.appendChild(messageElement);
  }

  messageElement.textContent = errorMessage;
};

/**
 * 에러 메시지 제거
 * @param {HTMLInputElement} inputElement 
 * @returns {void}
 */
export const removeError = (inputElement) => {
  inputElement.classList.remove("error");
  const messageElement = inputElement.parentElement.querySelector("p");
  messageElement?.remove();
};

/**
 * 버튼 활성화 여부 확인
 * @param {HTMLInputElement[]} inputs - 검사할 입력 필드 배열
 * @returns {boolean}
 */
export const checkButtonDisabled = (inputs) => {
  return inputs.some(input => {
    return input?.classList.contains("error") || input?.value === "";
  });
};