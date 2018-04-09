/**
 * 
 */

window.onload = function() {
	tabla_posiciones();
	//fixture_partidos();
}

function tabla_posiciones() {
	var torneoActual = JSON.parse(localStorage.getItem("torneo_elegido"));

	if (torneoActual.estado === "creado") {
		tabla_torneo_creado(torneoActual);
	} else {
		console.log(torneoActual.estado);
	}
}

function tabla_torneo_creado(torneoActual) {

	var tabla = document.getElementById("table-posiciones");
	var i;

	for (i = 0; i < torneoActual.equipo.length; i++) {
		var tr = document.createElement('tr');

		// Team ID (+1)
		var td1 = document.createElement('td');
		td1.appendChild(document
				.createTextNode(parseInt(torneoActual.equipo[i].id) + 1));
		tr.appendChild(td1);

		// Nombre del Team
		var td2 = document.createElement('td');
		td2.appendChild(document.createTextNode(torneoActual.equipo[i].nombre));
		tr.appendChild(td2);

		// Games Played
		var td3 = document.createElement('td');
		td3.appendChild(document.createTextNode(torneoActual.equipo[i].GP));
		tr.appendChild(td3);

		// Wins
		var td4 = document.createElement('td');
		td4.appendChild(document.createTextNode(torneoActual.equipo[i].W));
		tr.appendChild(td4);

		// Loses
		var td5 = document.createElement('td');
		td5.appendChild(document.createTextNode(torneoActual.equipo[i].L));
		tr.appendChild(td5);

		// Puntos a favor
		var td6 = document.createElement('td');
		td6.appendChild(document.createTextNode(torneoActual.equipo[i].PF));
		tr.appendChild(td6);

		// Diferencia de puntos -> PD = PF - PC
		var td7 = document.createElement('td');
		td7.appendChild(document.createTextNode(torneoActual.equipo[i].PD));
		tr.appendChild(td7);

		// Puntos (de liga)
		var td8 = document.createElement('td');
		td8.appendChild(document.createTextNode(torneoActual.equipo[i].Pts));
		tr.appendChild(td8);

		tabla.appendChild(tr);
	}
}

//function fixture_partidos() {
//	var tabla = document.getElementById("table-partidos");
//
//	var partidos = JSON.parse(localStorage.getItem("torneo_elegido")).partidos;
//
//	var i;
//
//	for (i = 0; i < partidos.length; i++) {
//		var thead = document.createElement('thead');
//		var fecha = i + 1;
//		thead.appendChild(document.createTextNode("Fecha " + fecha));
//		var tr = document.createElement('tr');
//		var th = document.createElement('th');
//		th.setAttribute("colspan", "3");
//		th.setAttribute("align", "center");
//
//		tr.appendChild(th);
//		thead.appendChild(tr);
//		tabla.appendChild(thead);
//	}
//}