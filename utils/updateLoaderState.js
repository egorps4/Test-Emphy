export const updateLoaderState = (isLoading, message = '') => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.innerHTML = `
            <div class="spinner-border me-2" aria-hidden="true"></div>
            <strong role="status">${message}</strong>
        `;
    } else {
        loader.innerHTML = message;
        if (message.includes('ошибка')) {
            loader.classList.add('text-danger');
        } else {
            loader.classList.remove('text-danger');
        }
    }
}

export default updateLoaderState;