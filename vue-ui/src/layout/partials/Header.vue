<template>
  <b-navbar
    id="template-header"
    class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    toggleable="lg"
  >
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/">
        <img src="@/assets/images/logo.png" alt="logo" />
      </router-link>
      <router-link class="navbar-brand brand-logo-mini" to="/">
        <img src="@/assets/images/logo-mini.png" alt="logo" />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button
        class="navbar-toggler navbar-toggler align-self-center d-lg-block"
        type="button"
        @click="toggleSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
      <b-navbar-nav v-if="user.username" class="navbar-nav-right ml-auto">
        <b-nav-item>
          <span class="nav-link">
            <div class="nav-profile-img mx-2">
              <img
                src="@/assets/images/faces-clipart/pic-1.png"
                alt="image"
                @click="clickUpdateBtn"
              />
              <span class="availability-status online"></span>
            </div>
            <div class="nav-profile-text">
              <p class="text-black" @click="clickUpdateBtn">{{ user.username }}</p>
            </div>
          </span>
        </b-nav-item>
        <b-nav-item class="nav-logout d-none d-lg-block">
          <i class="mdi mdi-power" @click="clickLogoutBtn"></i>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="navbar-nav-right ml-auto">
        <b-nav-item>
          <router-link :to="{ name: 'login' }">
            <button type="button" class="btn btn-outline-primary btn-sm">Login</button>
          </router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link :to="{ name: 'signup' }">
            <button type="button" class="btn btn-outline-info btn-sm">Sign Up</button>
          </router-link>
        </b-nav-item>
      </b-navbar-nav>
      <button
        class="navbar-toggler navbar-toggler-right align-self-center"
        type="button"
        @click="toggleMobileSidebar()"
      >
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

export default {
  name: "app-header",
  created() {
    if (!document.querySelector("body").classList.contains("sideber-icon-only")) {
      this.toggleSidebar();
    }
  },
  methods: {
    ...mapActions(memberStore, ["logoutMember"]),
    toggleSidebar: () => {
      document.querySelector("body").classList.toggle("sidebar-icon-only");
    },
    toggleMobileSidebar: () => {
      document.querySelector("#sidebar").classList.toggle("active");
    },
    clickUpdateBtn() {
      alert("UPDATE METHOD");
    },
    clickLogoutBtn() {
      this.logoutMember();
    },
  },
  computed: {
    ...mapState(memberStore, ["user"]),
  },
};
</script>

<style scoped>
p {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
