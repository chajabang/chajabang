import { apiInstance } from "./index.js";

const api = apiInstance();

function listArticle(param, success, fail) {
  api.get(`/board/selectAll`, { params: param }).then(success).catch(fail);
}

function writeArticle(article, success, fail) {
  api.post(`/board/write`, article).then(success).catch(fail);
}

function getArticle(param, success, fail) {
  api.get(`/board/view`, { params: param }).then(success).catch(fail);
}

function modifyArticle(article, success, fail) {
  api.post(`/board/update`, article).then(success).catch(fail);
}

function deleteArticle(param, success, fail) {
  api.get(`/board/delete`, { params: param }).then(success).catch(fail);
}

export { listArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
