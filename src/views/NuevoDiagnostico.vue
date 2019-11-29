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
      <DiagnosticoForm v-if="show" />
    </v-container>
  </v-app>
</template>

<script>
import { isLogin, isAuth } from "../utils/services";
import DiagnosticoForm from "../components/DiagnosticoForm";
export default {
  name: "NuevoDiagnostico",
  components: {
    DiagnosticoForm
  },
  data: () => ({
    datos: {
      id: 0,
      nombre: 0,
      correo: 0,
      celular: 0,
      tipoUser: 0
    },
    show: false,
    loaderWindows: true
  }),
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
  }
};
</script>

<style scoped>
.center-container {
  justify-content: center;
}
</style>