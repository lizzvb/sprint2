var database = require("../database/config")



// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarLocal(idusuario, numeroregiao, estado ) {
    console.log(`ESTE É O NÚMERO TIPO: ${numeroregiao}, ESTE É O IDUSUARIO: ${idusuario}`);
    console.log(`ESTE É O NÚMERO TIPO: ${estado}, ESTE É O IDUSUARIO: ${idusuario}`);
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    // Atualiza a região
    var instrucaoRegiao = `
        UPDATE usuario SET fk_questionarioregiao = ${numeroregiao} WHERE id = ${idusuario};
    `;

    // Atualiza o estado
    var instrucaoEstado = `
        UPDATE usuario SET fk_estado = ${estado} WHERE id = ${idusuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoEstado + instrucaoRegiao);
    return database.executar(instrucaoRegiao)
        .then(() => database.executar(instrucaoEstado));

}function contarLocal() {
    const instrucao = `
    SELECT e.estado, r.regiaobrasil AS regiao, COUNT(u.id) AS QtdUsuarios
    FROM usuario u
    JOIN estado e ON u.fk_estado = e.idestado
    JOIN questionarioregiao r ON u.fk_questionarioregiao = r.idlocal
    GROUP BY e.estado, r.regiaobrasil
    ORDER BY QtdUsuarios DESC;
    `;

    return database.executar(instrucao);
}



module.exports = {
    cadastrarLocal,
   contarLocal
};