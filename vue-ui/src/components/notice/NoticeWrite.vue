<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 style="font-family: 'TmoneyRoundWindExtraBold'">📝 글작성</h3>
      </b-col>
    </b-row>
    <notice-input-item type="register" />
  </b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/item/NoticeInputItem";

export default {
  name: "NoticeWrite",
  components: {
    NoticeInputItem,
  },
};
</script>

<style></style>
