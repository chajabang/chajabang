const memberStore = {
  namespaced: true,
  state: {
    valid: {
      id: false,
      pw: false,
      confirmPw: false,
      email: false,
      username: false,
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
  },
};

export default memberStore;
