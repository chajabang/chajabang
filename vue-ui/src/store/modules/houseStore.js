import {
  getGugunList,
  getDongList,
  getHouseList,
  getHouseDetail,
  getHouseDealInfo,
} from "@/api/house.js";
import router from "../../router";

const houseStore = {
  namespaced: true,
  state: {
    sidoState: null,
    gugunState: null,
    dongState: null,
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
    houses: [],
    houseinfo: [],
    housedeals: [],
    house: null,
  },
  mutations: {
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구군" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동" }];
    },
    CLEAR_HOUSE(state) {
      state.house = null;
    },
    CLEAR_HOUSE_DEALS(state) {
      state.housedeals = [];
    },
    SET_SIDO(state, sido) {
      state.sidoState = sido;
    },
    SET_GUGUN(state, gugun) {
      state.gugunState = gugun;
    },
    SET_DONG(state, dong) {
      state.dongState = dong;
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
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_HOUSE_DETAIL(state, { houseinfo, house }) {
      state.houseinfo = houseinfo;
      state.house = house;
    },
    SET_HOUSE_DEALS(state, housedeals) {
      housedeals.forEach((house) => {
        state.housedeals.push({
          dealAmount: parseInt(house.dealAmount.replace(",", "")),
          year: house.dealYear,
          month: house.dealMonth,
        });
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
    clearHouse({ commit }) {
      commit("CLEAR_HOUSE");
    },
    clearHouseDeals({ commit }) {
      commit("CLEAR_HOUSE_DEALS");
    },
    getGugun({ commit }, sido) {
      const params = { sido: sido };
      getGugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        ({ response }) => {
          alert(response.data);
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
        ({ response }) => {
          alert(response.data);
        }
      );
    },
    mvHouseView() {
      router.push({ name: "houseview" });
    },
    getHouses({ commit }, { sido, gugun, dong }) {
      commit("SET_SIDO", sido);
      commit("SET_GUGUN", gugun);
      commit("SET_DONG", dong);
      const params = { sido, gugun, dong };
      getHouseList(
        params,
        ({ data }) => {
          commit("CLEAR_HOUSE");
          commit("SET_HOUSE_LIST", data);
        },
        ({ response }) => {
          alert(response.data);
        }
      );
    },
    getHouse({ commit }, house) {
      const params = { aptCode: house.aptCode };
      getHouseDetail(
        params,
        ({ data }) => {
          commit("SET_HOUSE_DETAIL", { houseinfo: data, house: house });
        },
        ({ response }) => {
          alert(response.data);
        }
      );
    },
    getHouseDeal({ commit }, { info, house }) {
      const params = { aptCode: house.aptCode, floor: info.floor, area: info.area };
      getHouseDealInfo(
        params,
        ({ data }) => {
          commit("SET_HOUSE_DEALS", data);
        },
        ({ response }) => {
          alert(response.data);
        }
      );
    },
  },
};

export default houseStore;
