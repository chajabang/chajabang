<template>
  <b-tr @click="getHouseInfo" class="text-center" style="cursor: pointer">
    <b-td>{{ house.apartmentName }}</b-td>
    <b-td>{{ house.roadName }} {{ getJibun }}</b-td>
  </b-tr>
</template>

<script>
import { mapActions } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseListItem",
  props: {
    house: Object,
  },
  methods: {
    ...mapActions(houseStore, ["getHouse"]),
    getHouseInfo() {
      this.getHouse(this.house);
    },
  },
  computed: {
    getJibun() {
      if (this.house.roadNameBubun > 0) {
        return this.house.roadNameBonbun + "-" + this.house.roadNameBubun;
      } else {
        return this.house.roadNameBonbun;
      }
    },
  },
};
</script>

<style></style>
