const formateTimestampToDate = (timestamp) => {
    const createdAt = new Date(timestamp * 1000)

    const day = createdAt.getDate().toString().padStart(2, '0');
    const month = (createdAt.getMonth() + 1).toString().padStart(2, '0');
    const year = createdAt.getFullYear();

    const hours = createdAt.getHours().toString().padStart(2, '0');
    const minutes = createdAt.getMinutes().toString().padStart(2, '0');
    const seconds = createdAt.getSeconds().toString().padStart(2, '0');

    const formattedDateTime = `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

export default formateTimestampToDate;