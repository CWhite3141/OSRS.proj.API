### Get Item Details

**Description:**
Helper endpoint; returns a list of all item categories a-z and includes the number of items in each category. Used by [Get Substring Matches](#get-substring-matches) to establish number of pages available for searching since each page returns 12 items.

**Endpoint:**
`GET api/ge/categories`

**Response:**

- `200 OK`: Return item name, description, icon and price data.
- `500 Internal Server Error`: If there is an error fetching the items.

**Example Request:**

```JSON

GET /api/ge/categories HTTP/1.1
Host: localhost:3000
Content-Type: application/json

```

**Example Response:**

```JSON

{
  "alpha": [
    {
      "letter": "#",
      "items": 24
    },
    {
      "letter": "a",
      "items": 356
    },
    {
      "letter": "b",
      "items": 492
    },
    {
      "letter": "c",
      "items": 193
    },
    {
      "letter": "d",
      "items": 240
    },
    {
      "letter": "e",
      "items": 132
    },
    {
      "letter": "f",
      "items": 89
    },
    {
      "letter": "g",
      "items": 215
    },
    {
      "letter": "h",
      "items": 59
    },
    {
      "letter": "i",
      "items": 115
    },
    {
      "letter": "j",
      "items": 42
    },
    {
      "letter": "k",
      "items": 42
    },
    {
      "letter": "l",
      "items": 83
    },
    {
      "letter": "m",
      "items": 307
    },
    {
      "letter": "n",
      "items": 26
    },
    {
      "letter": "o",
      "items": 107
    },
    {
      "letter": "p",
      "items": 152
    },
    {
      "letter": "q",
      "items": 1
    },
    {
      "letter": "r",
      "items": 304
    },
    {
      "letter": "s",
      "items": 540
    },
    {
      "letter": "t",
      "items": 283
    },
    {
      "letter": "u",
      "items": 54
    },
    {
      "letter": "v",
      "items": 53
    },
    {
      "letter": "w",
      "items": 128
    },
    {
      "letter": "x",
      "items": 4
    },
    {
      "letter": "y",
      "items": 32
    },
    {
      "letter": "z",
      "items": 56
    }
  ],
  "types": []
}

```

---

### Get Item Details

**Description:**
Fetches the associated item's name, description, icon and current price. Also includes the 30, 90, and 180 day price trends.

**Endpoint:**
`POST api/ge/item/details`

**Request Body:**

- `item` (required): The associated item's unique _id_.

**Response:**

- `200 OK`: Return item name, description, icon and price data.
- `400 Bad Request`: If the id was not provided.
- `500 Internal Server Error`: If there is an error fetching the items.

**Example Request:**

```JSON

POST /api/ge/item/details HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "item":1965
}

```

**Example Response:**

```JSON

{
  "item": {
    "icon": "https://secure.runescape.com/m=itemdb_oldschool/1721049466188_obj_sprite.gif?id=1965",
    "iconLarge": null,
    "id": 1965,
    "type": "Default",
    "typeIcon": "https://www.runescape.com/img/categories/Default",
    "name": "Cabbage",
    "description": "Yuck I don't like cabbage.",
    "day30": {
      "trend": "negative",
      "change": "-10.0%"
    },
    "day90": {
      "trend": "positive",
      "change": "+24.0%"
    },
    "day180": {
      "trend": "positive",
      "change": "+20.0%"
    },
    "current": {
      "trend": "neutral",
      "price": 66
    },
    "today": {
      "trend": "positive",
      "price": "+2"
    },
    "members": "false"
  }
}

```

---

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

POST /api/ge/items HTTP/1.1
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
