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
	this.peces = new Array();	

	// Cambio de direccion aleatorio. No funciona si se sigue a un objetivo
	this.cambioDireccion	= 1000;
	this.tiempoDireccion    = this.cambioDireccion;
	this.ratioDireccion		= 0.3;

	// Cambio de posicion (y centro del movimiento circular) aleatoria
	this.cambioPosicion = 1000;
	this.tiempoPosicion = this.cambioPosicion;	
	this.ratioPosicion  = 50;
	
	// Cambio de radio aleatorio
	this.cambioRadio	= 5300;
	this.tiempoRadio    = this.cambioRadio;	
	this.ratioRadio		= 20;
	
	// Cambio de sentido aleatorio
	this.cambioSentido		= 9200;
	this.tiempoSentido    	= this.cambioSentido;

	// Cambio de posicion de los objetivos de los peces en mivimiento lineal
	this.cambioObjetivos	= 8700;
	this.tiempoObjetivos	= this.cambioObjetivos;	
	this.ratioObjetivos		= 20;	

	
	/**
	 * METODOS
	 */

	/**
	 * @method constructor
	 */
	this.constructor = function() {
		// Heredadas				
		this.posX		= Math.random() * lienzoFinal.width;
		this.posY		= Math.random() * lienzoFinal.height;
		this.rotZ		= Math.random() * 2 * Math.PI;
		this.velocidad	= 1.55;		
		
	}

	
	/**
	 * METODOS de movimiento lineal
	 */

	/* Mover objetivo linealmente */
	this.moverLinealmente = function(){
		var deltaX;
		var deltaY;		
		
		// Calcula la posición y actualizo posición x del objetivo
		this.rotZ += (Math.random() - 0.5) * 0.1;
		deltaX = Math.cos(this.rotZ) * this.velocidad;
		deltaY = Math.sin(this.rotZ) * this.velocidad;
		this.posX += deltaX;
		this.posY += deltaY;
		for (var i= 0 ; i < nPeces ; i++) {
			this.peces[i].objetivo.posX += deltaX;
			this.peces[i].objetivo.posY += deltaY;	
		}		
	}
	
	
	/**
	 * @method colisionParedes Comprobar que no se va del mapa el objetivo
	 */
	
	this.colisionBordes = function(){
		if(this.posX > lienzoFinal.width)	{this.posX = lienzoFinal.width	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posX < 0)                	{this.posX = 0                	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posY > lienzoFinal.height)	{this.posY = lienzoFinal.height	; this.rotZ = - (this.rotZ);}
		if(this.posY < 0)					{this.posY = 0    				; this.rotZ = - (this.rotZ);}
	}



	this.dibuja = function(aColor){
		dibujaRectangulo(this.posX, this.posY, 5, 5 ,aColor,"F");
	}
	
	/**
	 * METODOS para modificar el comportamiento de todos los peces del banco a la vez. Equivalentes 
	 * a los métodos de la clase Pez
	 */
	
	/**
	 * METODOS para el cambio de movimiento circular
	 */

	// Cambia de radio cada tiempo indicado para todos los peces del banco
	this.cambiaRadio = function(){				
		this.tiempoRadio -= frameTime;
		if (this.tiempoRadio < 0) {
			this.tiempoRadio = this.cambioRadio + ((Math.random() - 0.5) * this.cambioRadio);
			// Varia ligeramente el radio de forma aleatoria para todos los peces del banco
			//console.log("Cambio radio " + (this.tiempoRadio/1000).toFixed(2) + " s");
			for (var i= 0 ; i < nPeces ; i++) {
				this.peces[i].objetivo.centroRadio += this.ratioRadio * (Math.random() - 0.5);
			}			
			if (Math.abs(this.centroRadio) < 15){this.centroRadio = 15};

		}
	}

	
	// Cambia de sentido cada tiempo marcado por this.cambioSentido en milisegundos
	this.cambiaSentido = function(){				
		this.tiempoSentido -= frameTime;
		if (this.tiempoSentido < 0) {
			this.tiempoSentido = this.cambioSentido + ((Math.random() - 0.5) * this.cambioSentido);
			//console.log("Cambio sentido en " + (this.tiempoObjetivos/1000).toFixed(2) + " s");
			for (var i= 0 ; i < nPeces ; i++) {
				this.peces[i].objetivo.velocidadAngular = -this.peces[i].objetivo.velocidadAngular;
			}			
		}
	}
	
	
	/**
	 * @method cambia la posicion X e Y aleatoriamente del objetivo y el centro del movimiento circular
	 * de los objetivos de los peces
	 */
	this.cambiaPosicion = function(){
		var x;
		var y;		

		this.tiempoPosicion -= frameTime;		
		if ((this.tiempoPosicion < 0)) {			
			this.tiempoPosicion = 2000//this.cambioPosicion + ((Math.random() - 0.5) * this.cambioPosicion);
			x = this.ratioPosicion * (Math.random() - 0.5);
			y = this.ratioPosicion * (Math.random() - 0.5);			
			// Cambia la posicion del objetivo
			this.posX += x;
			this.posY += x;
			//console.log("Cambio posición en " + (this.tiempoObjetivos/1000).toFixed(2) + " s");
			// Cambia el centro de los objetivos de los peces para el movimiento circular
			for (var i= 0 ; i < nPeces ; i++) {
				this.peces[i].objetivo.centro.posX += x;
				this.peces[i].objetivo.centro.posY += y;
			}			
			// Cambia los objetivos de los peces para el movimiento lineal
			for (var i= 0 ; i < nPeces ; i++) {
				this.peces[i].objetivo.posX += x;
				this.peces[i].objetivo.posY += y;
			}

		}
	}	
	
	/**
	 * METODOS para el cambio de movimiento lineal
	 */

	/**
	 * @method cambiarDireccionObjetivo Cambia la direccion (rotZ) de todos los objetivos del banco en la misma dirección
	 * Sólo sirve cuando el pez no tiene sigue a un objetivo, porque al seguri al objetivo se corrige de inmediato
	 * @param {Object} objetivo objetivo del pez
	 */	
	this.cambiaDireccion = function(){
		// Variables locales
		var deltaDir; // Variación de la dirección que se aplicará a todos los elementos

		this.tiempoDireccion -= frameTime;	
		if (this.tiempoDireccion < 0) {
			this.tiempoDireccion = this.cambioDireccion + (this.cambioDireccion * (Math.random() -0.5));
			// Se calcula la variación de la dirección, que será aplicada a todos los elementos
			deltaDir = (Math.random() - 0.5) * this.ratioDireccion;
			//console.log("Cambio direccion en " + (this.tiempoObjetivos/1000).toFixed(2) + " s");
			// Aplicamos el mismo cambio de dirección a todos los elementos
			for (var i = 0; i < nPeces ; i++) {			
				this.peces[i].rotZ += deltaDir; // No funciona
			}
		}	
	}
	
	// Cambia la posición de todos los objetivos de los peces del banco	
	this.cambiaObjetivos = function(){
		
		this.tiempoObjetivos -= frameTime;		
		if ((this.tiempoObjetivos < 0)) {			
			this.tiempoObjetivos = this.cambioObjetivos + ((Math.random() - 0.5) * this.cambioObjetivos);
			// Genera una nube de posiciones de los peces alrededor de la posición del objetivo
			//console.log("Cambio objetivos en " + (this.tiempoObjetivos/1000).toFixed(2) + " s");
			for (var i= 0 ; i < nPeces ; i++) {
				this.peces[i].objetivo.posX = this.posX + (this.ratioObjetivos * Math.cos(2 * Math.PI * Math.random()));
				this.peces[i].objetivo.posY = this.posY + (this.ratioObjetivos * Math.sin(2 * Math.PI * Math.random()));			
			}		
		}
	}	
}

