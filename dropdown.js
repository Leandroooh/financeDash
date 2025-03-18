// biome-ignore lint/complexity/noForEach: <explanation>
document.getElementsByClassName("options-button").forEach((item) => {
	item.addEventListener("click", () => {
		console.log("Editar acionado");
	});
});
