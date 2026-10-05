# Regras de negócio

## RN-01 — Numeração sequencial

As senhas são numeradas a partir de 1 e incrementadas de uma unidade por emissão. A numeração reinicia quando a aplicação é recarregada porque não existe persistência.

## RN-02 — Ordem FIFO

A próxima senha chamada é a senha `WAITING` emitida há mais tempo. Como os números são estritamente crescentes, ela também será a menor senha ainda aguardando.

## RN-03 — Transições válidas

Uma senha percorre somente `WAITING → CALLED → FINISHED`. Não há retorno a estados anteriores.

## RN-04 — Atendimento único

No máximo uma senha pode estar `CALLED`. Uma nova chamada é rejeitada enquanto existir `currentTicket`.

## RN-05 — Finalização da senha atual

Somente `currentTicket` pode ser finalizada. Não existe operação pública para finalizar uma senha arbitrária pelo número.

