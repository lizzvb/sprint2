var quiztiposModel = require("../models/quiztiposModel");

function cadastrarPerfil(req, res) {
    var idUsuario = req.body.usuarioServer;
    var numeroTipo = req.body.letratipoServer; 

    quiztiposModel.cadastrarPerfil(idUsuario, numeroTipo)
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


function contarPerfis(req, res) {
    quiztiposModel.contarPerfis().then(function (resultado) {
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
    cadastrarPerfil,
    contarPerfis
}