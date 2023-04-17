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
    let status = false

    if(listaCursos != undefined){
        return listaCursos
    }else{
        return status
    }
    
}


const getInfoAluno = function() {
    let listaInformacoesJson = {}
    let informacoes = []
    let alunos = {}
    let status = false

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
        status = true
    })
    alunos = {
        informacoes
    }

    if(status){
        return alunos
    }else{
        return status
    }

}


const getSigla = function(palavraNaoAbreviada){
    let materias = palavraNaoAbreviada.replace(/\s(de|da|a|das)\s/g, ' ');
    materias = materias.split(' ');
    const initials = materias.map(materia => materia.charAt(0).toUpperCase());
    return initials.join('');

} 


const getMatricula = function(matricula){
    matriculaAluno = matricula
    let listaInformacoesJson = {}
    let informacoesDisciplinasArray = []
    let informacoesDisciplinasJson
    let status = false
    
    

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
                    sigla: getSigla(listaDisciplina.nome),
                    media: listaDisciplina.media,
                    status: listaDisciplina.status
                }
                informacoesDisciplinasArray.push(informacoesDisciplinasJson)
            })

            status = true
        }
    })
    
    if(status){
        return listaInformacoesJson
    }else{
        return status
    }
    

}

const getAlunosCurso = function(siglaCurso){

    let cursoSigla = siglaCurso.toUpperCase();
    let listaInformacoesJson = {};
    let informacoes = [];
    let alunos= {};
    let status = false

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
            status = true
        }
    })
    alunos = {
        informacoes
    }
    
    if(status){
        return alunos
    }else{
        return status
    }
}

const getStatusAluno = function(status){

    let statusAluno = status
    let listaInformacoesJson = {}
    let informacoes = []
    let alunos = {}
    let statusFunction = false


    let aluno = listaAlunos.alunos

    aluno.forEach(function(lista){
        if(statusAluno.toUpperCase() == lista.status.toUpperCase()){
            listaInformacoesJson = {
                nome: lista.nome,
                foto: lista.foto,
                matricula: lista.matricula,
                sexo: lista.sexo,
                status: lista.status,
                curso: lista.curso[0].nome,
                dataConclusao: lista.curso[0].conclusao
            }
            informacoes.push(listaInformacoesJson)
            statusFunction = true
        }
    })

    alunos = {
        informacoes
    }

    if(statusFunction){
        return alunos
    }else{
        return statusFunction
    }

}

const getAlunoCursoStatus = function(siglaCurso, statusAluno){
    let sigla = siglaCurso
    let status = statusAluno
    let listaInformacoesJson = {}
    let informacoes = []
    let alunos = {}
    let statusFunction = false

    let aluno = listaAlunos.alunos

    aluno.forEach(function(lista){
        if(sigla.toUpperCase() == lista.curso[0].sigla.toUpperCase() && status.toUpperCase() == lista.status.toUpperCase()){
            listaInformacoesJson = {
                nome: lista.nome,
                foto: lista.foto,
                matricula: lista.matricula,
                sexo: lista.sexo,
                status: lista.status
            }
            lista.curso.forEach(function(listaCursos){
                listaInformacoesJson.curso = listaCursos.nome
                listaInformacoesJson.dataConclusao = listaCursos.conclusao
            })
            informacoes.push(listaInformacoesJson)
            statusFunction = true
        }
    })

    alunos = {
        informacoes
    }

    if(statusFunction){
        return alunos
    }else{
        return statusFunction
    }
}

console.log(getAlunoCursoStatus('ds', 'finalizado'));



module.exports = {
    getCursos,
    getInfoAluno,
    getMatricula,
    getAlunosCurso,
    getStatusAluno
}