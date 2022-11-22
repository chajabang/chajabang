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
                <h4>회원정보 수정 & 삭제를 위하여</h4>
                <h6 class="font-weight-light">비밀번호를 다시 입력해주세요.</h6>

                <div class="pt-3">
                  <div v-if="valid.loginFail" class="alert alert-danger" role="alert">
                    Password을 확인해주세요.
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
                      @click="clickReLoginBtn"
                    >
                      LOGIN
                    </button>
                  </div>
                  <div class="my-2 d-flex justify-content-between align-items-center">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" />
                        Remember me
                        <i class="input-helper"></i>
                      </label>
                    </div>
                    <a href="#" class="auth-link text-black">Forgot password?</a>
                  </div>
                </div>
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
      pw: "",
    };
  },
  methods: {
    ...mapActions(memberStore, ["reLoginMember"]),
    ...mapMutations(memberStore, ["CLEAR_LOGIN_STATE"]),
    clickReLoginBtn() {
      this.reLoginMember({ pw: this.pw });
    },
  },
  created() {
    this.CLEAR_LOGIN_STATE();
  },
  computed: {
    ...mapState(memberStore, ["valid", "user"]),
  },
};
</script>

<style scoped>
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
