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
	this.posX		= 0;//this.bordeColision + (Math.random() * tamanyoCanvas);
	this.posY		= 0;//this.bordeColision + (Math.random() * tamanyoCanvas);
	this.rotZ		= 0;//2 * Math.PI * (1/4)* Math.random();//2 * Math.PI * (1/8);//2 * Math.PI * (1/8); 
	this.velocidad	= 1;

	// Clase Pez	
	this.posXOndula = this.posX;	// es la desviación que hay que aplicarle a la posX para conseguir el movimiento ondulatorio
	this.posYOndula = this.posY;	// es la desviación que hay que aplicarle a la posY para conseguir el movimiento ondulatorio
	this.velocidadInicial	= 1;	//
	this.bordeColision		= 10; 
	
	// Cambio de direccion aleatorio
	// !no hace na!
	this.cambioDireccion	= 1000;
	this.tiempoDireccion    = this.cambioDireccion;	
	this.ratioDireccion		= 1;

	// Cambio de radio aleatorio
	this.cambioRadio	= 1000 * Math.random();
	this.tiempoRadio    = this.cambioRadio;	
	this.ratioRadio		= 30;
	
	// Cambio de sentido aleatorio
	this.cambioSentido		= 10000;
	this.tiempoSentido    	= this.cambioSentido;


	// Cambio de centro aleatoriamente
	this.cambioCentro	= 1000 * Math.random();
	this.tiempoCentro   = this.cambioRadio;	
	this.ratioCentro	= 30;
	
	// Parámetros para huir y perseguir
	this.temeridad          = 25;
	this.avistamiento       = 500;

	// Objetivo especial a sequir, que gira dando vueltas a un centro	
	this.objetivo = new Objetivo();									// Instancia objetivo especial
	this.objetivo.posX = 0;											// Coordenada x del objetivo
	this.objetivo.posY = 0;											// Coordenada y del objetivo
	this.objetivo.centroRadio = 20 + (Math.random() * 100);			// Distancia al centro del objetivo
	this.objetivo.velocidadAngular = 45/this.objetivo.centroRadio;	// Velocidad angular rad/s
	this.objetivo.angulo		 = Math.random() * 2 * Math.PI;		// Angulo inicial del giro del objetivo	
	this.objetivo.centro.posX = tamanyoCanvas/2 + 0;
	this.objetivo.centro.posY = tamanyoCanvas/2 + 0;
	
	//  Movimiento ondulatorio 
	this.amplitud = 1.1;							// Ampliud de onda
	this.periodo  = 0.4; 							// Periodo: número de segundos que tarda en repetirse
	this.fase     = 2 * Math.PI * Math.random(); 	// Angulo inicial de la onda. 0 empieza en el centro

	// Cuerpo articulado
	this.nArticulaciones			= 10;	// Número de puntos que se guardan en un array para dibujar el movimiento ondulatorio
	this.nArticulacionesVisibles	= 10;	// Numero de puntos a dibujar en el movimiento aleatorio debe ser menro o igual que nArticulaciones
	this.articulaciones	= new Array();		// Array de articulaciones. Cada articulación es una posición, por lo que será un array de actores
	
	this.color;	// Color del pez
	
	// Variables privadas
	this.tiempo = 0;	
	this.dirOndula;	
		
	/************/
	/* Métodos 	*/
	/************/

	this.constructor = function(){
		// Para ser llamado justo despues de crear la instancia y poner valor a sus propiedades
		//this.posX = 1 + this.bordeColision + (Math.random() * (tamanyoCanvas - (2 * this.bordeColision) - 2));
		//this.posY = 1 + this.bordeColision + (Math.random() * (tamanyoCanvas - (2 * this.bordeColision) - 2));
		this.posX = 100 + Math.random() * 100;
		this.posY = 100 + Math.random() * 100;
		this.rotZ = 2 * Math.PI * (1/4)* Math.random();
		this.velocidad	= this.velocidadInicial;
		this.tiempoDireccion = this.cambioDireccion;
		this.posXOndula = this.posX;
		this.posYOndula = this.posY;	


		for (var i = 0; i< this.nArticulaciones ; i++){
			this.articulaciones[i] = new Articulacion();
			this.articulaciones[i].posX = this.posX;
			this.articulaciones[i].posY = this.posY;
		}
		
	}
	/************************************************/
	/* Métodos para el dibujado						*/
	/************************************************/
	// Dibuja pez
	this.dibujaPez6Articulaciones = function(){
		// Dibuja la cabeza		
		dibujaRectangulo(this.articulaciones[0].posX,
					this.articulaciones[0].posY,
					1,1,"cyan","F");
		dibujaRectangulo(this.articulaciones[1].posX,
					this.articulaciones[1].posY,
					1.3,1.3,"cyan","F");
		dibujaRectangulo(this.articulaciones[2].posX,
					this.articulaciones[2].posY,
					1.5,1,5,"red","F");
		dibujaRectangulo(this.articulaciones[3].posX,
					this.articulaciones[3].posY,
					1.2,1.2,"red","F");
		dibujaRectangulo(this.articulaciones[4].posX,
					this.articulaciones[4].posY,
					0.8,0.8,"red","F");
		dibujaRectangulo(this.articulaciones[5].posX,
					this.articulaciones[5].posY,
					1,1,"white","F");
	}

	// Dibuja un pez con 10 articulaciones
	this.dibujaPez10Articulaciones = function(){
	
		// Dibuja la cabeza		
		dibujaRectangulo(this.articulaciones[0].posX,
					this.articulaciones[0].posY,
					0.5,0.5,this.color,"F");
		dibujaRectangulo(this.articulaciones[1].posX,
					this.articulaciones[1].posY,
					1,1,this.color,"F");
		dibujaRectangulo(this.articulaciones[2].posX,
					this.articulaciones[2].posY,
					1.5,1.5,this.color,"F");
		dibujaRectangulo(this.articulaciones[3].posX,
					this.articulaciones[3].posY,
					1.6,1.6,this.color,"F");
		dibujaRectangulo(this.articulaciones[4].posX,
					this.articulaciones[4].posY,
					1.5,1.5,this.color,"F");
		dibujaRectangulo(this.articulaciones[5].posX,
					this.articulaciones[5].posY,
					1.3,1.3,this.color,"F");
		dibujaRectangulo(this.articulaciones[6].posX,
					this.articulaciones[6].posY,
					1.2,1.2,this.color,"F");
		dibujaRectangulo(this.articulaciones[7].posX,
					this.articulaciones[7].posY,
					1.1,1.1,this.color,"F");
		dibujaRectangulo(this.articulaciones[8].posX,
					this.articulaciones[8].posY,
					1,1,this.color,"F");
		dibujaRectangulo(this.articulaciones[9].posX,
					this.articulaciones[9].posY,
					1.3,1.3,this.color,"F");
	}
	
	// Dibuja la cabeza
	this.dibujaCabeza = function(){		
	
		dibujaRectangulo(this.posXOndula, this.posYOndula, 2, 2, this.color, "F");		
	}
	
	// Dibuja el cuerpo en movimiento ondulatorio (líneas)
	this.dibujaCuerpo = function(){
		// Variables locales
		var ultimoIndice	= 0; 	// Se guarda el último indice para dibujar una línea entre el y el nuevo
		var hueco			= 0;	// Para saltar el pintado de las articulaciones si no todas están visibles
		//
		for (var i=0; i < this.nArticulaciones - 1; i++) {
			if (hueco <= 0){
				contexto.strokeStyle = this.color;
				dibujaLinea(this.articulaciones[i].posX,
							this.articulaciones[i].posY,
							this.articulaciones[ultimoIndice].posX,
							this.articulaciones[ultimoIndice].posY,
							"blue");
				ultimoIndice = i;
				hueco = this.nArticulaciones/this.nArticulacionesVisibles;
			}
			hueco--;			
		}
	}
	
	// Dibuja las articulaciones en movimiento ondulatorio
	this.dibujaArticulaciones = function(){		
		// Variables locales
		var ultimoIndice	= 0;
		var hueco			= 0;		
		
		for (var i=0; i < this.nArticulaciones - 1; i++) {
			if (hueco <= 0){
				dibujaRectangulo(this.articulaciones[i].posX, this.articulaciones[i].posY, 1, 1, this.color, "F");
				ultimoIndice = i;
				hueco = this.nArticulaciones/this.nArticulacionesVisibles;
			}
			hueco--;			
		}
	}


	// Dibuja la posición de la posición del actor
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
		
	// Dibuja el objetivo que sigue el pez
	this.dibujaObjetivo = function(aColor){
		this.objetivo.dibuja(aColor);		
	}

	/********************************/
	/* Métodos de movimiento		*/
	/********************************/
	
	// Rebota en los límites del canvas con un borde
	this.colisionparedes = function(){
		if(this.posX > tamanyoCanvas - this.bordeColision)	{this.posX = tamanyoCanvas - this.bordeColision	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posX < this.bordeColision)                	{this.posX = this.bordeColision                	; this.rotZ = - (this.rotZ + Math.PI);}
		if(this.posY > tamanyoCanvas - this.bordeColision)	{this.posY = tamanyoCanvas - this.bordeColision	; this.rotZ = - (this.rotZ);}
		if(this.posY < this.bordeColision)					{this.posY = this.bordeColision    				; this.rotZ = - (this.rotZ);}
	}

	// Cambia la dirección y aumenta la velocidad cuando está cerca de la posición parametrizada
	this.huye = function(x, y){
		
		var catX = x - this.posX;
		var catY = y - this.posY;
		var distancia = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
		
		//Si la distancia es menor que el límite, cambia de dirección y aumenta la velocidad: huye
		if (distancia < this.temeridad) {
			this.rotZ = Math.asin(catY/distancia);								
			if (catX < 0) {
				this.rotZ = -this.rotZ;
			} else {
				this.rotZ += Math.PI
			}
			this.velocidad += 0.1;
			this.huyendo = true;
		} else{
			this.huyendo = false;
		}
	}

	// Hace que el objetivo especial se desplace orbitando alrededor de un centro definido
	this.mueveObjetivo = function(){
		// Mueve el objetivo circularmente
		this.objetivo.mover();				
	}
	
	// Persigue al objetivo especial
	this.persigueObjetivo = function(){		
		this.persigue(this.objetivo.posX, this.objetivo.posY);			
	}

	// Persigue un punto parametrizado
	this.persigue = function(x,y){
		var catX = x - this.posX;
		var catY = y - this.posY;
		var distancia = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
		
		// Si está cerca del punto reduce la velocidad
		if (distancia < 10) {
			this.velocidad -= 0.1;
		} else {
			this.velocidad = this.velocidadInicial;
		}
	
		this.rotZ = anguloEntrePuntos(this.posX,this.posY,x,y);
	}
	
	// Movimiento general actualizando posX posY en función de la velocidad y rotZ
	// Además reduce la velocidad poco a poco si es superada por alguna causa
	this.mover = function(){

		// Reajusta la velocidad poco a poco si se ha incrementado por encima de la velocidad inicial por alguna razón
		if (this.velocidad > this.velocidadInicial){
			this.velocidad -= 0.02;
		}
		
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
		this.tiempo += (frameTime/1000);		
		desfase = this.amplitud *  Math.sin(((2 * Math.PI/this.periodo) * this.tiempo) + this.fase);
		// Se rota el desfase en la dirección perpendicular al movimiento principal
		desfaseX = Math.cos(this.rotZ + (Math.PI/2)) * desfase;
		desfaseY = Math.sin(this.rotZ + (Math.PI/2)) * desfase;
		// Se actualiza la posición con el movimiento ondulatorio sumado
		this.posXOndula = this.posX + desfaseX;	
		this.posYOndula = this.posY + desfaseY;	
		
		// Se elimina la última posición
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
			this.tiempoDireccion = this.cambioDireccion;
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
			if (Math.abs(this.objetivo.centroRadio) < (this.ratioRadio/2)){this.objetivo.centroRadio = (this.ratioRadio/2)};
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
	
	// Cambia el centro del movimiento orbital del objetivo especial. 
	// El periodo de tiempo  está marcado por this.cambioCentro en milisegundos
	this.cambiaCentro = function(){				
		this.tiempoCentro -= frameTime;
		if (this.tiempoCentro < 0) {
			this.tiempoCentro = this.cambioCentro * Math.random();			
			this.objetivo.centro.posX += this.ratioCentro * (Math.random() - 0.5);;
			this.objetivo.centro.posY += this.ratioCentro * (Math.random() - 0.5);;
		}
	}

	
}













