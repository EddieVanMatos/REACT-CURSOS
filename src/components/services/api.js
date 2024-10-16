// src/services/api.js
import axios from 'axios';

// Configura a URL base da sua API Spring Boot
const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
});

export default api;
