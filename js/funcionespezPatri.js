/****************************************************************************************************************************/
/* Condiciones iniciales y bucle																							*/
/****************************************************************************************************************************/
function valoresInicialesPez(){
	// Creo los peces
	cursor = new Cursor();

	//Creo Objetivos Comunes por cada numero Peces en cada bandada (nPeces / nBandada)
	for(var i = 0; i < (nPeces / nBandada); i++) {
		// creo Objetivo
		objetivosComunes[i] = new Objetivo();
		// Inicializo Variables (Objetivo Aleatorio)
		objetivosComunes[i].constructorAleatorio();
	}

	for (var i = 0; i < nPeces; i++) {
		peces[i] = new Pez();
		// Propiedades			
		peces[i].constructor();
		peces[i].color = "white";		
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
		for (var i = 0; i < nPeces; i++){peces[i].velocidad +=0.1;}
		//for (var i = 0; i < nPeces; i++){peces[i].huye(event.pageX - 272, event.pageY - 50);}
		
	})
	
	$("canvas").dblclick(function(event){
		// Al hacer doble click 
		//for (var i = 0; i < nPeces; i++){peces[i].persigue(event.pageX - 272, event.pageY - 50);}	
	})
	
}
	
function actualizarPez() {
	// Objetivos

	var indiceObjetivoActual = -1;
	// Peces 
	for (var i = 0; i < nPeces; i++) {
		// Dibujar		
		peces[i].dibujaPez();	
		//peces[i].dibujaCabeza();
		//peces[i].dibujaCuerpo();
		//peces[i].dibujaArticulaciones();
		//peces[i].dibujaPosicion();
		//peces[i].dibujaVelocidad("red");

		// Segun el indice del pez, le corresponde un objetivo
		if (i % nBandada === 0) {
			indiceObjetivoActual++;
		}
		// Actualizo movimiento del objetivo
		objetivosComunes[indiceObjetivoActual].moverAleatoriamente();
		// Actualizo la direccion de cada objetivo
		objetivosComunes[indiceObjetivoActual].cambiarDireccionObjetivo();
		// Compruebo colisiones con el color del agua NO IMPLEMENTADO AUN
		// objetivosComunes[indiceObjetivoActual].colisionBordes();
		// Actualizo el objetivo en el pez 
		// con un margen de 40px para no que no se junten los peces
		peces[i].objetivo = objetivosComunes[indiceObjetivoActual];
		peces[i].objetivo.posX += (Math.random() - 0.5) * 40;
		peces[i].objetivo.posY += (Math.random() - 0.5) * 40;
		// Dibujo objetivo
		// peces[i].objetivo.dibuja('red');

		// Mover
		peces[i].ondula();
		peces[i].mover();
		peces[i].reducirVelocidad();
		peces[i].persigueObjetivo();
		// peces[i].cambiaDireccion();
		// peces[i].cambiaRadio();
		//peces[i].cambiaSentido();
		peces[i].colisionparedes();
	}

	//cambiaDireccion(); 
	cambiaRadio();
	cambiaSentido();
	cambiaCentro();
	
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

/****************************************************************************************************************************/
/* Estas funciones son para hacer lo que hace la clase pez pero con todos los elementos sincronizados, de esta forma se le  */
/* da apariencia de conjunto: cambia la dirección, el radio del giro del objetivo especial, el sentido del giro y el centro */
/****************************************************************************************************************************/

// Cambia de dirección cada tiempo marcado por cambioDireccion en milisegundos
function cambiaDireccion(){				
	// Variables locales
	var deltaDir; // Variación de la dirección que se aplicará a todos los elementos

	tiempoDireccion -= frameTime;	
	if (tiempoDireccion < 0) {
		// El timeout ha vencido le damos un nuevo valor aleatorio basado en su valor inicial
		tiempoDireccion = cambioDireccion + (cambioDireccion * (Math.random() -0.5));
		// Se calcula la variación de la dirección, que será aplicada a todos los elementos
		deltaDir = 1;//(Math.random() - 0.5) * ratioDireccion;
		console.log("Cambio de direccion en " + (tiempoDireccion/1000) + " s");			
		// Aplicamos el mismo cambio de dirección a todos los elementos
		for (i = 0; i < nPeces ; i++) {			
			deltaDir = (Math.random() - 0.5) * ratioDireccion;
			peces[i].rotZ += deltaDir;
		}
	}
}


// Cambia de radio cada tiempo indicado
function cambiaRadio(){
	// Reduce el timeout
	tiempoRadio -= frameTime;	
	if (tiempoRadio < 0) {
		// El timeout ha vencido le damos un nuevo valor aleatorio basado en su valor inicial
		tiempoRadio = cambioRadio + (cambioRadio * (Math.random() -0.5));		
		console.log("Cambio de radio en " + (tiempoRadio/1000) + " s");		
		for (i = 0; i < nPeces ; i++) {
			peces[i].objetivo.centroRadio += ratioRadio * (Math.random() - 0.5);
			if (Math.abs(peces[i].objetivo.centroRadio) < 15){
				peces[i].objetivo.centroRadio = 15
			} 
			if (peces[i].objetivo.centroRadio > (lienzoFinal.width/2)) {
				peces[i].objetivo.centroRadio = (lienzoFinal.width/2) - 50
			}
		}
		
	}
}

// Cambia de sentido cada tiempo marcado por cambioSentido en milisegundos
function cambiaSentido(){
	tiempoSentido -= frameTime;
	if (tiempoSentido < 0) {
		
		tiempoSentido = cambioSentido * Math.random();
		console.log("Cambio de sentido en " + (tiempoSentido/1000) + " s");		
		for (i = 0; i < nPeces ; i++) {			
			peces[i].objetivo.velocidadAngular = -peces[i].objetivo.velocidadAngular;			
		}
	}
}

// Mueve el centro en coordenadas absolutas
function mueveCentro(x,y){
	for (i = 0; i < nPeces ; i++) {			
		peces[i].objetivo.centro.posX = x;
		peces[i].objetivo.centro.posY = y;
	}
}
// Deplaza el centro en coordenadas relativas
function desplazaCentro(x,y){
	for (i = 0; i < nPeces ; i++) {			
		peces[i].objetivo.centro.posX += x;
		peces[i].objetivo.centro.posY += y;
	}
}


// Cambia de centro cada tiempo marcado por cambioCentro en milisegundos
function cambiaCentro(){
	// Variables locales
	var deltaX;
	var deltaY;

	tiempoCentro -= frameTime;
	if (tiempoCentro < 0) {
		tiempoCentro = cambioCentro + (cambioCentro * (Math.random() -0.5));		
		console.log("Cambio de centro en " + (tiempoCentro/1000) + " s");
		deltaX = (Math.random() - 0.5) * ratioCentro;
		deltaY = (Math.random() - 0.5) * ratioCentro;
		desplazaCentro(deltaX, deltaY);
	}
}
