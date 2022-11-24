<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">📑 글목록</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right" v-if="user.id === 'admin'">
        <b-button
          class="btn-sm"
          variant="outline-primary"
          @click="moveWrite()"
          style="font-family: 'TmoneyRoundWindExtraBold'"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row style="overflow: auto">
      <b-col>
        <b-table striped hover :items="articles" :fields="fields">
          <template #cell(subject)="data">
            <router-link :to="{ name: 'noticedetail', params: { articleNo: data.item.articleNo } }">
              {{ data.item.subject }}
            </router-link>
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-pagination
          v-model="pageNum"
          :total-rows="total"
          :per-page="pageSize"
          align="center"
          size="sm"
          class="mt-4"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapState } from "vuex";
import { listNotice } from "@/api/notice";

const memberStore = "memberStore";

export default {
  name: "NoticeList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleNo", label: "글번호", tdClass: "tdClass" },
        { key: "subject", label: "제목", tdClass: "tdSubject" },
        { key: "userName", label: "작성자", tdClass: "tdClass" },
        { key: "registerTime", label: "작성일", tdClass: "tdClass" },
        { key: "hit", label: "조회수", tdClass: "tdClass" },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.checkSession();
    this.getListNotice();
  },
  watch: {
    pageNum() {
      this.getListArticle();
    },
  },
  methods: {
    ...mapActions(memberStore, ["checkSession"]),
    moveWrite() {
      this.$router.push({ name: "noticewrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "noticedetail",
        params: { articleNo: article.articleNo },
      });
    },
    getListNotice() {
      listNotice(
        { pageNum: this.pageNum, pageSize: this.pageSize },
        ({ data }) => {
          this.articles = data.list;
          this.total = data.total;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  computed: {
    ...mapState(memberStore, ["user"]),
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: center;
}
</style>
