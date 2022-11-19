<template>
  <section class="register">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  <img src="../../assets/images/logo.png" />
                </div>
                <h4>New here?</h4>
                <h6 class="font-weight-light">Sign Up is easy. It only takes a few steps</h6>
                <form class="pt-3">
                  <div class="form-group">
                    <b-row>
                      <b-col>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          placeholder="ID"
                          v-model="id"
                        />
                      </b-col>
                      <b-col cols="auto" class="pt-1">
                        <button
                          type="button"
                          class="btn btn-gradient-primary btn-sm font-weight-medium"
                        >
                          Check
                        </button>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      v-model="pw"
                    />
                    <p v-if="valid.pw" class="input-error">
                      영문, 숫자, 특수문자를 조합하여 입력해주세요. (8-16)자
                    </p>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Confirm Password"
                      v-model="confirmPw"
                    />
                    <p v-if="valid.confirmPw" class="input-error">
                      비밀번호가 동일하지 않습니다.
                    </p>
                  </div>
                  <div class="form-group">
                    <b-row>
                      <b-col>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          placeholder="Username"
                          v-model="username"
                        />
                      </b-col>
                      <b-col cols="auto" class="pt-1">
                        <button
                          type="button"
                          class="btn btn-gradient-primary btn-sm font-weight-medium"
                        >
                          Check
                        </button>
                      </b-col>
                    </b-row>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      v-model="email"
                    />
                    <p v-if="valid.email" class="input-error">
                      이메일 주소를 정확히 입력해주세요.
                    </p>
                  </div>
                  <div class="mt-3">
                    <button
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      SIGN UP
                    </button>
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Already have an account?
                    <router-link :to="{ name: 'login' }" class="text-primary">Login</router-link>
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
import { mapActions, mapState } from "vuex";

const memberStore = "memberStore";

export default {
  name: "signup",
  data() {
    return {
      id: "",
      pw: "",
      confirmPw: "",
      email: "",
      username: "",
    };
  },
  watch: {
    pw(val) {
      this.checkPassword(val);
      this.checkConfirmPw({ pw: val, confirmPw: this.confirmPw });
    },
    confirmPw(val) {
      this.checkConfirmPw({ pw: this.pw, confirmPw: val });
    },
    email(val) {
      this.checkEmail(val);
    },
  },
  methods: {
    ...mapActions(memberStore, ["checkEmail", "checkPassword", "checkConfirmPw"]),
  },
  computed: {
    ...mapState(memberStore, ["valid"]),
  },
};
</script>

<style scoped>
.input-error {
  line-height: 16px;
  font-size: 11px;
  color: red;
}
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
