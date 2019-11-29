<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <div class="tableXL">
          <v-data-table
            :headers="headers"
            :search="search"
            :items="datos"
            sort-by="nombre"
            class="elevation-1"
          >
            <template style="background: black;" v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Productos</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>

                <v-spacer></v-spacer>

                <template>
                  <v-text-field label="Buscar" single-line hide-details v-model="search"></v-text-field>
                </template>
              </v-toolbar>
            </template>
            <template></template>
            <template v-slot:item="{ item }">
              <tr @click="clickRow(item)">
                <td class="text-xs-right">{{ item.Tipo }}</td>
                <td class="text-xs-right">{{ item.Marca }}</td>
                <td class="text-xs-right">{{ item.Modelo }}</td>
                <td class="text-xs-right">{{ item.NoSerie }}</td>
                <td class="text-xs-right">{{ item.FechaIngreso }}</td>
                <td class="text-xs-right">
                  <v-chip v-if="item.estatus_act == 0" color="warning" dark>En diagnostico</v-chip>
                  <v-chip v-else color="success" dark>Terminado</v-chip>
                </td>
              </tr>
            </template>
            <template v-slot:no-data>
              <v-progress-circular v-if="result == 1" :size="50" color="primary" indeterminate></v-progress-circular>
              <v-alert
                slot="no-results"
                v-if="errors == 1"
                color="error"
                icon="warning"
              >No hay resultados de tu busqueda.</v-alert>
              <v-alert
                slot="no-results"
                v-if="errors == 2"
                color="warning"
                icon="warning"
              >Error en conexión</v-alert>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >No hay resultados de tu busqueda "{{ search }}".</v-alert>
          </v-data-table>
        </div>
      </v-col>
      <div class="tableXS">
        <v-data-table :search="search" :headers="headers2" :items="datos">
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Productos</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>

              <v-spacer></v-spacer>

              <template>
                <v-text-field
                  append-icon="search"
                  label="Buscar"
                  single-line
                  hide-details
                  v-model="search"
                ></v-text-field>
              </template>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item }">
            <tr @click="clickRow(item)">
              <td class="text-xs-right">{{ item.nombre }}</td>
              <td class="text-xs-right">{{ item.banco }}</td>
            </tr>
          </template>
        </v-data-table>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { getProductosAct } from "../utils/services";
export default {
  name: "TablaProductos",
  data: () => ({
    result: 1,
    errors: 0,
    loader2: true,
    search: "",
    headers: [
      {
        text: "Tipo",
        align: "left",
        sortable: false,
        value: "tipo"
      },
      { text: "Marca", value: "marca" },
      { text: "Modelo", value: "modelo" },
      { text: "Num. Serie", value: "NoSerie" },
      { text: "Fecha de Ingreso", value: "FechaIngreso" },
      { text: "estatus", value: "estatus_act" }
    ],
    headers2: [
      {
        text: "Nombre",
        align: "left",
        sortable: false,
        value: "nombre"
      },
      { text: "Banco", value: "referencia" }
    ],
    datos: [],
    resultados: false
  }),

  created() {
    getProductosAct()
      .then(r => {
        if (r.data != 0) {
          this.datos = r.data;
          console.log(r.data);
        } else {
          this.result = 0;
          this.errors = 1;
        }
      })
      .catch(e => {
        console.log(e);
      });
  },

  methods: {
    clickRow(item) {
      /*  this.$router.push("pago-informacion/" + item.id); */
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 615px) {
  .containerXL {
    display: none;
  }
}
@media (min-width: 615px) {
  .containerXS {
    display: none;
  }
}
@media (max-width: 890px) {
  .tableXL {
    display: none;
  }
}
@media (min-width: 890px) {
  .tableXS {
    display: none;
  }
}
</style>
