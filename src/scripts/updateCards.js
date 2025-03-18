const API_URL = "http://localhost:3000/transactions";

export const updateCards = async (typeClass, investimentType) => {
	const balance = document.getElementById(`${typeClass}-card`);

	const response = await fetch(API_URL);
	const investments = await response.json();

	// Filtra os itens de "Investimento"
	const filteredItems = investments.filter(
		(item) => item.type === investimentType,
	);

	// Usa reduce para calcular o total
	const totalValue = filteredItems.reduce((accum, item) => {
		const amount = Number.parseFloat(
			item.amount.replace("R$", "").replace(".", "").replace(",", "."),
		);
		return accum + amount;
	}, 0);

	let value = totalValue.toFixed(2);

	value = value.replace(".", ",");
	value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

	const formattedValue = `R$ ${value}`;
	balance.textContent = formattedValue;
};

export const executeUpdate = async () => {
	try {
		await updateCards("investiment", "Investimento"); // ID.HTML , Type.DB;
		await updateCards("expense", "Despesas");
		await updateCards("transfer", "Transferência");
	} catch (error) {
		console.error("Erro ao atualizar investimentos:", error.message);
	}
};
