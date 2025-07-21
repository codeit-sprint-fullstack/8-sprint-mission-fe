export async function showModal(message = '모달 내용입니다.') {
    try {
        const response = await fetch('/modal/modal.html');
        const html = await response.text();
        const container = document.getElementById('modal-container');
        container.innerHTML = html;

        const modal = container.querySelector('.modal-body');
        modal.classList.add('active');

        const messageElement = modal.querySelector('#modal-message');
        if (messageElement) {
            messageElement.textContent = message;
        }

        const confirmBtn = modal.querySelector('button');
        confirmBtn.addEventListener('click', () => {
            container.innerHTML = '';
        });
    } catch (err) {
        console.error('모달 로딩 실패:', err);
    }
}