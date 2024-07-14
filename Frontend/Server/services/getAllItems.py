import requests
import json
import time

getItemsURI = 'https://localhost:5237/OSRSGe/GetItems'

def getCategoryInfo():
    getCategoryInfoURI = 'https://localhost:5237/OSRSGe/GetCategoryInfo'
    payload = {
        'category': 1,
    }
    headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(getCategoryInfoURI, json=payload, headers=headers, verify=False)
        response.raise_for_status()

        if response.status_code == 200:
            return response.json()
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f'Error fetching categories: {str(e)}')
        return None

def get_items(category_letter, page):
    payload = {
        'category': 1,
        'alpha': category_letter,
        'page': page
    }
    headers = {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post(getItemsURI, json=payload, headers=headers, verify=False)
        response.raise_for_status()

        if response.status_code == 200:
            return response.json()
        else:
            return None

    except requests.exceptions.RequestException as e:
        print(f"Error fetching items for category {category_letter}, page {page}: {str(e)}")
        return None

if __name__ == '__main__':
    categories = getCategoryInfo()
    if categories:
        all_items = []
        for category in categories.get('alpha', []):
            letter = category['letter']
            num_items = category['items']
            pages = (num_items + 11) // 12  # This ensures correct page calculation

            for page in range(1, pages + 1):
                attempts = 0
                success = False
                while attempts < 10 and not success:
                    items = get_items(letter, page)
                    if items:
                        all_items.extend(items)
                        success = True
                    else:
                        attempts += 1
                        time.sleep(1)  # Add delay to avoid overwhelming the server
                if not success:
                    with open('./error_log.txt', 'a') as f:
                        f.write(f"Error fetching category {letter}, page {page} after {attempts} attempts\n")
                time.sleep(2)  # Add delay to avoid overwhelming the server

        with open('./all_items.json', 'w') as f:
            json.dump(all_items, f, indent=4)  # Write all items as a single JSON array with pretty printing
