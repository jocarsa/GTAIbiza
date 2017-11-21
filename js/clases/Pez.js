/****************************************************************************************************************************************/
/* La clase Pez es un objeto animado que se mueve como un pez en grupo.																	*/
/*																																		*/
/* La dirección principal del movimiento viene marcada por las propiedades heredadas de Animado que a su vez herada de Actor:			*/
/* posX, posY, rotZ y velocidad
/*																																		*/
/* El movimiento ondulatorio se consigue calculando una desviación sobre el vector velocidad  principal (posX, posY, rotZ y velocidad)	*/
/* utilizando una función de onda en el tiempo: movimiento armónico simple. Esta desviación se suma al eje y perpendicular a la 		*/
/* dirección de desplazamiento. 																										*/
/*																																		*/
/* Contiene métodos para seguir a una posición. Contiene una posición especial a seguir como objetivo, que es un punto en el espacio	*/
/* que se desplaza orbitando alrededor de una centro. Si se define el mismo centro para todos los elementos se consigue un efecto de 	*/
/* órbita.																																*/
/*																																		*/
/* Tiene métodos para cambiar la dirección de movimiento , el radio del giro cuando sigue al objetivo especial 
/****************************************************************************************************************************************/
Pez.prototype = new Animado(); // Pez hereda de animado
function Pez(){
	/***************/
	/* Propiedades */
	/***************/
	
	// Heredadas
	this.posX		= 0;
	this.posY		= 0;
	this.rotZ		= 0;
	this.velocidad	= 0;

	// Clase Pez		
	this.posXOndula = this.posX;	// es la desviación que hay que aplicarle a la posX para conseguir el movimiento ondulatorio
	this.posYOndula = this.posY;	// es la desviación que hay que aplicarle a la posY para conseguir el movimiento ondulatorio
	this.velocidadInicial	= 1.5;	// 
	
	// Cambio de direccion aleatorio
	this.cambioDireccion	= 2000 + ((Math.random() - 0.5) * 2000);
	this.tiempoDireccion    = this.cambioDireccion;
	this.ratioDireccion		= 1;

	// Cambio de radio aleatorio
	this.cambioRadio	= 2000 + (2000 * Math.random());
	this.tiempoRadio    = this.cambioRadio;	
	this.ratioRadio		= 30;
	
	// Cambio de sentido aleatorio
	this.cambioSentido		= 10000;
	this.tiempoSentido    	= this.cambioSentido;

	// Cambio de centro aleatoriamente
	this.cambioCentro	= 1000 * Math.random();
	this.tiempoCentro   = this.cambioRadio;	
	this.ratioCentro	= 0;
	
	// Cambio de posicion aleatoria del objetivo del pez
	this.cambioPosicionObjetivo = 1500;
	this.tiempoPosicionObjetivo = this.cambioPosicionObjetivo;	
	this.ratioPosicionObjetivo  = 15;

	
	// Parámetros para huir y perseguir
	this.detectaAmenaza     = 200;
	this.avistamiento       = 500;

	// Objetivo del pez
	this.objetivo = new ObjetivoPez();								// Instancia objetivo 
	this.objetivo.posX = 0;											// Coordenada x del objetivo
	this.objetivo.posY = 0;											// Coordenada y del objetivo

	//  Movimiento ondulatorio 
	this.amplitud       = 1;									// Ampliud de onda
	this.periodo        = 1;									// Periodo de la onda
	this.periodo 		= this.periodo/this.velocidadInicial;	// El periodo depende de la velocidad, para acelerar el movimiento ondulatorio
	this.fase    		=  2 * Math.PI * Math.random(); 		// Angulo inicial de la onda. 0 empieza en el centro

	// Cuerpo articulado
	this.nArticulaciones			= 10;	// Número de puntos que se guardan en un array para dibujar el movimiento ondulatorio
	this.nArticulacionesVisibles	= 10;	// Numero de puntos a dibujar en el movimiento aleatorio debe ser menro o igual que nArticulaciones
	this.articulaciones	= new Array();		// Array de articulaciones. Cada articulación es una posición, por lo que será un array de actores
	this.dimensionesPez = new Array();		// Se pueden definir 6 tramos del pez con % y anchura. Es una matriz multidimensional
	
	this.color;	// Color del pez
	
	// Variables privadas
	this.tiempo = 0;	
	this.dirOndula;	
	
	this.timeOutUir= 2000;
	this.huyendo = false;
		
	/************/
	/* Métodos 	*/
	/************/

	this.constructor = function(){
		// Para ser llamado justo despues de crear la instancia y poner valor a sus propiedades
		this.posX = lienzoFinal.width * Math.random();
		this.posY = lienzoFinal.height * Math.random();
		this.rotZ = 2 * Math.PI * Math.random();		
		this.velocidad	= this.velocidadInicial;
		this.tiempoDireccion = this.cambioDireccion;
		this.posXOndula = this.posX;
		this.posYOndula = this.posY;	
		this.objetivo.constructor();

		// Crea las articulaciones
		for (var i = 0; i< this.nArticulaciones ; i++){
			this.articulaciones[i] = new Articulacion();
			this.articulaciones[i].posX = this.posX;
			this.articulaciones[i].posY = this.posY;
		}
		
		// Se divide el pez en 6 partes, es una matriz multidimensional que tiene el % de longitud del pez a pintar y la anchura
		// Los % deben sumar 1
		this.dimensionesPez[0] = new Array();
		// Morro
		this.dimensionesPez[0][0] = 0.05;	// % del primer tramo del pez
		this.dimensionesPez[0][1] =   0.7;	// Anchura del primer tramo del pez
		// Cabeza
		this.dimensionesPez[1] = new Array();
		this.dimensionesPez[1][0] = 0.1; 	// % del segundo tramo del pez
		this.dimensionesPez[1][1] =   1.6;	// Anchura del segundo tramo del pez
		// Cuerpo alto
		this.dimensionesPez[2] = new Array();
		this.dimensionesPez[2][0] = 0.2; 	// % del tercer tramo del pez
		this.dimensionesPez[2][1] =   2.0;	// Anchura del tercer tramo del pez
		// Cuerpo bajo
		this.dimensionesPez[3] = new Array();
		this.dimensionesPez[3][0] = 0.3;	// % del cuarto tramo del pez
		this.dimensionesPez[3][1] =   1.4;	// Anchura del cuerto tramo del pez
		// Cola alta
		this.dimensionesPez[4] = new Array();
		this.dimensionesPez[4][0] = 0.3;	// % del quinto tramo del pez
		this.dimensionesPez[4][1] =   1.0;	// Anchura del quinto tramo del pez
		// Cola baja
		this.dimensionesPez[5] = new Array();
		this.dimensionesPez[5][0] = 0.05;	// % del quinto tramo del pez
		this.dimensionesPez[5][1] =   0.5;	// Anchura del quinto tramo del pez
		
	}
	/************************************************/
	/* Métodos para el dibujado						*/
	/************************************************/

	// Dibuja pez. Se divide el pez en 6 partes con longitudes definidas:
	// Definiremos la anchura de cada parte del cuerpo en pixels
	this.dibujaPez = function(){
		// Variables locales
		var i;
		var condicionSalida;		
		var ratioVelocidad;
		
		// La condición de salida es haber alcanzado el % de articulaciones según el tramo
		// Cuando la velocidad es menor que la inicial se dibujan todos los puntos. En caso contrario se dibujan menos	para evitar que se estire
		// Los bucles comienzan donde se quedó el anterior		
		ratioVelocidad = (this.velocidadInicial/this.velocidad);			
		// Dibuja el morro 
		condicionSalida = (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[0][0]; 
		for (i=0; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[0][1], this.dimensionesPez[0][1], this.color, "F");
		}
		
		// Dibuja la cabeza
		condicionSalida += (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[1][0];
		for (i = i - 1; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[1][1], this.dimensionesPez[1][1], this.color, "F");
		}

		// Dibuja el cuerpo alto 
		condicionSalida += (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[2][0];
		for (i = i - 1; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[2][1], this.dimensionesPez[2][1], this.color, "F");
		}

		// Dibuja el cuerpo bajo 
		condicionSalida += (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[3][0];
		for (i = i - 1; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[3][1], this.dimensionesPez[3][1], this.color, "F");
		}

		// Dibuja la cola alta
		condicionSalida += (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[4][0];
		for (i = i - 1; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[4][1], this.dimensionesPez[4][1], this.color, "F");
		}

		// Dibuja la cola baja
		condicionSalida += (this.nArticulaciones * ratioVelocidad) * this.dimensionesPez[5][0];
		for (i = i - 1; ((i < condicionSalida)&&(i < this.nArticulaciones)); i++) {
			dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, this.dimensionesPez[5][1], this.dimensionesPez[5][1], this.color, "F");
		}

	}
	
	// Dibuja la posición del actor
	this.dibujaPosicion = function(aColor){
		dibujaRectangulo(this.posX, this.posY, 4, 4, aColor, "F");
	}

	// Dibuja el el vector velocidad
	this.dibujaVelocidad = function(aColor){
		
		dibujaLinea(this.posX,
					this.posY,
					this.posX + (Math.cos(this.rotZ) * this.velocidad * 20),
					this.posY + (Math.sin(this.rotZ) * this.velocidad * 20),
					aColor);
	}
		
	/********************************/
	/* Métodos de movimiento		*/
	/********************************/
	
	// Rebota en los límites del canvas con un borde
	this.colisionBordes = function(){
		if(this.posX > lienzoFinal.width)	{this.posX = lienzoFinal.width	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posX < 0)                	{this.posX = 0                	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posY > lienzoFinal.height)	{this.posY = lienzoFinal.height	; this.rotZ = - (this.rotZ);}
		if(this.posY < 0)					{this.posY = 0    				; this.rotZ = - (this.rotZ);}
	}

	// Huye del punto x, y. Cambia la dirección y aumenta la velocidad cuando está cerca de la posición parametrizada
	this.huye = function(x, y){
		
		var catX = x - this.posX;
		var catY = y - this.posY;
		var distancia = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));		
		
		if (distancia < this.detectaAmenaza) {
			if (catX < 0) {
				this.rotZ = -this.rotZ;
			} else {
				this.rotZ += Math.PI
			}
			this.velocidad += 0.02;
			this.huyendo = true;
			this.timeOutUir = 2000;
		} 
		
	}
	
	// Persigue al objetivo
	this.persigueObjetivo = function(){
		if (!this.huyendo){
			this.persiguePosicion(this.objetivo.posX, this.objetivo.posY);
		} else{
			this.timeOutUir -= frameTime;
			if ( this.timeOutUir < 0){
				this.huyendo = false;
			}			
		}
	}

	// Persigue un punto parametrizado
	this.persiguePosicion = function(x,y){
		
		var catX = x - this.posX;
		var catY = y - this.posY;
		var distancia = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
		
		// Si está cerca del punto reduce la velocidad un 10%
		if (distancia < 20) {
			this.velocidad -= this.velocidad * 0.1;
		}
	
		this.rotZ = anguloEntrePuntos(this.posX,this.posY,x,y);
	}
	
	// Reajusta la velocidad poco a poco si se ha variado con respecto a la velocidad inicial
	// por alguna razón. El pez siempre tiende a nadar a su velocidad inicial
	this.controlVelocidad = function(){	
		if (this.velocidad > this.velocidadInicial){
			this.velocidad -= 0.01;
		} else if (this.velocidad < this.velocidadInicial){
			//this.velocidad += 0.1;
			this.velocidad = this.velocidadInicial
		}
	}
	
	// Movimiento general actualizando posX posY en función de la velocidad y rotZ
	this.mover = function(){
		
		// Calcula la posición 
		this.posX += Math.cos(this.rotZ) * this.velocidad;	// Actualizo posición x del pez
		this.posY += Math.sin(this.rotZ) * this.velocidad;	// Actualizo posición y del pez			

	}
	
	// Hace el movimiento ondulatorio y maneja el vector de articulaciones. Cuando calcula la siguiente posición (aritculación),
	// la guarda en un array que contiene las posiciones de las articulaciones. Estas forman una onda que da el aspecto de 
	// movimiento ondulatorio.
	// El array actua de buffer para no tener que recalcular cada vez que se dibujan las articulaciones.
	this.ondula = function(){		
		// Variables locales
		var desfase;
		var desfaseX;
		var desfaseY;

		// Se calcula un desfase utilizando la función de onda del movimiento armónico simple. Esta función nos da un valor
		// entre -1 y 1, en función del tiempo. Ese valor es el desfase que hay que sumar a la posición del pez, De esta forma 
		// el pez tiene una dirección principal que sigue y se guarda en las propiedades de animado: posX, posY, rotZ y velocidad;
		// y por otra parte se guarda la posición corregida con el desfase en el array de posiciones de movimiento ondulatorio.
		// En el array tenemos n puntos
		// Se ajusta el tiempo para disminuir el periodo de manera que al aumentar la velocidad ondule más rápido
		this.tiempo += (frameTime/1000)* ((this.velocidad/this.velocidadInicial));
		
		// Se calcula el desfase de la ondulación
		desfase = this.amplitud *  Math.sin(((2 * Math.PI/this.periodo) * this.tiempo) + this.fase);
		// Se rota el desfase en la dirección perpendicular al movimiento principal
		desfaseX = Math.cos(this.rotZ + (Math.PI/2)) * desfase;
		desfaseY = Math.sin(this.rotZ + (Math.PI/2)) * desfase;
		// Se actualiza la posición con el movimiento ondulatorio sumado
		this.posXOndula = this.posX + desfaseX;	
		this.posYOndula = this.posY + desfaseY;	
		
		this.articulaciones.pop();
		// Se crea una nueva posición con las nuevas coordenadas calculadas
		this.articulaciones.unshift(new Articulacion);
		this.articulaciones[0].posX = this.posXOndula;
		this.articulaciones[0].posY = this.posYOndula;		
	}	

	/********************************************************************************************************************/
	/* Métodos que modifican los parámetros de movimiento del pez para lograr un comportamiento más caótico y natural	*/
	/********************************************************************************************************************/
	// Cambia de dirección cada tiempo marcado por this.cambioDireccion en milisegundos
	this.cambiaDireccion = function(){				
		this.tiempoDireccion -= frameTime;
		if (this.tiempoDireccion < 0) {
			this.tiempoDireccion = 2000 + ((Math.random() - 0.5) * 2000);
			this.rotZ += (Math.random() - 0.5) * this.ratioDireccion;
		}		
	}
	
	// Cambia de radio cada tiempo indicado
	this.cambiaRadio = function(){				
		this.tiempoRadio -= frameTime;
		if (this.tiempoRadio < 0) {
			this.tiempoRadio = this.cambioRadio;
			// Varia ligeramente el radio de forma aleatoria
			this.objetivo.centroRadio += this.ratioRadio * (Math.random() - 0.5);
			if (Math.abs(this.objetivo.centroRadio) < 15){this.objetivo.centroRadio = 15};
		}
	}

	// Cambia de sentido cada tiempo marcado por this.cambioSentido en milisegundos
	this.cambiaSentido = function(){				
		this.tiempoSentido -= frameTime;
		if (this.tiempoSentido < 0) {
			this.tiempoSentido = this.cambioSentido * Math.random();
			this.objetivo.velocidadAngular = -this.objetivo.velocidadAngular;			
		}
	}
	
	// Cambia el centro del movimiento orbital del objetivo 
	// El periodo de tiempo  está marcado por this.cambioCentro en milisegundos
	this.cambiaCentro = function(){				
		this.tiempoCentro -= frameTime;
		if (this.tiempoCentro < 0) {
			this.tiempoCentro = this.cambioCentro * Math.random();			
			this.objetivo.centro.posX += this.ratioCentro * (Math.random() - 0.5);;
			this.objetivo.centro.posY += this.ratioCentro * (Math.random() - 0.5);;
		}
	}

	// Modifica aleatoriamente la posicion del objetivo del pez
	this.cambiaPosicionObjetivo = function(){
		
		this.tiempoPosicionObjetivo -= frameTime;
		if (this.tiempoPosicionObjetivo < 0) {
			this.tiempoPosicionObjetivo = this.cambioPosicionObjetivo + ((Math.random() - 0.5) * this.cambioPosicionObjetivo);
			this.objetivo.posX += this.ratioPosicionObjetivo * Math.cos(2 * Math.PI * Math.random());
			this.objetivo.posY += this.ratioPosicionObjetivo * Math.sin(2 * Math.PI * Math.random());		
			
		}
		
	}
	
}
