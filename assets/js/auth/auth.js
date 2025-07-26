import { togglePasswordVisibility, closeClickOverlay } from "./ui.js";
import { handleSubmitEvent } from "./handler.js";
import { validateBlurEvent } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => { // dom이 로드되면 실행
  togglePasswordVisibility();
  handleSubmitEvent();
  validateBlurEvent();
  closeClickOverlay();
});
