var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarDesafio(idusuario, pontuacao ) {
    console.log(`ESTE É O NÚMERO TIPO: ${pontuacao}, ESTE É O IDUSUARIO: ${idusuario}`);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
UPDATE usuario
SET fk_quiz = ${pontuacao}
WHERE usuario.id = ${idusuario};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contagemDesafio () {
    var instrucaoSql = `SELECT 
    u.nome AS NomeUsuario,
    q.pontuacao AS Pontuacao
FROM 
    usuario u
JOIN 
    quiz q ON u.fk_quiz = q.idquiz
ORDER BY 
    q.pontuacao DESC;


`;
return database.executar(instrucaoSql);


}



module.exports = {
    cadastrarDesafio,
    contagemDesafio
};