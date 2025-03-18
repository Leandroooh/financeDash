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

	const dropdown = document.createElement("div");
	dropdown.classList.add("dropdown");

	const img = document.createElement("img");
	img.src = "./src/icons/settings.svg";
	img.alt = "Options";

	const dropdownMenu = document.createElement("div");
	dropdownMenu.classList.add("dropdown-menu");

	const dropdownEdit = document.createElement("button");
	dropdownEdit.classList.add("dropdown-item", "edit-button");
	dropdownEdit.id = "edit-button";
	dropdownEdit.textContent = "Editar";

	const dropdownDelete = document.createElement("button");
	dropdownDelete.classList.add("dropdown-item", "delete-button");
	dropdownDelete.id = "delete-button";
	dropdownDelete.textContent = "Excluir";

	dropdownMenu.append(dropdownEdit, dropdownDelete);
	dropdown.append(img, dropdownMenu);
	button.append(dropdown);

	optionsTd.append(button);

	tr.append(nameTd, accountTd, typeTd, dateTd, amountTd, optionsTd);
	table.append(tr);
};

export const renderHistory = async () => {
	const response = await fetch(API_URL);
	const historyData = await response.json();

	for (const item of historyData) createHistory(item);
};
