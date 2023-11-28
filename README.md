# base-auth-handler  [![npm version](https://badge.fury.io/js/base-auth-handler.svg)](https://www.npmjs.com/package/base-auth-handler)

## A simple authentication handling module for Express written in TypeScript.


### Provides middlewares for managing user authentication with JWT.

## Features

- Written in TypeScript
- Published as both JS and TypeScript types
- Handles user authentication with JSON Web Tokens
- Provides middlewares for Express apps
- Easy to integrate

## Installation

```
npm install base-auth-handler
```

## Usage

Import the middlewares you need:

```ts
import { currentUser, requireAuth, validateRequest } from "base-auth-handler";
```

### currentUser

Populates `req.currentUser` if a valid JWT token cookie exists.

```ts 
app.use(currentUser);
```

### requireAuth 

Throws error if current user is not authenticated. Use to protect routes.

```ts
app.get("/profile", requireAuth, (req, res) => {
  // can access req.currentUser
});
```

### validateRequest

Validates request using express-validator. Useful for validating sign up data.

```ts
app.post("/signup", validators, validateRequest, (req, res) => {
  // data has been validated
})
```

## Example App

```ts
import express from "express";
import cookieParser from "cookie-parser";

import { currentUser, requireAuth, validateRequest } from "base-auth-handler";

const app = express();

app.use(cookieParser());

app.get("/profile", currentUser, requireAuth, (req, res) => {
  res.send(req.currentUser);  
});

app.post("/signup", 
  [
    // validators
  ], 
  validateRequest,
  (req, res) => {
    // create user
  }
);
```

The middlewares handle user authentication and validation - the app code stays clean.

## Contributing  
Feel free to contribute to this project by reporting issues or creating pull requests. For major changes, please open an issue first to discuss the proposed changes.

## License  
This module is licensed under the MIT License - see the LICENSE file for details.