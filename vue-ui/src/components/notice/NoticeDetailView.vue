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
  </b-container>
</template>

<script>
// import moment from "moment";
import { getArticle } from "@/api/notice";
import { mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "NoticeDetail",
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
        this.article = data;
        this.article.hit++;
      },
      (error) => {
        // console.log(error);
      }
    );
  },
  methods: {
    moveModifyArticle() {
      this.$router.replace({
        name: "noticemodify",
        params: { articleNo: this.article.articleNo },
      });
      //   this.$router.push({ path: `/notice/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "noticedelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "noticelist" });
    },
  },
};
</script>
