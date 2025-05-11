import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-estoque-clinica-1.onrender.com",
  withCredentials: true, // Se necessário enviar cookies
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Busca o token salvo com a chave correta
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho Authorization
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

