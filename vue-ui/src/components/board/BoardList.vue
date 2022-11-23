<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">📑 글목록</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
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
            <router-link :to="{ name: 'boarddetail', params: { articleNo: data.item.articleNo } }">
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
import { listArticle } from "@/api/board";

export default {
  name: "BoardList",
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
    this.getListArticle();
  },
  watch: {
    pageNum() {
      this.getListArticle();
    },
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardwrite" });
    },
    viewArticle(article) {
      this.$router.push({
        name: "boarddetail",
        params: { articleNo: article.articleNo },
      });
    },
    getListArticle() {
      listArticle(
        { pageNum: this.pageNum, pageSize: this.pageSize },
        ({ data }) => {
          this.articles = data.list;
          this.total = data.total;
          console.log(data);
          console.log(this.articles);
        },
        (error) => {
          console.log(error);
        }
      );
    },
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
