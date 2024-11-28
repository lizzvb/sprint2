var express = require("express");
var router = express.Router();

var quiztiposController = require("../controllers/quiztiposController");

//Recebendo os dados do html e direcionando para a função cadastrar de quiztiposController.js
router.put("/cadastrar", function (req, res) {
    quiztiposController.cadastrarPerfil(req, res);
})

// posso dar o nome q quiser
router.get("/contagem", function (req, res) { 
    quiztiposController.contarPerfis(req, res);
})

module.exports = router;