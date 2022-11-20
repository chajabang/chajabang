import { usernameCheck, userIdCheck, userRegister, userLogin } from "@/api/member";
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
    },
    message: {
      id: "",
      username: "",
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
        ({ status }) => {
          if (status == 200) {
            alert("로그인 성공");
            commit("REGISTER_MEMBER", "회원가입 성공");
          }
        },
        async (error) => {
          if (error.response.status == 400) {
            alert("로그인 실패");
            // commit("REGISTER_MEMBER", "회원가입 실패!");
          } else {
            // alert("에러! 잠시후에 시도해주세요.");
          }
        }
      );
    },
  },
};

export default memberStore;
