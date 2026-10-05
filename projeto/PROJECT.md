# Informações do projeto

## Nome

Fila Mack.

## Problema

O setor acadêmico precisa controlar a ordem de atendimento sem selecionar manualmente a próxima pessoa. Alunos também precisam visualizar o estado atual da fila.

## Objetivo

Construir uma aplicação web de página única que permita emitir senhas, chamar a senha mais antiga, finalizar o atendimento atual e consultar o estado da fila.

## Usuários

- **Aluno:** emite uma senha e consulta a fila.
- **Atendente:** chama a próxima senha e finaliza o atendimento atual.

## Escopo

- emissão de senhas numéricas sequenciais;
- manutenção de uma fila FIFO;
- chamada de uma senha por vez;
- finalização do atendimento atual;
- visualização das senhas aguardando, chamada e finalizadas;
- mensagens claras para operações sem resultado.

## Fora do escopo

- autenticação e autorização;
- identificação pessoal do aluno;
- múltiplas filas ou atendentes;
- prioridade ou reorganização manual;
- cancelamento de senha;
- banco de dados, API remota ou persistência;
- edição ou exclusão de senhas;
- requisitos de produção, segurança ou escalabilidade;
- framework de interface ou biblioteca externa.

## Restrições técnicas

- HTML, CSS e JavaScript com módulos ES;
- nenhuma dependência externa;
- estado mantido somente em memória enquanto a página estiver aberta;
- domínio implementado em `src/domain.mjs` sem dependência do DOM;
- interface implementada em `src/index.html`, `src/app.mjs` e `src/styles.css`;
- testes com `node:test` e `node:assert/strict`;
- execução esperada em GitHub Codespaces com Node.js 18 ou superior e Python 3.

## Definição de concluído

O projeto está concluído quando:

1. os diagramas UML concordam entre si;
2. UC-01 a UC-04 podem ser executados pela interface;
3. AC-01 a AC-07 passam nos testes automatizados;
4. os cenários manuais VM-01 a VM-04 foram verificados;
5. nenhuma funcionalidade fora do escopo foi adicionada;
6. a aplicação abre por um servidor estático sem erro no console.

## Comandos

Testes:

```bash
node --test tests/*.test.mjs
```

Servidor:

```bash
python3 -m http.server 8000 --directory src
```

