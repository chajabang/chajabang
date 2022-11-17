<template>
  <div class="main-page">
    <div class="page-header">
      <h3 class="page-title">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="mdi mdi-home"></i>
        </span>
        Where Is My Home?
      </h3>
    </div>
    <div class="card main-card my-2">
      <b-container class="card-body">
        <div class="text-center my-3">
          <h1>어떤 집을 찾고 계세요?</h1>
        </div>
        <b-row align-v="center" class="my-5">
          <b-col cols="4">
            <b-form-select v-model="sido" :options="sidoOptions"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="gugun" :options="gugunOptions"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="dong" :options="dongOptions"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="year" :options="yearOptions"></b-form-select>
          </b-col>
          <b-col>
            <b-form-select v-model="month" :options="monthOptions"></b-form-select>
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
export default {
  name: "MainPage",
  data() {
    return {
      sido: null,
      sidoOptions: [
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
      gugun: null,
      gugunOptions: [{ value: null, text: "구군" }],
      dong: null,
      dongOptions: [{ value: null, text: "동" }],
      year: null,
      yearOptions: [
        { value: null, text: "년" },

        { value: "2022", text: "2022" },
        { value: "2021", text: "2021" },
        { value: "2020", text: "2020" },
        { value: "2019", text: "2019" },
        { value: "2018", text: "2018" },
        { value: "2017", text: "2017" },
        { value: "2016", text: "2016" },
        { value: "2015", text: "2015" },
      ],
      month: null,
      monthOptions: [
        { value: null, text: "월" },
        { value: "1", text: "1" },
        { value: "2", text: "2" },
        { value: "3", text: "3" },
        { value: "4", text: "4" },
        { value: "5", text: "5" },
        { value: "6", text: "6" },
        { value: "7", text: "7" },
        { value: "8", text: "8" },
        { value: "9", text: "9" },
        { value: "10", text: "10" },
        { value: "11", text: "11" },
        { value: "12", text: "12" },
      ],
    };
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
</style>
