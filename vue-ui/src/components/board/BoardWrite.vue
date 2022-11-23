<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <h3 style="font-family: 'TmoneyRoundWindExtraBold'">📝 글작성</h3>
      </b-col>
    </b-row>
    <board-input-item type="register" />
  </b-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem";

export default {
  name: "BoardWrite",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
