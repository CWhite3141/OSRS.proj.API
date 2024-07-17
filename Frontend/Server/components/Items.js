const express = require('express');
const apiClient = require('./apiClient');

class Items {
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.routes();
    }

    routes() {
        this.app.get('/categories', this.getCategoryInfo.bind(this));
        this.app.post('/items', this.binaryGetSubstringMatches.bind(this));
        this.app.post('/items/iterative', this.getSubstringMatches.bind(this)); // keep for testing lol
        this.app.post('/item/details', this.getItemDetails.bind(this));
    }

    async getCategoryInfo(req, res) {
        try {
            const data = await apiClient.getCategoryInfo();
            return res.json(data);
        } catch (error) {
            console.error("Error fetching category info:", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    async getItemDetails(req, res) {
        try {
            const item = req.body.item;
            if (!item) {
                return res.status(400).json({ error: "Item ID is required" });
            }

            const data = await apiClient.getItemDetails(item);
            return res.json(data);
        } catch (error) {
            console.error("Error fetching item info:", error.message);
            return res.status(500).json({ error: error.message });
        }
    }

    async getSubstringMatches(req, res) {
        try {
            const categoryData = await apiClient.getCategoryInfo();
            console.log('Categories API response:', categoryData);

            if (!categoryData || !Array.isArray(categoryData.alpha)) {
                throw new Error("Invalid category data");
            }

            const substring = req.body.substring.trim();
            if (!substring) {
                return res.status(400).json({ error: "Substring is required" });
            }

            const category = categoryData.alpha.find(c => c.letter.toUpperCase() === substring[0].toUpperCase());
            if (!category) {
                throw new Error(`No category found for alpha: ${substring[0].toUpperCase()}`);
            }

            const pages = Math.ceil(category.items / 12);
            console.log(`Total pages for category "${category.letter}": ${pages}`);

            const categoryMatches = [];
            let foundFirstMatch = false;
            let foundLastMatch = false;

            for (let i = 1; i <= pages; i++) {
                if (foundLastMatch) {
                    console.log("Found the last match, let's dip!");
                    break;
                }

                try {
                    console.log(`Searching page ${i} of category ${category.letter} for substring "${substring}"`);
                    const response = await apiClient.getItems(category.letter.toLowerCase(), i);
                    const items = response[0].items;
                    console.log(`Page ${i} items:`, items.map(item => item.name));

                    for (const item of items) {
                        console.log(`Checking item ${item.name}`);
                        if (item.name.toLowerCase().includes(substring.toLowerCase())) {
                            categoryMatches.push(item);
                            if (!foundFirstMatch) {
                                foundFirstMatch = true;
                            }
                        } else if (foundFirstMatch) {
                            foundLastMatch = true;
                            break;
                        }
                    }
                } catch (err) {
                    console.error(`Error fetching items for category ${category.letter}, page ${i}:`, err.message);
                }
            }

            console.log(`Total matches found: ${categoryMatches.length}`);
            res.json(categoryMatches);
        } catch (error) {
            console.error("Error fetching substring matches:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async binaryGetSubstringMatches(req, res) {  // Recursive approach
        try {
            const categories = await apiClient.getCategoryInfo();
            if (!categories || !Array.isArray(categories.alpha)) {
                throw new Error("Invalid category data");
            }

            const substring = req.body.substring.trim();
            if (!substring) {
                return res.status(400).json({ error: "Substring is required" });
            }

            const substringCategory = categories.alpha.find(c => c.letter.toLowerCase() === substring[0].toLowerCase());

            const itemsCount = substringCategory.items;
            console.log(`Items count for category "${substringCategory}": ${itemsCount}`);

            const pages = Math.ceil(itemsCount / 12); // Number of pages in the category
            console.log(`Total pages: ${pages}`);

            const categoryMatches = await this.binarySearchForSubstring(substring, substring[0], 1, pages);
            res.json(categoryMatches);
        } catch (error) {
            console.error("Error fetching substring matches:", error.message);
            res.status(500).json({ error: error.message });
        }
    }

    async binarySearchForSubstring(substring, category, low, high) {
        let substringMatches = []; // List of matches to be returned to the client

        while (low <= high) {
            let mid = Math.floor((low + high) / 2); // Middle page
            console.log(`Searching in page ${mid} (range ${low}-${high}).`);

            let response;
            try {
                response = await apiClient.getItems(category, mid);
            } catch (error) {
                console.error(`Error fetching items for page ${mid}:`, error.message);
                break;
            }

            let items = response[0].items;
            console.log(`Page ${mid} items:`, items.map(item => item.name));

            // Check the page for matches and if the first or last item is a match
            let { pageMatches, firstMatchIndex, lastMatchIndex } = this.getPageMatches(items, substring);

            if (pageMatches.length > 0) {
                console.log(`Found matches on page ${mid}:`, pageMatches.map(item => item.name));
                substringMatches.push(...pageMatches);

                // Check previous pages if necessary
                if (firstMatchIndex === 0 && mid > low) {
                    console.log(`Checking previous pages before page ${mid}.`);
                    let previousPageResult = await this.binarySearchForSubstring(substring, category, low, mid - 1);
                    substringMatches.push(...previousPageResult);
                }

                // Check next pages if necessary
                if (lastMatchIndex === items.length - 1 && mid < high) {
                    console.log(`Checking next pages after page ${mid}.`);
                    let nextPageResult = await this.binarySearchForSubstring(substring, category, mid + 1, high);
                    substringMatches.push(...nextPageResult);
                }

                break; // Break the loop once matches are found
            } else {
                if (substring < items[0].name.toLowerCase()) {
                    console.log(`Substring "${substring}" is less than the first item on page ${mid}. Moving to the left half.`);
                    high = mid - 1;
                } else {
                    console.log(`Substring "${substring}" is greater than the first item on page ${mid}. Moving to the right half.`);
                    low = mid + 1;
                }
            }
        }

        console.log(`Finished searching. Total matches found: ${substringMatches.length}`);
        return substringMatches;
    }

    getPageMatches(items, substring) {
        let pageMatches = [];
        let foundFirstMatch = false;
        let firstMatchIndex = null;
        let lastMatchIndex = null;

        for (let index = 0; index < items.length; index++) {
            let item = items[index];
            if (this.startsWith(item.name, substring)) {
                if (!foundFirstMatch) {
                    foundFirstMatch = true;
                    firstMatchIndex = index;
                }
                pageMatches.push(item);
                lastMatchIndex = index; // Update lastMatchIndex each time we find a match
            } else if (foundFirstMatch) {
                break; // Break the loop if we already found the first match and the current item doesn't match
            }
        }

        console.log(`Page matches for substring "${substring}":`, pageMatches.map(item => item.name));
        return { pageMatches, firstMatchIndex, lastMatchIndex };
    }

    startsWith(itemName, substring) {
        return itemName.toLowerCase().startsWith(substring.toLowerCase());
    }
}

module.exports = Items;
