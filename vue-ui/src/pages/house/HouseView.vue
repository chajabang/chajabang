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
        <div id="map"></div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HouseList from "@/components/house/HouseList";
import HouseDetail from "@/components/house/HouseDetail";

const houseStore = "houseStore";

export default {
  name: "HouseView",
  data() {
    return {
      sido: null,
      gugun: null,
      dong: null,
      map: null,
    };
  },
  components: {
    HouseList,
    HouseDetail,
  },
  created() {
    this.sido = this.sidoState;
    this.gugun = this.gugunState;
    this.dong = this.dongState;
    this.clearHouse();
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = process.env.VUE_APP_KAKAOMAP_URL;
      document.head.appendChild(script);
    }
    // 로드뷰 초기화가 완료되었을 때 로드뷰에 마커나 커스텀오버레이를 표시한다
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
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      container.style.width = `100%`;
      container.style.height = `650px`;
      this.map.relayout();
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
