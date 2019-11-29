<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-card color="default">
          <v-card-title>Nuevo Diagnostico</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-row class="mb-6">
                <v-col>
                  <v-text-field
                    outlined
                    autocomplete="off"
                    v-model="form.fecha"
                    label="Fecha de entrada"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    autocomplete="off"
                    v-model="form.hora"
                    label="Hora de entrada"
                    type="time"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-combobox
                outlined
                :items="clientes"
                autocomplete="off"
                v-model="comboCliente"
                label="Seleccione un cliente"
              ></v-combobox>
              <v-combobox
                outlined
                :items="tecnicos"
                autocomplete="off"
                v-model="comboTecnico"
                label="Seleccione el técnico asignado"
              ></v-combobox>
              <h3 style="margin-bottom: 20px;">Información del equipo</h3>
              <v-text-field
                outlined
                autocomplete="off"
                v-model="form.tipoEquipo"
                :maxlength="99"
                label="Tipo de equipo"
                type="text"
              ></v-text-field>
              <v-text-field
                outlined
                autocomplete="off"
                v-model="form.marca"
                :maxlength="99"
                label="Marca"
                type="text"
              ></v-text-field>
              <v-text-field
                outlined
                autocomplete="off"
                v-model="form.modelo"
                :maxlength="99"
                label="Modelo"
                type="text"
              ></v-text-field>
              <v-text-field
                outlined
                autocomplete="off"
                v-model="form.noSerie"
                :maxlength="99"
                label="Número de serie"
                type="text"
              ></v-text-field>
              <h3 style="margin-bottom: 20px;">Observaciones</h3>
              <v-textarea outlined label="Falla del equipo" v-model="form.falla"></v-textarea>
              <v-textarea outlined label="Accesorios del equipo" v-model="form.accesorios"></v-textarea>

              <h3 style="margin-bottom: 20px;">Entrega prometida</h3>

              <v-row class="mb-6">
                <v-col>
                  <v-text-field
                    outlined
                    v-model="form.fechaPrometida"
                    label="Fecha prometida"
                    type="date"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    outlined
                    v-model="form.horaPrometida"
                    label="Hora prometida"
                    type="time"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-btn
                color="success"
                :loading="loader"
                :disabled="loader"
                @click="agregar()"
              >Confirmar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { nuevoDiagnostico, getClientes, getTecnico } from "../utils/services";
export default {
  name: "DiagnosticoForm",
  data() {
    return {
      comboCliente: [],
      comboTecnico: [],
      clientes: [],
      tecnicos: [],
      form: {
        fecha: null,
        hora: null,
        tipoEquipo: "LAPTOP",
        marca: "JP",
        modelo: "IDEAPAD",
        noSerie: "AAAA",
        falla: "NO CARGA",
        accesorios: "CARGADOR",
        fechaPrometida: null,
        horaPrometida: null
      },
      errors: 0,
      loader: false
    };
  },
  created() {
    /* Clientes */
    getClientes()
      .then(r => {
        if (r.data.length != 0) {
          //hay resultados
          console.log(r.data);
          this.clientes = r.data;
        } else {
          //no hay resultados
          this.errors = 7;
          window.scrollTo(0, -800);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });

    getTecnico()
      .then(r => {
        if (r.data.length != 0) {
          //hay resultados
          console.log(r.data);
          this.tecnicos = r.data;
        } else {
          //no hay resultados
          this.errors = 7;
          window.scrollTo(0, -800);
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  },
  methods: {
    agregar() {
      var objectConstructor = {}.constructor; //parametro para identificar json
      var flag; //bandera
      /* validar que los selec sean seleccionados a fuerza */
      //validar combobox Cliente / pago / vendedor
      if (this.comboCliente == null && this.comboTecnico == null) {
        //nulo
        flag = 2;
        /* Error sleecione bien we */
      } else if (
        this.comboCliente.length == 0 &&
        this.comboTecnico.length == 0
      ) {
        //vacio
        /* Error sleecione bien we */
        flag = 2;
      } else if (
        this.comboCliente.constructor === objectConstructor &&
        this.comboTecnico.constructor === objectConstructor
      ) {
        //es Objeto
        flag = 1;
      } else {
        ///no es Objeto
        flag = 2;
        /* Error sleecione bien we */
        alert(
          "Alerta! \n" + "Favor de seleccioanr correctamente Cliente/Tecnico"
        );
      }

      this.loader = true;
      if (
        this.form.hora &&
        this.form.fecha &&
        this.form.tipoEquipo &&
        this.form.marca &&
        this.form.modelo &&
        this.form.noSerie &&
        this.form.falla &&
        this.form.accesorios &&
        this.form.fechaPrometida != null &&
        flag == 1
      ) {
        //si no faltan parametros
        let data = new FormData();
        //data = formulario enviar por post
        for (let k in this.form) {
          data.append(k, this.form[k]); //itera parametros
          /*   console.log(k + this.form[k]); */
        }

        //adjuntar parametros metodo POST de:
        data.append("tecnico", this.comboTecnico.id);
        data.append("cliente", this.comboCliente.id);
        nuevoDiagnostico(data)
          .then(r => {
            if (r.data.code == 1) {
              this.$router.push({ name: "Home" });
            } else {
              alert("Alerta! \n" + "Fallo en la conexión");
            }
          })
          .catch(error => {
            console.error("Error:", error);
          });
      } else {
        //faltan parametros
        this.loader = false;
        /* Alert paraemtros */
        console.log("Faltan parametros");
      }
    }
  }
};
</script>

