"use strict";
import fillDealsTable from "./components/fillDealsTable.js";
import { updateTable } from "./models/updateTable.js";
import sortDeals from "./utils/sortDeals.js";

export const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://egorps4.amocrm.ru/api/v4/leads';
const refreshToken = 'def50200f01b43df55877a0dfd179bfe46ea1909a9ab21b2b0011a45c610fee8b7a4680103fa2f28f5e32086c3ce8509261e683681719e0e18962ee088a39545fb480cf2b832870acb94727aa1e70a254726024dc68123648336c1c360e96e1139a864d2c5bf93459d31c791969aaaf36cb316f3bdeabf211ee95e962d4b553568221d3904a1484ce4312123e7933886dbb8546cf4c2aae9a8306fad65cc63835cad67d34946f1d110bdba4c96a0462a92d887f61fc9eb8aa72573cdfd0921f36191520c107682093b1e43c01f3a337f86f057efa68f95dcaf6381eb169ff45afc589bc25aeb7b237972379ed6210b61906feceb46075368719aab7559d5999d0d1d582066c79a66bc7a92200c41a0bf89edcd9271710cf7a8f2cb7c0a5d5a24cfe99bc8d77a575a73b7fcdb8dc4a58bf42dd7c823ae8adab9f545198ba3b2724b347cd797e6185f790efd3fd0b1f569ec5b034e944eace6abdce4fcdc697a795d842c7266613848afc100e67a2fdab8277883b64907c716531e266bff036e9686e41c9dd985a08811e0f7af35805404499d2efb96393f9bed7bcf1dda605aca1030d8989a208600e8210b0f22caa3f0ee85b90a28e23fbc6c33a05c1c7f23e00641d0f8307a18bcbd4b8a6b1507d10160900e927872e2a2de31bda919fd2ceb7bc42e49bda3acea383efe7bc97d'
export const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNjYjM1MTJhNTg2ZDU2NWFiMTYyZjk4MjZmMjgwNDVlNjEzNWJiMGM2NTFkZTBjYzVhODYyNTNhNDAzOTExODgyZmZmYzhlYWQ2YjFkYzkyIn0.eyJhdWQiOiIyODdjMzE0ZC0wMGVhLTRhMTAtYjgwNy1lNzFiMmNhZTdjMTQiLCJqdGkiOiIzY2IzNTEyYTU4NmQ1NjVhYjE2MmY5ODI2ZjI4MDQ1ZTYxMzViYjBjNjUxZGUwY2M1YTg2MjUzYTQwMzkxMTg4MmZmZmM4ZWFkNmIxZGM5MiIsImlhdCI6MTcwOTE5ODc1MSwibmJmIjoxNzA5MTk4NzUxLCJleHAiOjE3MDkyODUxNTEsInN1YiI6IjEwNzI4OTYyIiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNTk2NjcwLCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJwdXNoX25vdGlmaWNhdGlvbnMiLCJmaWxlcyIsImNybSIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiOGNhODllMWYtYjNlNi00NzBlLTkyMGQtYTIzYTZlNmE3MjM3In0.m7rSeHT1r7CPUbLCZML2wF2dmu-zCv6RGTqAgKRF-cS48iH3laFZzDVucHZvTcOuAY-XIiO8fVEbjOIiwDmUsiFIDBKhnOgsb8TsZQdgXoj2al11mSVADw7a3sWv9tZeWbcYTglYHdPrMX61vaJaZMv-xu3QZVDl63PWDD4F3uGupUFuRehhf4DJxws7pPxsRdpBDXy6Yz6qCUzZvFvATeFyQ_iP57m7RSEKqc_BlbH1KhQVQ_NKMzApo-GdKpi-kORlrPNkqG0JGXaEiaS0DBcxcJ-rrksd3zLoOg7nWRqcS2DfGPXQoCFOKKApspXrrT5kcXoI-zdAaeORkpsudw';
export const baseUrl = `${proxyUrl}${targetUrl}`;
export const queries = {
  page: 1,
  limit: 2,
}
//Лимит сущностей в одном запросе
export const fetchAlllimit = 5;

const sortState = {
  dealName: 'desc',
  dealPrice: 'desc',
};


document.addEventListener("DOMContentLoaded", async () => {
  let globalDeals;

  try {
    globalDeals = await updateTable(baseUrl, queries, accessToken);
  } catch (error) {
    console.error('Ошибка при обновлении таблицы:', error);
  }

  document.querySelector('.form-select').addEventListener('change', async (event) => {
    const selectedValue = event.target.value;

    queries.limit = selectedValue === 'all' ? 'all' : Number(selectedValue);
    queries.page = 1;

    try {
      globalDeals = await updateTable(baseUrl, queries, accessToken);
    } catch (error) {
      console.error('Ошибка при обновлении таблицы:', error);
    }
  })

  document.querySelector('.pagination').addEventListener('click', async (event) => {
    event.preventDefault();
    const target = event.target;

    if (target.classList.contains('next-page')) {
      queries.page++;

      try {
        globalDeals = await updateTable(baseUrl, queries, accessToken);
      } catch (error) {
        console.error('Ошибка при обновлении таблицы:', error);
      }
    }

    if (target.classList.contains('prev-page')) {
      queries.page--;

      try {
        globalDeals = await updateTable(baseUrl, queries, accessToken);
      } catch (error) {
        console.error('Ошибка при обновлении таблицы:', error);
      }
    }
  })

  document.getElementById('tableHead').addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === "dealName" || target.id === "dealPrice") {
      document.querySelectorAll('.sortField').forEach(element => {
        if (element !== target) {
          element.classList.remove('active', 'rotate');
          sortState[element.id] = 'desc';
        }
      });

      const sortedDeals = sortDeals(globalDeals, target.id, sortState[target.id]);
      fillDealsTable(sortedDeals);

      sortState[target.id] = sortState[target.id] === 'asc' ? 'desc' : 'asc';

      target.classList.toggle('rotate', sortState[target.id] === 'desc');
      target.classList.add('active');
    }
  })
})