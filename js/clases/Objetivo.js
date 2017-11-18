Objetivo.prototype = new Animado(); // Animado hereda de actor
function Objetivo(){
	// Propiedades	
	//Heredadas
	this.posX		= 0;	// Rotación en el eje x
	this.posY		= 0;	// Rotación en el eje y
	this.rotZ		= 0;	// Rotación en el eje z
	this.velocidad	= 1;	// Velocidad
	// Propias
	this.centroRadio 		= 100;			// Distancia al centro del objetivo
	this.velocidadAngular	= 2 * Math.PI;	// Velocidad angular rad/s
	this.angulo				= 0;			// Angulo inicial del giro del objetivo
	this.centro = new Actor();
	this.centro.posX = 0;				// Coordenada x del centro del objetivo
	this.centro.posY = 0;				// Coordenada y del centro del objetivo


	// Mueve un objetivo circularmente
	this.mover = function(){		
		// El objetivo es una posición dando vueltas a una distancia centroRadio del centro. El ángulo se va incrementando con el tiempo
		this.angulo += (frameTime/1000) * this.velocidadAngular;
		this.posX =  (this.centro.posX) + (Math.cos(this.angulo) * this.centroRadio);
		this.posY =  (this.centro.posY) + (Math.sin(this.angulo) * this.centroRadio);		
		this.velocidad = (this.velocidadAngular * this.centroRadio);
	}	
	
	this.dibuja = function(aColor){
		dibujaRectangulo(this.posX, this.posY, 5, 5 ,aColor,"F");
	}
}

