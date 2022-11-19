import { getGugunList, getDongList } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [
      { value: null, text: "시도" },
      { value: "서울특별시", text: "서울특별시" },
      { value: "부산광역시", text: "부산광역시" },
      { value: "인천광역시", text: "인천광역시" },
      { value: "광주광역시", text: "광주광역시" },
      { value: "대전광역시", text: "대전광역시" },
      { value: "대구광역시", text: "대구광역시" },
      { value: "울산광역시", text: "울산광역시" },
      { value: "세종특별자치시", text: "세종특별자치시" },
      { value: "제주특별자치도", text: "제주특별자치도" },
      { value: "경기도", text: "경기도" },
      { value: "강원권", text: "강원권" },
      { value: "충청북도", text: "충청북도" },
      { value: "충청남도", text: "충청남도" },
      { value: "전라북도", text: "전라북도" },
      { value: "전라남도", text: "전라남도" },
      { value: "경상북도", text: "경상북도" },
      { value: "경상남도", text: "경상남도" },
    ],
    guguns: [{ value: null, text: "구군" }],
    dongs: [{ value: null, text: "동" }],
  },
  mutations: {
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구군" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동" }];
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun, text: gugun });
      });
    },
    SET_DONG_LIST(state, dongs) {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong, text: dong });
      });
    },
  },
  actions: {
    clearGugunList({ commit }) {
      commit("CLEAR_GUGUN_LIST");
    },
    clearDongList({ commit }) {
      commit("CLEAR_DONG_LIST");
    },
    getGugun({ commit }, sido) {
      const params = { sido: sido };
      getGugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong({ commit }, { sido, gugun }) {
      const params = { sido: sido, gugun: gugun };
      getDongList(
        params,
        ({ data }) => {
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default houseStore;
