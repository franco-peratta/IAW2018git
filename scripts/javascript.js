/**
 * 
 */

function login() {
	location.href = "admin.html";
}

function decrease() {
	var num = document.getElementById("maxp").value;

	num--;

	if (num <= 12 && num >= 5)
		document.getElementById("maxp").value = num;
}

function increase() {
	var num = document.getElementById("maxp").value;

	num++;

	if (num <= 12 && num >= 5)
		document.getElementById("maxp").value = num;
}

function decreaseby2() {
	var num = document.getElementById("teams").value;

	num--;
	num--;

	if (num <= 32 && num >= 2)
		document.getElementById("teams").value = num;
}

function increaseby2() {
	var num = document.getElementById("teams").value;

	num++;
	num++;

	if (num <= 32 && num >= 2)
		document.getElementById("teams").value = num;
}

function inicializarForm() {
	document.getElementById("maxp").value = 5;
	document.getElementById("teams").value = 2;
}

function newForm() {

	// Obtengo datos del form
	var tname = document.getElementById("tname").value;
	var format = document.getElementById("format").value;
	var maxp = document.getElementById("maxp").value;
	var teams = document.getElementById("teams").value;

	var torneos = JSON.parse(localStorage.getItem("torneos"));
	if (torneos == null) {
		// CREO LA PLANTILLA JSON
		var txt = '{ "torneo": [{"nombre": "' + tname + '","formato": "'
				+ format + '","cantTeams":' + teams + ',"cantPlayers": ' + maxp
				+ '}] }';
		localStorage.setItem("torneos", txt);
		localStorage.setItem("index", 0);
	} else {
		var txt = '{"nombre": "' + tname + '","formato": "' + format
				+ '","cantTeams": ' + teams + ',"cantPlayers":' + maxp + '}';

		torneos.torneo.unshift(JSON.parse(txt));

		localStorage.setItem("torneos", JSON.stringify(torneos));

		var index = localStorage.getItem("index");
		index++;
		localStorage.setItem("index", index);
	}

	var json_equipos = '{"equipo": []}';

	// Guardo en localstorage
	// RECORDAR: para utilizarlo como JSON hay que parsear a objeto cuando se
	// accedan a estos datos
	localStorage.setItem(tname, json_equipos);

	var content = document.getElementById("contenido").innerHTML = "";
	content = document.getElementById("contenido");

	var header = document.createElement('h3');
	header.appendChild(document.createTextNode(tname));
	content.appendChild(header);

	var ul = document.createElement('ul');
	ul.setAttribute("class", "list-group lista_equipos");
	ul.setAttribute("id", "lista_equipos");
	content.appendChild(ul);

	var i;
	for (i = 0; i < teams; i++) {

		var li = document.createElement('li');
		li
				.setAttribute("class",
						"list-group-item d-flex justify-content-between align-items-center");

		li.appendChild(document.createTextNode("Add New Team"));

		var span = document.createElement('span');
		span.setAttribute("class", "badge badge-primary badge-pill");
		span.setAttribute("data-toggle", "modal");
		span.setAttribute("data-target", "#mymodal");
		span.appendChild(document.createTextNode("+"));

		li.appendChild(span);
		ul.appendChild(li);
	}

	createModal(maxp);
}

function createModal(players) {
	// append modal html
	var div = document.createElement('div');
	div.innerHTML = document.getElementById('modal-html').innerHTML;
	document.getElementById("contenido").appendChild(div);

	var modal = document.getElementById("cuerpo-modal");

	var text = '<div class="container"><form id="formequipo"><div class="form-row"><div class="col"><input type="text" class="form-control" placeholder="Team name"></div></div><hr></form></div><div id="form-div" class="container"><form id="modalForm" name="modalF"></form></div>';
	modal.insertAdjacentHTML('beforeend', text);

	var i;
	for (i = 0; i < players; i++) {
		text = '<div class="form-row"><div class="col"><input type="text" name="fname" class="form-control" placeholder="Full name"></div><div class="col"><input type="text" class="form-control" name="dni" placeholder="DNI"></div></div><div class="form-row"><div class="col"></div><div class="col"><input type="number" min="1" max="90" class="form-control" name="edad" placeholder="Edad"></div></div><hr>';

		// modal.innerHTML = text;
		document.getElementById("modalForm").insertAdjacentHTML('beforeend',
				text);
	}
}

function confirm_team() {

	// Obtengo JSON
	var torneos = JSON.parse(localStorage.getItem("torneos"));

	// Obtengo numero de torneo
	var index = localStorage.getItem("index");

	// ACA DESPUES NO VA A SER CERO EL INDICE! OJO!
	var json_equipos = JSON.parse(localStorage
			.getItem(torneos.torneo[index].nombre));

	var equipo;// nombre del equipo

	$('#formequipo input').each(function() {
		var input = $(this);
		equipo = input.val();
	});

	json_equipos.equipo.push(JSON.parse('{"nombre":"' + equipo
			+ '", "jugador": []}'));

	// obtengo los valores del form correspondiente a los jugadores, 1 por 1 en
	// secuencia.

	var jugador = '';

	$('#modalForm input').each(function() {
		var input = $(this);
		switch (input.attr('name')) {
		case "fname":
			jugador = '{ "nombre":"' + input.val() + '",';
			break;

		case "dni":
			jugador += '"DNI":"' + input.val() + '",';
			break;
		case "edad":
			jugador += '"edad":' + input.val() + ' }';
			// console.log(jugador);
			// console.log(json_equipos);
			json_equipos.equipo[0].jugador.unshift(JSON.parse(jugador));
		}
	});

	// guardo el json con el nombre del torneo

	localStorage.setItem(torneos.torneo[index].nombre, JSON
			.stringify(json_equipos));

	$('#mymodal').modal('hide');

	var listaEquipos = document.getElementById("lista_equipos");

	var items = listaEquipos.childNodes;
	var listo = true;

	for (var i = 0; i < items.length && listo; i++) {
		if (items[i].nodeType === 1) {
			// ALGUNA MEJOR MANERA DE HACER ESTA JUDEADA?
			if (items[i].innerHTML === 'Add New Team<span class="badge badge-primary badge-pill" data-toggle="modal" data-target="#mymodal">+</span>') {
				items[i].innerHTML = '<a>' + equipo + '</a>';
				listo = false;
			}
		}
	}
}

function deleteAll() {
	localStorage.clear();
}