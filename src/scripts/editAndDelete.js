import MicroModal from "https://cdn.jsdelivr.net/npm/micromodal/dist/micromodal.es.min.js";

const editButton = document.getElementById("edit-button");
const deleteButton = document.getElementById("delete-button");

editButton.addEventListener("click", () => {
	MicroModal.close("options-modal");
	MicroModal.show("modal-transfer");
});
deleteButton.addEventListener("click", () => {});
