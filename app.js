require("dotenv").config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose")
const cors = require("cors")

//Agregamos la conexión de mongoose
mongoose.connect(process.env.DB, {
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then((x)=> {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}`)
}).catch((err) => {
    console.log("Error connecting to mongo", err)
})

const app = express();
//utilizo cors para darle permiso a otras apps
app.use(
    cors({
        origin:["http://localhost:3001"],
        credentials:true,
        
    })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);

module.exports = app;
