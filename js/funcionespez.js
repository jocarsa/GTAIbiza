/****************************************************************************************************************************/
/* Condiciones iniciales y bucle																							*/
/****************************************************************************************************************************/
function valoresInicialesPez(){
	// Creo los peces
	cursor = new Cursor();

	//Creo Objetivos Comunes por cada numero Peces en cada bandada (nPeces / nBancos)

	for(var i = 0; i < nBancos; i++) {
		// creo Objetivo
		objetivosComunes[i] = new Objetivo();
		// Inicializo variables
		objetivosComunes[i].constructor();		
		
		// Creo los peces
		for (var j = 0; j < nPeces; j++) {						
			objetivosComunes[i].peces[j] = new Pez();	
			objetivosComunes[i].peces[j].constructor();
			objetivosComunes[i].peces[j].color = "white";
			objetivosComunes[i].peces[j].objetivo.posX = objetivosComunes[i].posX + 
														(objetivosComunes[i].peces[j].ratioPosicionObjetivo * Math.cos(2 * Math.PI * Math.random()));
			objetivosComunes[i].peces[j].objetivo.posY = objetivosComunes[i].posY + 
														(objetivosComunes[i].peces[j].ratioPosicionObjetivo * Math.sin(2 * Math.PI * Math.random()));
		}
		
		
		
		
		
		/*objetivosComunes[i].setPosicion(200 + ((lienzoFinal.width - 200) * Math.random()),
										200 + ((lienzoFinal.height -200) * Math.random()));		*/
		//objetivosComunes[i].setPosicion(500,500)
	}	
	
	
}

function eventosPez(){	

	// Código JQuery
	$("canvas").mousemove(function(event){
		// Al pasar el ratón
		//for (var i = 0; i < nPeces; i++){peces[i].persigue(event.pageX - 272, event.pageY - 50);}			
	})
	
	$("canvas").click(function(event){
		// Al hacer click 		
		//for (var i = 0; i < nPeces; i++){peces[i].velocidad +=0.1;}
		//for (var i = 0; i < nPeces; i++){peces[i].huye(event.pageX - 272, event.pageY - 50);}
		
	})
	
	$("canvas").dblclick(function(event){
		// Al hacer doble click 
		//for (var i = 0; i < nPeces; i++){peces[i].persigue(event.pageX - 272, event.pageY - 50);}	
	})
	
}
	
function actualizarPez() {

	// Banco de peces 0: forma lineal
	//objetivosComunes[0].dibuja('yellow');
	objetivosComunes[0].moverLinealmente();
	objetivosComunes[0].colisionBordes();
	//objetivosComunes[0].cambiaDireccion(); // No funciona si sigue a un objetivo
	//objetivosComunes[0].cambiaPosicion();
	objetivosComunes[0].cambiaObjetivos();
	
	for (var i = 0; i < nPeces; i++) {			
		objetivosComunes[0].peces[i].dibujaPez();
		objetivosComunes[0].peces[i].mover();
		//objetivosComunes[0].peces[i].objetivo.moverCircularmente();
		objetivosComunes[0].peces[i].ondula();								
		
		objetivosComunes[0].peces[i].colisionBordes();					
		objetivosComunes[0].peces[i].persigueObjetivo();			
		objetivosComunes[0].peces[i].controlVelocidad();
		//objetivosComunes[0].peces[i].cambiaDireccion(); // No funciona cuando persigue un objetivo
		objetivosComunes[0].peces[i].cambiaPosicionObjetivo();
		//objetivosComunes[0].peces[i].huye(500,500);		
		//objetivosComunes[0].peces[i].objetivo.dibuja("blue");			
		//objetivosComunes[0].peces[i].dibujaVelocidad("red");
		//objetivosComunes[0].peces[i].dibujaPosicion("red");
	}	

	// Banco de peces 0: forma circular
	//objetivosComunes[1].dibuja('yellow');
	objetivosComunes[1].moverLinealmente();
	objetivosComunes[1].colisionBordes();
	//objetivosComunes[1].cambiaDireccion(); // No funciona si sigue a un objetivo
	//objetivosComunes[1].cambiaPosicion();
	//objetivosComunes[1].cambiaObjetivos();
	objetivosComunes[1].cambiaRadio();
	objetivosComunes[1].cambiaSentido();
	
	for (var i = 0; i < nPeces; i++) {			
		objetivosComunes[1].peces[i].dibujaPez();
		objetivosComunes[1].peces[i].mover();
		objetivosComunes[1].peces[i].objetivo.moverCircularmente();
		objetivosComunes[1].peces[i].ondula();				
		
		objetivosComunes[1].peces[i].colisionBordes();					
		objetivosComunes[1].peces[i].persigueObjetivo();			
		objetivosComunes[1].peces[i].controlVelocidad();
		//objetivosComunes[1].peces[i].cambiaDireccion(); // No funciona cuando persigue un objetivo
		//objetivosComunes[1].peces[i].cambiaPosicionObjetivo();
		objetivosComunes[1].peces[i].cambiaRadio();
		//objetivosComunes[1].peces[i].huye(500,500);		
		//objetivosComunes[1].peces[i].objetivo.dibuja("blue");			
		//objetivosComunes[1].peces[i].dibujaVelocidad("red");
		//objetivosComunes[1].peces[i].dibujaPosicion("red");
	}	
		
	
}

/****************************************************************************************************************************/
/* Funciones de cálculo																									*/
/****************************************************************************************************************************/
function anguloEntrePuntos(xOrigen, yOrigen, xObjetivo, yObjetivo) {

    return Math.atan2(yObjetivo - yOrigen, xObjetivo - xOrigen);

}

/****************************************************************************************************************************/
/* Funciones de dibujado																									*/
/****************************************************************************************************************************/
function dibujaRotado(radianes){
	
    contextoFinal.clearRect(0,0,lienzo.width,lienzo.height);
    contextoFinal.save();
    contextoFinal.translate(pez.posX, pez.posY);
	contextoFinal.rotate(radianes);
    contextoFinal.drawImage(imagenPez,- imagenPez.width/2,- imagenPez.height/2);
    contextoFinal.restore();
	
}

function dibujaLinea(xInicio, yInicio, xFin, yFin, color){	
	
	contextoFinal.strokeStyle = color;
	contextoFinal.beginPath();
	contextoFinal.moveTo(xInicio,yInicio);
	contextoFinal.lineTo(xFin,yFin);
	contextoFinal.stroke();	
	
}

function dibujaCirculo(x, y, aRadio, color, modo) {
	contextoFinal.fillStyle = color;	
	contextoFinal.strokeStyle = color;	
	contextoFinal.beginPath();
	contextoFinal.arc(x - (aRadio/2) , y - (aRadio/2), aRadio ,0, 2 * Math.PI);
	if (modo == "S") {
		contextoFinal.stroke();	
	} else {
		contextoFinal.fill();	
	}	
	contextoFinal.endPath;
}	

function dibujaRectangulo(x, y, xEscala, yEscala, color, modo){

	if (modo == "S") {
		contextoFinal.strokeStyle = color;
		contextoFinal.strokeRect(x - xEscala/2, y - yEscala/2, xEscala, yEscala);	
	} else {
		contextoFinal.fillStyle = color;
		contextoFinal.fillRect(x - xEscala/2, y - yEscala/2, xEscala, yEscala);	
	}	

}	



