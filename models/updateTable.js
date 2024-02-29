import fetchDeals from "../api/fetchDealsApi.js"
import pagination from "../components/pagination.js";
import fillDealsTable from "../components/fillDealsTable.js";
import updateLoaderState from "../utils/updateLoaderState.js";
import formateDeals from "../utils/formateDeals.js"
import { fetchAlllimit } from "../app.js";

async function fetchAllDeals(baseUrl, queries, token, allDeals = [], milisec) {
    return new Promise(async (resolve, reject) => {
        try {
            updateLoaderState(true, 'Загрузка... Пожалуйста, подождите');

            const data = await fetchDeals(baseUrl, queries, token);
            allDeals = [...allDeals, ...data._embedded.leads];

            if (data._links.next) {
                queries.page++;
                setTimeout(async () => {
                    try {
                        const moreDeals = await fetchAllDeals(baseUrl, queries, token, allDeals, milisec);
                        resolve(moreDeals);
                    } catch (error) {
                        reject(error);
                    }
                }, milisec);
            } else {
                const formatedDeals = formateDeals(allDeals);

                pagination(1, true);
                fillDealsTable(formatedDeals);

                queries.page = 1;
                queries.limit = 'all';

                updateLoaderState(false);
                resolve(formatedDeals);
            }
        } catch (error) {
            console.log('Произошла ошибка запроса на получение всех сделок:', error);
            updateLoaderState(false, 'Произошла ошибка запроса, пожалуйста, попробуйте чуть позже.');

            reject([]);
        }
    });
}

export const updateTable = async (baseUrl, queries, accessToken) => {
    updateLoaderState(true, 'Загрузка... Пожалуйста, подождите');

    if (queries.limit === 'all') {
        queries.limit = fetchAlllimit;
        return await fetchAllDeals(baseUrl, queries, accessToken, [], 500);
    } else {
        try {
            const data = await fetchDeals(baseUrl, queries, accessToken);
            const formatedDeals = formateDeals(data._embedded.leads);

            pagination(data._page, !data._links.next);
            fillDealsTable(formatedDeals);
            updateLoaderState(false);

            return formatedDeals;
        } catch (error) {
            console.log('Произошла ошибка запроса на получение сделок:', error);
            updateLoaderState(false, 'Произошла ошибка запроса, пожалуйста, попробуйте чуть позже.');
            
            return [];
        }
    }
}