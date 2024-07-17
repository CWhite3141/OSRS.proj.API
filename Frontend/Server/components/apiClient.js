const axios = require('axios');
const https = require('https');

// Create an HTTPS agent that ignores self-signed certificates
const agent = new https.Agent({
    rejectUnauthorized: false,
});

const API_URL = process.env.API_URL || 'https://localhost:5237/OSRSGe';

const apiClient = {
    getCategoryInfo: async () => {
        const response = await axios.post(`${API_URL}/GetCategoryInfo`, { category: 1 }, { httpsAgent: agent });
        return response.data;
    },
    getItems: async (alpha, page) => {
        const response = await axios.post(`${API_URL}/GetItems`, {
            category: 1,
            alpha: alpha,
            page: page,
        }, { httpsAgent: agent });
        return response.data;
    },
    getItemDetails: async (item) => {
        const response = await axios.post(`${API_URL}/GetItemDetails`, { item: item }, { httpsAgent: agent });
        return response.data;
    }
};

module.exports = apiClient;
