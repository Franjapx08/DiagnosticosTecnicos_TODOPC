<template>
  <v-app id="inspire">
    <div v-if="loaderWindows" class="text-center" style="margin-top: 150px;">
      <v-progress-circular
        :size="150"
        color="primary"
        :indeterminate="loaderWindows"
      ></v-progress-circular>
    </div>

    <LoginForm v-if="show" />
  </v-app>
</template>

<script>
import { isLogin } from "../utils/services";
import LoginForm from "../components/LoginForm";

export default {
  components: {
    name: "LoginForm",
    LoginForm
  },
  data: () => ({ show: true, loaderWindows: false }),
  created() {
    isLogin()
      .then(r => {
        if (r.data.isLogin) {
          this.$router.push({
            name: "Home"
          });
        } else {
          this.loaderWindows = false;
          this.show = true;
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
};
</script>
