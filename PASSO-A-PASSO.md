# Passo a passo do workshop

Use o modo **Agent** do GitHub Copilot. Execute as etapas na ordem, substitua somente os campos `<<< >>>` e revise o diff antes de continuar.

## Etapa 0 — Entender o projeto sem IA

Leia `BRIEF.md` e `PROJECT.md`. Localize e responda:

1. O que será construído?
2. Qual stack será usada?
3. O que está fora do escopo?
4. Como saberemos que o projeto terminou?

As decisões já estão em `PROJECT.md`: HTML, CSS e JavaScript sem dependências, dados em memória, testes nativos do Node.js e execução no Codespaces.

## 1 — Conferir os quatro problemas

Analise primeiro, sem IA:

- `specs/uml/userCases/use-case-diagram.md`;
- `specs/uml/class/class-diagram.md`;
- `specs/uml/states/ticket-state-diagram.md`.

Os diagramas de sequência estão corretos e servem como referência.

```text
Leia BRIEF.md, PROJECT.md, PROTOCOL.md, VALIDATION.md e specs/uml.
Não edite arquivos.

Encontramos estes quatro trechos possivelmente inconsistentes:

<<< COLE AQUI OS QUATRO TRECHOS, NUMERADOS DE 1 A 4 >>>

Para cada item, localize o arquivo, confirme ou rejeite o problema usando os demais artefatos como evidência e indique a correção mínima.

Existem exatamente quatro inconsistências planejadas. Não procure outras e não altere os diagramas de sequência. Responda com uma tabela curta.
```

```


Leia BRIEF.md, PROJECT.md, PROTOCOL.md, VALIDATION.md e specs/uml.
Não edite arquivos.

Encontramos estes quatro trechos possivelmente inconsistentes:

1. QUARTO CASO DE USO NÃO FOI DECLARADO
2. FUNÇÃO DE REOPEN SAINDO DO ESTADO DE TICKET FINALIZADO
3. NOME DIFERENTE ENTRE O DIAGRAMA DE ESTADO E O DIAGRAMA DE CLASSE (IN_SERVICE -> CALLED)
4. FUNÇÃO CALLNEXT() DEVERIA SER GETNEXT()

Para cada item, localize o arquivo, confirme ou rejeite o problema usando os demais artefatos como evidência e indique a correção mínima.

Existem exatamente quatro inconsistências planejadas. Não procure outras e não altere os diagramas de sequência. Responda com uma tabela curta.
```

## 2 — Corrigir os quatro problemas

```text
Use a análise anterior e corrija somente as quatro inconsistências confirmadas.

Arquivos permitidos:
- specs/uml/userCases/use-case-diagram.md
- specs/uml/class/class-diagram.md
- specs/uml/states/ticket-state-diagram.md

Não altere diagramas de sequência, casos de uso textuais, regras de negócio, validação, testes ou código. Faça somente as quatro correções mínimas e resuma o diff.
```

Confira se apenas os três arquivos permitidos foram modificados.

## 3 — Criar os testes

```text
Considere a especificação corrigida e congelada.

Crie tests/domain.test.mjs a partir de VALIDATION.md e da UML. Use somente node:test e node:assert/strict e cubra AC-01 a AC-07.

Não altere documentação, UML ou src/. Execute node --test tests/*.test.mjs. A falha esperada neste momento é a ausência de src/domain.mjs.

Ao final, relacione cada teste ao critério coberto.
```

## 4 — Implementar o domínio

```text
Implemente somente src/domain.mjs conforme PROJECT.md, PROTOCOL.md, a UML corrigida, VALIDATION.md e tests/domain.test.mjs.

Não altere testes ou especificações e não adicione dependências. Se encontrar contradição, pare e informe.

Execute node --test tests/*.test.mjs e informe o resultado.
```

Continue somente quando todos os testes passarem.

## 5 — Implementar a interface

```text
Implemente a interface em src/index.html, src/styles.css e src/app.mjs.

Ela deve executar UC-01, UC-02 e UC-03 e apresentar UC-04. Use somente os métodos públicos definidos na UML.

Não altere domínio, testes, documentação ou UML e não adicione dependências.

Execute os testes e informe o comando para abrir a aplicação com python3 -m http.server 8000 --directory src.
```

## 6 — Verificar o comportamento

Na interface:

1. emita duas senhas;
2. chame a próxima;
3. tente chamar novamente sem finalizar;
4. finalize o atendimento;
5. chame a próxima senha.

```text
Compare a especificação com o resultado executado. Não edite arquivos.

ESPERADO
<<< COLE O TRECHO DA ESPECIFICAÇÃO OU DA VALIDAÇÃO >>>

OBSERVADO
<<< COLE O RESULTADO MOSTRADO PELA APLICAÇÃO >>>

Informe se o comportamento está correto. Se houver falha, indique a causa provável, a correção mínima e quais arquivos de src/ podem ser alterados. Não proponha mudanças em testes ou especificações.
```

## 7 — Corrigir, se necessário

```text
Use o diagnóstico anterior.

Se o comportamento estiver correto, não modifique arquivos. Se houver violação da especificação, aplique somente a correção mínima em src/.

Não altere testes, documentação, UML ou dependências. Execute node --test tests/*.test.mjs e resuma o resultado e o diff.
```

Repita manualmente o cenário da etapa 6.

## 8 — Revisar

```text
Revise o projeto contra PROJECT.md, VALIDATION.md e a UML. Execute node --test tests/*.test.mjs.

Corrija somente violações objetivas em src/. Não altere testes, documentação, UML, dependências ou escopo.

Informe apenas: resultado dos testes, arquivos modificados e cenários que ainda precisam de validação manual.
```

## Se a IA não resolver

Faça no máximo duas tentativas. Depois, use o checkpoint do instrutor para não interromper o workshop.

```text
Analise novamente somente este trecho:

<<< COLE O TRECHO QUE CONTINUA PROBLEMÁTICO >>>

Informe o arquivo, os artefatos em conflito e a correção mínima. Altere somente o arquivo desse trecho. Não procure outros problemas.
```
