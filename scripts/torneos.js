// JavaScript Document
window.onload = function() {
	cargarTorneos();
};

/*
 * function cargarTorneos() {
 * 
 * for (var i = 0; i < localStorage.length; i++) {
 * console.log(localStorage.getItem(localStorage.key(i))); }
 * 
 * var div = document.getElementById("torneosactivos");
 * 
 * if (localStorage.getItem("torneos") !== null) {
 * 
 * var Jorneos = JSON.parse(localStorage.getItem("torneos")); if
 * (Jorneos.torneo.length > 0) { var i, tname, format; var s1 = ''; var s2 = '</h4><p class="descripcion">';
 * var s3 = '</p> <img id="imagen" src="images/asd.png" align="right"
 * height="100px" width="100px"></a>'; var text = '';
 * 
 * for (i = 0; i < Jorneos.torneo.length; i++) { tname =
 * Jorneos.torneo[i].nombre;
 * 
 * s1 = '<a onClick="seleccionarTorneo(\'' + tname + '\')" href="torneo.html"
 * class="list-group-item"><h4 class="list-group-item-heading">';
 * 
 * format = Jorneos.torneo[i].formato; text = s1 + tname + s2 + format + s3;
 * 
 * div.insertAdjacentHTML('beforeend', text); text = ''; } } // else { //
 * div.insertAdjacentHTML('beforeend', // '<h3>No hay torneos activos 1</h3>'); // } }
 * else { div.insertAdjacentHTML('beforeend', '<h3>No hay torneos activos</h3>'); } }
 */

function cargarTorneos() {

	var div = document.getElementById("torneosactivos");

	if (localStorage.getItem("datos") !== null) {

		var Jorneos = JSON.parse(localStorage.getItem("datos"));
		if (Jorneos.torneo.length > 0) {
			var i, tname, format;
			var s1 = '';
			var s2 = '</h4><p class="descripcion">';
			// var s3 = '</p> <img id="imagen" src="images/asd.png"
			// align="right" height="100px" width="100px"></a>';
			var s3 = '<div class="torneo_slogan" style="padding-right: 0px;"><img src="images/liga.png" class="img-responsive"></div>';

			var text = '';

			for (i = 0; i < Jorneos.torneo.length; i++) {
				tname = Jorneos.torneo[i].nombre;

				s1 = '<a onClick="seleccionarTorneo(\''
						+ tname
						+ '\')" href="torneo.html" class="list-group-item"><h4 class="list-group-item-heading">';

				format = Jorneos.torneo[i].formato;
				text = s1 + tname + s2 + format + s3;

				div.insertAdjacentHTML('beforeend', text);
				text = '';
			}
		}

	} else {
		div.insertAdjacentHTML('beforeend', '<h3>No hay torneos activos</h3>');
	}

}

function seleccionarTorneo(torneo) {
	var json = JSON.parse(localStorage.getItem("datos"));

	// guardo en local storage el JSON del torneo elegido SOLAMENTE.

	for (i = 0; i < json.torneo.length; i++) {
		if (json.torneo[i].nombre === torneo) {
			var asd = json.torneo[i];
			localStorage.setItem("torneo_elegido", JSON
					.stringify(json.torneo[i]));
			break;
		}
	}
}