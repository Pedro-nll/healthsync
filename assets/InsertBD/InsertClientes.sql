use healthsync;

select * from cliente;
select * from nutricionista;
select * from profissional_exercicio;

select * from plano_alimentar;
select * from plano_exercicio;

select * from post;

/*INSERT POSTS*/
-- Inserindo 5 posts com campos de autor e avaliador como NULL
INSERT INTO post (categoria, conteudo, subtitulo, titulo, id_autor_cliente, id_autor_nutri, id_autorpe, id_avaliador_nutri, id_avaliador_profissional)
VALUES ('Categoria 1', 'Conteúdo do Post 1', 'Subtítulo 1', 'Título 1', 1, NULL, NULL, NULL, NULL);



/* INSERT CLIENTES */
INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1990-01-15', 'cliente1@example.com', 'senha123', 'cliente1', 'Ocasional', 1.75, 'Ativo', 'Nenhuma', 7.5, 'Nenhuma', 'Perder peso', 70.5, 'Masculino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1985-03-22', 'cliente2@example.com', 'senha456', 'cliente2', 'Não', 1.68, 'Sedentário', 'Hipertensão', 6.0, 'Betabloqueadores', 'Manter peso', 75.2, 'Feminino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1995-07-10', 'cliente3@example.com', 'senha789', 'cliente3', 'Social', 1.80, 'Ativo', 'Diabetes tipo 2', 8.0, 'Nenhuma', 'Ganhar massa muscular', 85.0, 'Masculino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1988-04-05', 'cliente4@example.com', 'senhaabc', 'cliente4', 'Não', 1.60, 'Ativo', 'Asma', 7.0, 'Inaladores', 'Manter peso', 65.5, 'Feminino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1992-11-28', 'cliente5@example.com', 'senhaxyz', 'cliente5', 'Ocasional', 1.70, 'Ativo', 'Nenhuma', 7.5, 'Nenhuma', 'Perder peso', 73.0, 'Masculino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1998-09-14', 'cliente6@example.com', 'senhapqr', 'cliente6', 'Não', 1.72, 'Sedentário', 'Nenhuma', 6.5, 'Nenhuma', 'Manter peso', 70.0, 'Feminino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1983-12-20', 'cliente7@example.com', 'senha1234', 'cliente7', 'Social', 1.78, 'Ativo', 'Nenhuma', 7.0, 'Nenhuma', 'Ganhar massa muscular', 80.0, 'Masculino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1997-05-08', 'cliente8@example.com', 'senha5678', 'cliente8', 'Não', 1.63, 'Ativo', 'Nenhuma', 6.5, 'Nenhuma', 'Perder peso', 63.5, 'Feminino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1991-02-17', 'cliente9@example.com', 'senha999', 'cliente9', 'Não', 1.75, 'Ativo', 'Nenhuma', 8.0, 'Nenhuma', 'Manter peso', 75.0, 'Masculino');

INSERT INTO cliente (data_criacao, data_nascimento, email, senha, username, alcool_tabaco, altura, atividade_atual, condicoes_medicas, sono, medicacoes, objetivo, peso, sexo)
VALUES ('2023-10-31', '1996-06-03', 'cliente10@example.com', 'senha1010', 'cliente10', 'Ocasional', 1.65, 'Sedentário', 'Nenhuma', 7.0, 'Nenhuma', 'Perder peso', 68.0, 'Feminino');



/* --------------------------------------------------------------------------------------------------------------------*/
/* INSERT PLANOS ALIMENTARES */
/* --------------------------------------------------------------------------------------------------------------------*/


-- Cliente 1
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '2 litros por dia', '2023-10-31', 'Vitamina D', 'Nenhuma', 'Vegetariana', 1, NULL);

-- Cliente 2
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Glúten', '1.5 litros por dia', '2023-10-31', 'Vitamina C', 'Nenhuma', 'Onívora', 2, NULL);

-- Cliente 3
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Lactose', '2.5 litros por dia', '2023-10-31', 'Vitamina B12', 'Nenhuma', 'Onívora', 3, NULL);

-- Cliente 4
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '1 litro por dia', '2023-10-31', 'Vitamina A', 'Nenhuma', 'Vegetariana', 4, NULL);

-- Cliente 5
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '2 litros por dia', '2023-10-31', 'Vitamina E', 'Nenhuma', 'Onívora', 5, NULL);

-- Cliente 6
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '1.5 litros por dia', '2023-10-31', 'Vitamina K', 'Nenhuma', 'Vegetariana', 6, NULL);

-- Cliente 7
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '2 litros por dia', '2023-10-31', 'Vitamina B6', 'Nenhuma', 'Onívora', 7, NULL);

-- Cliente 8
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '1 litro por dia', '2023-10-31', 'Vitamina B1', 'Nenhuma', 'Vegetariana', 8, NULL);

-- Cliente 9
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '2 litros por dia', '2023-10-31', 'Vitamina B2', 'Nenhuma', 'Onívora', 9, NULL);

-- Cliente 10
INSERT INTO plano_alimentar (alergias, consumo_agua, data_pedido, deficiencia_vitaminas, experiencia_anterior_dieta, preferencias_alimentares, id_cliente, id_nutri)
VALUES ('Nenhuma', '1.5 litros por dia', '2023-10-31', 'Vitamina B3', 'Nenhuma', 'Vegetariana', 10, NULL);




/* --------------------------------------------------------------------------------------------------------------------*/
/* INSERT PLANOS EXERCICIO */
/* --------------------------------------------------------------------------------------------------------------------*/


-- Cliente 1
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '3 vezes por semana', '1 hora', 1, NULL);

-- Cliente 2
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Lesão no joelho', 'Nenhum', 'Nenhuma', '2 vezes por semana', '30 minutos', 2, NULL);

-- Cliente 3
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia, Parque', 'Nenhuma', '4 vezes por semana', '45 minutos', 3, NULL);

-- Cliente 4
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '3 vezes por semana', '1 hora', 4, NULL);

-- Cliente 5
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '4 vezes por semana', '45 minutos', 5, NULL);

-- Cliente 6
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Lesão no ombro', 'Nenhum', 'Nenhuma', '2 vezes por semana', '30 minutos', 6, NULL);

-- Cliente 7
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '5 vezes por semana', '1 hora', 7, NULL);

-- Cliente 8
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '3 vezes por semana', '45 minutos', 8, NULL);

-- Cliente 9
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '4 vezes por semana', '1 hora', 9, NULL);

-- Cliente 10
INSERT INTO plano_exercicio (data_pedido, deficiencias_fisicas, estabelecimentos_disponiveis, experiencia_anterior, quantidade_de_exercicio_desejada, tempo_diario_para_atividades, id_cliente, id_prof)
VALUES ('2023-10-31', 'Nenhuma', 'Academia', 'Nenhuma', '3 vezes por semana', '45 minutos', 10, NULL);

