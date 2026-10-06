import assert from 'node:assert/strict';
import test from 'node:test';

import { QueueService } from '../src/domain.mjs';

function snapshotState(queue) {
  const snapshot = queue.getSnapshot();
  const describe = (ticket) => ticket === null ? null : {
    number: ticket.number,
    status: ticket.status,
  };

  return {
    current: describe(snapshot.current),
    waiting: snapshot.waiting.map(describe),
    finished: snapshot.finished.map(describe),
  };
}

test('AC-01 — emite números sequenciais começando em 1', () => {
  const queue = new QueueService();

  assert.deepEqual(
    [queue.issueTicket().number, queue.issueTicket().number, queue.issueTicket().number],
    [1, 2, 3],
  );
});

test('AC-02 — inicia cada senha no estado WAITING', () => {
  const queue = new QueueService();

  assert.equal(queue.issueTicket().status, 'WAITING');
});

test('AC-03 — chama senhas em ordem FIFO intercalando finalizações', () => {
  const queue = new QueueService();
  [1, 2, 3].forEach(() => queue.issueTicket());

  const calledNumbers = [];
  for (let index = 0; index < 3; index += 1) {
    calledNumbers.push(queue.callNext().number);
    queue.finishCurrent();
  }

  assert.deepEqual(calledNumbers, [1, 2, 3]);
});

test('AC-04 — rejeita nova chamada enquanto há atendimento sem alterar a fila', () => {
  const queue = new QueueService();
  queue.issueTicket();
  queue.issueTicket();
  queue.callNext();
  const before = snapshotState(queue);

  assert.throws(
    () => queue.callNext(),
    (error) => error.code === 'ACTIVE_TICKET_EXISTS',
  );
  assert.deepEqual(snapshotState(queue), before);
});

test('AC-05 — retorna null ao chamar com fila vazia sem alterar o estado', () => {
  const queue = new QueueService();
  const before = snapshotState(queue);

  assert.equal(queue.callNext(), null);
  assert.deepEqual(snapshotState(queue), before);
});

test('AC-06 — finaliza a senha atual e remove a referência de atendimento', () => {
  const queue = new QueueService();
  const issuedTicket = queue.issueTicket();
  queue.callNext();

  const finishedTicket = queue.finishCurrent();
  const snapshot = queue.getSnapshot();

  assert.equal(finishedTicket.number, issuedTicket.number);
  assert.equal(finishedTicket.status, 'FINISHED');
  assert.equal(snapshot.current, null);
  assert.deepEqual(snapshot.finished.map((ticket) => ticket.number), [issuedTicket.number]);
});

test('AC-07 — retorna null ao finalizar sem atendimento sem alterar a fila', () => {
  const queue = new QueueService();
  queue.issueTicket();
  const before = snapshotState(queue);

  assert.equal(queue.finishCurrent(), null);
  assert.deepEqual(snapshotState(queue), before);
});
