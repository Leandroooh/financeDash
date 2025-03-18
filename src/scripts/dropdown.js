document.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-button")) {
		event.stopPropagation(); // Evita que o clique feche o dropdown
	}
});

document.addEventListener("click", (event) => {
	if (event.target.classList.contains("edit-button")) {
		console.log("Você pode editar!");
	}
});
