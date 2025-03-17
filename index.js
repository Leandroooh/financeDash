import MicroModal from "https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.es.min.js";

let id = 0;

const table = document.getElementById("table-body");

const API_URL = "http://localhost:3000/transactions";

const getLastId = async () => {
	const response = await fetch(API_URL);
	const transactions = await response.json();

	if (!transactions.length < 0) {
		id = 1;
		return;
	}

	id = Math.max(...transactions.map((item) => item.id));
};

const getDate = () => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const year = today.getFullYear();

	return `${day}/${month}/${year}`;
};

const createHistory = (dataInfo) => {
	const tr = document.createElement("tr");

	const nameTd = document.createElement("td");
	nameTd.textContent = dataInfo.description;

	const accountTd = document.createElement("td");
	accountTd.textContent = dataInfo.method;

	const typeTd = document.createElement("td");
	typeTd.textContent = dataInfo.type;

	const dateTd = document.createElement("td");
	dateTd.textContent = dataInfo.date;

	const amountTd = document.createElement("td");
	amountTd.textContent = dataInfo.amount;

	const optionsTd = document.createElement("td");

	const button = document.createElement("button");
	button.type = "button";
	button.classList.add("options-button");

	const img = document.createElement("img");
	img.src = "./src/icons/settings.svg";
	img.alt = "Options";

	button.append(img);
	optionsTd.append(button);

	tr.append(nameTd, accountTd, typeTd, dateTd, amountTd, optionsTd);
	table.append(tr);
};

const renderHistory = async () => {
	const response = await fetch(API_URL);
	const historyData = await response.json();

	for (const item of historyData) createHistory(item);
};

const submitPost = async () => {
	const activeModal = document.querySelector(".modal.is-open");

	const inputType = activeModal.querySelector(".types");
	const inputAmount = activeModal.querySelector(".amount");
	const inputmethod = activeModal.querySelector(".method");
	const inputDesc = activeModal.querySelector(".description");

	const typeData = inputType.value;
	const descData = inputDesc.value;
	const amountData = inputAmount.value;
	const methodData = inputmethod.value;

	await getLastId();
	id += 1;

	if (!amountData || !descData || !methodData || !typeData) {
		console.log("Os campos fornecidos não podem ser nulos");
		return;
	}

	const data = {
		id: id,
		date: getDate(),
		amount: amountData,
		method: methodData,
		type: typeData,
		description: descData,
	};

	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	const savedData = await response.json();

	inputAmount.value = "";
	inputmethod.value = "";
	inputDesc.value = "";

	createHistory(savedData);
	console.log(savedData);
};

const clickConfirm = (ev) => {
	ev.preventDefault();
	submitPost();
};

document.addEventListener("DOMContentLoaded", () => {
	// Inicializar o MicroModal
	MicroModal.init({
		disableScroll: true,
		onShow: () => {
			const activeModal = document.querySelector(".modal.is-open");

			if (activeModal) {
				const confirmBtn = activeModal.querySelector(".confirm-button");

				if (confirmBtn) {
					confirmBtn.removeEventListener("click", clickConfirm); // Remove um ouvinte anterior, se houver
					confirmBtn.addEventListener("click", clickConfirm);
				}
			}
		},
	});
});

renderHistory();

const updateInvestiment = async (typeClass, investimentType) => {
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

const executeUpdate = async () => {
	try {
		await updateInvestiment("investiment", "Investimento"); // ID.HTML , Type.DB;
		await updateInvestiment("expense", "Despesas");
		await updateInvestiment("transfer", "Transferência");
	} catch (error) {
		console.error("Erro ao atualizar investimentos:", error.message);
	}
};

executeUpdate();
