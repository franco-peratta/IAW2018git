// JavaScript Document

window.onload = function() {
	info_team();
};


function info_team(){

	var equipo = JSON.parse(localStorage.getItem("equipo_elegido"));
			
	var tabla = document.getElementById("table-posiciones");
	var i;
	for (i = 0; i < equipo.jugador.length; i++) {
		var tr = document.createElement('tr');

		// Nombre del team
		var td1 = document.createElement('td');
		td1.appendChild(document
				.createTextNode(equipo.nombre));
		tr.appendChild(td1);

		// Nombre del Jugador
		var td2 = document.createElement('td');
		var a1 = document.createElement('a');			
		a1.appendChild(document
				.createTextNode(equipo.jugador[i].nombre));
		td2.appendChild(a1);
		tr.appendChild(td2);		

		// DNI
		var td3 = document.createElement('td');
		td3.appendChild(document.createTextNode(equipo.jugador[i].DNI));
		tr.appendChild(td3);

		// Edad
		var td4 = document.createElement('td');
		td4.appendChild(document.createTextNode(equipo.jugador[i].edad));
		tr.appendChild(td4);

		tabla.appendChild(tr);
	}
}