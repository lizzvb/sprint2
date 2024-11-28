var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarPerfil(idusuario, numerotipo ) {
    console.log(`ESTE É O NÚMERO TIPO: ${numerotipo}, ESTE É O IDUSUARIO: ${idusuario}`);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        UPDATE usuario set fk_questionarioperfil = ${numerotipo} where id = ${idusuario} ;

    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function contarPerfis () {
    var instrucaoSql = `
    SELECT q.nomeperfil, COUNT(u.id) AS QtdUsuarios
FROM usuario u
JOIN questionarioperfil q ON u.fk_questionarioperfil = q.idperfil
GROUP BY q.idperfil order by QtdUsuarios desc;
`;
return database.executar(instrucaoSql);


}



module.exports = {
    cadastrarPerfil,
    contarPerfis
};