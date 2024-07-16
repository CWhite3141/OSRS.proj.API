### Get Substring Matches

**Description:**
Fetches items whose names _start_ with the given substring. Is not case-sensitive and will trim the substring of leading/ trailing spaces.

**Endpoint:**
`POST api/ge/items`

**Request Body:**

- `substring` (required): The substring to search for.

**Response:**

- `200 OK`: Return a list of items that start with the substring.
- `400 Bad Request`: If the substring was not provided.
- `500 Internal Server Error`: If there is an error fetching the items.

**Example Request:**

```JSON

POST api/ge/items HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "substring":"abyssal whip"
}

```

**Example Response:**

```JSON

[
  {
    "icon": "https://secure.runescape.com/m=itemdb_oldschool/1721049466188_obj_sprite.gif?id=4151",
    "iconLarge": null,
    "id": 4151,
    "type": "Default",
    "typeIcon": "https://www.runescape.com/img/categories/Default",
    "name": "Abyssal whip",
    "description": "A weapon from the Abyss.",
    "day30": null,
    "day90": null,
    "day180": null,
    "current": {
      "trend": "neutral",
      "price": "1.6m"
    },
    "today": {
      "trend": "negative",
      "price": "- 5,197"
    },
    "members": "true"
  }
]

```
