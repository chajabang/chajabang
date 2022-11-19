<template>
  <div class="main-page">
    <div class="page-header">
      <h3 class="page-title text-dark">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="mdi mdi-home"></i>
        </span>
        Where Is My Home?
      </h3>
    </div>
    <div class="card main-card my-2">
      <b-container class="card-body">
        <div class="text-center my-3">
          <h1 class="text-info">너의 집을 한번 찾아방~</h1>
        </div>
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
            <b-form-select v-model="dong" :options="dongs" class="text-dark"></b-form-select>
          </b-col>
        </b-row>
        <div class="text-center mt-5">
          <b-button type="button" class="btn btn-gradient-info btn-fw">아파트 정보 검색</b-button>
        </div>
      </b-container>
    </div>
    <div class="row">
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <b-carousel
            :interval="4000"
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Text slides with image -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_1.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_2.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_3.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card">
          <b-carousel
            :interval="4000"
            controls
            indicators
            background="#ababab"
            style="text-shadow: 1px 1px 2px #333;"
          >
            <!-- Text slides with image -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_2.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>

            <!-- Slides with custom text -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_3.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>

            <!-- Slides with image only -->
            <b-carousel-slide>
              <template #img>
                <img class="d-block" src="@/assets/images/carousel/apt_1.jpg" alt="image slot" />
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
const houseStore = "houseStore";

export default {
  name: "HouseMain",
  data() {
    return {
      sido: null,
      gugun: null,
      dong: null,
    };
  },
  created() {
    this.clearGugunList();
    this.clearDongList();
  },
  methods: {
    ...mapActions(houseStore, ["clearGugunList", "clearDongList", "getGugun", "getDong"]),
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
  },
  computed: {
    ...mapState(houseStore, ["sidos", "guguns", "dongs"]),
  },
};
</script>

<style scoped>
.main-card {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  z-index: 0;
}
.main-card::after {
  width: 100%;
  height: 100%;
  content: "";
  background-image: url(../../assets/images/banner.jpg);
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.3;
  z-index: -1;
}
.d-block {
  width: 100%;
  height: 480px;
}
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
