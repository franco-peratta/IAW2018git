/**
 * 
 */
window.onload = function() {
	tabla_posiciones();
	fixture_partidos();
}

function tabla_posiciones() {
	var torneoActual = JSON.parse(localStorage.getItem("torneo_elegido"));

	if (torneoActual.estado === "creado") {
		tabla_torneo_creado(torneoActual);
	} else {
		tabla_posiciones_activo(torneoActual);
	}
}

function seleccionarEquipo(equipo) {
	var json = JSON.parse(localStorage.getItem("datos"));
	
	// guardo en local storage el JSON del equipo elegido SOLAMENTE.
	var i,j;
	for (i = 0; i < json.torneo.length; i++) {
		for(j = 0; j<json.torneo[i].equipo.length; j++){
		if (json.torneo[i].equipo[j].nombre === equipo) {
			var asd = json.torneo[i].equipo[j];
			localStorage.setItem("equipo_elegido", JSON
					.stringify(json.torneo[i].equipo[j]));
			break;
			}
		}
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
		var a1 = document.createElement('a');			
		a1.appendChild(document
				.createTextNode(torneoActual.equipo[i].nombre));
		a1.setAttribute("href", "equipo.html");
		var equip = torneoActual.equipo[i].nombre;
		a1.setAttribute("onclick", 'seleccionarEquipo(\''+ equip+ '\')');
		td2.appendChild(a1);
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
		td7.appendChild(document.createTextNode(torneoActual.equipo[i].PC));
		tr.appendChild(td7);

		// Puntos (de liga)
		var td8 = document.createElement('td');
		td8.appendChild(document.createTextNode(torneoActual.equipo[i].Pts));
		tr.appendChild(td8);

		tabla.appendChild(tr);
	}
}

function fixture_partidos() {
	var tabla = document.getElementById("table-partidos");
	tabla.setAttribute("class", "table table-hover table-condensed border");

	var partidos = JSON.parse(localStorage.getItem("torneo_elegido")).partidos;

	var i;

	for (i = 0; i < partidos.length; i++) {
		var thead = document.createElement('thead');
		var fecha = i + 1;
		var tr = document.createElement('tr');
		var th = document.createElement('th');
		th.setAttribute("colspan", "3");
		// th.setAttribute("style", "align: center");
		th.appendChild(document.createTextNode("Fecha " + fecha));

		tr.appendChild(th);
		thead.appendChild(tr);
		tabla.appendChild(thead);

		// Agrego la info de los partidos
		var j;
		for (j = 0; j < partidos[i].fecha.length; j++) {
			var tbody = document.createElement('tbody');

			var tr = document.createElement('tr');
			var txt;
			
			// LOCAL
			var td1 = document.createElement('td');
			td1.setAttribute("align", "left");
			var a1 = document.createElement('a');	
			txt = partidos[i].fecha[j].local;
			
			if(partidos[i].fecha[j].estado === "finalizado"){
				txt += ' ('+partidos[i].fecha[j].puntosLocal+')';
			}
			
			a1.appendChild(document
					.createTextNode(txt));
			var equip = partidos[i].fecha[j].local;
			a1.setAttribute("href", "equipo.html");
			a1.setAttribute("onclick", 'seleccionarEquipo(\''+ equip+ '\')');
								
			// VS
			var td2 = document.createElement('td');
			td2.setAttribute("align", "center");
			td2.appendChild(document.createTextNode("vs"));
			
			// VISITANTE
			var td3 = document.createElement('td');
			td3.setAttribute("align", "right");
			var a3 = document.createElement('a');
			
			if(partidos[i].fecha[j].estado === "finalizado"){
				txt = '('+partidos[i].fecha[j].puntosVisitante+') ';
			}
			else
				txt = '';
			
			txt += partidos[i].fecha[j].visitante;			
			a3.appendChild(document
					.createTextNode(txt));
			equip = partidos[i].fecha[j].visitante;
			a3.setAttribute("href", "equipo.html");
			a3.setAttribute("onclick", 'seleccionarEquipo(\''+ equip+ '\')');
			
			td1.appendChild(a1);
			td3.appendChild(a3);
						
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);

			tbody.appendChild(tr);

			tabla.appendChild(tbody);
		}

	}
}

function tabla_posiciones_activo(torneo){
	var list = [];
	
	var i;
	// creo el arreglo a ordenar, con los equipos y sus respectivos puntos
	for(i = 0; i <torneo.equipo.length; i++){
		var arr = [torneo.equipo[i].Pts, torneo.equipo[i].nombre, torneo.equipo[i].id];
		list.push(arr);
	}
	

	crear_tabla(mergeSort(list), torneo);
}

// Split the array into halves and merge them recursively
function mergeSort (arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr;
  }

  const middle = Math.floor(arr.length / 2); // get the middle item of the
												// array
											// rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side

  return merge(
    mergeSort(left),
    mergeSort(right)
  )
}

// compare the arrays item by item and return the concatenated result
function merge (left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] > right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      if(left[indexLeft][1] == right[indexRight][1]){
    	  // ver este if o sacarlo y dejar al de abajo y foe
      }
      else{
    	  result.push(right[indexRight]);
    	  indexRight++;
      }
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

function crear_tabla(list, torneoActual){
	
	var tabla = document.getElementById("table-posiciones");
	var i;

	for (i = 0; i < torneoActual.equipo.length; i++) {
		
		var index = parseInt(list[i][2]);
		
		var tr = document.createElement('tr');

		// Team ID (+1)
		var td1 = document.createElement('td');
		td1.appendChild(document
				.createTextNode(i + 1));
		tr.appendChild(td1);

		// Nombre del Team
		var td2 = document.createElement('td');
		var a1 = document.createElement('a');			
		a1.appendChild(document
				.createTextNode(torneoActual.equipo[index].nombre));
		a1.setAttribute("href", "equipo.html");
		var equip = torneoActual.equipo[index].nombre;
		a1.setAttribute("onclick", 'seleccionarEquipo(\''+ equip+ '\')');
		td2.appendChild(a1);
		tr.appendChild(td2);

		// Games Played
		var td3 = document.createElement('td');
		td3.appendChild(document.createTextNode(torneoActual.equipo[index].GP));
		tr.appendChild(td3);

		// Wins
		var td4 = document.createElement('td');
		td4.appendChild(document.createTextNode(torneoActual.equipo[index].W));
		tr.appendChild(td4);

		// Loses
		var td5 = document.createElement('td');
		td5.appendChild(document.createTextNode(torneoActual.equipo[index].L));
		tr.appendChild(td5);

		// Puntos a favor
		var td6 = document.createElement('td');
		td6.appendChild(document.createTextNode(torneoActual.equipo[index].PF));
		tr.appendChild(td6);

		// Diferencia de puntos -> PD = PF - PC
		var td7 = document.createElement('td');
		td7.appendChild(document.createTextNode(torneoActual.equipo[index].PC));
		tr.appendChild(td7);

		// Puntos (de liga)
		var td8 = document.createElement('td');
		td8.appendChild(document.createTextNode(torneoActual.equipo[index].Pts));
		tr.appendChild(td8);

		tabla.appendChild(tr);
	}
}