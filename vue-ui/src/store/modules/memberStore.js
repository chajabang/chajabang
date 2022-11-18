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
    values: {
      id: "",
      pw: "",
      confirmPw: "",
      email: "",
      username: "",
    },
  },
  getters: {},
  mutations: {
    CHECK_EMAIL(state, validateEmail) {
      if (!validateEmail.test(state.values.email) || !state.values.email) {
        state.valid.email = true;
      } else {
        state.valid.email = false;
      }
    },
    CHECK_PASSWORD(state, validatePassword) {
      if (!validatePassword.test(state.values.pw) || !state.values.pw) {
        state.valid.pw = true;
      } else {
        state.valid.pw = false;
      }
    },
    CHECK_CONFIRMPW(state) {
      if (state.values.pw !== state.values.confirmPw) {
        state.valid.confirmPw = true;
      } else {
        state.valid.confirmPw = false;
      }
    },
  },
  actions: {
    checkEmail({ commit }) {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
      commit("CEHCK_EMAIL", validateEmail);
    },
    checkPassword({ commit }) {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      commit("CHECK_PASSWORD", validatePassword);
    },
    checkConfirmPw({ commit }) {
      // 비밀번호 확인
      commit("CHECK_CONFIRMPW");
    },
  },
};

export default memberStore;
