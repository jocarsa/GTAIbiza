Motorizado.prototype = new Terrestre(); // Vehiculo hereda de actor
function Motorizado() {
	//Variables
	var velocidadMaximaAux;
	var aceleracionAux;
	
	// Propiedades
	this.combustible;				// Combustible en el depósito
	this.combustibleCapacidad;		// Capacidad del depósito de combustible
	this.consumoMax;				// Consumo acelerando
	this.consumoMin;				// Consumo al ralentí
	this.consumoNitro;				// Consumo cuando está activado el nitro
	this.motorEncendido	= false;	// Motor encendido
	this.acelerando		= false;	// El acelerador está activado
	this.frenando		= false;	// El freno está activado
	this.izquierda		= false;	// Si la dirección está girando hacia la izquierda
	this.derecha		= false;	// Si la dirección está girando hacia la derecha
	this.velocidadNitro;			// Velocidad máxima cuando está activado el nitro
	this.aceleracionNitro;			// Aceleración cuando está activado el nitro

	// Métodos
	this.consumir = function(aconsumo) {
		if (this.combustible > 0) {
			this.combustible -= aconsumo;
		} else {
			this.combustible = 0;
		}
	};
	
	// Se pisa el acelerador del vehículo
	this.acelerar = function() {
		if (this.velocidad >= 0) {
			if (this.combustible > 0) {	// Si queda combustible
				// El vehículo sigue acelerando hasta su máxima velocidad
				if (this.velocidad < this.velocidadMax) {
					this.velocidad += this.aceleracion;
				} 
				// Se actualiza el consumo de combustible
				if (this.nitro) {
					this.consumir(this.consumoNitro);
				} else {
					this.consumir(this.consumoMax);
				}				
			} else {
				this.frenarRozamiento();
			}
		} else {
			// El vehículo va marcha atrás por lo que al pulsar el acelerador es como si frenara 
			this.velocidad += this.frenada;
			// Se actualiza el consumo de combustible
			this.consumir(this.consumoMin);
		}
	};
	
	// Se pisa el freno del vehículo
	this.frenar = function() {
		if (this.velocidad > 0) {
			// El vehículo frena hasta 0
			this.velocidad -= this.frenada;
			this.consumir(this.consumoMin);
		} else {
			if (this.combustible > 0) {	// Si queda combustible
				if (Math.abs(this.velocidad) < this.velocidadMaxAtras) {
					// El vehículo va marcha atrás por lo que al pulsar el freno es como si acelerara
					this.velocidad -= this.aceleracionAtras;
				}
				this.consumir(this.consumoMax);
			} else {
				this.frenarRozamiento();
			}
		}	
	};
	
	// El vehículo va en inercia y frena por el rozamiento
	this.frenarRozamiento = function(){
		// El vehículo frena por rozamiento
		if (this.velocidad > 0) {
			this.velocidad -=  this.rozamiento;
		} else if (this.velocidad < 0) {
			this.velocidad +=  this.rozamiento;
		}
		// Ajuste de velocidad a cero cuando es despreciable. Si no se queda con una pequeña inercia
		if (Math.abs(this.velocidad) < this.rozamiento) {
			this.velocidad = 0;
			if(this.combustible == 0) {
				gameOver = true;
			}
		}
		// Se actualiza el consumo de combustible
		this.consumir(this.consumoMin);
	};
	
	// Se gira la dirección del vehículo (debería ir en la clase Animado?)
	this.girar = function(){
		// El giro depende de la velocidad actual y de la velocidad máxima
		// Hacia delante	
		if (this.velocidad > 0) {
			if (this.velocidad > this.velocidadMax) {
				giro = this.ratioGiro;
			} else {				
				giro =  (this.velocidad/this.velocidadMax); // Velocidad normalizada 0 a 1
				giro = (2 - giro) / 2.5;						// Relación lineal inversamente proporcional
				giro = giro * this.ratioGiro;				// Aplicamos el ratio de giro
			}
			
		}
		// Hacia atrás
		if (this.velocidad < 0) {
			if (this.velocidad < this.velocidadMaxAtras) {
				giro = -this.ratioGiro;
			} else {
				giro =  Math.abs(this.velocidad/this.velocidadMaxAtras); // Velocidad normalizada 0 a 1
				giro = (2 - giro) / 2.5;									 // Relación lineal inversamente proporcional
				giro = giro * this.ratioGiro;							 // Aplicamos el ratio de giro
			}
		}
		
		// Se hace el giro sólo si está en movimiento
		if (this.izquierda && !this.derecha && this.velocidad != 0) {						
			//this.rotZ -= this.ratioGiro;
			this.rotZ -= giro;
		}
		if (!this.izquierda && this.derecha && this.velocidad != 0) {
			//this.rotZ += this.ratioGiro;
			this.rotZ += giro;
		}
	};
	
	this.activarNitro = function(activar){		
		// Se guarda la velocidad y aceleración maxima original al inicio, cuando es nula. Debería hacerse en el constructor
		if (velocidadMaximaAux == null) {velocidadMaximaAux = this.velocidadMax;}
		if (aceleracionAux == null) {aceleracionAux = this.aceleracion;}
		
		if (activar){
			this.velocidadMax = this.velocidadNitro;
			this.aceleracion = this.aceleracionNitro;
		} else {
			this.velocidadMax = velocidadMaximaAux;
			this.aceleracion = aceleracionAux;
		} 
	}

	// Si cambia la velocidad máxima del coche por entrar en un terreno con más rozamiento, por daños, etc.
	// se actualiza la velocidad actual si está por encima de la máxima.
	this.actualizaVelocidadMax = function(){
		if (this.velocidad > this.velocidadMax) {
			this.velocidad -= this.frenada;
		}
	}
}