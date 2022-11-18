<template>
  <section class="register">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left p-5">
                <div class="brand-logo">
                  <img src="../../../assets/images/logo.png" />
                </div>
                <h4>New here?</h4>
                <h6 class="font-weight-light">Sign Up is easy. It only takes a few steps</h6>
                <form class="pt-3">
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
                      @keyup="checkPassword"
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
                      @keyup="checkConfirmPw"
                    />
                    <p v-if="valid.confirmPw" class="input-error">
                      비밀번호가 동일하지 않습니다.
                    </p>
                  </div>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="username"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      v-model="email"
                      @keyup="checkEmail"
                    />
                    <p v-if="valid.email" class="input-error">
                      이메일 주소를 정확히 입력해주세요.
                    </p>
                  </div>
                  <div class="mb-4">
                    <div class="form-check">
                      <label class="form-check-label text-muted">
                        <input type="checkbox" class="form-check-input" />
                        I agree to all Terms & Conditions
                        <i class="input-helper"></i>
                      </label>
                    </div>
                  </div>
                  <div class="mt-3">
                    <button class="btn btn-primary">SIGN up</button>
                    <!-- <router-link
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      to="/"
                      >SIGN UP</router-link
                    > -->
                  </div>
                  <div class="text-center mt-4 font-weight-light">
                    Already have an account?
                    <router-link to="/auth-pages/login" class="text-primary">Login</router-link>
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
export default {
  name: "register",

  data() {
    return {
      valid: {
        id: false,
        pw: false,
        confirmPw: false,
        email: false,
        nickname: false,
      },
      id: "",
      pw: "",
      confirmPw: "",
      email: "",
      nickname: "",
    };
  },
  methods: {
    checkEmail() {
      // 이메일 형식 검사
      const validateEmail = /^[A-Za-z0-9_\\.\\-]+@[A-Za-z0-9\\-]+\.[A-Za-z0-9\\-]+/;
      if (!validateEmail.test(this.email) || !this.email) {
        this.valid.email = true;
      } else {
        this.valid.email = false;
      }
    },
    checkPassword() {
      // 비밀번호 형식 검사(영문, 숫자, 특수문자)
      const validatePassword = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      if (!validatePassword.test(this.pw) || !this.pw) {
        this.valid.pw = true;
      } else {
        this.valid.pw = false;
      }
    },
    checkConfirmPw() {
      // 비밀번호 확인
      if (this.pw !== this.confirmPw) {
        this.valid.confirmPw = true;
      } else {
        this.valid.confirmPw = false;
      }
    },
  },
};
</script>

<style scoped>
.input-error {
  line-height: 16px;
  font-size: 11px;
  color: red;
}
</style>
