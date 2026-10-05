# Protocolo de desenvolvimento humano–IA

## Finalidade

Este protocolo define como a equipe utilizará um agente de código. Ele governa o processo; não substitui os requisitos ou diagramas do sistema.

## Fonte de verdade

1. `BRIEF.md` registra a necessidade original.
2. `PROJECT.md` registra escopo e restrições aprovadas.
3. `specs/uml/userCases` define os comportamentos funcionais.
4. Os demais diagramas UML detalham estrutura, interação e estados.
5. `VALIDATION.md` define as evidências de aceitação.

Em caso de divergência, o agente deve interromper a tarefa e relatar os artefatos conflitantes. Ele não pode escolher silenciosamente qual documento ignorar.

## Responsabilidades humanas

- decidir ambiguidades de produto;
- aprovar mudanças de escopo;
- revisar diagramas e casos de uso;
- inspecionar prompts e diffs;
- julgar questões não automatizadas;
- aceitar ou rejeitar a implementação.

## Responsabilidades do agente

- ler somente os artefatos indicados no prompt;
- apontar contradições antes de implementar;
- modificar apenas arquivos autorizados;
- preservar nomes e contratos definidos na UML;
- executar as verificações solicitadas;
- apresentar evidências curtas do resultado;
- não adicionar dependências ou funcionalidades sem autorização.

## Regras de interação

1. Cada prompt possui uma única etapa principal.
2. O prompt deve informar entradas, arquivos permitidos e condição de conclusão.
3. Uma etapa de auditoria não pode editar arquivos.
4. Uma etapa de documentação não pode criar código.
5. Testes derivados da especificação devem existir antes do código de domínio.
6. O agente não pode alterar testes para fazer uma implementação incorreta passar.
7. Toda alteração deve ser revisada pelo diff antes da próxima etapa.
8. Após o congelamento da especificação, mudanças de comportamento exigem alteração explícita e novo versionamento da spec.
9. Saídas devem ser resumidas; arquivos já existentes não devem ser reproduzidos integralmente no chat.
10. A equipe utilizará no máximo oito interações principais.

## Política de falhas

- Primeira falha: diagnosticar o comando, o código e a especificação.
- Contradição documental: interromper e devolver a decisão aos humanos.
- Falha causada por código: corrigir somente os arquivos autorizados.
- Falha causada por ambiente: registrar o problema e usar o checkpoint do instrutor.
- Limite de utilização atingido: continuar pela revisão manual ou pelo checkpoint, sem eliminar a validação.

## Evidência mínima ao final de uma etapa

- arquivos modificados;
- resumo das decisões implementadas;
- comando de validação executado;
- resultado da validação;
- ambiguidade ainda existente, se houver.

