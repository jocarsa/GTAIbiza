function bucle(){
	contexto1.clearRect(0, 0, lienzo1.width, lienzo1.height);
	
	//---------------------------------------+ MAPAS
<<<<<<< HEAD
	dibujaMapaFinal();	
=======
	//dibujaMapaBonito();
	mapaBonito.dibujar(contexto1, camara.vistaX, camara.vistaY);
	//contexto1.drawImage(mapaBonito, 0, 0);
>>>>>>> origin/COCHES-BOT
	//---------------------------------------+ 
	
	//---------------------------------------+ PERROS
	//muevePerro();   muteado para que no aparezcan perros
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

	//losPuntos()
	//---------------------------------------+ 
	
	//---------------------------------------+ COCHE PROTAGONISTA
	// Actualizo el coche del protagonista
	actualizarCocheProtagonista();
	camara.actualizar();
	//---------------------------------------+
	
	//---------------------------------------+ PLANTAS
		if(contadorCreacionArboles % 10 == 0) {generarArboles();}
	contadorCreacionArboles++;
	//---------------------------------------+ 
	
	//---------------------------------------+ PAJAROS
	//movimientoPajaros();muteado para que no aparezcan pajaros

	//---------------------------------------+
	
	//---------------------------------------+ PECES
	actualizarPez();
	//---------------------------------------+ PECES
	
	if (gameOver == true)  {
		$("#gameOver").show(); 
	} else {
		clearTimeout(temporizador);
<<<<<<< HEAD
		if(!gameOver){temporizador = setTimeout("bucle()", frameTime);}
=======
		if(!gameOver){temporizador = setTimeout("bucle()", 20);}
>>>>>>> origin/COCHES-BOT
	}
}