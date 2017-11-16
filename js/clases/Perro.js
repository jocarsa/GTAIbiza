Perro.prototype = new Animado();                                            //HERENCIA PARA MOVIMIENTO

//FUNCION PERRO
function Perro(_posX, _posY, _srcPerro) {
	//Propiedades
	this.numeroperros;
	this.tempx;
	this.tempy;
	this.acabademear = false;
	//Metodos
	this.mueve = function(_posX, _posY){                                    //FUNCION PARA MOVER EL PERRO
	    this.posx = _posX;                                                  //ACTUALIZA LAS X
	    this.posy = _posY;                                                  //ACTUALIZA LA Y
	}

}