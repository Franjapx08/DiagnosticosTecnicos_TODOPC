import { domain, API, version } from "./config";

import axios from "axios";

const domainApiVersion = domain + API + version;

export const login = data => {
  return axios.post(domainApiVersion + "Login.php", data);
};

export const logOut = data => {
  return axios.post(domainApiVersion + "logOut.php", data);
};

//si esta logeado usuario

export const isLogin = data => {
  return axios.post(domainApiVersion + "isLogin.php", data);
};

export const isAuth = () => {
  return axios.post(domainApiVersion + "isAuth.php");
};

/* Productos/Diagnosticos */

export const getProductosAct = () => {
  return axios.post(domainApiVersion + "getProductosActivos.php");
};

export const agregarDiagnostico = () => {
  return axios.post(domainApiVersion + "agregarDiagnostico.php");
};

/* Cliente */

export const getClientes = () => {
  return axios.post(domainApiVersion + "getClientes.php");
};

/* Vendedores/Tecnicos */

export const getTecnico = () => {
  return axios.post(domainApiVersion + "getTecnicos.php");
};

/* Nuevo diagnostico */
export const nuevoDiagnostico = data => {
  return axios.post(domainApiVersion + "agregarDiagnostico.php", data);
};
