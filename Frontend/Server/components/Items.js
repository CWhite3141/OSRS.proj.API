const express = require('express');
const axios = require('axios');
const https = require('https');

const API_URL = process.env.API_URL;

// Create an HTTPS agent that ignores self-signed certificates
const agent = new https.Agent({
    rejectUnauthorized: false,
});

class Items {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.routes();
    }

    routes() {
        this.app.get('/categories', this.getCategoryInfo.bind(this));
        this.app.post('/items', this.getSubstringMatches.bind(this));
        this.app.post('/item/details', this.getItemDetails.bind(this));
    }

    async getCategoryInfo(req, res = null) {
        try {
            const response = await axios.post(`https://localhost:5237/OSRSGe/GetCategoryInfo`, { category: 1 }, { httpsAgent: agent });
            const { data } = response;
            console.log("Category Info:", data);
            if (res) {
                return res.json(data);
            } else {
                return data;
            }
        } catch (error) {
            console.error("Error fetching category info:", error.message);
            if (res) {
                return res.status(500).json({ error: error.message });
            } else {
                throw error;
            }
        }
    }

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async getSubstringMatches(req, res) {
        try {
            const categoryData = await this.getCategoryInfo();
            if (!categoryData || !Array.isArray(categoryData.alpha)) {
                throw new Error("Invalid category data");
            }

            const substring = req.body.substring;
            if (!substring) {
                return res.status(400).json({ error: "Substring is required" });
            }

            const category = categoryData.alpha.slice(1).find(c => c.letter.toUpperCase() === substring[0].toUpperCase());
            if (!category) {
                return res.status(400).json({ error: "No category matches the first letter of the substring" });
            }

            console.log(`Searching ${category.letter} for substring: ${substring}`); // Log the substring being processed
            const categoryMatches = [];
            const pages = Math.ceil(category.items / 12);
            let foundMatch = true;

            for (let i = 1; i <= pages && foundMatch; i++) {
                try {
                    const response = await axios.post(`https://localhost:5237/OSRSGe/GetItems`, {
                        category: 1,
                        alpha: category.letter.toLowerCase(),
                        page: i,
                    }, { httpsAgent: agent });
                    console.log(response.data[0].items);

                    if (response.data && Array.isArray(response.data[0].items)) {
                        for (const item of response.data[0].items) {
                            if (item.name.toLowerCase().includes(substring.toLowerCase())) {
                                categoryMatches.push(item);
                            } else {
                                foundMatch = false;
                                break;
                            }
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching items for category ${category.letter}, page ${i}:`, err.message);
                }
                await this.sleep(100);
            }

            res.json(categoryMatches);
        } catch (error) {
            console.error("Error fetching substring matches:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async getItemDetails(req, res) {
        try {
            const item = req.body.item;
            if (!item) {
                return res.status(400).json({ error: "Item ID is required" });
            }

            const response = await axios.post(`https://localhost:5237/OSRSGe/GetItemDetails`, { item }, { httpsAgent: agent });
            const { data } = response;

            return res.json(data);
        } catch (error) {
            console.error("Error fetching item info:", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

}

module.exports = Items;
