# UC-03 — Finalizar atendimento

## Objetivo

Encerrar o atendimento da senha atualmente chamada.

## Ator principal

Atendente.

## Pré-condições

- A aplicação está aberta.
- O serviço de fila foi inicializado.

## Gatilho

O atendente aciona **Finalizar atendimento**.

## Fluxo principal

1. A interface solicita `finishCurrent()` ao `QueueService`.
2. O serviço obtém `currentTicket`.
3. A senha muda de `CALLED` para `FINISHED` por meio de `finish()`.
4. O serviço remove a referência de `currentTicket`.
5. A interface informa o número finalizado.
6. A interface atualiza a visualização da fila.

## Fluxos alternativos

### FA-03A — Nenhum atendimento atual

No passo 2, se `currentTicket` é `null`:

1. o serviço retorna `null`;
2. nenhum estado é modificado;
3. a interface informa que não existe atendimento para finalizar.

## Pós-condições

No fluxo principal, a senha está `FINISHED` e não existe atendimento atual.

## Regras relacionadas

- RN-03 — transições válidas de estado.
- RN-05 — somente a senha atual pode ser finalizada.

