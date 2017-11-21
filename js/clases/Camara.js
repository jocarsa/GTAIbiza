// Ejes posibles para mover la cámara
var EJES = {
	NINGUNO: "ninguno",
	HORIZONTAL: "horizontal",
	VERTICAL: "vertical",
	AMBOS: "ambos"
};

// Constructor Camara
function Camara(vistaX, vistaY, anchuraCanvas, alturaCanvas, anchuraMapa, alturaMapa) {
	// posición de la cámara (coordenada izquierda-arriba)
	this.vistaX = vistaX || 0;
	this.vistaY = vistaY || 0;

	// distancia desde el objeto seguido al borde, antes de que la cámara se empiece a mover
	this.zonaMuertaX = 0; // distancia mínima a los bordes horizontales
	this.zonaMuertaY = 0; // distancia mínima a los bordes verticales

	// dimensiones de la "ventana"
	this.anchuraVista = anchuraCanvas;
	this.alturaVista = alturaCanvas;

	// permitir a la cámara moverse en el eje horizontal y vertical
	this.eje = EJES.AMBOS;

	// objeto que debería de ser seguido
	this.objetoSeguido = null;

	// rectángulo que representa la "ventana"
	this.rectVentana = new Rectangulo(this.vistaX, this.vistaY, this.anchuraVista, this.alturaVista);

	// rectángulo que representa los límites del mapa
	this.rectMapa = new Rectangulo(0, 0, anchuraMapa, alturaMapa);
	
	// objetoDelJuego necesita tener las propiedades "posX" y "posY" (como posición absoluta dentro del mapa)
	this.seguirObjeto = function(objetoDelJuego, zonaMuertaX, zonaMuertaY) {
		this.objetoSeguido = objetoDelJuego;
		this.zonaMuertaX = zonaMuertaX;
		this.zonaMuertaY = zonaMuertaY;
	}
	
	this.actualizar = function() {
		// continúa siguiendo al jugador (o a otro objeto deseado)
		if (this.objetoSeguido != null) {
			if (this.eje == EJES.HORIZONTAL || this.eje == EJES.AMBOS) {
				// mueve la cámara en el eje horizontal en base a la posición del objeto seguido
				if (this.objetoSeguido.posX - this.vistaX + this.zonaMuertaX > this.anchuraVista) {
					this.vistaX = this.objetoSeguido.posX - (this.anchuraVista - this.zonaMuertaX);
				} else if (this.objetoSeguido.posX - this.zonaMuertaX < this.vistaX) {
					this.vistaX = this.objetoSeguido.posX - this.zonaMuertaX;
				}
			}
			if (this.eje == EJES.VERTICAL || this.eje == EJES.AMBOS) {
				// mueve la cámara en el eje vertical en base a la posición del objeto seguido
				if (this.objetoSeguido.posY - this.vistaY + this.zonaMuertaY > this.alturaVista) {
					this.vistaY = this.objetoSeguido.posY - (this.alturaVista - this.zonaMuertaY);
				} else if (this.objetoSeguido.posY - this.zonaMuertaY < this.vistaY) {
					this.vistaY = this.objetoSeguido.posY - this.zonaMuertaY;
				}
			}
		}
		
		// actualizar rectVentana
		this.rectVentana.ajustar(this.vistaX, this.vistaY);
		
		// NO dejar que la cámara deje los límites del mapa
		if (!this.rectVentana.dentroDeRectangulo(this.rectMapa)) {
			if (this.rectVentana.bordeIzquierdo < this.rectMapa.bordeIzquierdo) {
				this.vistaX = this.rectMapa.bordeIzquierdo;
			}
			if (this.rectVentana.bordeSuperior < this.rectMapa.bordeSuperior) {
				this.vistaY = this.rectMapa.bordeSuperior;
			}
			if (this.rectVentana.bordeDerecho > this.rectMapa.bordeDerecho) {
				this.vistaX = this.rectMapa.bordeDerecho - this.anchuraVista;
			}
			if (this.rectVentana.bordeInferior > this.rectMapa.bordeInferior) {
				this.vistaY = this.rectMapa.bordeInferior - this.alturaVista;
			}
		}
	}
}