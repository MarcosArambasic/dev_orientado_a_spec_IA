export class Ticket {
  constructor(number, status, createdAt = new Date()) {
    this.number = number;
    this.status = status;
    this.createdAt = createdAt;
  }

  call() {
    if (this.status !== 'WAITING') {
      throw createDomainError('INVALID_TICKET_TRANSITION');
    }

    this.status = 'CALLED';
  }

  finish() {
    if (this.status !== 'CALLED') {
      throw createDomainError('INVALID_TICKET_TRANSITION');
    }

    this.status = 'FINISHED';
  }
}

export class QueueService {
  #tickets = [];
  #currentTicket = null;
  #nextNumber = 1;

  issueTicket() {
    const ticket = new Ticket(this.#nextNumber, 'WAITING');
    this.#tickets.push(ticket);
    this.#nextNumber += 1;
    return ticket;
  }

  callNext() {
    if (this.#currentTicket !== null) {
      throw createDomainError('ACTIVE_TICKET_EXISTS');
    }

    const ticket = this.#tickets.find(({ status }) => status === 'WAITING');
    if (ticket === undefined) {
      return null;
    }

    ticket.call();
    this.#currentTicket = ticket;
    return ticket;
  }

  finishCurrent() {
    if (this.#currentTicket === null) {
      return null;
    }

    const ticket = this.#currentTicket;
    ticket.finish();
    this.#currentTicket = null;
    return ticket;
  }

  getSnapshot() {
    return {
      current: this.#currentTicket,
      waiting: this.#tickets.filter(({ status }) => status === 'WAITING'),
      finished: this.#tickets.filter(({ status }) => status === 'FINISHED'),
    };
  }
}

function createDomainError(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}
