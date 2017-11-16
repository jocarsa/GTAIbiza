Animado.prototype = new Actor(); // Vehiculo hereda de actor
function Animado() {
	// Propiedades	
	this.rotZ;				// Rotación en el eje z
	this.velocidad;			// Velocidad
	this.velocidadMax;		// Velocidad máxima que puede alcanzar
	this.velocidadMaxAtras; // Velocidad máxima hacia atrás
	this.aceleracion;		// Aceleración
	this.aceleracionAtras;	// Aceleración marcha atrás
	this.frenada;			// Deceleración poe frenada
	this.rozamiento;		// Deceleración por rozamiento (ni frenar ni acelerar)
	this.ratioGiro;			// Ratio de giro	
	
	// Métodos
	this.mover = function() {
		// Logica
		this.posX += Math.cos(this.rotZ) * this.velocidad;
		this.posY += Math.sin(this.rotZ) * this.velocidad;
	};
	
	this.dibuja = function() {
		// Presentacion		
		drawRotated(this.rotZ - (2 * Math.PI * 0.5));
	};
}
