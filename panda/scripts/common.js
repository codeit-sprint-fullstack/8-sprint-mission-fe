export function setupPasswordToggle(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input && icon) {
    icon.addEventListener("click", () => {
      const isVisible = input.type === 'text';
      input.type = isVisible ? 'password' : 'text';
      icon.src = isVisible ? './images/home/eye.svg' : './images/home/eye-open.svg';
    });
  }
}

export function setupFormValidation(inputs, button) {
  function checkInputsValid() {
    let isValid = true;

    for (const input of inputs) {
      const value = input.value.trim();
      const type = input.getAttribute('type');
      const name = input.getAttribute('name') || input.id;

      if (value === '') {
        isValid = false;

        continue;
      }

      if (type === 'email' || name === 'email') {
        isValid = validateEmail(input) && isValid;
      } else if (name === 'password') {
        isValid = validatePassword(input) && isValid;
      } else if (name === 'passwordConfirm' || input.id === 'passwordConfirm') {
        const pwInput = document.getElementById('password');
        isValid = validatePasswordMatch(pwInput, input) && isValid;
      } 
    }

    button.disabled = !isValid;
    button.style.backgroundColor = isValid ? '#3692ff' : '#9ca3af';
  }

  inputs.forEach(input => {
    input.addEventListener('input', checkInputsValid);
  });

  checkInputsValid();
}

export function showErrorModal(message) {
  const existingOverlay = document.querySelector('.custom-error-overlay');
  const existingModal = document.querySelector('.custom-error-modal');
  if (existingOverlay) existingOverlay.remove();
  if (existingModal) existingModal.remove();

  const overlay = document.createElement('div');
  overlay.className = 'custom-error-overlay';

  const modal = document.createElement('div');
  modal.className = 'custom-error-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <p>${message}</p>
      <button class="modal-close">확인</button>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(modal);

  modal.querySelector('.modal-close').addEventListener('click', () => {
    overlay.remove();
    modal.remove();
  });
}

export function showErrorMessage(input, message) {
  let errorEl = input.parentElement.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.style.color = '#f74747';
    errorEl.style.fontSize = '15px';
    errorEl.style.marginTop = '8px';
    input.parentElement.appendChild(errorEl);
  }
  errorEl.textContent = message;
  input.style.border = '1px solid #f74747';
}

export function clearErrorMessage(input) {
  const errorEl = input.parentElement.querySelector('.error-message');
  if (errorEl) errorEl.remove();
  input.style.border = '';
}

export function validateEmail(input) {
  const value = input.value.trim();
  if (value === '') {
    showErrorMessage(input, '이메일을 입력해주세요.');
    return false;
  } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(value)) {
    showErrorMessage(input, '잘못된 이메일 형식입니다.');
    return false;
  } else {
    clearErrorMessage(input);
    return true;
  }
}

export function validatePassword(input) {
  const value = input.value.trim();
  if (value === '') {
    showErrorMessage(input, '비밀번호를 입력해주세요');
    return false;
  } else if (value.length < 8) {
    showErrorMessage(input, '비밀번호를 8자 이상 입력해주세요');
    return false;
  } else {
    clearErrorMessage(input);
    return true;
  }
}

export function validatePasswordMatch(pwInput, pwConfirmInput) {
  const pw = pwInput.value.trim();
  const pwConfirm = pwConfirmInput.value.trim();
  if (pw !== pwConfirm) {
    showErrorMessage(pwConfirmInput, '비밀번호가 일치하지 않습니다.');
    return false;
  } else {
    clearErrorMessage(pwConfirmInput);
    return true;
  }
}