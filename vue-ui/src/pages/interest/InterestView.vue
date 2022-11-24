<template>
  <div>
    <div class="page-header">
      <h3 class="page-title text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="mdi mdi-home-map-marker"></i>
        </span>
        관심있는 집을 찾아방
      </h3>
    </div>
    <b-row>
      <b-card>
        <b-col>
          <house-detail class="card-body" v-if="house"></house-detail>
          <house-list class="card-body" v-else></house-list>
        </b-col>
      </b-card>
      <b-col>
        <house-map></house-map>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getInterestList } from "@/api/house.js";
import HouseList from "@/components/house/HouseList";
import HouseDetail from "@/components/house/HouseDetail";
import HouseMap from "@/components/house/HouseMap";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "InterestView",
  components: {
    HouseList,
    HouseDetail,
    HouseMap,
  },
  created() {
    this.clearHouse();
    const params = { id: this.user.id };
    getInterestList(
      params,
      ({ data }) => {
        this.setHouses(data);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    ...mapActions(houseStore, ["clearHouse", "setHouses"]),
  },
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapState(memberStore, ["user"]),
  },
};
</script>

<style scope>
.card .card-body {
  padding: 0.5rem;
}
</style>
