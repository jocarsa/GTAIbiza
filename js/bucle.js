function bucle(){
	contexto1.clearRect(0, 0, lienzo1.width, lienzo1.height);
	
	//---------------------------------------+ MAPAS
	//dibujaMapaBonito();
	mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
	//contexto1.drawImage(mapaBonito, 0, 0);
	//---------------------------------------+ 
	
	//---------------------------------------+ PERROS
	//muevePerro();
	//---------------------------------------+ 
	
	//---------------------------------------+ COCHE BOT
	/*bot1.player();
	bot2.player();
	bot3.player();
	bot4.player();
	bot5.player();
	bot6.player();
	bot7.player();
	bot8.player();
	bot9.player();
	bot10.player();*/
	//---------------------------------------+ 
	
	//---------------------------------------+ COCHE PROTAGONISTA
	// Actualizo el coche del protagonista
	actualizarCocheProtagonista();
	camara.actualizar();
	//---------------------------------------+
	
	//---------------------------------------+ PLANTAS
		/*if(contadorCreacionArboles % 10 == 0) {generarArboles();}
	contadorCreacionArboles++;*/
	//---------------------------------------+ 
	
	//---------------------------------------+ PAJAROS
	//movimientoPajaros();
	//---------------------------------------+
	
	//---------------------------------------+ POLICIA
	TWEEN.update();
	//---------------------------------------+
	
	if (gameOver == true)  {
		$("#gameOver").show(); 
	} else {
		clearTimeout(temporizador);
		if(!gameOver){temporizador = setTimeout("bucle()", 33);}
	}
}