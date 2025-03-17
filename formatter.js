const activeModal = document.querySelector(".modal.is-open");

const inputAmount = document.querySelectorAll(".amount");
const inputmethod = document.querySelector(".method");

// Evento para formatar o valor enquanto o usuário digita
for (const item of inputAmount) {
	item.addEventListener("input", () => {
		let value = item.value;

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
		item.value = value.length > 0 ? `R$ ${value}` : "";
	});
}
