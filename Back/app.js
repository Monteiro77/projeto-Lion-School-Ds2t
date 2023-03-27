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


app.get('/v1/lion-school/alunos', cors(), async function (request, response, next){

    let statusCode
    let dadosAluno = {}

    let aluno = cursos.getInfoAluno()

    if(aluno){
        statusCode = 200
        dadosAluno = aluno
    }
    else{
        statusCode = 500
    }

    response.status(statusCode)
    response.json(dadosAluno)
})

app.get('/v1/lion-school/alunos/:matricula', cors(), async function (request, response, next){
    let statusCode
    let dadosAluno = {}

    let matriculaAluno = request.params.matricula

        if(matriculaAluno == "" || matriculaAluno == undefined || isNaN(matriculaAluno)){
            statusCode = 400
            dadosAluno.message = 'Não foi possível acessar pois os dados de entrada (matricula) não corresponde ao exigido, confira o valor, pois não pode ser vazio e precisar ser a caracteres'
        }else{
            let aluno = cursos.getMatricula(matriculaAluno)

            if(aluno){
                statusCode = 200
                dadosAluno = aluno
            }else{
                statusCode = 400
            }

            response.status(statusCode)
            response.json(dadosAluno)
        }
    
})

app.get('/v1/lion-school/aluno', cors(), async function (request, response, next){
    let statusCode
    let dadosCurso = {}

    let siglaCurso = request.query.curso

    if(siglaCurso == "" || siglaCurso == undefined || !isNaN(siglaCurso)){
        statusCode = 400
        dadosCurso.message = 'Não foi possível fazer a busca, pois os dados de entrada(curso) estão incorretos'
    }else{
        let infomacoesCurso = cursos.getAlunosCurso(siglaCurso)

        if(infomacoesCurso){
            statusCode = 200
            dadosCurso = infomacoesCurso
        }else{
            statusCode = 400
        }

        response.status(statusCode)
        response.json(dadosCurso)
    }
})

app.get('/v1/lion-school/aluno/info', cors(), async function (request, response,next){
    let statusCode 
    let dadosAluno = {}

    let statusAluno = request.query.status

    if(statusAluno == "" || statusAluno == undefined || !isNaN(statusAluno)){
        statusCode = 400
        dadosAluno.message = 'Não foi possível fazer a busca, pois os dados de entrada(curso) estão incorretos' 
    }else{
        let infomacoesAluno = cursos.getStatusAluno(statusAluno)

        if(infomacoesAluno){
            statusCode = 200
            dadosAluno = infomacoesAluno
        }else{
            statusCode = 400
        }

        response.status(statusCode)
        response.json(dadosAluno)
    }
})
app.listen(8080, function(){
    console.log('SERVIDOR AGUARDANDO REQUISIÇÕES NA PORTA 8080')
})

