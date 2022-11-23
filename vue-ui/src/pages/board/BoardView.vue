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
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 70%, rgba(231, 27, 139, 0.3) 30%);
}
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
