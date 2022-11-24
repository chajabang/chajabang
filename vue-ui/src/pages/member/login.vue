<template>
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  <img src="../../assets/images/logo.png" />
                </div>
                <h4>안녕하세요!</h4>
                <h6 class="font-weight-light">계속하려면 로그인하세요.</h6>

                <form class="pt-3">
                  <div v-if="valid.loginFail" class="alert alert-danger" role="alert">
                    ID, Password을 확인해주세요.
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="ID"
                      v-model="id"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      v-model="pw"
                    />
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      @click="clickLoginBtn"
                    >
                      LOGIN
                    </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    아직 계정이 없으신가요?
                    <router-link :to="{ name: 'signup' }" class="text-primary">Create</router-link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </section>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

const memberStore = "memberStore";
export default {
  name: "login",
  data() {
    return {
      id: "",
      pw: "",
    };
  },
  methods: {
    ...mapActions(memberStore, ["loginMember", "checkSession"]),
    ...mapMutations(memberStore, ["CLEAR_LOGIN_STATE"]),
    clickLoginBtn() {
      this.loginMember({ id: this.id, pw: this.pw });
    },
  },
  created() {
    this.CLEAR_LOGIN_STATE();
    this.checkSession();
    if (this.user.username) {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapState(memberStore, ["user", "valid"]),
  },
};
</script>

<style scoped>
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
