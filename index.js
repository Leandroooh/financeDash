import MicroModal from "https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.es.min.js";

MicroModal.init({
	disableScroll: true,
});

const table = document.getElementById("table-body");

const createHistory = (dataInfo) => {
	const tr = document.createElement("tr");

	const nameTd = document.createElement("td");
	nameTd.textContent = dataInfo.description;

	const accountTd = document.createElement("td");
	accountTd.textContent = dataInfo.metod;

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

	tr.append(nameTd, accountTd, dateTd, amountTd, optionsTd);
	table.append(tr);
};

const renderHistory = async () => {
	const result = await fetch("http://localhost:3000/transactions");
	const historyData = await result.json();

	for (const item of historyData) createHistory(item);
	console.log("chegou");
};

renderHistory();
