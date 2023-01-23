# Read it later API

This code was built using [Node.js](https://nodejs.org) (v16) and [Express](https://expressjs.com/) framework, DBMS used is [MongoDB](https://www.mongodb.com/).

## Routes
### Public 
GET / &rarr; welcome page <br>
POST /register &rarr; register user <br>
POST /auth &rarr; login user <br>
GET /refresh  &rarr; get user's refresh token <br>
GET /logout  &rarr; logout user <br>

### Protected
GET /user &rarr; get user's information <br>
POST /user/:userId &rarr; create item <br>
DELETE /user/:userId/:itemId  &rarr; delete item <br>

## Usage
- `npm install`
- `npm start` run in production
- `npm run dev` run in development

## Links
- [API](https://read-it-later.onrender.com)
- [Front-end code](https://github.com/eulaliapi/read-it-later-frontend)
- [Read It Later app](https://read-it-later-56c51.web.app)

### Contact me
- [LinkedIn](https://www.linkedin.com/in/eulalia-pirone/)
- [Email](https://eulaliapi.github.io/contact-form.html)
- [Portfolio](https://eulaliapi.github.io/)
