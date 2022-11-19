import { apiInstance } from "./index.js";

const api = apiInstance();

function getGugunList(params, success, fail) {
  api
    .get(`/house/gugun`, { params: params })
    .then(success)
    .catch(fail);
}

function getDongList(params, success, fail) {
  api
    .get(`/house/dong`, { params: params })
    .then(success)
    .catch(fail);
}

export { getGugunList, getDongList };
