# Documentação dos Erros Encontrados e Correções - debug.py

## Código Original com Erros
O código fornecido continha vários erros de sintaxe, lógica e formatação que impediam sua execução correta. Abaixo, listo os erros identificados, suas causas e as correções aplicadas.

## Erros Identificados e Correções

### 1. **Erro de Sintaxe na Entrada de Dados (Linha 6)**
   - **Erro**: `item1 = float(input(Preço do item 1? ))`
     - Faltavam aspas ao redor da string no `input()`.
   - **Causa**: Strings em Python devem estar entre aspas simples ou duplas.
   - **Correção**: `item1 = float(input("Preço do item 1? "))`
   - **Impacto**: Sem as aspas, o código geraria um `NameError` porque `Preço` seria interpretado como uma variável indefinida.

### 2. **Erro de Tipo de Dados na Entrada do Cupom de Desconto (Linha 21)**
   - **Erro**: `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
     - O valor era tratado como string, mas usado em operações matemáticas.
   - **Causa**: `input()` sempre retorna uma string, mas o código tentava dividir por 100 e comparar com 0.
   - **Correção**: `desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
   - **Impacto**: Sem a conversão, ocorreria `TypeError` nas operações `desconto_cupom / 100` e na comparação `desconto_cupom > 0`.

### 3. **Erro de Sintaxe no f-string (Linha 32)**
   - **Erro**: `print(" Item 2:        R$ {total_item2:.2f}")`
     - Faltava o prefixo `f` para indicar que é um f-string.
   - **Causa**: Sem o `f`, a string não interpolava as variáveis.
   - **Correção**: `print(f" Item 2:        R$ {total_item2:.2f}")`
   - **Impacto**: A saída mostraria literalmente `{total_item2:.2f}` em vez do valor formatado.

### 4. **Erro de Indentação no Bloco Condicional (Linha 37)**
   - **Erro**: `print(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")`
     - A linha não estava indentada dentro do bloco `if`.
   - **Causa**: Em Python, o código dentro de estruturas de controle deve ser indentado.
   - **Correção**: Adicionei indentação de 4 espaços antes da linha.
   - **Impacto**: Sem indentação, o `print` seria executado sempre, independentemente da condição.

### 5. **Erro de Formatação Redundante no Total (Linha 40)**
   - **Erro**: `print(f" TOTAL:         R$ {round(total, 2):.2f}")`
     - `round(total, 2)` já retorna um float arredondado, e aplicar `.2f` novamente é redundante.
   - **Causa**: Formatação desnecessária que poderia causar confusão.
   - **Correção**: `print(f" TOTAL:         R$ {total:.2f}")`
     - Mantive apenas a formatação direta do `total`, assumindo que ele já é um float preciso.
   - **Impacto**: A saída seria a mesma, mas o código fica mais limpo e evita operações desnecessárias.

## Código Corrigido
O código corrigido está no arquivo `debug.py`. Ele agora executa sem erros, calcula corretamente os totais, impostos e descontos, e exibe a saída formatada adequadamente.

## Teste de Validação
Para validar as correções, execute o script `debug.py` e forneça entradas de teste. Por exemplo:
- Nome: João
- Item 1: Quantidade 2, Preço 10.50
- Item 2: Quantidade 1, Preço 5.00
- Item 3: Quantidade 3, Preço 2.00
- Cupom: 10

Saída esperada:
```
===============================
 Cliente: João
===============================
 Item 1:        R$ 21.00
 Item 2:        R$ 5.00
 Item 3:        R$ 6.00
-------------------------------
 Subtotal:      R$ 32.00
 Imposto (10%): R$ 3.20
 Desconto (10%): -R$ 3.20
===============================
 TOTAL:         R$ 32.00
===============================
```

## Notas Adicionais
- O código agora segue boas práticas de Python, como uso correto de f-strings e conversões de tipo adequadas.
- Adicionei parênteses desnecessários em algumas linhas originais (como em `desconto_cupom = (input(...))`), mas os removi para clareza.
- Certifique-se de que as entradas sejam válidas (números para quantidades e preços) para evitar erros de conversão em tempo de execução.
