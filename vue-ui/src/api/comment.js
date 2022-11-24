import { apiInstance } from "./index.js";

const api = apiInstance();

function listComment(param, success, fail) {
  api.get(`/comment/getAll`, { params: param }).then(success).catch(fail);
}

function writeComment(data, success, fail) {
  api.post(`/comment/write`, data).then(success).catch(fail);
}

function getComment(param, success, fail) {
  api.get(`/comment/view`, { params: param }).then(success).catch(fail);
}

function modifyComment(data, success, fail) {
  api.post(`/comment/update`, data).then(success).catch(fail);
}

function deleteComment(param, success, fail) {
  api.get(`/comment/delete`, { params: param }).then(success).catch(fail);
}

export { listComment, writeComment, getComment, modifyComment, deleteComment };
