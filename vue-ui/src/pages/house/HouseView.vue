<template>
  <div>
    <b-row align-v="center" class="my-5">
      <b-col cols="4">
        <b-form-select
          v-model="sido"
          :options="sidos"
          @change="getGugunList"
          class="text-dark"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          v-model="gugun"
          :options="guguns"
          @change="getDongList"
          class="text-dark"
        ></b-form-select>
      </b-col>
      <b-col>
        <b-form-select
          v-model="dong"
          :options="dongs"
          @change="getHouseList"
          class="text-dark"
        ></b-form-select>
      </b-col>
    </b-row>
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
import HouseList from "@/components/house/HouseList";
import HouseDetail from "@/components/house/HouseDetail";
import HouseMap from "@/components/house/HouseMap";

const houseStore = "houseStore";

export default {
  name: "HouseView",
  data() {
    return {
      sido: null,
      gugun: null,
      dong: null,
    };
  },
  components: {
    HouseList,
    HouseDetail,
    HouseMap,
  },
  created() {
    this.sido = this.sidoState;
    this.gugun = this.gugunState;
    this.dong = this.dongState;
    this.clearHouse();
  },
  methods: {
    ...mapActions(houseStore, [
      "clearGugunList",
      "clearDongList",
      "getGugun",
      "getDong",
      "getHouses",
      "clearHouse",
    ]),
    getGugunList() {
      this.clearGugunList();
      this.gugun = null;
      if (this.sido) this.getGugun(this.sido);
    },
    getDongList() {
      this.clearDongList();
      this.dong = null;
      if (this.gugun) this.getDong({ sido: this.sido, gugun: this.gugun });
    },
    getHouseList() {
      if (!this.sido) {
        alert("시도가 선택되지 않았습니다.");
      } else if (!this.gugun) {
        alert("구군이 선택되지 않았습니다.");
      } else if (!this.dong) {
        alert("동이 선택되지 않았습니다.");
      } else {
        this.getHouses({ sido: this.sido, gugun: this.gugun, dong: this.dong });
      }
    },
  },
  computed: {
    ...mapState(houseStore, [
      "sidoState",
      "gugunState",
      "dongState",
      "sidos",
      "guguns",
      "dongs",
      "house",
    ]),
  },
};
</script>

<style scope>
.card .card-body {
  padding: 0.5rem;
}
</style>
