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
                <h4>회원정보 수정 & 삭제</h4>
                <form class="pt-3">
                  <div class="form-group">
                    <b-row>
                      <b-col>
                        <input
                          type="text"
                          class="form-control form-control-lg"
                          placeholder="ID"
                          v-model="id"
                          disabled
                        />
                      </b-col>
                      <b-col cols="auto" class="pt-1"> </b-col>
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
                      placeholder="New Password"
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
                      placeholder="Confirm New Password"
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
                  <div class="mt-3">
                    <button
                      type="button"
                      class="btn btn-block btn-gradient-info btn-rounded btn-lg font-weight-medium"
                      @click="clickUpdateBtn"
                    >
                      UPDATE
                    </button>
                  </div>
                  <div class="mt-3">
                    <button
                      type="button"
                      class="btn btn-block btn-gradient-danger btn-rounded btn-lg font-weight-medium"
                      @click="clickDeleteBtn"
                    >
                      DELETE
                    </button>
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
    ...mapActions(memberStore, [
      "checkEmail",
      "checkPassword",
      "checkConfirmPw",
      "checkUsername",
      "updateMember",
      "deleteMember",
    ]),
    ...mapMutations(memberStore, ["CLEAR_REGISTER_STATE"]),
    clickUsernameBtn() {
      this.checkUsername(this.username);
    },
    clickUpdateBtn() {
      // 수정 버튼
      if (this.pw || this.confirmPw) {
        if (!this.pw || this.valid.pw) {
          alert("비밀번호를 확인하세요");
          return;
        } else if (!this.confirmPw || this.valid.confirmPw) {
          alert("비밀번호가 같지 않습니다.");
          return;
        }
      }

      if (this.valid.pw) {
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

      if (confirm("수정하시겠습니다까??")) {
        this.updateMember({
          id: this.id,
          pw: this.pw,
          username: this.username,
          email: this.email,
        });
      }
    },
    clickDeleteBtn() {
      if (confirm("삭제하시겠습니다까??")) {
        this.deleteMember();
      }
    },
  },
  computed: {
    ...mapState(memberStore, ["valid", "message", "user"]),
  },
  created() {
    this.CLEAR_REGISTER_STATE();
    this.id = this.user.id;
    this.username = this.user.username;
    this.email = this.user.email;
  },
};
</script>

<style scoped>
* {
  font-family: "TmoneyRoundWindExtraBold";
}
</style>
