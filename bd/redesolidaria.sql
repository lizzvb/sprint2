CREATE DATABASE redesolidaria;

USE redesolidaria;

-- Tabela de questionário de perfil
CREATE TABLE questionarioperfil (
    idperfil INT PRIMARY KEY,
    nomeperfil VARCHAR(45)
);

INSERT INTO questionarioperfil VALUES 
(1, 'Voluntário Social e Tecnológico'),
(2, 'Voluntário Administrativo e Logístico'),
(3, 'Voluntário em Causas Sociais e Ambientais'), 
(4, 'Voluntário de Apoio Direto às Pessoas');



SELECT COUNT(idperfil) AS 'Quantidade total de perfis' FROM questionarioperfil;

-- Tabela de questionário de região
CREATE TABLE questionarioregiao (
    idlocal INT PRIMARY KEY, 
    regiaobrasil VARCHAR(45)
);

INSERT INTO questionarioregiao VALUES 
(1, 'Sul'),
(2, 'Sudeste'),
(3, 'Norte'),
(4, 'Nordeste'),
(5, 'Centro-Oeste');

-- Tabela de relacionamento entre perfil e região
CREATE TABLE questionario_perfil_regiao (
    id_perfil INT,
    id_regiao INT,
    PRIMARY KEY (id_perfil, id_regiao),
    FOREIGN KEY (id_perfil) REFERENCES questionarioperfil(idperfil),
    FOREIGN KEY (id_regiao) REFERENCES questionarioregiao(idlocal)
);

-- Inserção de dados na tabela de relacionamento
INSERT INTO questionario_perfil_regiao (id_perfil, id_regiao) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4);

SELECT qpr.id_perfil, qpr.id_regiao, qp.nomeperfil, qr.regiaobrasil
FROM questionario_perfil_regiao as qpr
JOIN questionarioperfil qp ON qpr.id_perfil = qp.idperfil
JOIN questionarioregiao qr ON qpr.id_regiao = qr.idlocal;

-- Tabela de estado
CREATE TABLE estado (
    idestado INT PRIMARY KEY,
    estado CHAR(2),
    fk_regiao INT,
    FOREIGN KEY (fk_regiao) REFERENCES questionarioregiao(idlocal)
);

select * from estado;

 

-- Inserir dados na tabela de estado
-- Região Sul
INSERT INTO estado (idestado, estado, fk_regiao) VALUES
(1, 'PR', 1), -- Paraná
(2, 'RS', 1), -- Rio Grande do Sul
(3, 'SC', 1); -- Santa Catarina

-- Região Sudeste
INSERT INTO estado (idestado, estado, fk_regiao) VALUES
(4, 'ES', 2), -- Espírito Santo
(5, 'MG', 2), -- Minas Gerais
(6, 'RJ', 2), -- Rio de Janeiro
(7, 'SP', 2); -- São Paulo

-- Região Norte
INSERT INTO estado (idestado, estado, fk_regiao) VALUES
(8, 'AC', 3), -- Acre
(9, 'AP', 3), -- Amapá
(10, 'AM', 3), -- Amazonas
(11, 'PA', 3), -- Pará
(12, 'RO', 3), -- Rondônia
(13, 'RR', 3), -- Roraima
(14, 'TO', 3); -- Tocantins

-- Região Nordeste
INSERT INTO estado (idestado, estado, fk_regiao) VALUES
(15, 'AL', 4), -- Alagoas
(16, 'BA', 4), -- Bahia
(17, 'CE', 4), -- Ceará
(18, 'MA', 4), -- Maranhão
(19, 'PB', 4), -- Paraíba
(20, 'PE', 4), -- Pernambuco
(21, 'PI', 4), -- Piauí
(22, 'RN', 4), -- Rio Grande do Norte
(23, 'SE', 4); -- Sergipe (removido duplicata de Sergipe)




-- Região Centro-Oeste
INSERT INTO estado (idestado, estado, fk_regiao) VALUES
(25, 'DF', 5), -- Distrito Federal
(26, 'GO', 5), -- Goiás
(27, 'MS', 5), -- Mato Grosso do Sul
(28, 'MT', 5); -- Mato Grosso

-- Tabela de quiz
CREATE TABLE quiz (
    idquiz INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao INT,  
    tempo_total INT-- minutos, segundos  
);



-- Tabela de usuário
CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    cpf CHAR(11),
    email VARCHAR(50),
    senha VARCHAR(50),
    fk_questionarioperfil INT,
    FOREIGN KEY (fk_questionarioperfil) REFERENCES questionarioperfil(idperfil),
    fk_questionarioregiao INT,
    FOREIGN KEY (fk_questionarioregiao) REFERENCES questionarioregiao(idlocal),
    fk_estado INT,
    FOREIGN KEY (fk_estado) REFERENCES estado(idestado),
    fk_quiz int,
    foreign key (fk_quiz) references quiz(idquiz)
);

-- Inserção de dados na tabela de usuário
INSERT INTO usuario (nome, cpf, email, senha, fk_questionarioperfil, fk_questionarioregiao, fk_estado) 
VALUES 
('Liz', '36176829877', 'liz.bohn@sptech.school', 'abc12345', 3, 2, 5),
('Maria', '36176829870', 'abc@outlook.com', 'abc12346', 2, 1, 1),
('Paula', '36176829899', 'teste@outlook.com', 'abc12341', 2, 1, 1),
('Carla', '36176829879', 'abcd123@hotmail.com', 'abc12342', 4, 3, 10);




-- Consultar quantidade de usuários por estado
SELECT e.estado, COUNT(u.id) AS 'QtdUsuarios'
FROM usuario u
JOIN estado e ON u.fk_estado = e.idestado 
GROUP BY e.idestado ORDER BY COUNT(u.id) DESC;

-- Consultar quantidade de usuários por perfil
SELECT q.nomeperfil, COUNT(u.id) AS QtdUsuarios
FROM usuario u
JOIN questionarioperfil q ON u.fk_questionarioperfil = q.idperfil
GROUP BY q.idperfil;

SELECT q.nomeperfil, COUNT(u.id) AS QtdUsuarios
FROM usuario u
JOIN questionarioperfil q ON u.fk_questionarioperfil = q.idperfil
GROUP BY q.idperfil order by  QtdUsuarios desc limit 1;



-- Consultar quantidade de usuários por região
SELECT r.regiaobrasil, COUNT(u.id) AS 'Quantidade de Usuários'
FROM usuario u
JOIN questionarioregiao r ON u.fk_questionarioregiao = r.idlocal
GROUP BY r.idlocal;

-- Inserção de dados na tabela quiz
INSERT INTO quiz (pontuacao, tempo_total) 
VALUES (8, 150),
       (6, 120),
       (9, 180),
       (10, 240);



-- Consultar média do tempo total
SELECT AVG(tempo_total) AS 'Média do Tempo Total'
FROM quiz;

-- Consultar maior pontuação
SELECT MAX(pontuacao) AS 'Maior Pontuação'
FROM quiz;

-- Consultar todos os dados
SELECT * FROM usuario;
SELECT * FROM questionarioperfil;
SELECT * FROM questionarioregiao;
SELECT * FROM quiz;

-- select do perfil dependendo do usuario
 SELECT q.nomeperfil 
        FROM usuario u
        JOIN questionarioperfil q ON u.fk_questionarioperfil = q.idperfil
        WHERE u.id = idperfil;




select * from usuario;