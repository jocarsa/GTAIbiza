Objetivo.prototype = new Animado(); // Animado hereda de actor
function Objetivo(){
	/**
	 * PROPIEDADES
	 */

	//Heredadas
	this.posX; // Rotación en el eje x
	this.posY; // Rotación en el eje y
	this.rotZ; // Rotación en el eje z
	this.velocidad;	// Velocidad
	// Propias
	this.centroRadio; // Distancia al centro del objetivo
	this.velocidadAngular; // Velocidad angular rad/s
	this.angulo; // Angulo inicial del giro del objetivo
	this.centro = new Actor();
	this.centro.posX; // Coordenada x del centro del objetivo
	this.centro.posY; // Coordenada y del centro del objetivo

	/**
	 * METODOS
	 */

	/**
	 * @method constructorCircular Contrustor Objetivo Circular
	 */
	this.constructorCircular = function() {
		//Heredadas
		this.posX = 0;
		this.posY = 0;
		//Propias
		this.centroRadio = 20 + (Math.random() * 100);			// Distancia al centro del objetivo
		this.velocidadAngular = 65/this.objetivo.centroRadio;	// Velocidad angular rad/s
		this.angulo		 = Math.random() * 2 * Math.PI;		// Angulo inicial del giro del objetivo	
		this.centro.posX = lienzoFinal.width/2;
		this.centro.posY = lienzoFinal.height/2;
	}

	// Mueve un objetivo circularmente
	this.mover = function(){		
		// El objetivo es una posición dando vueltas a una distancia centroRadio del centro. El ángulo se va incrementando con el tiempo
		this.angulo += (frameTime/1000) * this.velocidadAngular;
		this.posX =  (this.centro.posX) + (Math.cos(this.angulo) * this.centroRadio);
		this.posY =  (this.centro.posY) + (Math.sin(this.angulo) * this.centroRadio);		
		this.velocidad = (this.velocidadAngular * this.centroRadio);
	}	

	/**
	 * @method constructorAleatoriamente Constructor Objetivo Aleatorio
	 */
	this.constructorAleatorio = function() {
		// Heredadas
		this.posX	= Math.random() * lienzoFinal.width;
		this.posY	= Math.random() * lienzoFinal.height;
		this.rotZ	= 0;
		this.velocidad = 1;
	}

	/**
	 * @method moverAletoriamente Cambia la posicion X e Y aleatoriamente de un Objetivo
	 */
	this.moverAleatoriamente = function() {
		this.posX += Math.cos(this.rotZ) * this.velocidad;
		this.posY += Math.sin(this.rotZ) * this.velocidad;
	}

	/**
	 * @method cambiarDireccionObjetivo Cambia la direccion (rotZ) del objetivo del pez seleccionado
	 * @param {Object} objetivo objetivo del pez
	 */
	this.cambiarDireccionObjetivo = function() {
		var deltaDir;
		tiempoDireccion -= frameTime;

		if (tiempoDireccion < 0) {
			tiempoDireccion = cambioDireccion + (cambioDireccion * (Math.random() -0.5));
			deltaDir = (Math.random() - 0.5) * 0.5;
			this.rotZ += Math.PI * 2 * deltaDir;
		}
	}

	/**
	 * @method colisionParedes Comprobar que no se va del mapa el objetivo
	 */
	this.colisionBordes = function() {
		if (this.posX > lienzoFinal.width) { // Derecha
			this.posX = lienzoFinal.width - 100; 
			this.rotZ += Math.PI
		} else if (this.posX < lienzoFinal.width) { // Izquierda
			this.posX = lienzoFinal.width + 100; 
			this.rotZ += Math.PI;
		}
		if (this.posY > lienzoFinal.height) { // Abajo
			this.posY = lienzoFinal.height - 100;
			this.rotZ += Math.PI;
		} else if(this.posY < lienzoFinal.height) { // Arriba
			this.posY = lienzoFinal.height + 100;
			this.rotZ += Math.PI;
		}
	}
	
	this.dibuja = function(aColor){
		dibujaRectangulo(this.posX, this.posY, 5, 5 ,aColor,"F");
	}
}

