import axios from "axios";

export const API = axios.create({
  // defining the base endpoint for fetching the data
  baseURL: "https://conduit.productionready.io/api",
});

// sets jwt token to the auth header
export function setToken(jwt) {
  API.defaults.headers.common["Authorization"] = `Token ${jwt}`;
}

// clears jwt token from the auth header
export function clearToken() {
  delete API.defaults.headers.common["Authorization"];
}