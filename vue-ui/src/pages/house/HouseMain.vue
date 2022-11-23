<template>
  <div class="main-page">
    <div class="page-header">
      <h3 class="page-title text-dark">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="mdi mdi-home"></i>
        </span>
        너의 집을 찾아방
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
          <b-button type="button" class="btn btn-gradient-info btn-fw" @click="getHouseList"
            >아파트 정보 검색</b-button
          >
        </div>
      </b-container>
    </div>
    <div class="row mt-5">
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card text-center" style="overflow: hidden">
          <h3 class="text-primary mt-3" style="font-family: 'TmoneyRoundWindExtraBold'">
            <i class="mdi mdi-alert-box"></i> 공지사항
          </h3>
          <b-row>
            <b-col>
              <b-table hover :items="notices" :fields="nfields">
                <template #cell(subject)="data">
                  <router-link
                    :to="{ name: 'noticedetail', params: { articleNo: data.item.articleNo } }"
                  >
                    {{ data.item.subject }}
                  </router-link>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
      </div>
      <div class="col-md-6 grid-margin stretch-card">
        <div class="card text-center" style="overflow: hidden">
          <h3 class="text-primary mt-3" style="font-family: 'TmoneyRoundWindExtraBold'">
            <i class="mdi mdi-view-list"></i> 자유게시판
          </h3>
          <b-row>
            <b-col>
              <b-table hover :items="articles" :fields="fields">
                <template #cell(subject)="data">
                  <router-link
                    :to="{ name: 'boarddetail', params: { articleNo: data.item.articleNo } }"
                  >
                    {{ data.item.subject }}
                  </router-link>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { listNotice } from "@/api/notice";
import { listArticle } from "@/api/board";

const houseStore = "houseStore";
const memberStore = "memberStore";

export default {
  name: "HouseMain",
  data() {
    return {
      sido: null,
      gugun: null,
      dong: null,
      notices: [],
      nfields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      articles: [],
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
        { key: "likes", label: "좋아요", tdClass: "tdClass" },
      ],
    };
  },
  created() {
    this.checkSession();
    this.clearGugunList();
    this.clearDongList();
    this.getListNotice();
    this.getListArticle();
  },
  methods: {
    ...mapActions(memberStore, ["checkSession"]),
    ...mapActions(houseStore, [
      "clearGugunList",
      "clearDongList",
      "getGugun",
      "getDong",
      "mvHouseView",
      "getHouses",
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
        this.mvHouseView();
      }
    },
    getListNotice() {
      listNotice(
        { pageNum: 1, pageSize: 5 },
        ({ data }) => {
          this.notices = data.list;
          console.log(data);
          console.log(this.articles);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getListArticle() {
      listArticle(
        { pageNum: 1, pageSize: 5 },
        ({ data }) => {
          this.articles = data.list;
          console.log(data);
          console.log(this.articles);
        },
        (error) => {
          console.log(error);
        }
      );
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
