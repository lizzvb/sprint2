var quizdesafioModel = require("../models/quizdesafioModel");

function cadastrarDesafio(req, res) {
    var idUsuario = req.body.usuarioServer;
  //  var numeroregiao = req.body.qualregiaoServer; 
    var desafio = req.body.odesafioServer; 
    
    
    
    

    
    quizdesafioModel.cadastrarDesafio(idUsuario, desafio) //numeroregiao)

    
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}


 function contagemDesafio(req, res) {
    quizdesafioModel.contagemDesafio().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
 }

module.exports = {
    cadastrarDesafio,
    contagemDesafio
}