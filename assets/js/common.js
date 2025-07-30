// 커스텀 알림창
function showCustomAlert(msg, callback) {
  const prev = document.querySelector(".custom-alert-overlay");
  if (prev) prev.remove();

  const overlay = document.createElement("div");
  overlay.className = "custom-alert-overlay";

  const box = document.createElement("div");
  box.className = "custom-alert-box";

  const p = document.createElement("p");
  p.textContent = msg;
  p.className = "custom-alert-message";

  const btn = document.createElement("button");
  btn.textContent = "확인";
  btn.className = "custom-alert-button";
  btn.addEventListener("click", () => {
    overlay.remove();
    if (callback) callback();
  });

  box.append(p, btn);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}

// 에러 표시 / 제거
function showError(input, msg) {
  removeError(input);
  const err = document.createElement("div");
  err.className = "error-message";
  err.textContent = msg;
  input.parentNode.appendChild(err);
}

function removeError(input) {
  const err = input.parentNode.querySelector(".error-message");
  if (err) err.remove();
}

// 이메일 유효성 검사
function validateEmail(input) {
  const val = input.value.trim();
  if (!val) {
    showError(input, "이메일을 입력해주세요.");
    return false;
  }
  if (!/^\S+@\S+\.\S+$/.test(val)) {
    showError(input, "올바른 이메일 형식이 아닙니다.");
    return false;
  }
  removeError(input);
  return true;
}

// 비밀번호 토글
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".toggle-password").forEach(btn => {
    const eyeClose = "/assets/images/eye(close).svg";
    const eyeOpen = "/assets/images/eye(open).svg";
    const img = btn.querySelector("img");
    const input = btn.previousElementSibling;

    if (!input || input.tagName !== "INPUT" || (input.type !== "password" && input.type !== "text")) return;

    btn.addEventListener("click", () => {
      if (input.type === "password") {
        input.type = "text";
        img.src = eyeOpen;
        img.alt = "비밀번호 보이기";
        btn.setAttribute("aria-label", "비밀번호 숨기기");
      } else {
        input.type = "password";
        img.src = eyeClose;
        img.alt = "비밀번호 숨기기";
        btn.setAttribute("aria-label", "비밀번호 보기");
      }
    });
  });
});
