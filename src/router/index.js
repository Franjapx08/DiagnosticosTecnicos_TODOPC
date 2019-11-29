import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import DiagnosticoNuevo from "../views/NuevoDiagnostico.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/Home",
    name: "Home",
    component: Home
  },
  {
    path: "/nuevo-diagnostico",
    name: "DiagnosticoNuevo",
    component: DiagnosticoNuevo
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
