/*************************************************************************************
 * Objetivo: Criar funções para retornar os dados necessários para a API
 * Data: 24/03/23
 * Autor: Vinícius Monteiro
 * Versão: 1.0
 ************************************************************************************/

//Import do json
var listaCursos = require('../json/cursos.js')
var listaAlunos = require('../json/alunos.js')



//Funções 
const getCursos = function() {
    return listaCursos
}


const getInfoAluno = function() {
    let listaInformacoesJson = {}
    let informacoes = []
    let alunos = {}

    listaAlunos.alunos.forEach(function(lista){
        listaInformacoesJson = 
        {
            nome: lista.nome,
            foto: lista.foto,
            matricula: lista.matricula,
            sexo: lista.sexo,
            status: lista.status
        }
        informacoes.push(listaInformacoesJson)
    })
    alunos = {
        informacoes
    }
    return alunos

}

const getMatricula = function(matricula){
    matriculaAluno = matricula
    let listaInformacoesJson = {}
    let informacoesDisciplinasArray = []
    let informacoesDisciplinasJson
    
    

    listaAlunos.alunos.forEach(function(lista){
        if(matriculaAluno == lista.matricula){
            listaInformacoesJson = {
                nome: lista.nome,
                foto: lista.foto,
                matricula: lista.matricula,
                sexo: lista.sexo,
                status: lista.status,
                nomeCurso: lista.curso[0].nome,
                sigla: lista.curso[0].sigla,
                icone: lista.curso[0].icone,
                conclusao: lista.curso[0].conclusao
            }

            lista.curso[0].disciplinas.forEach(function(listaDisciplina){
                listaInformacoesJson.disciplinas = informacoesDisciplinasArray

                informacoesDisciplinasJson = {
                    nomeDisciplina: listaDisciplina.nome,
                    media: listaDisciplina.media,
                    status: listaDisciplina.status
                }
                informacoesDisciplinasArray.push(informacoesDisciplinasJson)
            })

            
        }
    })
    

    return listaInformacoesJson

}

const getAlunosCurso = function(siglaCurso){

    let cursoSigla = siglaCurso.toUpperCase();
    let listaInformacoesJson = {};
    let informacoes = [];
    let alunos= {};

    let cursoAluno = listaAlunos.alunos;

    cursoAluno.forEach(function(lista){
        if(cursoSigla == lista.curso[0].sigla){
            listaInformacoesJson = {
                nome: lista.nome,
                foto: lista.foto,
                matricula: lista.matricula,
                sexo: lista.sexo,
                status: lista.status,
                curso: lista.curso[0].nome,
                dataConclusao: lista.curso[0].conclusao

            }
            informacoes.push(listaInformacoesJson);
        }
    })
    alunos = {
        informacoes
    }
    return alunos;
}

const getStatusAluno = function(status){

    let statusAluno = status
    let listaInformacoesJson = {}
    let informacoes = []
    let alunos = {}


    let aluno = listaAlunos.alunos

    aluno.forEach(function(lista){
        if(statusAluno.toUpperCase() == lista.status.toUpperCase()){
            listaInformacoesJson = {
                nome: lista.nome,
                foto: lista.foto,
                matricula: lista.matricula,
                sexo: lista.sexo,
                status: lista.status,
                curso: lista.curso[0].nome
            }
            informacoes.push(listaInformacoesJson)
        }
    })

    alunos = {
        informacoes
    }

    return alunos

}



module.exports = {
    getCursos,
    getInfoAluno,
    getMatricula,
    getAlunosCurso,
    getStatusAluno
}