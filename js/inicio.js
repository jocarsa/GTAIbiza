function inicio() {
	//Cuando el documento esté preparado(cuando esté todo leido inicialmente)
	$(document).ready(function() {
		$("#instrucciones").hide();
		
		$("#botonEmpezarJuego").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1 && puedesIniciar == 5) {
				//Oculta el botonEmpezarJuego 
				$("#interfazUsuario").hide(); 
				condicionesInicialesCocheProtegonista();
				//Ejecutamos bucle()
				bucle();
			}
		});
		$("#botonInstrucciones").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego 
				$("#interfazUsuario").hide(); 
				$("#instrucciones").show(); 
			}
		});
		$("#cerrar").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego 
				$("#interfazUsuario").show(); 
				$("#instrucciones").hide(); 
			}
		});
		$("#botonReiniciarJuego").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1) {
				//Oculta el botonEmpezarJuego 
				$("#gameOver").hide(); 
				condicionesInicialesCocheProtegonista();
				//Ejecutamos bucle()
				gameOver = false;
				bucle();
			}
		});
		//---------------------------------------+ MAPAS
		dibujaMapaBonito();
		dibujaMapaCoche();
		dibujaMapaPerro();
		dibujaMapaPlanta();
		dibujaMapaPajaro();
		
		//---------------------------------------+ 
	
		//---------------------------------------+ COCHE PROTAGONISTA
		eventosCocheProtagonista();
		//---------------------------------------+ 
		
		//---------------------------------------+ COCHE BOT

		//---------------------------------------+ 
		
		//---------------------------------------+ PLANTAS
	
		//---------------------------------------+ 
		
		//---------------------------------------+ PERROS
		
		//---------------------------------------+
		
		//---------------------------------------+ PAJAROS
		creacionPajaros();
		//---------------------------------------+
	});
}