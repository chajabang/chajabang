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
                          @click="clickIdBtn"
                        >
                          Check
                        </button>
                      </b-col>
                    </b-row>
                    <p v-if="valid.idOk" class="text-info">
                      {{ message.id }}(은)는 사용가능합니다.
                    </p>
                    <p v-if="valid.idFail" class="text-danger">
                      {{ message.id }}(은)는 존재합니다.
                    </p>
                  </div>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Password"
                      v-model="pw"
                    />
                    <p v-if="valid.pw" class="text-danger">
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
                    <p v-if="valid.confirmPw" class="text-danger">비밀번호가 동일하지 않습니다.</p>
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
                          @click="clickUsernameBtn"
                        >
                          Check
                        </button>
                      </b-col>
                    </b-row>
                    <p v-if="valid.usernameOk" class="text-info">
                      {{ message.username }}는 사용가능합니다.
                    </p>
                    <p v-if="valid.usernameFail" class="text-danger">
                      {{ message.username }}는 존재합니다.
                    </p>
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      v-model="email"
                    />
                    <p v-if="valid.email" class="text-danger">이메일 주소를 정확히 입력해주세요.</p>
                  </div>

                  <vue-recaptcha
                    ref="recaptcha"
                    :sitekey="secretKey"
                    @verify="onVerify"
                    @expired="onExpired"
                  >
                  </vue-recaptcha>

                  <div class="mt-3">
                    <button
                      type="button"
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium"
                      @click="checkRobot()"
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
import { mapActions, mapState, mapMutations } from "vuex";
import { VueRecaptcha } from "vue-recaptcha";

const memberStore = "memberStore";

export default {
  name: "signup",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      id: "",
      pw: "",
      confirmPw: "",
      email: "",
      username: "",
      response: "",
      secretKey: process.env.VUE_APP_RECAPCHA_KEY,
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
    ...mapActions(memberStore, [
      "checkEmail",
      "checkPassword",
      "checkConfirmPw",
      "checkId",
      "checkUsername",
      "registerMember",
    ]),
    ...mapMutations(memberStore, ["CLEAR_REGISTER_STATE"]),
    onVerify(r) {
      this.response = r;
    },
    onExpired() {
      this.response = "";
      this.$refs.recaptcha.reset();
    },
    checkRobot() {
      if (this.response) {
        this.clickSignUpBtn();
      } else {
        alert("로봇이 아님을 확인해주세요");
        this.$refs.recaptcha.execute();
      }
    },

    clickIdBtn() {
      this.checkId(this.id);
    },
    clickUsernameBtn() {
      this.checkUsername(this.username);
    },
    clickSignUpBtn() {
      // 회원가입 버튼
      if (this.valid.idFail) {
        alert("아이디를 확인하세요");
        return;
      } else if (this.valid.pw) {
        alert("비밀번호를 확인하세요");
        return;
      } else if (this.valid.confirmPw) {
        alert("비밀번호가 같지 않습니다.");
        return;
      } else if (this.valid.usernameFail) {
        alert("닉네임을 확인하세요");
        return;
      } else if (this.valid.email) {
        alert("이메일을 확인하세요");
        return;
      }

      this.registerMember({ id: this.id, pw: this.pw, username: this.username, email: this.email });
    },
  },
  computed: {
    ...mapState(memberStore, ["valid", "message"]),
  },
  created() {
    this.CLEAR_REGISTER_STATE();
  },
};
</script>

<style scoped>
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
