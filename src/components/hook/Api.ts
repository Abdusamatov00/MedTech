import axios from "axios";

const Api = axios.create({
  baseURL: "https://supercultivated-neumic-rose.ngrok-free.dev",
  headers: {
    "Content-Type": "application/json",
  },
});
export default Api;
