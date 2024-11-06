function somarValores() {
    // Obter os valores dos inputs
    const valor1 = document.getElementById("input1").value;
    const valor2 = document.getElementById("input2").value;

    // Converter os valores para números e somá-los
    const soma = parseFloat(valor1) + parseFloat(valor2);

    // Exibir o resultado no terceiro input
    document.getElementById("resultado").value = soma;
}

// Adicionando um listener de evento ao botão
document.getElementById("somarButton").addEventListener("click", somarValores);
