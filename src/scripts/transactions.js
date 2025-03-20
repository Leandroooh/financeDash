import MicroModal from "https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.es.min.js";

const API_URL = "http://localhost:3000/transactions";
const table = document.getElementById("table-body");

const createOptionModal = (dataInfo) => {
	const existingModal = document.getElementById("options-modal");

	if (existingModal) {
		existingModal.remove();
	}

	const modal = document.createElement("div");
	modal.className = "modal micromodal-slide";
	modal.id = "options-modal";
	modal.setAttribute("aria-hidden", "true");

	const overlay = document.createElement("div");
	overlay.className = "options_overlay";
	overlay.tabIndex = -1;
	overlay.setAttribute("data-micromodal-close", "");

	const container = document.createElement("div");
	container.className = "options_container";
	container.setAttribute("role", "dialog");
	container.setAttribute("aria-modal", "true");
	container.setAttribute("aria-labelledby", "options_title");

	const closeButton = document.createElement("button");
	closeButton.type = "button";
	closeButton.className = "modal__close";
	closeButton.setAttribute("aria-label", "Fechar modal");
	closeButton.setAttribute("data-micromodal-close", "");
	closeButton.innerHTML = "&times;";

	const header = document.createElement("header");
	header.className = "modal__header";

	const title = document.createElement("h2");
	title.className = "modal__title";
	title.id = "modal-title";
	title.textContent = dataInfo.description;

	header.appendChild(title);

	const mainContent = document.createElement("main");
	mainContent.className = "option__content";

	const editContainer = document.createElement("div");
	editContainer.className = "edit__container option-buttons";
	editContainer.id = "edit-button";

	const editIcon = document.createElement("img");
	editIcon.src = "./src/icons/income.svg";
	editIcon.alt = "delete icon";

	const editButton = document.createElement("button");
	editButton.type = "button";
	editButton.textContent = "Editar";

	editContainer.appendChild(editIcon);
	editContainer.appendChild(editButton);

	const deleteContainer = document.createElement("div");
	deleteContainer.className = "delete__container option-buttons";
	deleteContainer.id = "delete-button";

	const deleteIcon = document.createElement("img");
	deleteIcon.src = "./src/icons/expense.svg";
	deleteIcon.alt = "delete icon";

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.textContent = "Deletar";

	deleteContainer.appendChild(deleteIcon);
	deleteContainer.appendChild(deleteButton);

	mainContent.appendChild(editContainer);
	mainContent.appendChild(deleteContainer);

	container.appendChild(closeButton);
	container.appendChild(header);
	container.appendChild(mainContent);

	overlay.appendChild(container);
	modal.appendChild(overlay);

	// Adiciona o modal ao body
	document.body.appendChild(modal);
	MicroModal.show("options-modal");

	// Adiciona os eventos após criar os elementos
	document.getElementById("edit-button").addEventListener("click", () => {
		MicroModal.close("options-modal");
		MicroModal.show("modal-transfer");
	});

	// Mostrar o modal
	document
		.getElementById("delete-button")
		.addEventListener("click", async () => {
			try {
				// Deleta a linha da tabela
				const deleteItem = document.getElementById(dataInfo.id);
				if (deleteItem) {
					deleteItem.remove(); // Remove o <tr> do DOM
				}

				// Faz uma requisição DELETE para a API
				const response = await fetch(`${API_URL}/${dataInfo.id}`, {
					method: "DELETE",
				});

				if (response.ok) {
					console.log("Item deletado com sucesso da db.json!");
					console.log(`${API_URL}/${dataInfo.id}`);
				} else {
					console.error("Erro ao deletar o item da db.json");
					console.log(`${API_URL}/${dataInfo.id}`);
				}

				MicroModal.close("options-modal"); // Fecha o modal
			} catch (error) {
				console.error("Erro ao processar a exclusão:", error);
			}
		});
};

export const createHistory = (dataInfo) => {
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

	const img = document.createElement("img");
	img.src = "./src/icons/settings.svg";
	img.alt = "Options";

	button.appendChild(img);
	optionsTd.append(button);

	tr.append(nameTd, accountTd, typeTd, dateTd, amountTd, optionsTd);
	table.append(tr);

	// Evento para abrir o modal
	button.addEventListener("click", () => {
		createOptionModal(dataInfo);
	});
};

export const renderHistory = async () => {
	const response = await fetch(API_URL);
	const historyData = await response.json();

	for (const item of historyData) createHistory(item);
};
