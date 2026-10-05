# Diagrama de casos de uso

```plantuml
@startuml
left to right direction
skinparam packageStyle rectangle

actor Aluno
actor Atendente

rectangle "Fila Mack" {
  usecase "UC-01\nEmitir senha" as UC01
  usecase "UC-02\nChamar próxima senha" as UC02
  usecase "UC-03\nFinalizar atendimento" as UC03
}

Aluno --> UC01
Atendente --> UC02
Atendente --> UC03
@enduml
```

## Catálogo

| ID | Nome | Ator principal |
|---|---|---|
| UC-01 | Emitir senha | Aluno |
| UC-02 | Chamar próxima senha | Atendente |
| UC-03 | Finalizar atendimento | Atendente |
| UC-04 | Consultar estado da fila | Aluno ou atendente |
