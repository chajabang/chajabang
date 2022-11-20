<template>
  <b-tr>
    <b-td>{{ house.apartmentName }}</b-td>
    <b-td>{{ house.floor }}</b-td>
    <b-td>{{ house.roadName }} {{ getJibun }}</b-td>
  </b-tr>
</template>

<script>
export default {
  name: "HouseListItem",
  props: {
    house: Object,
  },
  computed: {
    getJibun() {
      if (this.house.roadNameBubun > 0) {
        return this.house.roadNameBonbun + "-" + this.house.roadNameBubun;
      } else {
        return this.house.roadNameBonbun;
      }
    },
  },
};
</script>

<style></style>
