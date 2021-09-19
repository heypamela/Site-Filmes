const mysql = require("mysql");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.registrar = (req, res) =>{
    console.log(req.body);

    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    const senhaConfirma = req.body.senhaConfirma;

    db.query('SELECT email FROM usuarios WHERE email = ?', [email], async(error, results)=>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('registrar', {
                message: 'Este email já é cadastrado!'
            })
        } else if(senha !== senhaConfirma){
            return res.render('registrar', {
                message: 'As senhas não são iguais'
            });
        }


        let hashedSenha = await bcrypt.hash(senha, 8);
        console.log(hashedSenha)

        db.query('INSERT INTO usuarios SET ?', {nome:nome, email:email, senha: hashedSenha}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                return res.render('registrar', {
                    message: 'Cadastro efetuado com sucesso!'
                })
            }
        });

    });

    res.send("Cadastrado com sucesso!!")  
}