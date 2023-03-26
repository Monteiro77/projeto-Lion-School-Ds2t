/*****************************************************************************************************
 * Objetivo: Criar uma API para disponibilizar dados para o front nno projeto Lion Scholl 
 * Data: 24/03/2023
 * Autor: Vinícius Monteiro
 * Versão: 1.0
 *****************************************************************************************************/
//Import das dependencias do projeto
const cursos = require('./module/module.js')
//Import do express
const express = require('express');
//Import Cors
const cors = require('cors');
//Import Body-Parser
const bodyParser = require('body-parser');

//Criação do app

const app = express();

app.use((request, response, next) => {


   //API PÚBLICA 
   response.header('Acess-Control-Allow-Origin', '*');

   response.header('Acess-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');

   app.use(cors());

   next();

})

app.get('/v1/lion-school/cursos', cors(), async function (request,response, next){

    let statusCode
    let dadosCurso = {}

    let curso = cursos.getCursos();

    if (curso) {
        statusCode = 200
        dadosCurso = curso
    }else{
        statusCode = 500
    }

    response.status(statusCode)
    response.json(dadosCurso)
    
})

app.listen(8080, function(){
    console.log('SERVIDOR AGUARDANDO REQUISIÇÕES NA PORTA 8080')
})

