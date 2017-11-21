Tiburon.prototype = new Pez(); // Tiburon hereda de pez

function Tiburon(){
	//Propiedades
		this.velocidad = 1.1;
		this.velocidadInicial = 1.1;
		
		this.indicepresa;
		this.indicebanco;
		this.distanciapresa;
		
		this.nadando = true;
		this.cazando = false;
		this.descansando = false;
		
		this.tiempocaza = 0;
		this.tiempodescansando = 0;
		
		this.tiempoanimacion = 500;		//Tiempo que tarda en recorrer el spritesheet en ms
		this.sw = 57;					//Ancho del Sprite
		this.sh = 80;					//Altura del Sprite
		this.spriteC = 6;				//Columnas del spritesheet
		this.spriteF = 1;				//Filas del spritesheet
		this.contador = 0;				//Contador usado para cambiar de sprite segun el tiempo de animacion y el frametime
		
	//Metodos
		//Cambia el angulo aleatoriamente
		this.cambiarAngulo = function() {
			this.rotZ += (Math.random()-0.5)*0.1;
		}
		
		// Si el tiburon esta nadando busca un pez en un determinado radio
		this.buscapez = function () {
			for (var i=0; i<nBancos; i++) {
				for (var j=0; j<nPeces; j++) {
					//Buscamos un pez que este al alcance del tiburon
					var catX = objetivosComunes[i].peces[j].posX - this.posX;
					var catY = objetivosComunes[i].peces[j].posY - this.posY;
					this.distanciapresa = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
					//console.log("Distancia: " + distanciapresa);

					//Si encuentra un pez, el tiburon lo persigue durante un tiempo
					if (this.distanciapresa < 300) {
						//Fijamos posicion de la presa
						this.indicebanco = i;
						this.indicepresa = j;
						this.cazando = true;
						this.nadando = false;						
					}						
					
				}
			}
		}

		//Cuando encuentra pez, lo persigue durante un tiempo; aumenta la velocidad
		this.cazarPez = function () {
			this.velocidad =  2 * this.velocidadInicial;
			presax = objetivosComunes[this.indicebanco].peces[this.indicepresa].posX;
			presay = objetivosComunes[this.indicebanco].peces[this.indicepresa].posY;
			this.rotZ = anguloEntrePuntos(this.posX, this.posY, presax, presay);
			this.tiempocaza ++;
			/* if (presax==this.posX && presay==this.posY) {
				splice(objetivosComunes[this.indicebanco].peces[this.indicepresa], 1);
				nPeces--;
				this.velocidad = this.velocidadInicial;
				this.tiempocaza = 0;
				this.descansando = true;
				this.cazando = false;
			} */
			var catX = presax - this.posX;
			var catY = presay - this.posY;
			this.distanciapresa = Math.sqrt(Math.pow(catX, 2) + Math.pow(catY, 2));
			
			if (this.tiempocaza>80 || (this.distanciapresa < 10)) {
				//Cuando termina el tiempo de caza se vuelve a la normalidad
				this.velocidad = this.velocidadInicial;
				this.tiempocaza = 0;
				this.descansando = true;
				this.cazando = false;
			}			
			
		}

		//Al terminar de cazar el tiburon no persigue ni busca ningun pez durante un tiempo
		this.descansar = function () {
			this.tiempodescansando++;
			if (this.tiempodescansando>150) {
				this.tiempodescansando = 0;
				this.nadando = true;
				this.descansando = false;
			}
		}
		
		//Establecemos el comportamiento del tiburon segun este cazando o no
		this.comportamientoTiburon = function() {
			if(this.nadando) {
				//this.cambiarAngulo();
				this.buscapez();
				//console.log("Estoy nadando");
			}
			if(this.cazando) {
				this.cazarPez();
				//console.log("Estoy cazando");
			}
			if(this.descansando) {
				//this.cambiarAngulo();
				this.descansar();
				//console.log("Estoy descansando");
			}
		}
		
		//Hacemos que el tiempo de animacion dependa de la velocidad de forma lineal
		this.animacionVelocidad = function() {
			this.tiempoanimacion = -100*this.velocidad + 800;
		}
		
		//Pintamos la animacion del tiburon con el spritesheet
		this.animar = function(imagen) {
			contextoFinal.save();
			contextoFinal.translate(this.posX+this.sw/2, this.posY+this.sh/2);
			contextoFinal.rotate(this.rotZ + Math.PI * 0.5);
			contextoFinal.drawImage(imagen, sx*this.sw,sy*this.sh, this.sw,this.sh, -this.sw/2,-this.sh/2, this.sw * 0.7,this.sh * 0.7);
			contextoFinal.restore();			
			this.animacionVelocidad();						//Actualizamos el tiempo de animacion segun velocidad
			this.contador++;
			if (this.contador >= Math.floor(this.tiempoanimacion/(this.spriteC*this.spriteF)*(1/frameTime))) {
				sx++;
				this.contador = 0;
				if(sx >= this.spriteC-1){
					sx = 0; 								//Se vuelve a empezar por la izquierda
					sy++;                                	//Bajamos de linea
                    if (sy => this.spriteF-1) {sy = 0;}    	//Se vuelve a arriba
				}
			}
		}
}