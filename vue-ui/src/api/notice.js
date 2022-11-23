import { apiInstance } from "./index.js";

const api = apiInstance();

function listNotice(param, success, fail) {
  api.get(`/notice/selectAll`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/notice/write`, article).then(success).catch(fail);
}

function getArticle(param, success, fail) {
  api.get(`/notice/view`, { params: param }).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.post(`/notice/update`, article).then(success).catch(fail);
}

function deleteArticle(param, success, fail) {
  api.get(`/notice/delete`, { params: param }).then(success).catch(fail);
}

export { listNotice, writeArticle, getArticle, modifyArticle, deleteArticle };
