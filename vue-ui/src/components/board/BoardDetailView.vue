<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">📃 글보기</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-left">
        <b-button
          variant="outline-primary"
          class="btn-sm"
          @click="moveList"
          style="font-family: 'TmoneyRoundWindExtraBold'"
          >목록</b-button
        >
      </b-col>
      <b-col class="text-right" v-if="user.id === article.userId">
        <b-button
          variant="outline-info"
          class="br-2 btn-sm"
          @click="moveModifyArticle"
          style="font-family: 'TmoneyRoundWindExtraBold'"
          >글수정</b-button
        >
        <b-button
          variant="outline-danger"
          class="btn-sm"
          @click="deleteArticle"
          style="font-family: 'TmoneyRoundWindExtraBold'"
          >글삭제</b-button
        >
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card header-tag="header" class="mb-2" border-variant="dark" no-body>
          <template #header>
            <h3 style="font-family: 'TmoneyRoundWindExtraBold'">
              {{ article.articleNo }}. {{ article.subject }} [{{ article.hit }}]
            </h3>
            <div class="text-right">
              <h5 style="font-family: 'TmoneyRoundWindExtraBold'">{{ article.userName }} <br /></h5>
              <h6 style="font-family: 'TmoneyRoundWindExtraBold'">
                추천 : {{ article.likes }} <br />
                {{ article.registerTime }}
              </h6>
            </div>
          </template>
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-right">
        <div v-if="isLike">
          <b-button variant="primary" class="btn-sm m-1" @click="clickRemoveLike"
            >추천 취소~! <i class="mdi mdi-thumb-up"></i>
          </b-button>
        </div>
        <div v-else>
          <b-button variant="primary" class="btn-sm m-1" @click="clickAddLike"
            >추천~! <i class="mdi mdi-thumb-up-outline"></i
          ></b-button>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle, checkLikeArticle, addLikeArticle, removeLikeArticle } from "@/api/board";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      isLike: false,
    };
  },
  computed: {
    ...mapState(memberStore, ["user"]),
    message() {
      if (this.article.content) return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    let params = { articleNo: this.$route.params.articleNo };
    getArticle(
      params,
      ({ data }) => {
        console.log(data);
        this.article = data;
        this.article.hit++;
      },
      (error) => {
        console.log(error);
      }
    );
    checkLikeArticle(
      params,
      ({ status }) => {
        if (status == 200) {
          this.isLike = true;
        } else if (status == 204) {
          this.isLike = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "boardmodify",
        params: { articleNo: this.article.articleNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boarddelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardlist" });
    },
    clickAddLike() {
      let params = { articleNo: this.article.articleNo };
      addLikeArticle(
        params,
        ({ status }) => {
          if (status == 200) {
            this.isLike = true;
            this.article.likes++;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    clickRemoveLike() {
      let params = { articleNo: this.article.articleNo };

      removeLikeArticle(
        params,
        ({ status }) => {
          if (status == 200) {
            this.isLike = false;
            this.article.likes--;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
