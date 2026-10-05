# UC-02 — Chamar próxima senha

## Objetivo

Selecionar a senha aguardando há mais tempo e torná-la o atendimento atual.

## Ator principal

Atendente.

## Pré-condições

- A aplicação está aberta.
- O serviço de fila foi inicializado.

## Gatilho

O atendente aciona **Chamar próxima**.

## Fluxo principal

1. A interface solicita `callNext()` ao `QueueService`.
2. O serviço confirma que não existe `currentTicket`.
3. O serviço localiza a primeira senha em estado `WAITING`.
4. A senha muda para `CALLED` por meio de `call()`.
5. O serviço registra essa senha como `currentTicket`.
6. A interface mostra o número chamado.
7. A interface atualiza a visualização da fila.

## Fluxos alternativos

### FA-02A — Fila vazia

No passo 3, se não existe senha `WAITING`:

1. o serviço retorna `null`;
2. nenhum estado é modificado;
3. a interface informa que não há senhas aguardando.

### FA-02B — Atendimento já em andamento

No passo 2, se `currentTicket` existe:

1. o serviço rejeita a operação com `ACTIVE_TICKET_EXISTS`;
2. nenhum estado é modificado;
3. a interface informa que o atendimento atual deve ser finalizado.

## Pós-condições

No fluxo principal, exatamente uma senha está `CALLED` e registrada como `currentTicket`.

## Regras relacionadas

- RN-02 — ordem FIFO.
- RN-03 — transições válidas de estado.
- RN-04 — apenas um atendimento atual.

