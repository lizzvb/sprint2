var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then((resultadoAutenticar) => {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length == 1) {
                    const usuario = resultadoAutenticar[0]; // ARRAY DO BD
                    res.json({
                        id: usuario.id,
                        nome: usuario.nome,
                        email: usuario.email,
                        tipoquiz:usuario.fk_questionarioperfil, 
                        senha: usuario.senha
                    });
                } else if (resultadoAutenticar.length == 0) {
                    res.status(403).send("Email e/ou senha inválido(s)");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                }
            })
            .catch((erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (nome === undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email === undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha === undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then((resultado) => {
                res.json(resultado);
            })
            .catch((erro) => {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

var usuarioModel = require("../models/usuarioModel");


function obterPerfil(req, res) {
    const idUsuario = req.query.id;

    // Log para verificar se o ID foi recebido corretamente
    console.log("ID recebido na API:", idUsuario);

    if (!idUsuario) {
        res.status(400).send("ID do usuário não fornecido.");
        return;
    }

    usuarioModel.obterPerfilUsuario(idUsuario)
        .then((resultado) => {
            // Log para verificar o resultado da consulta no banco de dados
            console.log("Resultado da consulta SQL:", resultado);

            if (resultado.length > 0) {
                res.json({ nomeperfil: resultado[0].nomeperfil });
            } else {
                res.status(404).send("Usuário não encontrado.");
            }
        })
        .catch((erro) => {
            console.error("Erro ao buscar perfil do usuário:", erro);
            res.status(500).send("Erro ao buscar perfil do usuário.");
        });
}



module.exports = {
    autenticar,
    cadastrar,
    obterPerfil
};
