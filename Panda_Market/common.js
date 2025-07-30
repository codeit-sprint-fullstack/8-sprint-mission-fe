// common.js
;(function(window) {
  /*비밀번호 보기/감추기 토글*/
  function togglePasswordVisibility(inputSel, iconSel) {
    const input = document.querySelector(inputSel);
    const icon  = document.querySelector(iconSel);
    if (!input || !icon) return;
    icon.addEventListener('click', () => {
      const isPwd = input.type === 'password';
      input.type  = isPwd ? 'text' : 'password';
      icon.src    = icon.src.includes('off')
        ? icon.src.replace('off', 'on')
        : icon.src.replace('on', 'off');
    });
  }

  /*에러 메시지 표시/숨김*/
  function showError(inputSel, errorSel, message) {
    const input = document.querySelector(inputSel);
    const err   = document.querySelector(errorSel);
    if (!input || !err) return;
    err.textContent = message;
    err.classList.remove('hidden');
    input.classList.add('invalid');
  }
  function hideError(inputSel, errorSel) {
    const input = document.querySelector(inputSel);
    const err   = document.querySelector(errorSel);
    if (!input || !err) return;
    err.classList.add('hidden');
    input.classList.remove('invalid');
  }

  /*단일 필드 유효성 검사*/
  function validateField(inputSel, errorSel, validator) {
    const input = document.querySelector(inputSel);
    if (!input) return false;
    const val = input.value.trim();
    const ok  = validator(val);
    if (!ok) showError(inputSel, errorSel, validator.message);
    else     hideError(inputSel, errorSel);
    return ok;
  }

  /*blur, input 이벤트에 유효성 연결*/
  function setupValidation(inputSel, errorSel, validator) {
    const el = document.querySelector(inputSel);
    if (!el) return;
    ['blur','input'].forEach(evt =>
      el.addEventListener(evt, () => validateField(inputSel, errorSel, validator))
    );
  }

  /*제출 버튼 활성화 관리*/
  function setupSubmitButton(buttonSel, isFormValid) {
    const btn = document.querySelector(buttonSel);
    if (!btn) return () => {};
    function update() {
      const ok = isFormValid();
      btn.disabled     = !ok;
      btn.classList.toggle('active', ok);
      btn.style.cursor = ok ? 'pointer' : 'not-allowed';
      btn.style.opacity= ok ? '1' : '0.5';
      return ok;
    }
    update();  // 초기 상태
    return update;
  }

  /*모달 열기 함수 반환*/
  function setupModal(modalSel, closeBtnSel) {
    const modal = document.querySelector(modalSel);
    const btn   = document.querySelector(closeBtnSel);
    if (modal && btn) btn.addEventListener('click', () => modal.classList.add('hidden'));
    return message => {
      if (!modal) return;
      const p = modal.querySelector('p');
      if (p) p.textContent = message;
      modal.classList.remove('hidden');
    };
  }

  // 전역에 노출
  window.CommonAuth = {
    togglePasswordVisibility,
    showError,
    hideError,
    validateField,
    setupValidation,
    setupSubmitButton,
    setupModal
  };
})(window);
