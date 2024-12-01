var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarDesafio(idusuario, pontuacao ) {
    console.log(`ESTE É O NÚMERO TIPO: ${pontuacao}, ESTE É O IDUSUARIO: ${idusuario}`);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
UPDATE quiz set = ${pontuacao} where id = ${idusuario};

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarDesafio () {
    var instrucaoSql = `SELECT 
    q.idquiz,
    q.pontuacao,
    COUNT(u.id) AS QtdUsuarios
FROM 
    usuario u
JOIN 
    quiz q ON u.fk_quiz = q.idquiz
GROUP BY 
    q.idquiz, q.pontuacao
ORDER BY 
    q.pontuacao DESC, QtdUsuarios DESC;

`;
return database.executar(instrucaoSql);


}



module.exports = {
    cadastrarDesafio,
    contarDesafio
};