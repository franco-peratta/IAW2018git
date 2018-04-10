/**
 * 
 */

window.addEventListener("load", checkMode(), false);

function checkMode() {
	var oldlink = document.getElementsByTagName("link").item(1);// SIEMPRE ES 1
	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");

	var estilo = localStorage.getItem("estilo");
	var file;
	if (estilo === null) {
		localStorage.setItem("estilo", "classic");
		file = "css/estilo.css";
		estilo = "classic";
	} else {
		if (estilo === "classic") {
			file = "css/estilo.css";
		} else {
			file = "css/estilo-alt.css";
		}
	}

	var toggleButton = document.getElementById("toggleButton");
	if (estilo === "classic") {
		toggleButton.innerHTML = "Dark Mode";
	} else {
		toggleButton.innerHTML = "Classic Mode";
	}

	newlink.setAttribute("href", file);
	document.getElementsByTagName("head").item(0)
			.replaceChild(newlink, oldlink);
}

function toggleMode() {

	var estilo = localStorage.getItem("estilo");
	var toggleButton = document.getElementById("toggleButton");

	if (estilo === null) {
		localStorage.setItem("estilo", "dark");
		toggleButton.innerHTML = "Classic Mode";
	} else {
		if (estilo === "classic") {
			toggleButton.innerHTML = "Classic Mode";
			localStorage.setItem("estilo", "dark");
		} else {
			toggleButton.innerHTML = "Dark Mode";
			localStorage.setItem("estilo", "classic");
		}
	}

	var oldlink = document.getElementsByTagName("link").item(1);// SIEMPRE ES 1

	var newlink = document.createElement("link");
	newlink.setAttribute("rel", "stylesheet");
	newlink.setAttribute("type", "text/css");

	var file = localStorage.getItem("estilo") === "classic" ? "css/estilo.css"
			: "css/estilo-alt.css";

	newlink.setAttribute("href", file);
	document.getElementsByTagName("head").item(0)
			.replaceChild(newlink, oldlink);
}
