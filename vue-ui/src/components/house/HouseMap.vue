<template>
  <div id="map" style="width: 100%; height: 650px"></div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseMap",
  data() {
    return {
      map: null,
      markers: [],
    };
  },
  watch: {
    houses() {
      if (window.kakao && window.kakao.maps) {
        this.displayMarker();
      }
    },
    house(val, oldVal) {
      if (val) {
        this.detailMap();
      } else if (!val && oldVal) {
        this.displayMarker();
      }
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = process.env.VUE_APP_KAKAOMAP_URL;
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      let latLng = new kakao.maps.LatLng(37.5013068, 127.0396597);
      if (this.houses.length > 0) {
        latLng = new kakao.maps.LatLng(this.houses[0].lat, this.houses[0].lng);
      }
      const container = document.getElementById("map");
      const options = {
        center: latLng,
        level: 6,
      };

      this.map = new kakao.maps.Map(container, options);
    },
    displayMarker() {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = this.houses.map((house) => new kakao.maps.LatLng(house.lat, house.lng));

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            })
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
        );

        this.map.setBounds(bounds);
      }
    },
    detailMap() {
      let latLng = new kakao.maps.LatLng(this.house.lat, this.house.lng);
      this.map.setCenter(latLng);
      this.map.setLevel(2);
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }
      // 마커를 생성합니다
      let marker = new kakao.maps.Marker({
        map: this.map,
        position: latLng,
      });
      this.markers = [marker];
    },
  },
  computed: {
    ...mapState(houseStore, ["house", "houses"]),
  },
};
</script>

<style></style>
