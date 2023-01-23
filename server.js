require('dotenv').config();
const express = require('express');
const app = express();
const credentials = require('./middlewares/credentials');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const cookieParser = require('cookie-parser');
const verifyJWT = require('./middlewares/verifyJWT');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const port = process.env.PORT;

connectDB();

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


//public routes
app.use('/', require('./routes/root'));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);

//secured routes
app.use('/user', require('./routes/api/user'));

//not found route
app.all('*', (req, res) => {
    res.status(404).json({"message": "Route not found"});
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    }); 
});
