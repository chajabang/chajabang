<template>
  <div>
    <b-row>
      <b-col cols="4">
        <house-list></house-list>
      </b-col>
      <b-col>
        지도 들어갈 곳
      </b-col>
    </b-row>
  </div>
</template>

<script>
import HouseList from "@/components/house/HouseList";

export default {
  name: "HouseView",
  components: {
    HouseList,
  },
};
</script>

<style></style>
