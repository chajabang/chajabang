import { apiInstance } from "./index.js";

const api = apiInstance();

function getGugunList(params, success, fail) {
  api.get(`/house/gugun`, { params: params }).then(success).catch(fail);
}

function getDongList(params, success, fail) {
  api.get(`/house/dong`, { params: params }).then(success).catch(fail);
}

function getHouseList(params, success, fail) {
  api.get(`/house/houselist`, { params: params }).then(success).catch(fail);
}

function getHouseDetail(params, success, fail) {
  api.get(`/house/detail`, { params: params }).then(success).catch(fail);
}

function getHouseDealInfo(params, success, fail) {
  api.get(`/house/deal`, { params: params }).then(success).catch(fail);
}

export { getGugunList, getDongList, getHouseList, getHouseDetail, getHouseDealInfo };
