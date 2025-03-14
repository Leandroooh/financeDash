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
}

const submitIncome = async () => { 
	
	const incomeAmount = document.getElementById('income-amount');
	const incomeDesc = document.getElementById('income-description');
	const incomeMetod = document.getElementById('income-metod');

	const data = {
		date: getDate(),
		amount: incomeAmount.value,
		metod: incomeMetod.value,
		description: incomeDesc.value,
	}

	const response = await fetch("http://localhost:3000/transactions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		}, 

		body: JSON.stringify(data)
	});

	const savedData = await response.json()
	
	incomeAmount.value = ''
	incomeMetod.value = ''
	incomeDesc.value = ''

	renderHistory(savedData)
	console.log(savedData)

} 

document.addEventListener('DOMContentLoaded', () => {
    const incomeBtn = document.getElementById("income-btn"); // ou outro seletor apropriado
    if (incomeBtn) {
        incomeBtn.addEventListener('click', (ev) => {
            ev.preventDefault();
            submitIncome();
        });
    }
});

renderHistory();

/* Modal Init */
MicroModal.init({
	disableScroll: true,
});