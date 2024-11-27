CREATE DATABASE redesolidaria;

USE redesolidaria;



create table questionarioperfil (
idperfil int primary key,
nomeperfil varchar(45)
);


insert into questionarioperfil values 
(1, 'Voluntário Social e Tecnológico'),
(2, 'Voluntário Administrativo e Logístico'),
(3, 'Voluntário em Causas Sociais e Ambientais'), 
(4, 'Voluntário de Apoio Direto às Pessoas');

select count(idperfil) as 'Quantidade total de perfis' from questionarioperfil;


-- contar todos idperfil, e molstrar o max/count/ordenar (group by idperfil)
-- fazer calculo nol chartjs (maior/todos)




create table questionarioregiao (
idlocal int primary key, 
regiaobrasil varchar(45)); -- sul, sudeste...
-- count idlocal, max..... ver regiao com +
-- todas vao pra usuario

insert into questionarioregiao values 
(1, 'Sul'),
(2, 'Sudeste'),
(3, 'Norte'),
(4, 'Nordeste'),
(5, 'Centro-Oeste');



CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
    cpf char(11),
	email VARCHAR(50),
	senha VARCHAR(50),
    fk_questionarioperfil int, 
foreign key (fk_questionarioperfil) references questionarioperfil(idperfil),
fk_questionarioregiao int, 
foreign key (fk_questionarioregiao) references questionarioregiao(idlocal),
fk_estado int,
foreign key (fk_estado) references estado(idestado)
);


insert usuario values 
(1, 'Liz', '36176829877', 'liz.bohn@sptech.school',  'abc12345', 3, 2),

(2, 'Maria', '36176829870', 'abc@outlook.com', 'abc12346', 2, 1),


(3, 'Paula', '36176829899', 'teste@outlook.com', 'abc12341', 2, 1),


(4, 'Carla', '36176829879', 'abcd123@hotmail.com', 'abc12342', 4, 3);


select * from usuario join questionarioregiao on idlocal = fk_questionarioregiao;

select * from usuario join questionarioperfil on idperfil = fk_questionarioperfil;


select count(fk_questionarioperfil) as 'Quantidade de pessoas que fizeram perfil' from usuario;


select count(fk_questionarioperfil) as 'Quantidade de pessoas que fizeram região' from usuario;


-- select count(fk_questionarioregiao) as 'Quantidade por Região' from usuario group by id;

-- select count(fk_questionarioperfil) as 'Quantidade por perfil' from usuario;



create table estado (
idestado int primary key,
estado char(2),
fk_regiao int,
foreign key (fk_regiao) references questionarioregiao (idlocal));
-- count idlocal, max..... ver estado com +
-- todas vao pra usuario
-- imtegraer estado- regiao


-- insert into idestado, estado, fk_regiao values


CREATE TABLE quiz (
    idquiz INT PRIMARY KEY AUTO_INCREMENT,
    pontuacao INT NOT NULL,  
    tempo_total INT NOT NULL, -- minutos, segundos  
	fk_usuario int,
    foreign key (fk_usuario) references usuario(id)
);
-- average no tempototal
-- 1:1s


select * from usuario;
select * from questionarioperfil;
select * from questionarioregiao;
select * from quiz;
