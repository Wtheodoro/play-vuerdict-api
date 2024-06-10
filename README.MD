# Play Vuerdict API

Welcome to the Gaming Platform API documentation. This API allows access to resources related to games and game comments.

<div style="background: linear-gradient(to top, #00243D, transparent);">
  <p align="center">
    <img src="https://raw.githubusercontent.com/Wtheodoro/play-vuerdict/main/src/assets/images/cloudStrife.svg" width="200" alt="Cloud Strife">
  </p>
</div>

**Technologies used:**

- Node.JS
- Express
- Mongodb with Atlas

## Installation

Make sure you have [Node.js](https://nodejs.org) installed on your system. Clone this repository and run the following command to install dependencies:

```bash
npm install
```

## Configuration

Before starting the server, you need to set up your environment variables. Create a .env file in the root of the project and define the following variables exemples:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/gaming-platform

PORT: The port on which the server will run.
MONGODB_URI: The MongoDB connection URI.

## Execution

```bash
npm run dev
```

The server will start and be accessible at http://localhost:3000 (or on the port you configured).

### Games

[x] GET /api/games
Returns all games registered on the platform.

[x] GET /api/games/:id
Returns a specific game based on its ID.

[x] POST /api/games/internal
Adds a new game to the platform.

[ ] PUT /api/games/
Updates details of an existing game.

[ ] DELETE /api/games/
Removes a game from the platform.

### Reviews

[x] GET /api/reviews
Returns all reviews registered on the platform.

[x] GET /api/reviews/:gameId
Returns reviews from a specific game.

[x] POST /api/reviews
Adds a new comment to a specific game.

[x] PUT /api/reviews/:id
Updates an existing comment.

[x] DELETE /api/reviews/:id
Removes a comment from the platform.
