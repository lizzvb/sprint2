var express = require("express");
var router = express.Router();

var quizlocalController = require("../controllers/quizlocalController");

//Recebendo os dados do html e direcionando para a função cadastrar de quizlocalController.js
router.put("/cadastrar", function (req, res) {
    quizlocalController.cadastrarLocal(req, res);
})

// posso dar o nome q quiser
router.get("/contagemlocal", function (req, res) { 
    quizlocalController.contarLocal(req, res);
})

module.exports = router;