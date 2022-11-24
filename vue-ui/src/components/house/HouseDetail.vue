<template>
  <b-container>
    <b-row align-h="between">
      <b-col>
        <button type="button" class="btn btn-link px-0 py-0" @click="mvPrev">
          <i class="mdi mdi-chevron-left"></i>목록
        </button>
      </b-col>
      <b-col cols="2" v-if="check">
        <button type="button" class="btn btn-link px-0 py-0" @click="rmInterested">
          <i class="mdi mdi-heart"></i>
        </button>
      </b-col>
      <b-col cols="2" v-else>
        <button type="button" class="btn btn-link px-0 py-0" @click="addInterested">
          <i class="mdi mdi-heart-outline"></i>
        </button>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col
        ><h2>{{ house.apartmentName }}</h2></b-col
      >
    </b-row>
    <house-road-view></house-road-view>
    <b-row class="mt-3">
      <b-col>
        <b-alert show variant="secondary"
          >법정동 주소 : {{ house.dong }} {{ getDongJibun }}</b-alert
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-alert show variant="primary"
          >도로명 주소 : {{ house.roadName }} {{ getRoadNameJibun }}
        </b-alert>
      </b-col>
    </b-row>
    <house-deal-chart
      :width="300"
      :height="300"
      v-if="housedeals && housedeals.length != 0"
    ></house-deal-chart>
    <b-table-simple hover>
      <b-thead>
        <b-tr class="text-center bg-light bg-gradient">
          <b-th><b>층</b></b-th>
          <b-th><b>면적(m²)</b></b-th>
        </b-tr>
      </b-thead>
      <tbody>
        <house-info v-for="(info, index) in houseinfo" :key="index" :info="info" :house="house" />
      </tbody>
    </b-table-simple>
  </b-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HouseInfo from "@/components/house/HouseInfo";
import HouseDealChart from "@/components/house/HouseDealChart";
import HouseRoadView from "@/components/house/HouseRoadView";
import { checkInter, addInter, rmInter } from "@/api/house.js";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseDetail",
  data() {
    return {
      check: false,
    };
  },
  components: {
    HouseInfo,
    HouseDealChart,
    HouseRoadView,
  },
  created() {
    this.clearHouseDeals();
    this.checkSession();
    if (this.user.username) {
      const params = { id: this.user.id, aptCode: this.house.aptCode };
      checkInter(
        params,
        ({ status }) => {
          if (status == 200) {
            this.check = true;
          }
        },
        (error) => {
          // console.log(error.response.data);
        }
      );
    }
  },
  methods: {
    ...mapActions(houseStore, ["clearHouseDeals", "clearHouse"]),
    ...mapActions(memberStore, ["checkSession", "getUserInfo"]),
    mvPrev() {
      this.clearHouse();
      this.clearHouseDeals();
    },
    addInterested() {
      this.getUserInfo();
      if (this.user.username) {
        const params = { id: this.user.id, aptCode: this.house.aptCode };
        addInter(
          params,
          ({ status }) => {
            if (status == 200) {
              this.check = !this.check;
              alert("관심목록에 추가되었습니다!");
            }
          },
          (error) => {
            // console.log(error.response.data);
          }
        );
      }
    },
    rmInterested() {
      this.getUserInfo();
      if (this.user.username) {
        const params = { id: this.user.id, aptCode: this.house.aptCode };
        rmInter(
          params,
          ({ status }) => {
            if (status == 200) {
              this.check = !this.check;
              alert("관심목록에서 제거되었습니다.");
            }
          },
          (error) => {
            // console.log(error.response.data);
          }
        );
      }
    },
  },
  computed: {
    ...mapState(houseStore, ["house", "houseinfo", "housedeals"]),
    ...mapState(memberStore, ["user"]),
    getDongJibun() {
      if (this.house.bubun > 0) {
        return this.house.bonbun + "-" + this.house.bubun;
      } else {
        return this.house.bonbun;
      }
    },
    getRoadNameJibun() {
      if (this.house.roadNameBubun > 0) {
        return this.house.roadNameBonbun + "-" + this.house.roadNameBubun;
      } else {
        return this.house.roadNameBonbun;
      }
    },
  },
};
</script>

<style scoped>
h2 {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
