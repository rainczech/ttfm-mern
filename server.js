const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 3002;
const bodyParser = require("body-parser");
//body parser needs to be at the top in order to work
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require('mongoose');
const db = require('./models');
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ttfm";
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to db @', MONGODB_URI);
    });

// const jtoken = require('./middleware/jtoken/jtoken');
// app.use(jtoken.middleware());

// const router = require('./routes/router');
const userRouter = require('./controllers/user-controller');
const projectRouter = require('./controllers/project-controller');
const testRouter = require('./controllers/test-controller');
//  app.use('/', router);
app.use('/', userRouter);
app.use('/', projectRouter);
app.use('/', testRouter);

const gamify = require('./middleware/gamify/gamify');
const gamifyOptions = require('./middleware/gamify/gamify-options.js');
app.use(gamify.checkAchievements(gamifyOptions));

app.listen(PORT, ()=> {
    console.log('Listening on', PORT);
});
