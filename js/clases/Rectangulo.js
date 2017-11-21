function Rectangulo(bordeIzquierdo, bordeSuperior, anchura, altura) {
	this.bordeIzquierdo = bordeIzquierdo || 0;
	this.bordeSuperior = bordeSuperior || 0;
	this.anchura = anchura || 0;
	this.altura = altura || 0;
	this.bordeDerecho = this.bordeIzquierdo + this.anchura;
	this.bordeInferior = this.bordeSuperior + this.altura;

	this.ajustar = function(bordeIzquierdo, bordeSuperior, /*opcional*/anchura, /*opcional*/altura) {
		this.bordeIzquierdo = bordeIzquierdo;
		this.bordeSuperior = bordeSuperior;
		this.anchura = anchura || this.anchura;
		this.altura = altura || this.altura;
		this.bordeDerecho = this.bordeIzquierdo + this.anchura;
		this.bordeInferior = this.bordeSuperior + this.altura;
	}
	
	this.dentroDeRectangulo = function(r) {
		return (r.bordeIzquierdo <= this.bordeIzquierdo
			&& r.bordeDerecho >= this.bordeDerecho
			&& r.bordeSuperior <= this.bordeSuperior
			&& r.bordeInferior >= this.bordeInferior);
	}
	
	this.superponeARectangulo = function(r) {
		return (this.bordeIzquierdo < r.bordeDerecho
			&& r.bordeIzquierdo < this.bordeDerecho
			&& this.bordeSuperior < r.bordeInferior
			&& r.bordeSuperior < this.bordeInferior);
	}
}