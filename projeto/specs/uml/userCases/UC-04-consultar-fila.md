# UC-04 — Consultar estado da fila

## Objetivo

Visualizar a senha em atendimento e as senhas agrupadas por situação.

## Ator principal

Aluno ou atendente.

## Pré-condições

- A aplicação está aberta.
- O serviço de fila foi inicializado.

## Gatilho

A aplicação é aberta ou uma operação modifica a fila.

## Fluxo principal

1. A interface solicita `getSnapshot()` ao `QueueService`.
2. O serviço retorna uma visão da fila sem expor sua coleção interna mutável.
3. A interface apresenta:
   - a senha atual ou a indicação de ausência;
   - senhas `WAITING` em ordem de chegada;
   - senhas `FINISHED` em ordem de emissão.

## Fluxos alternativos

### FA-04A — Nenhuma senha emitida

A interface mostra listas vazias e informa que não existe atendimento atual.

## Pós-condições

Nenhum estado do domínio é modificado.

## Regras relacionadas

Este caso de uso apenas consulta o estado produzido pelas demais regras.

