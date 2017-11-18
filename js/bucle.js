function bucle(){
	contextoFinal.clearRect(0, 0, lienzoFinal.width, lienzoFinal.height);
	
	//---------------------------------------+ MAPAS
	dibujaMapaFinal();
	//---------------------------------------+ 
	
	//---------------------------------------+ PERROS
	muevePerro();
	//---------------------------------------+ 
	
	//---------------------------------------+ COCHE BOT
	bot1.player();
	bot2.player();
	bot3.player();
	bot4.player();
	bot5.player();
	bot6.player();
	bot7.player();
	bot8.player();
	bot9.player();
	bot10.player();
	//---------------------------------------+ 
	
	//---------------------------------------+ COCHE PROTAGONISTA
	// Actualizo el coche del protagonista
	actualizarCocheProtagonista();
	//---------------------------------------+
	
	//---------------------------------------+ PLANTAS
		if(contadorCreacionArboles % 10 == 0) {generarArboles();}
	contadorCreacionArboles++;
	//---------------------------------------+ 
	
	//---------------------------------------+ PAJAROS
	movimientoPajaros();
	//---------------------------------------+
	
	//---------------------------------------+ PECES
	actualizarPez();
	//---------------------------------------+ PECES
	
	
	if (gameOver == true)  {
		$("#gameOver").show(); 
	} else {
		clearTimeout(temporizador);
		if(!gameOver){temporizador = setTimeout("bucle()", 33);}
	}
}