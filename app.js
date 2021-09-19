const express = require("express");
const path = require('path')
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './style' );
app.use(express.static(publicDirectory));

//Parse URL - o que foi enviado no corpo do formulário
app.use(express.urlencoded({ extended: false }));
//Parse JSON - o que foi enviado - para API
app.use(express.json());



app.set('view engine', 'hbs'); //hbs

db.connect( (error) =>{
    if(error){
        console.log(error)
    } else{
        console.log("MySQL Conectado");
    }
})

//Rotas
app.use('/', require('./routes/paginas'));
app.use('/auth', require('./routes/auth'))


app.listen(3306, ()=>{
    console.log("Server está rodando na porta 3306")
})