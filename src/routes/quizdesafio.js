var express = require("express");
var router = express.Router();

var quizdesafioController = require("../controllers/quizdesafioController");

//Recebendo os dados do html e direcionando para a função cadastrar de quizlocalController.js
router.put("/cadastrar", function (req, res) {
    quizdesafioController.cadastrarDesafio(req, res);
})

// posso dar o nome q quiser
router.get("/contagemdesafio", function (req, res) { 
    quizdesafioController.contarDesafio(req, res);
})

module.exports = router;