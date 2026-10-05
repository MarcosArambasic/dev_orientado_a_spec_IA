# Diagrama de classes do domínio

```plantuml
@startuml
hide empty members
skinparam classAttributeIconSize 0

enum TicketStatus {
  WAITING
  IN_SERVICE
  FINISHED
}

class Ticket {
  +number: Number
  +status: TicketStatus
  +createdAt: Date
  +call(): void
  +finish(): void
}

class QueueService {
  -tickets: Ticket[]
  -currentTicket: Ticket
  -nextNumber: Number
  +issueTicket(): Ticket
  +getNext(): Ticket
  +finishCurrent(): Ticket
  +getSnapshot(): QueueSnapshot
}

class QueueSnapshot <<value object>> {
  +current: Ticket
  +waiting: Ticket[]
  +finished: Ticket[]
}

Ticket --> TicketStatus : status
QueueService "1" *-- "0..*" Ticket : manages
QueueService ..> QueueSnapshot : creates
QueueSnapshot o-- "0..*" Ticket

note right of QueueService
  callNext() e finishCurrent()
  podem retornar null nos fluxos
  alternativos especificados.
end note
@enduml
```

## Contratos complementares

- `Ticket.call()` aceita somente uma senha `WAITING`.
- `Ticket.finish()` aceita somente uma senha `CALLED`.
- Transição inválida lança `INVALID_TICKET_TRANSITION`.
- `QueueService.callNext()` lança `ACTIVE_TICKET_EXISTS` se já existe senha atual.
- `getSnapshot()` retorna novos arrays para impedir alteração externa da coleção do serviço.
