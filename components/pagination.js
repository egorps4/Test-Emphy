const pagination = (page, isLastPage) => {
    const paginationElement = document.querySelector('.pagination');
    paginationElement.innerHTML = '';

    const prevPageElement = document.createElement('li');
    prevPageElement.classList.add('page-item');
    if (page === 1) {
        prevPageElement.classList.add('disabled');
    }
    prevPageElement.innerHTML = `<a class="page-link prev-page" href="#">Предыдущая страница</a>`;
    paginationElement.appendChild(prevPageElement);

    const curPageElement = document.createElement('li');
    curPageElement.classList.add('page-item');
    curPageElement.innerHTML = `<a class="page-link" href="#">${page}</a>`;
    paginationElement.appendChild(curPageElement);

    const nextPageElement = document.createElement('li');
    nextPageElement.classList.add('page-item');
    if (isLastPage) {
        nextPageElement.classList.add('disabled');
    }
    nextPageElement.innerHTML = `<a class="page-link next-page" href="#">Следующая страница</a>`;
    paginationElement.appendChild(nextPageElement);
}