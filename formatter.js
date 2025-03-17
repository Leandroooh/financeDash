const inputAmount = document.querySelector(".amount");
const inputmethod = document.querySelector(".method");

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

inputmethod.addEventListener("change", (ev) => {
	if (inputmethod.value === "default") {
		// Impede qualquer ação de envio ou processamento aqui
		ev.preventDefault(); // Embora o preventDefault geralmente seja para eventos como submit, ele pode ser usado de forma mais geral, como uma forma de cancelar qualquer ação padrão.
		alert("Por favor, selecione um método de pagamento válido.");
		inputmethod.value = "Pix";
	}
});
