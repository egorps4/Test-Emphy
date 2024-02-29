import getUrl from "../utils/getUrl.js";

const fetchDeals = async (baseUrl, queries, accessToken) => {
    const url = getUrl(baseUrl, queries);

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Ошибка при получении сделок:", error);
        return [];
    }
}

export default fetchDeals;

