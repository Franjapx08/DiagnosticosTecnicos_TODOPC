<template>
  <v-app id="inspire">
    <v-container class="center-container">
      <div v-if="loaderWindows" class="text-center" style="margin-top: 150px;">
        <v-progress-linear
          :size="150"
          color="1B065E"
          :indeterminate="loaderWindows"
          rounded
          height="6"
        ></v-progress-linear>
      </div>
      <TablaProductos v-if="show" />
    </v-container>
  </v-app>
</template>

<script>
import { isLogin } from "../utils/services";
import TablaProductos from "../components/TableProductos";

export default {
  components: {
    TablaProductos
  },
  data: () => ({ show: false, loaderWindows: true }),
  created() {
    isLogin()
      .then(r => {
        if (r.data.isLogin) {
          this.loaderWindows = false;
          this.show = true;
        } else {
          this.$router.push("/");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  },
  methods: {}
};
</script>

<style scoped>
.center-container {
  justify-content: center;
}
</style>
