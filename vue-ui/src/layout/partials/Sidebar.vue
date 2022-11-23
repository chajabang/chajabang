<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" to="/">
            <span class="menu-title">너의 집을 찾아방</span>
            <i class="mdi mdi-home menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item" v-on:click="collapseAll" v-if="user.username">
          <router-link class="nav-link" :to="{ name: 'interestview' }">
            <span class="menu-title">관심있는 집을 찾아방</span>
            <i class="mdi mdi-home-map-marker menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" :to="{ name: 'noticelist' }">
            <span class="menu-title">공지사항</span>
            <i class="mdi mdi-alert-box menu-icon"></i>
          </router-link>
        </li>
        <li class="nav-item" v-on:click="collapseAll">
          <router-link class="nav-link" :to="{ name: 'boardlist' }">
            <span class="menu-title">자유게시판</span>
            <i class="mdi mdi-view-list menu-icon"></i>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "sidebar",
  data() {
    return {
      collapses: [{ show: false }, { show: false }, { show: false }],
    };
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
  },
  mounted() {
    const body = document.querySelector("body");
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .nav-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  },
  computed: {
    ...mapState("memberStore", ["user"]),
  },
};
</script>
