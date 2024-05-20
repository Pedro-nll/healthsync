## 7. Testes do software

Nesta sessão são apresentados os testes realizados no software implementado:

Na elaboração desta seção, a abordagem adotada é a caixa preta, com o propósito de avaliar a conformidade do software em relação aos requisitos funcionais e não-funcionais do sistema. O grupo tem a responsabilidade de documentar os testes de software, os quais visam assegurar a implementação correta dos referidos requisitos. A tabela de plano de testes será preenchida, associando cada Caso de Teste (CT) aos testes responsáveis por verificar sua conformidade, seguindo o modelo fornecido.


**Caso de Teste** | **CT02 - Listar Todas as Parcerias com Sucesso**
:--------------: | ------------
**Procedimento**  | Enviar uma requisição GET para "/parcerias/todasParcerias". |
**Dados de entrada** | N/A |
**Resultado obtido** | Código de resposta 200 (OK) e lista de parcerias exibida no corpo da resposta. |
**Teste associado** | `ParceriaControllerTest.testListarTodasParceriasSucesso()` |

---

**Caso de Teste** | **CT03 - Listar Parcerias Quando Não Há Parcerias**
:--------------: | ------------
**Procedimento**  | Garantir que não haja parcerias no sistema e enviar uma requisição GET para "/parcerias/todasParcerias". |
**Dados de entrada** | N/A |
**Resultado obtido** | Código de resposta 204 (No Content), indicando que não há parcerias. |
**Teste associado** | `ParceriaControllerTest.testListarParceriasSemConteudo()` |

---

**Caso de Teste** | **CT04 - Buscar Parceria por ID com Sucesso**
:--------------: | ------------
**Procedimento**  | Criar uma parceria no sistema e enviar uma requisição GET para "/parcerias/{id}" (substituir {id} pelo ID da parceria criada). |
**Dados de entrada** | ID válido da parceria. |
**Resultado obtido** | Código de resposta 200 (OK) e dados da parceria correspondendo aos dados fornecidos durante a criação. |
**Teste associado** | `ParceriaControllerTest.testBuscarParceriaPorIdSucesso()` |

---

**Caso de Teste** | **CT05 - Criar Nova Parceria com Sucesso**
:--------------: | ------------
**Procedimento**  | Enviar uma requisição POST para "/parcerias" com dados válidos de uma nova parceria. |
**Dados de entrada** | Dados válidos para uma nova parceria. |
**Resultado obtido** | Código de resposta 200 (OK) e dados da nova parceria correspondendo aos dados fornecidos. |
**Teste associado** | `ParceriaControllerTest.testCriarNovaParceriaSucesso()` |

---

**Caso de Teste** | **CT06 - Buscar Parcerias por Nutricionista com Sucesso**
:--------------: | ------------
**Procedimento**  | Garantir que haja parcerias associadas a um nutricionista específico e enviar uma requisição GET para "/parcerias/nutri/{id}" (substituir {id} pelo ID do nutricionista). |
**Dados de entrada** | ID válido do nutricionista. |
**Resultado obtido** | Código de resposta 200 (OK) e lista de parcerias associadas ao nutricionista. |
**Teste associado** | `ParceriaControllerTest.testBuscarParceriasPorNutricionistaSucesso()` |

---

**Caso de Teste** | **CT07 - Atualizar Parceria com Sucesso**
:--------------: | ------------
**Procedimento**  | Criar uma parceria no sistema e enviar uma requisição PUT para "/parcerias/{id}" (substituir {id} pelo ID da parceria criada) com dados atualizados. |
**Dados de entrada** | ID válido da parceria e dados atualizados. |
**Resultado obtido** | Código de resposta 200 (OK) e dados da parceria correspondendo aos dados atualizados. |
**Teste associado** | `ParceriaControllerTest.testAtualizarParceriaSucesso()` |

---

**Caso de Teste** | **CT08 - Buscar Parceria por ID Inexistente**
:--------------: | ------------
**Procedimento**  | Enviar uma requisição GET para "/parcerias/{id}" (substituir {id} por um ID que não exista no sistema). |
**Dados de entrada** | ID inválido (não existente) da parceria. |
**Resultado obtido** | Código de resposta 404 (Not Found), indicando que a parceria não foi encontrada. |
**Teste associado** | `ParceriaControllerTest.testBuscarParceriaPorIdInexistente()` |

---

**Caso de Teste** | **CT09 - Criar Nova Parceria com Dados Inválidos**
:--------------: | ------------
**Procedimento**  | Enviar uma requisição POST para "/parcerias" com dados inválidos de uma nova parceria. |
**Dados de entrada** | Dados inválidos para uma nova parceria. |
**Resultado obtido** | Código de resposta 400 (Bad Request), indicando que a requisição não foi processada devido a dados inválidos. |
**Teste associado** | `ParceriaControllerTest.testCriarNovaParceriaDadosInvalidos()` |

---

**Caso de Teste** | **CT10 - Atualizar Parceria com ID Inexistente**
:--------------: | ------------
**Procedimento**  | Enviar uma requisição PUT para "/parcerias/{id}" (substituir {id} por um ID que não exista no sistema) com dados atualizados. |
**Dados de entrada** | ID inválido (não existente) da parceria e dados atualizados. |
**Resultado obtido** | Código de resposta 404 (Not Found), indicando que a parceria não foi encontrada para atualização. |
**Teste associado** | `ParceriaControllerTest.testAtualizarParceriaIdInexistente()` |

---


## Avaliação dos Testes de Software

Os testes parecem cobrir bem o básico, desde criar e listar parcerias até buscar e atualizar informações. Eles incluem situações em que não há parcerias, IDs não existem, e até lidam com dados inválidos. A conexão direta entre cada teste e os métodos correspondentes facilita saber o que está sendo testado. No entanto, sempre é bom lembrar que testes podem evoluir com o código, então vale ficar de olho em possíveis ajustes à medida que as coisas avançam. No geral, parece uma boa base para garantir que o código do controlador de parcerias esteja funcionando conforme esperado.

