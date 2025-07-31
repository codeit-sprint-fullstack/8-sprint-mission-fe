import { togglePasswordVisibility } from "./ui.js";
import { initEventHandlers } from "./handler.js";
import { initPopupEvents } from "./popup.js";

document.addEventListener("DOMContentLoaded", () => {
  togglePasswordVisibility();
  initEventHandlers();
  initPopupEvents();
});
