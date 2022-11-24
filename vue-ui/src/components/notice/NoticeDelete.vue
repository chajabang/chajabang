<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">✂️ 글삭제</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-danger">삭제처리중...</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deleteArticle } from "@/api/notice";

export default {
  name: "NoticeDelete",
  created() {
    let param = { articleNo: this.$route.params.articleNo };
    deleteArticle(
      param,
      ({ data }) => {
        let msg = "삭제 처리시 문제가 발생했습니다.";
        if (data === "success") {
          msg = "삭제가 완료되었습니다.";
        }
        alert(msg);
        // 현재 route를 /list로 변경.
        this.$router.push({ name: "noticelist" });
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style></style>
