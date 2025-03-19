const API_URL = "http://localhost:3000/transactions";

const table = document.getElementById("table-body");

export const createHistory = async (dataInfo) => {
	const tr = document.createElement("tr");
	tr.id = dataInfo.id;

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
	button.setAttribute("data-micromodal-trigger", "options-modal");

	// Criando a imagem dentro do botão
	const img = document.createElement("img");
	img.src = "./src/icons/settings.svg"; // Caminho da imagem
	img.alt = "Options";

	// Adicionando a imagem no botão
	button.appendChild(img);

	optionsTd.append(button);

	tr.append(nameTd, accountTd, typeTd, dateTd, amountTd, optionsTd);
	table.append(tr);

	img.addEventListener("click", () => {
		MicroModal.show("options-modal");
	});
};

export const renderHistory = async () => {
	const response = await fetch(API_URL);
	const historyData = await response.json();

	for (const item of historyData) createHistory(item);
};
