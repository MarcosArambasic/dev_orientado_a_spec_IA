# Plano de validação

## Estratégia

A validação combina testes automatizados do domínio e verificação manual da interface. Os critérios são derivados dos casos de uso e das regras de negócio, não da implementação.

## Critérios automatizados

### AC-01 — Numeração sequencial

Ao emitir três senhas em uma fila nova, os números retornados devem ser 1, 2 e 3, nessa ordem.

Origem: UC-01, RN-01.

### AC-02 — Estado inicial

Uma senha recém-emitida deve possuir estado `WAITING`.

Origem: UC-01, RN-03.

### AC-03 — Ordem FIFO

Após emitir três senhas, chamadas sucessivas intercaladas com finalizações devem retornar 1, 2 e 3.

Origem: UC-02, RN-02.

### AC-04 — Exclusividade do atendimento atual

Se já existe uma senha em estado `CALLED`, uma nova chamada deve ser rejeitada com o código `ACTIVE_TICKET_EXISTS` e não deve alterar a fila.

Origem: UC-02, RN-04.

### AC-05 — Fila vazia

Se não há senha em `WAITING` e não há atendimento atual, `callNext()` deve retornar `null` sem alterar o estado.

Origem: UC-02, FA-02A.

### AC-06 — Finalização

Ao finalizar a senha atual, seu estado deve mudar de `CALLED` para `FINISHED` e não deve permanecer como atendimento atual.

Origem: UC-03, RN-03 e RN-05.

### AC-07 — Finalização sem atendimento

Se não existe senha atual, `finishCurrent()` deve retornar `null` sem alterar a fila.

Origem: UC-03, FA-03A.

## Validação manual da interface

### VM-01 — Emissão

1. Abrir a aplicação.
2. Acionar **Emitir senha** duas vezes.
3. Confirmar a mensagem com os números 1 e 2.
4. Confirmar que ambas aparecem em **Aguardando**.

### VM-02 — Chamada e bloqueio

1. Acionar **Chamar próxima**.
2. Confirmar que a senha 1 aparece em **Em atendimento**.
3. Acionar **Chamar próxima** novamente.
4. Confirmar mensagem informando que já existe atendimento atual.

### VM-03 — Finalização

1. Acionar **Finalizar atendimento**.
2. Confirmar que a senha 1 aparece em **Finalizadas**.
3. Confirmar que **Em atendimento** volta a indicar ausência de senha.

### VM-04 — Operações sem resultado

1. Em uma fila nova, acionar **Chamar próxima**.
2. Confirmar mensagem de fila vazia.
3. Acionar **Finalizar atendimento**.
4. Confirmar mensagem de ausência de atendimento atual.

## Matriz de rastreabilidade

| Caso de uso | Regra | Diagrama principal | Critério |
|---|---|---|---|
| UC-01 | RN-01, RN-03 | classes, estado, `seq-uc01` | AC-01, AC-02, VM-01 |
| UC-02 | RN-02, RN-04 | classes, estado, `seq-uc02` | AC-03, AC-04, AC-05, VM-02, VM-04 |
| UC-03 | RN-03, RN-05 | classes, estado, `seq-uc03` | AC-06, AC-07, VM-03, VM-04 |
| UC-04 | — | classes | VM-01 a VM-04 |

