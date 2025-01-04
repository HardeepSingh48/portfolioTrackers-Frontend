// services/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = {
  // Stock CRUD operations
  getAllStocks: async () => {
    const response = await axios.get(`${BASE_URL}/stocks`);
    return response.data;
  },

  getStock: async (id) => {
    const response = await axios.get(`${BASE_URL}/stocks/${id}`);
    return response.data;
  },

  addStock: async (stockData) => {
    const response = await axios.post(`${BASE_URL}/stocks`, stockData);
    return response.data;
  },

  updateStock: async (id, stockData) => {
    const response = await axios.put(`${BASE_URL}/stocks/${id}`, stockData);
    return response.data;
  },

  deleteStock: async (id) => {
    const response = await axios.delete(`${BASE_URL}/stocks/${id}`);
    return response.data;
  },

  // Portfolio operations
  getPortfolioValue: async () => {
    const response = await axios.get(`${BASE_URL}/portfolio/value`);
    return response.data;
  },

  getPortfolioMetrics: async () => {
    const response = await axios.get(`${BASE_URL}/portfolio/metrics`);
    return response.data;
  }
};

export default api;