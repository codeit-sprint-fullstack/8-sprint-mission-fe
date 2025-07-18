document.querySelectorAll('.input-password').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const icon = wrapper.querySelector('img');

    icon.addEventListener('click', () => {
        input.type = input.type === 'password' ? 'text' : 'password';
    });
});