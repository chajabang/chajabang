<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <b-table-simple hover>
      <b-thead>
        <b-tr class="text-center bg-light bg-gradient">
          <b-th><b>매물이름</b></b-th>
          <b-th><b>도로명주소</b></b-th>
        </b-tr>
      </b-thead>
      <tbody>
        <house-list-item v-for="(house, index) in houses" :key="index" :house="house" />
      </tbody>
    </b-table-simple>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>주택 목록이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import HouseListItem from "@/components/house/HouseListItem";

const houseStore = "houseStore";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(houseStore, ["houses"]),
  },
};
</script>
