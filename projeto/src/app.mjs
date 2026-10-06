import { QueueService } from './domain.mjs';

const queue = new QueueService();
const issueButton = document.querySelector('#issue-button');
const callButton = document.querySelector('#call-button');
const finishButton = document.querySelector('#finish-button');
const themeToggle = document.querySelector('#theme-toggle');
const themeToggleLabel = document.querySelector('#theme-toggle-label');
const themeIcon = themeToggle.querySelector('.theme-icon');
const message = document.querySelector('#message');
const currentNumber = document.querySelector('#current-number');
const currentDescription = document.querySelector('#current-description');
const waitingList = document.querySelector('#waiting-list');
const waitingCount = document.querySelector('#waiting-count');
const waitingEmpty = document.querySelector('#waiting-empty');
const finishedList = document.querySelector('#finished-list');
const finishedCount = document.querySelector('#finished-count');
const finishedEmpty = document.querySelector('#finished-empty');

themeToggle.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  themeToggleLabel.textContent = isDark ? 'Ativar tema claro' : 'Ativar tema escuro';
  themeIcon.textContent = isDark ? '☀' : '☾';
});

issueButton.addEventListener('click', () => {
  runOperation(() => {
    const ticket = queue.issueTicket();
    render();
    showMessage(`Senha ${ticket.number} emitida e adicionada à fila.`, 'success');
  });
});

callButton.addEventListener('click', () => {
  runOperation(() => {
    const ticket = queue.callNext();
    render();

    if (ticket === null) {
      showMessage('Não há senhas aguardando.', 'error');
      return;
    }

    showMessage(`Senha ${ticket.number} chamada para atendimento.`, 'success');
  });
});

finishButton.addEventListener('click', () => {
  runOperation(() => {
    const ticket = queue.finishCurrent();
    render();

    if (ticket === null) {
      showMessage('Não existe atendimento atual para finalizar.', 'error');
      return;
    }

    showMessage(`Atendimento da senha ${ticket.number} finalizado.`, 'success');
  });
});

function runOperation(operation) {
  try {
    operation();
  } catch (error) {
    if (error?.code === 'ACTIVE_TICKET_EXISTS') {
      showMessage('Já existe um atendimento em andamento. Finalize-o antes de chamar outra senha.', 'error');
      return;
    }

    console.error('Falha ao atualizar a fila.', error);
    showMessage('Não foi possível concluir a operação. Consulte o console para mais detalhes.', 'error');
  }
}

function render() {
  const snapshot = queue.getSnapshot();
  currentNumber.textContent = snapshot.current === null ? '—' : String(snapshot.current.number);
  currentDescription.textContent = snapshot.current === null
    ? 'Nenhuma senha está sendo atendida.'
    : `Senha ${snapshot.current.number} está em atendimento.`;

  renderTicketList(waitingList, snapshot.waiting, 'Aguardando');
  renderTicketList(finishedList, snapshot.finished, 'Finalizada');
  updateListState(waitingList, waitingCount, waitingEmpty, snapshot.waiting.length);
  updateListState(finishedList, finishedCount, finishedEmpty, snapshot.finished.length);
}

function renderTicketList(list, tickets, label) {
  const items = tickets.map((ticket) => {
    const item = document.createElement('li');
    item.className = 'ticket-item';

    const number = document.createElement('span');
    number.textContent = `Senha ${ticket.number}`;

    const status = document.createElement('span');
    status.className = 'ticket-label';
    status.textContent = label;

    item.append(number, status);
    return item;
  });

  list.replaceChildren(...items);
}

function updateListState(list, count, emptyState, length) {
  count.textContent = String(length);
  emptyState.hidden = length !== 0;
  list.hidden = length === 0;
}

function showMessage(text, kind) {
  message.textContent = text;
  message.dataset.kind = kind;
}

render();
