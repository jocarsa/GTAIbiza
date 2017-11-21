ObjetivoPez.prototype = new Animado(); // Animado hereda de actor
function ObjetivoPez(){
	/**
	 * PROPIEDADES
	 */

	//Heredadas
	this.posX; // Rotación en el eje x
	this.posY; // Rotación en el eje y
	this.rotZ; // Rotación en el eje z
	this.velocidad;	// Velocidad
	// Para el movimiento circular
	this.centroRadio; 			// Distancia al centro del objetivo
	this.velocidadAngular;		// Velocidad angular rad/s
	this.angulo;				// Angulo inicial del giro del objetivo
	this.centro = new Actor();
	this.centro.posX; 			// Coordenada x del centro del objetivo
	this.centro.posY; 			// Coordenada y del centro del objetivo

	/**
	 * METODOS
	 */

	/**
	 * @method constructor
	 */
	this.constructor = function() {
		// Heredadas				
		this.posX		= 0;
		this.posY		= 0;
		this.rotZ		= 0;
		this.velocidad	= 1;
		// Movimiento circular
		this.centroRadio		= 20 + (Math.random() * 80);	// Distancia al centro del objetivo
		this.velocidadAngular	= 60/this.centroRadio;	// Velocidad angular rad/s
		this.angulo		 		= Math.random() * 2 * Math.PI;	// Angulo inicial del giro del objetivo	
		this.centro.posX 		= lienzoFinal.width/2;
		this.centro.posY 		= lienzoFinal.height/2;	

	}

	// Mueve un objetivo circularmente
	this.moverCircularmente = function(){		
		// El objetivo es una posición dando vueltas a una distancia centroRadio del centro. El ángulo se va incrementando con el tiempo				
		this.angulo += (frameTime/1000) * this.velocidadAngular;
		this.posX =  (this.centro.posX) + (Math.cos(this.angulo) * this.centroRadio);
		this.posY =  (this.centro.posY) + (Math.sin(this.angulo) * this.centroRadio);		
		this.velocidad = (this.velocidadAngular * this.centroRadio);
	}	
	
	this.dibuja = function(aColor){
		dibujaRectangulo(this.posX, this.posY, 2, 2 ,aColor,"F");
	}
}

