const express = require("express");
const { initializeElasticsearch, searchUserIndex } = require('./config/elasticSearch');
const path = require("path")
// const hbs = require("hbs")
const templatePath = path.join(__dirname, "./data/templates")
const cookieParser = require("cookie-parser")
const loginRoute =require("./routes/login")
const signupRoute = require('./routes/signup'); // Add this line
const outlookLogin = require("./routes/outlookLogin")
const indexRoute = require("./data/ms-identity-javascript-v2-master/server")
const {cookieJwtAuth}= require("./middleware/cookieJwtAuth")
const app = express();
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cookieParser());
const port = process.env.APP_PORT || 3000;
initializeElasticsearch();

app.get('/search', async (req, res) => {
    try {
        const searchResult = await searchUserIndex();
        res.json(searchResult);
    } catch (error) {
        res.status(500).send('Error performing search');
    }
});
// Use the signup route
app.use('/signup', signupRoute);
app.use('/login', loginRoute)



app.use('/',cookieJwtAuth, indexRoute)

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
    

});




