<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">๐ ๊ธ๋ชฉ๋ก</h3>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button
          class="btn-sm"
          variant="outline-primary"
          @click="moveWrite()"
          style="font-family: 'TmoneyRoundWindExtraBold'"
          >๊ธ์ฐ๊ธฐ</b-button
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
import { mapActions } from "vuex";
import { listArticle } from "@/api/board";

const memberStore = "memberStore";

export default {
  name: "BoardList",
  data() {
    return {
      articles: [],
      fields: [
        { key: "articleNo", label: "๊ธ๋ฒํธ", tdClass: "tdClass" },
        { key: "subject", label: "์ ๋ชฉ", tdClass: "tdSubject" },
        { key: "userName", label: "์์ฑ์", tdClass: "tdClass" },
        { key: "registerTime", label: "์์ฑ์ผ", tdClass: "tdClass" },
        { key: "hit", label: "์กฐํ์", tdClass: "tdClass" },
        { key: "likes", label: "์ข์์", tdClass: "tdClass" },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.checkSession();
    this.getListArticle();
  },
  watch: {
    pageNum() {
      this.getListArticle();
    },
  },
  methods: {
    ...mapActions(memberStore, ["checkSession"]),
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
