const popup = document.querySelector("#popup");
const popupContent = popup?.querySelector(".popup-content");
const popupBtn = popup?.querySelector(".popup-btn");

/**
 * 팝업 표시
 * @param {string} message 
 * @returns {void}
 */
export const showPopup = (message) => {
  if (!popup || !popupContent) return;
  popupContent.textContent = message;
  popup.classList.add("active");
};

/**
 * 팝업 닫기
 * @returns {void}
 */
const closePopup = () => {
  if (!popup) return;
  popup.classList.remove("active");
};

/**
 * 팝업 이벤트 초기화
 * @returns {void}
 */
export const initPopupEvents = () => {
  if (!popup || !popupBtn) return;

  popup.addEventListener("click", (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      closePopup();
    }
  });

  popupBtn.addEventListener("click", closePopup);
}; 