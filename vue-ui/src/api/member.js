import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, success, fail) {
  await api.post(`/member/login`, JSON.stringify(user)).then(success).catch(fail);
}

async function findById(userid, success, fail) {
  await api.post(`/member/info/${userid}`).then(success).catch(fail);
}

async function userIdCheck(id, success, fail) {
  await api
    .get(`/member/id`, {
      params: { id },
    })
    .then(success)
    .catch(fail);
}
async function usernameCheck(username, success, fail) {
  await api.get(`/member/username`, { params: { username } }).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.post(`/member/logout/${userid}`).then(success).catch(fail);
}
async function userRegister(member, success, fail) {
  let data = {
    id: member.id,
    pw: member.pw,
    username: member.username,
    email: member.email,
  };
  console.log(data);
  await api.post("/member/register", JSON.stringify(data)).then(success).catch(fail);
}

export { login, findById, userIdCheck, usernameCheck, logout, userRegister };
