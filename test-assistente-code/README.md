# Projeto Teste Assistente Code

Este projeto contém scripts Python e documentação relacionados à validação de números primos, cálculo de estatísticas e processamento de uma fatura com desconto.

## Conteúdo do repositório

- `debug.py`
  - Script de cálculo de valores de itens, subtotal, imposto fixo de 10% e desconto percentual.
  - Lê dados do usuário para nome do cliente, quantidade e preço de três itens, e aplicação de cupom de desconto.
  - Exibe um resumo formatado da fatura.

- `num_primos.py`
  - Função `is_prime(n)` que verifica se um número inteiro é primo usando uma abordagem otimizada.
  - Inclui testes simples no bloco `if __name__ == "__main__"`.

- `refatoracao.py`
  - Função `calculate_statistics(numbers)` que calcula total, média, maior e menor valor de uma lista de números.
  - Exemplo de uso com uma lista de amostra e impressão dos resultados.

- `explicação_num_primo.md`
  - Documentação explicativa do algoritmo de verificação de número primo, com passo a passo do código.

- `explicacao-debug.md`
  - Relatório de erros detectados e correções aplicadas ao `debug.py`, com explicações de causa e impacto.

## Requisitos

- Python 3.6 ou superior

## Como executar

1. Abra um terminal no diretório do projeto:

```bash
cd "c:\Users\VITORGABRIELFERREIRA\Documents\Engenharia-de-software\test-assistente-code"
```

2. Execute um dos scripts conforme necessário:

- Para testar a função de número primo:

```bash
python num_primos.py
```

- Para calcular estatísticas de uma lista de números:

```bash
python refatoracao.py
```

- Para executar o gerador de fatura com desconto:

```bash
python debug.py
```

## O que cada script faz

- `debug.py`
  - Faz leitura de entradas do usuário.
  - Calcula o total de cada item como quantidade vezes preço.
  - Soma os valores para obter o subtotal.
  - Aplica um imposto fixo de 10% sobre o subtotal.
  - Calcula desconto com base em um percentual informado pelo usuário.
  - Mostra a fatura final formatada.

- `num_primos.py`
  - Retorna `False` para `n <= 1`.
  - Retorna `True` para 2 e 3.
  - Elimina múltiplos de 2 e 3 antes de verificar outros divisores.
  - Usa o fato de que possíveis divisores podem ser testados em intervalos de 6 unidades (`6k ± 1`).

- `refatoracao.py`
  - Recebe uma lista de números.
  - Valida que a lista não esteja vazia.
  - Retorna as estatísticas básicas: soma, média, maior e menor valor.

## Notas

- O projeto serve como um conjunto de exemplos didáticos de lógica básica em Python.
- As explicações em `explicação_num_primo.md` e `explicacao-debug.md` complementam o entendimento das implementações.
- Não há dependências externas, apenas a biblioteca padrão do Python.

## Sugestões de melhorias

- Adicionar tratamento de exceções para entradas inválidas em `debug.py`.
- Transformar as funcionalidades em funções reutilizáveis e importar em um script principal.
- Criar testes automatizados usando `unittest` ou `pytest`.
