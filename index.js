import MicroModal from "https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.es.min.js";

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
	const response = await fetch("http://localhost:3000/transactions");
	const historyData = await response.json();

	for (const item of historyData) createHistory(item);
	console.log("chegou");
};

const getDate = () => {
	const today = new Date();
	const day = String(today.getDate()).padStart(2, "0");
	const month = String(today.getMonth() + 1).padStart(2, "0"); // Mês começa do zero
	const year = today.getFullYear();

	return `${day}/${month}/${year}`;
};

const submitPost = async () => {
	const activeModal = document.querySelector(".modal.is-open");

	const inputAmount = activeModal.querySelector(".amount");
	const inputDesc = activeModal.querySelector(".description");
	const inputMetod = activeModal.querySelector(".metod");

	const data = {
		date: getDate(),
		amount: inputAmount.value,
		metod: inputMetod.value,
		description: inputDesc.value,
	};

	console.log(data);

	const response = await fetch("http://localhost:3000/transactions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},

		body: JSON.stringify(data),
	});

	const savedData = await response.json();

	inputAmount.value = "";
	inputMetod.value = "";
	inputDesc.value = "";

	renderHistory(savedData);
	console.log(savedData);
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

const clickConfirm = (ev) => {
	ev.preventDefault();
	submitPost();
};

renderHistory();
