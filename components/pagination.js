const pagination = (page, isLastPage) => {
    const paginationElement = document.querySelector('.pagination');
    let prevPageElement,
        nextPageElement,
        curPageElement;
    paginationElement.innerHTML = '';

    if (!prevPageElement) {
        prevPageElement = document.createElement('li');
        prevPageElement.classList.add('page-item');
        prevPageElement.innerHTML = `<a class="page-link prev-page" href="#">Предыдущая страница</a>`;
        paginationElement.appendChild(prevPageElement);
    }

    if (!curPageElement) {
        curPageElement = document.createElement('li');
        curPageElement.classList.add('page-item');
        curPageElement.innerHTML = `<a class="page-link" href="#">${page}</a>`;
        paginationElement.appendChild(curPageElement);
    } else {
        curPageElement.textContent = page;
    }

    if (!nextPageElement) {
        nextPageElement = document.createElement('li');
        nextPageElement.classList.add('page-item');
        nextPageElement.innerHTML = `<a class="page-link next-page" href="#">Следующая страница</a>`;
        paginationElement.appendChild(nextPageElement)
    }

    if (page === 1) {
        prevPageElement.classList.add('disabled');
    }

    if (isLastPage) {
        nextPageElement.classList.add('disabled');
    }
}

export default pagination;