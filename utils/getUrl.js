const getUrl = (baseUrl, queries) => {
    const params = new URLSearchParams(queries).toString();
    const getUrl = new URL(baseUrl);
    getUrl.search = params;

    return getUrl;
}

export default getUrl;