require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');  // Add this line if not already present


const app = express();
const PORT = process.env.PORT || 4000;

// database connection
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", ()=>console.log("Connected to the database!"));

app.set('view engine', 'ejs');  // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));  // Set the views directory

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "my secret key",
        saveUnitialized: true,
        resave: false,
    })
);

app.use((req,res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));

//set template engin
app.set("view engin", "ejs");


// route prefix
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
