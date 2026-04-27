# Explicação Linha a Linha do Código Python - Verificação de Número Primo

## Código Fonte

```python
def is_prime(n):
    """
    Verifica se um número é primo.
    
    Args:
        n (int): O número a ser verificado.
    
    Returns:
        bool: True se o número for primo, False caso contrário.
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Testes simples
if __name__ == "__main__":
    print(is_prime(2))  # True
    print(is_prime(3))  # True
    print(is_prime(4))  # False
    print(is_prime(17)) # True
    print(is_prime(18)) # False
```

## Explicação Linha a Linha

1. **`def is_prime(n):`**  
   Define uma função chamada `is_prime` que recebe um parâmetro `n` (o número a ser verificado).

2. **`"""`**  
   Início da docstring (documentação da função).

3. **`Verifica se um número é primo.`**  
   Descrição da função em português.

4. **`Args:`**  
   Seção que descreve os argumentos da função.

5. **`n (int): O número a ser verificado.`**  
   Especifica que `n` é um inteiro que representa o número a verificar.

6. **`Returns:`**  
   Seção que descreve o valor de retorno.

7. **`bool: True se o número for primo, False caso contrário.`**  
   Indica que a função retorna um booleano: `True` para primo, `False` para não primo.

8. **`"""`**  
   Fim da docstring.

9. **`if n <= 1:`**  
   Verifica se `n` é menor ou igual a 1. Números primos são maiores que 1.

10. **`return False`**  
    Se `n` ≤ 1, retorna `False` (não é primo).

11. **`if n <= 3:`**  
    Verifica se `n` é menor ou igual a 3. Os números 2 e 3 são primos.

12. **`return True`**  
    Se `n` ≤ 3 (e > 1), retorna `True` (é primo).

13. **`if n % 2 == 0 or n % 3 == 0:`**  
    Verifica se `n` é divisível por 2 ou por 3. Se for, não é primo (exceto 2 e 3, que já foram tratados).

14. **`return False`**  
    Se divisível por 2 ou 3, retorna `False`.

15. **`i = 5`**  
    Inicializa a variável `i` com 5. Começamos a verificar divisores a partir de 5.

16. **`while i * i <= n:`**  
    Loop enquanto o quadrado de `i` for menor ou igual a `n`. Isso otimiza a verificação até a raiz quadrada de `n`.

17. **`if n % i == 0 or n % (i + 2) == 0:`**  
    Verifica se `n` é divisível por `i` ou por `i + 2`. Isso cobre os números ímpares consecutivos.

18. **`return False`**  
    Se divisível, retorna `False` (não é primo).

19. **`i += 6`**  
    Incrementa `i` em 6 para pular para o próximo conjunto de candidatos (5, 7, 11, 13, etc.).

20. **`return True`**  
    Se nenhum divisor foi encontrado, retorna `True` (é primo).

21. **`# Testes simples`**  
    Comentário indicando o início dos testes.

22. **`if __name__ == "__main__":`**  
    Verifica se o script está sendo executado diretamente (não importado como módulo).

23. **`print(is_prime(2))  # True`**  
    Testa se 2 é primo e imprime o resultado (esperado: True).

24. **`print(is_prime(3))  # True`**  
    Testa se 3 é primo (esperado: True).

25. **`print(is_prime(4))  # False`**  
    Testa se 4 é primo (esperado: False).

26. **`print(is_prime(17)) # True`**  
    Testa se 17 é primo (esperado: True).

27. **`print(is_prime(18)) # False`**  
    Testa se 18 é primo (esperado: False).

## Notas Adicionais
- Esta implementação é eficiente para números grandes, pois verifica divisores apenas até a raiz quadrada de `n`.
- Usa a propriedade de que todos os números primos maiores que 3 podem ser escritos na forma 6k ± 1, otimizando o loop.
- Os testes no final demonstram casos básicos: primos (2, 3, 17) e não primos (4, 18).
