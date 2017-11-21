function inicio() {
	//Cuando el documento esté preparado(cuando esté todo leido inicialmente)
	$(document).ready(function() {
		$("#instrucciones").hide();
		
		$("#botonEmpezarJuego").mousedown(function(event) {
			//Si se pulsa el boton izquierdo del raton
			if (event.which == 1 && puedesIniciar == 3) {
				//Oculta el botonEmpezarJuego 
				$("#interfazUsuario").hide(); 
				condicionesInicialesCocheProtegonista();
				situarCamara();
				mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
				mapaCoche.dibujar(contextoCoche, camara.vistaX, camara.vistaY);
			
				//POLICIA
				crearInstanciaCochePolicia();
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
				situarCamara();
				mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
				mapaCoche.dibujar(contextoCoche, camara.vistaX, camara.vistaY);
				mapaFinal2.dibujar(contextoFinal2, camara.vistaX, camara.vistaY);
				//POLICIA
				crearInstanciaCochePolicia();
				//Ejecutamos bucle()
				gameOver = false;
				bucle();
			}
		});

		//---------------------------------------+ MAPAS
		dibujaMapaPerro();
		dibujaMapaPlanta();
		dibujaMapaPajaro();
		
		dibujaMapaCoche2();
	
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