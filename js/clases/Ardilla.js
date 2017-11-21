Ardilla.prototype = new Animado();                                            //HERENCIA PARA MOVIMIENTO

//FUNCION ARDILLA
function Ardilla(_posX, _posY, _srcPerro) {
	//Propiedades
	this.numeroardillas;
	this.tempardillax;
	this.tempardillay;
	this.imagenx = 0;
	this.imageny = 0;
	this.cuentavelocidad;
	//Metodos
	this.mueve = function(_posX, _posY){                                    //FUNCION PARA MOVER EL PERRO
	    this.posx = _posX;                                                  //ACTUALIZA LAS X
	    this.posy = _posY;                                                  //ACTUALIZA LA Y
	}

}