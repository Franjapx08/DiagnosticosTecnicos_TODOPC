<template>
  <div>
    <div class="naveBar" v-if="show">
      <v-navigation-drawer color="#007090" v-model="drawer" app>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title style="color:white;" class="title">Diagnosticos TODO PC</v-list-item-title>
            <v-list-item-subtitle style="color:white;">{{ datos.nombre }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list>
          <v-list-item @click="perfil()">
            <v-list-item-content>
              <v-list-item-title style="color:white;">Mi Perfil</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="color:white;">Diagnosticos</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item @click="diagnosticos()" style="background: #E0D8DE;">
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Diagnosticos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="nuevoDiagnostico()" style="background: #E0D8DE;">
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>nuevo Diagnosticos</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-group>
            <template v-slot:activator>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title style="color:white;">Clientes</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list-item @click="clientes()" style="background: #E0D8DE;">
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Ver Clientes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="agrclientes()" style="background: #E0D8DE;">
              <v-list-item-action></v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>Registrar Cliente</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-app-bar app color="#2E4057" dark>
      <div class="naveBar" v-if="show">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>
      <!--  <v-img max-height="150" max-width="180" src="../../assets/imgLogo.png"></v-img> -->
      <div class="toolBar" v-if="show">
        <v-toolbar-items>
          <v-btn @click="perfil()" text>Perfil</v-btn>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn style="background: #2E4057;" v-on="on">Diagnosticos</v-btn>
            </template>
            <v-list>
              <v-list-item @click="diagnosticos()">
                <v-list-item-title>Diagnosticos</v-list-item-title>
              </v-list-item>
              <v-list-item @click="nuevoDiagnostico()">
                <v-list-item-title>Nuevo Diagnostico</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn style="background: #2E4057;" v-on="on">Clientes</v-btn>
            </template>
            <v-list>
              <v-list-item @click="clientes()">
                <v-list-item-title>Clientes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="nuevoCliente()">
                <v-list-item-title>Nuevo Cliente</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </div>

      <div class="flex-grow-1"></div>
      <div v-if="show">
        <v-menu left bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="logOut()">
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { logOut, isLogin, isAuth } from "../../utils/services";
export default {
  name: "NavBar",
  data() {
    return {
      drawer: false,
      show: false,
      datos: {
        id: 0,
        nombre: 0,
        correo: 0,
        celular: 0,
        tipoUser: 0
      }
    };
  },
  created() {
    isAuth()
      .then(r => {
        if (r.data.code == 1) {
          this.show = true;
          for (var p in this.datos) {
            this.datos[p] = r.data.data[p];
          }
        } else {
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  },
  methods: {
    perfil() {
      /*  this.$router.push({ name: "perfilView" });
      this.drawer = false; */
      console.log("Perfil");
    },
    nuevoDiagnostico() {
      this.$router.push({ name: "DiagnosticoNuevo" });
      this.drawer = false;
      // console.log("nuevo diag");
    },
    diagnosticos() {
      this.$router.push({ name: "Home" });
      this.drawer = false;
    },
    clientes() {
      /*     this.$router.push({ name: "clientes" });
      this.drawer = false; */
    },
    nuevoCliente() {
      /*   this.$router.push({ name: "cliente" });
      this.drawer = false; */
    },
    logOut() {
      //cerrar sesion
      logOut()
        .then(response => {
          this.$router.push({ name: "login" });
          window.location.reload();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 615px) {
  .toolBar {
    display: none;
  }
}
@media (min-width: 615px) {
  .naveBar {
    display: none;
  }
}
</style>
