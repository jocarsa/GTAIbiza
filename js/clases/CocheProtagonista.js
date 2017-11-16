CocheProtagonista.prototype = new Coche();
function CocheProtagonista() {
	// Variables
	var velocidadMaximaAux;
	var velocidadMaximaAtrasAux;
	var color;

	// Propiedades
	this.barraCombustible;
	
	// Métodos
	// La detección de colisión y cambios de terreno, que afectan al comportamiento del coche, se han programado 
	// mediante codificación de colores del terreno:
	//  * Color gris opaco significa acera			[80, 80, 80, 255]
	//  * Color negro opaco significa carretera		[0, 0, 0, 255]
	//  * Color negro transparente significa muro	[0, 0, 0,  0]
	//  * Color negro transparente significa muro	[135, 135, 135, 255]
	
	// Comprueba cambios de terreno (diferente rozamiento)
	this.compruebaTerreno = function(){
		// Se guarda la velocidad maxima original al inicio, cuando es nula. Debería hacerse en el constructor
		if (velocidadMaximaAux == null) {velocidadMaximaAux = this.velocidadMax;}
		if (velocidadMaximaAtrasAux == null) {velocidadMaximaAtrasAux = this.velocidadMaxAtras;}

		color = contextoCoche.getImageData(this.posX, this.posY, 1, 1); // Miro hacia donde voy en x e y
		if (color.data[0] == 80) {
			//Si entra en la acera se reduce su velocidad a 1/3			
			this.velocidadMax = velocidadMaximaAux / 3;
			this.velocidadMaxAtras = velocidadMaximaAtrasAux / 3;
			if (this.velocidad > 0) {
				this.rotZ += (Math.random() - 0.5 ) * 0.05;
			}
		} else if (color.data[3] == 255) {
			// No es acera y no es muro
			this.velocidadMax = velocidadMaximaAux;
			this.velocidadMaxAtras = velocidadMaximaAtrasAux;
		} else {
			// Si es muro no hace nada
		}
	};

	// Comprueba colisión
	this.compruebaColision = function() {
		// Color transparente (4a componente del array color.data) significa muro
		tempX = this.posX + (Math.cos(this.rotZ) * (this.velocidad));
		tempY = this.posY + (Math.sin(this.rotZ) * (this.velocidad));
		color = contextoCoche.getImageData(tempX, tempY, 1, 1); // Miro hacia donde voy en x e y

		if (color.data[3] == 0) {
			this.velocidad = (-this.velocidad / 2);
		}
	};
	
	this.compruebaGasolinera = function() {
		color = contextoCoche.getImageData(this.posX, this.posY, 1, 1); // Miro hacia donde voy en x e y
		// Si estoy en una gasolinera (aparcamientos), estoy parado y no tengo el depósito lleno, entonces puedo repostar
		if (color.data[0] == 135 && color.data[1] == 135 && color.data[2] == 135 && this.velocidad == 0 && this.combustible < this.combustibleCapacidad) {
			this.combustible += 3;
		}
	};
}
