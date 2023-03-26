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

    listaAlunos.alunos.forEach(function(lista){
        listaInformacoesJson = 
        {
            nome: lista.nome,
            foto: lista.foto,
            matricula: lista.matricula,
            sexo: lista.sexo
        }

        
    })


}

getInfoAluno();
module.exports = {
    getCursos
}