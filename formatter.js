const inputAmount = document.querySelector(".amount");

// Evento para formatar o valor enquanto o usuário digita
inputAmount.addEventListener("input", () => {
	let value = inputAmount.value;

	// Remove qualquer caractere que não seja número
	value = value.replace(/\D/g, "");

	// Se houver números, formata para o padrão
	if (value.length > 0) {
		// Adiciona a vírgula para centavos
		value = value.replace(/(\d{2})$/, ",$1");

		// Adiciona os pontos para separar os milhares
		value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");
	}

	// Atualiza o input com o prefixo "R$"
	inputAmount.value = value.length > 0 ? `R$ ${value}` : "";
});
