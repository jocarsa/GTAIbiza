Cursor.prototype = new Actor(); // Animado hereda de actor
function Cursor(){
	// Propiedades

	// Métodos
	this.dibuja = function(x, y, aRadio){		
		dibujaCirculo(x, y , aRadio, "black","S");
	}

}