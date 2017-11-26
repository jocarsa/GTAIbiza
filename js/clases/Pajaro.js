Pajaro.prototype = new Animado();

function Pajaro() {
	//Propiedades
		this.energia;
		this.volando;
		this.posando;
		this.tiempodescanso;
		this.colorparada;
		this.direccion;
		this.manada;
	//Metodos
		//Variar Angulo para que se muevan aleatorio
		this.variarAngulo = function() {
			this.rotZ += (Math.random()-0.5)*0.5;
		}

		//Movimiento con Energia de Pajaros
		this.movEnerPaj = function() {
			//Comprobamos energia del pajaro
			if (this.energia>=0) {
				this.volando = true;
				this.posando = false;
			} else {
				this.colorparada = contextoPajaro.getImageData(this.posX+5,this.posY+5,1,1);
				if (this.colorparada.data[0] == 92) {
					this.posando = true;
					this.volando = false;
				}
			}
			//Si el pajaro esta volando, se mueve y pierde energia
			if (this.volando) {
				this.mover();
				if (this.posX < -10) {this.posX = -10; this.rotZ += Math.PI;}
				if (this.posX > contextoPajaro.width+10) {this.posX = contextoPajaro.width+10; this.rotZ += Math.PI;}
				if (this.posY < -10) {this.posY = -10; this.rotZ += Math.PI;}
				if (this.posY > contextoPajaro.height+10) {this.posY = contextoPajaro.height+10; this.rotZ += Math.PI;}
				this.energia--;
			}
			//Si el pajaro esta posando, se para 5 segundos para recuperarse
			if (this.posando) {
				this.velocidad = 0;
				this.tiempodescanso++;
				if (this.tiempodescanso > 152) {
					this.energia = Math.random()*(300-100)+100;
					this.velocidad = Math.random()*(5-3)+3;
					this.posando = false;
					this.volando = true;
					this.tiempodescanso = 0;
				}
			}
		}
		//Dibujar Pajaro Posando
		this.dibpajposando = function() {
			contexto1.drawImage(imagenpajaroP,this.posX -camara.vistaX,this.posY -camara.vistaY);
		}
		//Dibujar Pajaro Volando
		this.dibpajvolando = function(radianes, imagen) {
			contexto1.save();
			contexto1.translate(this.posX+imagen.width/2 -camara.vistaX, this.posY+imagen.height/2 - camara.vistaY);
			contexto1.rotate(radianes);
			contexto1.drawImage(imagen, -imagen.width/2, -imagen.height/2);
			contexto1.restore();
		}
}
