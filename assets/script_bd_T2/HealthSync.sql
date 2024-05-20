create database HealthSync;
use  HealthSync;

-- tabela cliente
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
	senha VARCHAR(255) NOT NULL,
    peso DECIMAL(5,2),
    altura DECIMAL(5,2),
    sexo ENUM('Masculino', 'Feminino', 'Outro'),
    horas_de_sono INT,
    foto BLOB,  -- Armazenar imagens como BLOB
    exames_recentes VARCHAR(2000),
    medicacoes_em_uso VARCHAR(2000),
    condicoes_medicas_preexistentes VARCHAR(2000)
);
-- tabela profissional de exercicios
CREATE TABLE profissionai_exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_profissional VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(100)
);
-- tabela 'plano_alimentar'
CREATE TABLE plano_alimentar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
    cliente_nome VARCHAR(100),
    alergias_alimentares VARCHAR(2000),
    deficiencia_vitaminas_minerais VARCHAR(2000),
    experiencia_anterior_dietas VARCHAR(2000),
    consumo_agua DECIMAL(4,2),
    preferencias_alimentares VARCHAR(2000),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (cliente_nome) REFERENCES cliente(nome)
);

-- tabela 'plano_de_exercicios'
CREATE TABLE plano_de_exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT,
	cliente_nome VARCHAR(100),
    profissionai_exercicios_nome VARCHAR(100),
    vezes_por_semana INT,
    tempo_diario_atividades_fisicas TIME,  
    experiencia_anterior_treinamento_fisico VARCHAR(2000),
    locais_disponiveis_exercitar VARCHAR(2000),
    deficiencias_fisicas_impedimentos VARCHAR(2000),
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (cliente_nome) REFERENCES cliente(nome),
	FOREIGN KEY (profissionai_exercicios_nome) REFERENCES profissionai_exercicios(nome)
);

-- Inserir dados na tabela cliente
INSERT INTO cliente (nome, senha, peso, altura, sexo, horas_de_sono, exames_recentes, medicacoes_em_uso, condicoes_medicas_preexistentes)
VALUES
('Lucas','123', 70.5, 175.0, 'Masculino', 7, 'Nenhum', 'Nenhuma', 'Nenhuma condição médica preexistente'),
('Maria','123', 62.0, 160.0, 'Feminino', 8, 'Nenhum', 'Nenhuma', 'Nenhuma condição médica preexistente'),
('João','123', 80.0, 180.0, 'Masculino', 6, 'Nenhum', 'Nenhuma', 'Nenhuma condição médica preexistente');

-- Inserir dados na tabela profissionai_exercicios
INSERT INTO profissionai_exercicios (nome_profissional, cpf, telefone, email)
VALUES
('Maria Silva', '12345678901', '(11) 1234-5678', 'maria@email.com'),
('João Santos', '98765432101', '(22) 9876-5432', 'joao@email.com'),
('Ana Pereira', '11122233344', '(33) 1111-2222', 'ana@email.com');


-- Inserir dados na tabela plano_alimentar associados ao cliente
INSERT INTO plano_alimentar (cliente_id, cliente_nome, alergias_alimentares, deficiencia_vitaminas_minerais, experiencia_anterior_dietas, consumo_agua, preferencias_alimentares)
VALUES
(1,'lucas', 'Nenhuma', 'Nenhuma', 'Já seguiu dieta low-carb', 2.0, 'Gosta de alimentos ricos em proteína'),
(2, 'Maria', 'Glúten', 'Vitamina D', 'Nenhuma experiência anterior', 2.5, 'Vegetariana'),
(3, 'João', 'Lactose', 'Ferro', 'Já seguiu dieta paleolítica', 2.2, 'Alta em carboidratos');

-- Inserir dados na tabela plano_de_exercicios associados ao cliente
INSERT INTO plano_de_exercicios (cliente_id, cliente_nome, profissionai_exercicios_nome, vezes_por_semana, tempo_diario_atividades_fisicas, experiencia_anterior_treinamento_fisico, locais_disponiveis_exercitar, deficiencias_fisicas_impedimentos)
VALUES 
(1,'lucas','Maria Silva', 4, '01:00:00', 'Experiência em musculação', 'Academia próxima de casa', 'Nenhuma deficiência física'),
(2, 'Maria','Maria Silva', 3, '00:45:00', 'Nenhuma experiência anterior', 'Parque próximo de casa', 'Nenhuma deficiência física' ),
(3, 'João', 'João Santos', 5, '01:30:00', 'Experiência em treinamento funcional', 'Academia e parque próximos de casa', 'Nenhuma deficiência física');

select * from cliente;
select * from plano_alimentar;
select * from plano_de_exercicios;