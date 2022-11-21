<template>
  <b-container>
    <b-row>
      <b-col
        ><h2>{{ house.apartmentName }}</h2></b-col
      >
    </b-row>
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

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  components: {
    HouseInfo,
    HouseDealChart,
  },
  created() {
    this.clearHouseDeals();
    console.log(this.housedeals);
  },
  methods: {
    ...mapActions(houseStore, ["clearHouseDeals"]),
  },
  computed: {
    ...mapState(houseStore, ["house", "houseinfo", "housedeals"]),
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
