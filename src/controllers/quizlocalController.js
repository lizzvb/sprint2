var quizlocalModel = require("../models/quizlocalModel");

function cadastrarLocal(req, res) {
    var idUsuario = req.body.usuarioServer;
    var numeroregiao = req.body.qualregiaoServer; 
    var estado = req.body.qualestadoServer; 
    
    
    if (!idUsuario || !numeroregiao || !estado) {
    console.error("Erro: Dados insuficientes para cadastro.");
    return res.status(400).send("Dados insuficientes para cadastro.");
}

    
    quizlocalModel.cadastrarLocal(idUsuario, numeroregiao, estado)

    
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


 function contarLocal(req, res) {
    quizlocalModel.contarLocal().then(function (resultado) {
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
    cadastrarLocal,
    contarLocal
}