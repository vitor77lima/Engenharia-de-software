def calculate_statistics(numbers):
    """
    Calcula estatísticas básicas de uma lista de números.

    Args:
        numbers (list): Lista de números.

    Returns:
        tuple: (total, média, maior, menor)
    """
    if not numbers:
        raise ValueError("A lista não pode estar vazia")

    total = sum(numbers)
    mean = total / len(numbers)
    max_value = max(numbers)
    min_value = min(numbers)

    return total, mean, max_value, min_value


if __name__ == "__main__":
    sample_numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
    total, mean, max_val, min_val = calculate_statistics(sample_numbers)

    print("Total:", total)
    print("Média:", mean)
    print("Maior:", max_val)
    print("Menor:", min_val)
