InterfazBarraCombustible.prototype = new InterfazBarra();
function InterfazBarraCombustible() {
	this.dibujar = function() {
		// Esto no es lógica, lo sacamos fuera
		dibujarBarraCombustible();
	};
	
	// Porcentaje que queda de combustible en función de la capacidad total y el combustible actual
	this.actualizarPorcentaje = function(vehiculoMotorizado) {
		this.porcentaje = Math.round((vehiculoMotorizado.combustible / vehiculoMotorizado.combustibleCapacidad) * 100);
	};
}