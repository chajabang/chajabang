import {
  usernameCheck,
  userIdCheck,
  userRegister,
  userLogin,
  userLogout,
  userInfo,
  userPwConfirm,
  userUpdate,
  userDelete,
} from "@/api/member";
import router from "@/router";
const memberStore = {
  namespaced: true,
  state: {
    valid: {
      idOk: false,
      idFail: false,
      pw: false,
      confirmPw: false,
      email: false,
      usernameOk: false,
      usernameFail: false,
      loginFail: false,
    },
    message: {
      id: "",
      username: "",
    },
    user: {
      id: "",
      username: "",
      email: "",
    },
  },
  getters: {},
  mutations: {
    CHECK_EMAIL(state, { validateEmail, email }) {
      if (!validateEmail.test(email) || !email) {
        state.valid.email = true;
      } else {
        state.valid.email = false;
      }
    },
    CHECK_PASSWORD(state, { validatePassword, pw }) {
      if (!validatePassword.test(pw) || !pw) {
        state.valid.pw = true;
      } else {
        state.valid.pw = false;
      }
    },
    CHECK_CONFIRMPW(state, { pw, confirmPw }) {
      if (pw !== confirmPw) {
        state.valid.confirmPw = true;
      } else {
        state.valid.confirmPw = false;
      }
    },
    CHECK_ID_SUCCESS(state, id) {
      state.valid.idOk = true;
      state.valid.idFail = false;
      state.message.id = id;
    },
    CHECK_ID_FAIL(state, id) {
      state.valid.idOk = false;
      state.valid.idFail = true;
      state.message.id = id;
    },
    CHECK_USERNAME_SUCCESS(state, username) {
      state.valid.usernameOk = true;
      state.valid.usernameFail = false;
      state.message.username = username;
    },
    CHECK_USERNAME_FAIL(state, username) {
      state.valid.usernameOk = false;
      state.valid.usernameFail = true;
      state.message.username = username;
    },
    REGISTER_MEMBER(_, message) {
      alert(message);
      if (message == "회원가입 성공") {
        router.push("/");
      }
    },
    CLEAR_LOGIN_STATE(state) {
      state.valid.loginFail = false;
    },
    CLEAR_REGISTER_STATE(state) {
      state.valid.idOk = false;
      state.valid.idFail = false;
      state.valid.pw = false;
      state.valid.confirmPw = false;
      state.valid.email = false;
      state.valid.usernameOk = false;
      state.valid.usernameFail = false;
    },
    CLEAR_USER_STATE(state) {
      state.user.id = "";
      state.user.username = "";
    },
    LOGIN_SUCCESS(state, user) {
      state.valid.loginFail = false;
      state.user.id = user.id;
      state.user.username = user.username;
      router.push("/");
    },
    LOGIN_FAIL(state) {
      state.valid.loginFail = true;
    },
    PW_CONFIRM_FAIL(state) {
      state.valid.loginFail = true;
    },
    GET_MEMBER(state, user) {
      state.user.id = user.id;
      state.user.email = user.email;
      state.user.username = user.username;
      console.log("GETMEMBER 완료!!");
    },
    UPDATE_SUCCESS(state, user) {
      state.user.id = user.id;
      state.user.email = user.email;
      state.user.username = user.username;
    },
  },
  actions: {
    checkEmail({ commit }, email) {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
      commit("CHECK_EMAIL", { validateEmail, email });
    },
    checkPassword({ commit }, pw) {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      commit("CHECK_PASSWORD", { validatePassword, pw });
    },
    checkConfirmPw({ commit }, { pw, confirmPw }) {
      // 비밀번호 확인
      commit("CHECK_CONFIRMPW", { pw, confirmPw });
    },

    async checkId({ commit }, id) {
      // 아이디 중복 확인
      await userIdCheck(
        { id: id },
        ({ status }) => {
          if (status == 200) {
            commit("CHECK_ID_SUCCESS", id);
          }
        },
        async (error) => {
          if (error.response.status == 409) {
            commit("CHECK_ID_FAIL", id);
          } else {
            console.log("에러발생... ", error.response.status);
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async checkUsername({ commit }, username) {
      // 아이디 중복 확인
      await usernameCheck(
        { username: username },
        ({ status }) => {
          if (status == 200) {
            commit("CHECK_USERNAME_SUCCESS", username);
          }
        },
        async (error) => {
          if (error.response.status == 409) {
            commit("CHECK_USERNAME_FAIL", username);
          } else {
            console.log("에러발생... ", error.response.status);
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async registerMember({ commit }, member) {
      await userRegister(
        member,
        ({ status }) => {
          if (status == 201) {
            commit("REGISTER_MEMBER", "회원가입 성공");
          }
        },
        async (error) => {
          if (error.response.status == 400) {
            commit("REGISTER_MEMBER", "회원가입 실패!");
          } else {
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async loginMember({ commit }, member) {
      await userLogin(
        member,
        ({ data, status }) => {
          if (status == 200) {
            commit("LOGIN_SUCCESS", data);
          }
        },
        async (error) => {
          if (error.response.status == 400) {
            commit("LOGIN_FAIL");
          } else {
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async logoutMember({ commit }) {
      await userLogout(
        ({ status }) => {
          if (status == 200) {
            commit("CLEAR_USER_STATE");
            commit("LOGOUT_SUCCESS");
            router.push("/");
          }
        },
        async () => {
          alert("다시 로그인 해주세요.");
          commit("CLEAR_USER_STATE");
          commit("LOGOUT_SUCCESS");
          router.push("login");
        }
      );
    },
    async getMemberInfo({ commit }) {
      await userInfo(
        ({ data, status }) => {
          if (status == 200) {
            commit("GET_MEMBER", data);
          }
        },
        async () => {
          alert("다시 로그인 해주세요.");
          router.push("login");
        }
      );
    },
    async reLoginMember({ commit }, member) {
      await userPwConfirm(
        member,
        ({ status }) => {
          if (status == 200) {
            router.push("modify");
          }
        },
        async (error) => {
          if (error.response.status == 400) {
            commit("PW_CONFIRM_FAIL");
          } else if (error.response.status == 403) {
            alert("다시 로그인 해주세요.");
            router.push("login");
          } else {
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async updateMember({ commit }, member) {
      await userUpdate(
        member,
        ({ status }) => {
          if (status == 200) {
            commit("UPDATE_SUCCESS", member);
            router.push("/");
          }
        },
        async (error) => {
          if (error.response.status == 400) {
            commit("PW_CONFIRM_FAIL");
          } else if (error.response.status == 403) {
            alert("다시 로그인 해주세요.");
            router.push("login");
          } else {
            alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
    async deleteMember({ commit }) {
      await userDelete(
        ({ status }) => {
          if (status == 200) {
            commit("CLEAR_USER_STATE");
            router.push("/");
          }
        },
        async () => {
          alert("다시 로그인 해주세요.");
          router.push("login");
        }
      );
    },
  },
};

export default memberStore;
