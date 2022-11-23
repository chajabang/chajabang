<template>
  <div class="bv-example-row">
    <div class="page-header">
      <h3 class="page-title text-dark">
        <span class="page-title-icon bg-gradient-primary text-white mr-2">
          <i class="mdi mdi-view-list"></i>
        </span>
        게시판
      </h3>
    </div>
    <b-card class="text-center">
      <router-view></router-view>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "AppBoard",
};
</script>
<style scoped>
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
