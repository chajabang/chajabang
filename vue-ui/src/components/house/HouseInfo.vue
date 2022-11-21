<template>
  <b-tr @click="getHouseDealInfo" class="text-center" style="cursor: pointer">
    <b-td>{{ info.floor }}</b-td>
    <b-td>{{ info.area }}</b-td>
  </b-tr>
</template>

<script>
import { mapActions } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseInfo",
  props: {
    info: Object,
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["clearHouseDeals", "getHouseDeal"]),
    getHouseDealInfo() {
      this.clearHouseDeals();
      this.getHouseDeal({ info: this.info, house: this.house });
    },
  },
};
</script>

<style></style>
