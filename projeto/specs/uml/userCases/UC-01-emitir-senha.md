# UC-01 — Emitir senha

## Objetivo

Inserir uma nova senha no final da fila e informar seu número ao aluno.

## Ator principal

Aluno.

## Pré-condições

- A aplicação está aberta.
- O serviço de fila foi inicializado.

## Gatilho

O aluno aciona **Emitir senha**.

## Fluxo principal

1. A interface solicita a emissão ao `QueueService` por `issueTicket()`.
2. O serviço utiliza o próximo número sequencial.
3. O serviço cria um `Ticket` no estado `WAITING`.
4. O serviço acrescenta a senha ao final da coleção.
5. O serviço incrementa o próximo número.
6. A interface informa o número emitido.
7. A interface atualiza a visualização da fila.

## Fluxos alternativos

Não existem fluxos alternativos funcionais neste protótipo.

## Pós-condições

- Existe uma nova senha `WAITING` no final da fila.
- Nenhuma senha existente foi modificada.
- O próximo número está preparado para a emissão seguinte.

## Regras relacionadas

- RN-01 — numeração sequencial.
- RN-03 — transições válidas de estado.

