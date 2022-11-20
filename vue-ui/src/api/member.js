import { apiInstance } from "./index.js";

const api = apiInstance();

async function userLogin(data, success, fail) {
  await api.post(`/member/login`, JSON.stringify(data)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  await api.post(`/member/info/${userid}`).then(success).catch(fail);
}

async function userIdCheck(params, success, fail) {
  await api
    .get(`/member/id`, {
      params: params,
    })
    .then(success)
    .catch(fail);
}
async function usernameCheck(params, success, fail) {
  await api.get(`/member/username`, { params: params }).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.post(`/member/logout/${userid}`).then(success).catch(fail);
}
async function userRegister(data, success, fail) {
  await api.post("/member/register", data).then(success).catch(fail);
}

export { userLogin, findById, userIdCheck, usernameCheck, logout, userRegister };
