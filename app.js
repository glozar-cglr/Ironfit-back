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
        origin:["http://localhost:3001", "https://iron-fitness.herokuapp.com"],
        credentials:true,
        
    })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const trainerRouter = require('./routes/trainers');
const traineesRouter = require('./routes/trainees');

app.use('/api', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/trainers', trainerRouter);
app.use('/api/trainees', traineesRouter);

//esto es muy importante es para seguir en la ruta despues de actualizar
//podamos entrar a cualquier ruta
app.use("*", (req,res)=>{
    res.sendFile(path.join(__dirname, "public","index.html"));
   });
   
module.exports = app;
