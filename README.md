# Bookmarks

## Getting started

- `cd bookmarks-SOLUTION`
- `touch .env`
- `npm install`

**.env**

```
PORT=3003
```

#### Available routes

- GET `/` - landing page
- GET `/bookmarks` - index of all bookmarks
- GET `/bookmarks/:id` - show one (based on array position)
- GET `/bookmarks/`
- DELETE `/bookmarks/:id` - available through Postman
- POST `/bookmarks/` - available through Postman (see below for correct configuration)
- PUT `/bookmarks/` - available through Postman (see below for correct configuration (similar to POST))
- GET 404

#### Model

- name : string
- url : string
- isFavorite: boolean

## POSTMAN

### CREATE

Be sure to select

- POST
- body
- raw
- JSON

![](./assets/postman-create-json.png)

**IMPORTANT** Must be Proper JSON

```js
  {
    "name": "AV Club",
    "url": "https://www.avclub.com",
    "description": "Pop Culture Obsessives",
    "isFavorite": true
  }
```

## Order of build (work in progress)

- `mkdir bookmarks`
- `cd bookmarks`
- `touch server.js`
- `npm init -y`
- `touch app.js`
- `npm i express dotenv`
- `touch .env .gitignore`

**app.js**

```js// DEPENDENCIES
const express = require('express')

// CONFIGURATION
const app = express()

// ROUTES
app.get('/', (request, response) => {
    response.status(418).send('Hello, world!')
})

// EXPORT
module.exports = app
```

- `mkdir controllers`
- `touch controllers/bookmarks_controller.js`
- `mkdir models`
- `touch models/bookmark.js`
