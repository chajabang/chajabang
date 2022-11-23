<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 class="text-dark" style="font-family: 'TmoneyRoundWindExtraBold'">📝 글수정</h3>
      </b-col>
    </b-row>
    <notice-input-item type="modify" />
  </b-container>
</template>

<script>
import NoticeInputItem from "@/components/notice/item/NoticeInputItem";

export default {
  name: "NoticeModify",
  components: {
    NoticeInputItem,
  },
};
</script>

<style></style>
