document.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-button")) {
		console.log("Você pode deletar!");
	}
});

document.addEventListener("click", (event) => {
	if (event.target.classList.contains("edit-button")) {
		console.log("Você pode editar!");
	}
});
