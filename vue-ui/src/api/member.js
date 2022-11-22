import { apiInstance } from "./index.js";

const api = apiInstance();

async function userLogin(data, success, fail) {
  await api.post("/member/login", data).then(success).catch(fail);
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

async function userLogout(success, fail) {
  await api.post(`/member/logout`).then(success).catch(fail);
}
async function userRegister(data, success, fail) {
  await api.post("/member/register", data).then(success).catch(fail);
}
async function userPwConfirm(data, success, fail) {
  await api.post("/member/pwconfirm", data).then(success).catch(fail);
}
async function userUpdate(data, success, fail) {
  await api.post("/member/update", data).then(success).catch(fail);
}
async function userDelete(success, fail) {
  await api.post("/member/delete").then(success).catch(fail);
}
async function sessionCheck(success, fail) {
  await api.get(`/member/check`).then(success).catch(fail);
}

export {
  userLogin,
  userIdCheck,
  usernameCheck,
  userLogout,
  userRegister,
  userPwConfirm,
  userUpdate,
  userDelete,
  sessionCheck,
};
