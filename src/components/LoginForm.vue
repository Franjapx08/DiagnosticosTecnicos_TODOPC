<template>
  <v-app>
    <v-card max-width="600" class="container">
      <v-alert v-if="errors == 1" type="warning">Datos faltantes requeridos.</v-alert>
      <v-alert v-if="errors == 2" type="error">Datos incorrectos.</v-alert>
      <v-alert v-if="errors == 3" type="warning">Fallo de conexión.</v-alert>
      <v-card-title
        style="background: white; margin-bottom: 15px; font-size: 20px;"
      >Inicio de sesión</v-card-title>
      <v-form ref="form">
        <v-text-field
          outlined
          autocomplete="off"
          v-model="form.email"
          label="Correo electrónico"
          type="email"
          required
        ></v-text-field>
        <v-text-field
          outlined
          autocomplete="off"
          v-model="form.password"
          type="password"
          label="Contraseña"
          required
        ></v-text-field>
        <v-col cols="12">
          <v-btn
            dark
            color="#007090"
            style="margin-right: 10px;"
            @click="toggleRestore"
          >¿Olvidaste tu contraseña?</v-btn>
          <v-btn color="success" :loading="loader" :disabled="loader" @click="loginIn()">Conectarse</v-btn>
        </v-col>
      </v-form>
    </v-card>
    <!-- Modal restore -->
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }"></template>
        <v-card class="modal-restore">
          <v-card-title class="headline grey lighten-2" primary-title>Recuperar contraseña</v-card-title>
          <v-form ref="form" margin-left="20px">
            <h2 style="font-size:17px">
              Se enviara un correo a esta dirección donde podra confirmar esta
              operación
            </h2>
            <v-text-field v-model="formRes.email" label="Correo electrónico" type="email" required></v-text-field>
            <v-text-field
              v-model="formRes.password1"
              type="password"
              label="Nueva Contraseña"
              required
            ></v-text-field>
            <v-text-field
              v-model="formRes.password2"
              type="password"
              label="Repite su nueva contraseña"
              required
            ></v-text-field>
            <div class="my-2">
              <v-card-text></v-card-text>
            </div>
          </v-form>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="error" text @click="cerrar">Cerrar</v-btn>
            <v-btn
              color="primary"
              :loading="loader"
              :disabled="loader"
              text
              @click="restorePass"
            >Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import { login, RestorePassword } from "../utils/services";

export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        email: null,
        password: null
      },
      formRes: {
        email: null,
        password1: null,
        password2: null
      },
      errors: 0,
      loader: false,
      showRestore: false,
      dialog: false
    };
  },
  methods: {
    restorePass() {
      if (
        this.formRes.email &&
        this.formRes.password1 &&
        this.formRes.password2 != null
      ) {
        /* test if email */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.formRes.email)) {
          if (this.formRes.password1 == this.formRes.password2) {
            let data = new FormData();
            data.append("email", this.formRes.email);
            data.append("pass1", this.formRes.password1);
            data.append("pass2", this.formRes.password2);
            /*  RestorePassword(data)
              .then(response => {
                let r = response.data;
                if (r.code == 1) {
                  //this.$router.push({ name: "cotizaciones" });
                  window.location.reload();
                } else if (r.code == 2) {
                  alert("Alerta! \n" + "Usuario no existente");
                } else {
                  alert("Alerta! \n" + "Error de conexcion");
                }
              })
              .catch(error => {
                this.errors = 3;
                console.error("Error:", error);
              }); */
          } else {
            alert("Alerta! \n" + "las contraseñas no coinciden");
          }
        } else {
          alert("Alerta! \n" + "Correo electrónico invalido");
        }
      } else {
        alert("Alerta! \n" + "Faltan parametros");
      }
    },
    cerrar() {
      this.dialog = false;
    },
    toggleRestore() {
      this.dialog = true;
      this.formRes.email = this.form.email;
    },
    loginIn() {
      this.errors = 0;
      if (this.form.email && this.form.password != null) {
        /* test if email */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(this.form.email)) {
          this.loader = true;
          /* for form */
          let data = new FormData();
          for (let k in this.form) {
            if (this.form[k]) {
              data.append(k, this.form[k]);
            }
          }
          /* request server */
          login(data)
            .then(response => {
              let r = response.data;
              if (r.code == 1) {
                //this.$router.push({ name: "cotizaciones" });
                window.location.reload();
              } else {
                this.errors = 2;
              }
              this.loader = false;
            })
            .catch(error => {
              this.errors = 3;
              console.error("Error:", error);
              this.loader = false;
            });
        } else {
          /* if text not email */
          this.errors = 2;
        }
      } else {
        /* parametres not found */
        this.errors = 1;
      }
    }
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.button-ok {
  text-align: center;
}
.modal-restore {
  padding: 10px;
}
</style>
