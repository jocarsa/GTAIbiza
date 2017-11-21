CochePolicia.prototype = new Coche(); // CochePolicia  hereda de coche
function CochePolicia(contexto,contextoUI,mapa){
	// Propiedades
	_this = this;
	_this.contexto = contexto;
	_this.mapa = mapa;
	_this.contextoUIDatos = contextoUI;
	_this.temporizador = 0;
	_this.pausa = false;
	//Variables de busqueda por color
	_this.datosEscenario = [];
	_this.misDatos;
	_this.coloresEscenario = [];
	_this.contadorCoordenada = 0;
	//Variables del algoritmo de busqueda
	_this.distanciaBuena = 1000000000;
	_this.indiceGanador = 0;
	_this.indiceActual = 0;

	_this.distancia = 0;
	_this.posXGanador;
	_this.posYGanador;
	_this.contador_N_Veces = 0;
	_this.pixelX = [];
	_this.pixelY = [];
	_this.pixelActivo = [];
	_this.direccion = 0;
	_this.tiempoVolverABuscar = 1000;
	_this.cocheBuscarX;
	_this.cocheBuscarY;
	_this.rangoDisMax = 65;
	_this.distanciaMaxima =  _this.rangoDisMax;
	_this.escalaPixel = 64;
	_this.contadorParaBuscar = 0;
	_this.position;
	_this.tween;
	_this.posrandom;
	_this.dinero = 3000;

		// Métodos
		_this.inicio = function(){
			_this.render();
			_this.buscaColor();
			_this.pausa = false;
			_this.algoritmoBuscaCoche();
		}
		
		_this.render = function(){

			_this.contexto.clearRect(0,0,118,66);        
			_this.contexto.drawImage(_this.mapa,0,0);								
			_this.contexto.fillStyle = "rgba(255,0,0,255)";				
			_this.contexto.fillRect(Math.round(_this.posXGanador/_this.escalaPixel),Math.round(_this.posYGanador/_this.escalaPixel),1,1);				
			_this.contexto.fillStyle = "rgba(0,255,0,255)";
			_this.cocheBuscarX = Math.round(cocheProtagonista.posX/_this.escalaPixel);
			_this.cocheBuscarY = Math.round(cocheProtagonista.posY/_this.escalaPixel);
			_this.contexto.fillRect(_this.cocheBuscarX,_this.cocheBuscarY,1,1);	
			
		};
		
		_this.buscaColor = function(){
			_this.pixelX.splice(0,_this.pixelX.length);						
			_this.pixelY.splice(0,_this.pixelY.length);							
			_this.pixelActivo.splice(0,_this.pixelActivo.length);			
			_this.indiceActual = 0;
			_this.distanciaBuena = 1000000000;
			_this.distanciaMaxima = _this.rangoDisMax;
			//distancia = 0;
			_this.coloresEscenario.splice(0,_this.coloresEscenario.length);	
			_this.datosEscenario = _this.contexto.getImageData(0,0,118,118);		
			_this.misDatos = _this.datosEscenario.data;											
			for(var i=0;i<_this.misDatos.length;i+=4){
				_this.coloresEscenario[i/4] = _this.misDatos[i]+","+_this.misDatos[i+1]+","+_this.misDatos[i+2]+","+_this.misDatos[i+3];
				if(_this.coloresEscenario[i/4] == "255,0,0,255"){
					_this.pixelX.push((_this.contadorCoordenada%(118))*_this.escalaPixel);
					_this.pixelY.push((Math.floor(i/(118*4))*_this.escalaPixel));
					_this.pixelActivo.push(1);
				}		
				_this.contadorCoordenada++;
			}
			for(var i=0;i<_this.misDatos.length;i+=4){
				_this.coloresEscenario[i/4] = _this.misDatos[i]+","+_this.misDatos[i+1]+","+_this.misDatos[i+2]+","+_this.misDatos[i+3];
				if(_this.coloresEscenario[i/4] == "255,255,255,255"){
					_this.pixelX.push((_this.contadorCoordenada%(118))*_this.escalaPixel);
					_this.pixelY.push((Math.floor(i/(118*4))*_this.escalaPixel));
					_this.pixelActivo.push(1);            				
				}		
				_this.contadorCoordenada++;
			}
			for(var i=0;i<_this.misDatos.length;i+=4){
				_this.coloresEscenario[i/4] = _this.misDatos[i]+","+_this.misDatos[i+1]+","+_this.misDatos[i+2]+","+_this.misDatos[i+3];
				if(_this.coloresEscenario[i/4] == "0,255,0,255"){
					_this.pixelX.push((_this.contadorCoordenada%(118))*_this.escalaPixel);
					_this.pixelY.push((Math.floor(i/(118*4))*_this.escalaPixel));
					_this.pixelActivo.push(1);
				}		
				_this.contadorCoordenada++;
			}
		};
		
		_this.algoritmoBuscaCoche = function(){
			for(var j = 0;j<_this.pixelX.length;j++){	
				if(_this.pixelActivo[j] == 1 && Math.round(Math.sqrt((Math.pow(_this.pixelX[_this.indiceActual]-_this.pixelX[j],2))+(Math.pow(_this.pixelY[_this.indiceActual]-_this.pixelY[j],2)))) < _this.distanciaMaxima ){
					_this.distancia = Math.round(Math.sqrt((Math.pow(_this.pixelX[_this.pixelX.length-1]-_this.pixelX[j],2))+(Math.pow(_this.pixelY[_this.pixelX.length-1]-_this.pixelY[j],2))));
					if(_this.distancia < _this.distanciaBuena && j!=_this.indiceActual){
						_this.distanciaBuena = _this.distancia;
						_this.indiceGanador = j;
						_this.posXGanador = _this.pixelX[j];
						_this.posYGanador = _this.pixelY[j];
						_this.distanciaMaxima = _this.rangoDisMax;
						_this.direccion = _this.hallarAngulo(_this.pixelX[_this.indiceActual],_this.pixelY[_this.indiceActual],_this.pixelX[j],_this.pixelY[j]);
					}
				}
				_this.contador_N_Veces++;
			}
			_this.position = {x: _this.pixelX[_this.indiceActual], y: _this.pixelY[_this.indiceActual]};
			_this.tween = new TWEEN.Tween(_this.position)
				.to({x: _this.pixelX[_this.indiceGanador], y: _this.pixelY[_this.indiceGanador]}, 1000)
				//.delay(10)
				.easing(TWEEN.Easing.Linear.None)
				.onUpdate(_this.mueve);
			_this.tween.start();
			_this.pixelActivo[_this.indiceActual] = 0;
			_this.indiceActual = _this.indiceGanador;
			//console.log(_this.contador_N_Veces);
			if(_this.contador_N_Veces > 100000){
				
				if(_this.distanciaMaxima < 7552) {_this.distanciaMaxima += 1;}
				/*if(distanciaMaxima >= 100) {
					
					_this.pausa=true;
					setTimeout(function(){
						//inicio();
						//_this.pausa = false;
						//_this.algoritmoBuscaCoche();
					
					},_this.tiempoVolverABuscar);
					 
				}*/
				//console.log(_this.distancia);
				//console.log("NO esta encontrando el camino, la distancia de busqueda aumenta en : "+_this.distanciaMaxima);
				_this.contador_N_Veces = 0;
				
			}
			if(_this.indiceGanador != _this.pixelX.length-1 ){		
				_this.contexto.fillStyle = "rgba(255,0,0,255)";
				_this.contexto.fillRect(_this.posXGanador/_this.escalaPixel,_this.posYGanador/_this.escalaPixel,5,5);
			}
			
			if(_this.distancia > 1000){
				//console.log("has huido");
				_this.posrandom = _this.aleatorio();
				_this.posXGanador = _this.posrandom[0];
				_this.posYGanador = _this.posrandom[1];
				setTimeout(function() {
					_this.contextoUIDatos.clearRect(0,0,118,82);
					_this.contextoUIDatos.fillStyle = "rgba(254,254,254,255)";
					_this.contextoUIDatos.fillText("Has huido de la Policia",10,75);
					cocheProtagonista.combustible = 800;
				}, 2000);
			}else{
				//console.log("la policia te persigue!!");
				setTimeout(function() {
					_this.contextoUIDatos.clearRect(0,0,118,82);
					_this.contextoUIDatos.fillStyle = "rgba(254,254,254,255)";
					_this.contextoUIDatos.fillText("La policia te persigue!!",10,75);
				}, 2000);
			}
			if(_this.distancia == 0 && _this.indiceGanador == _this.pixelX.length-1){
				//console.log("cazado");
				_this.dinero -=1000;
				_this.contextoUIDatos.clearRect(0,77,118,25);
				_this.contextoUIDatos.fillStyle = "rgba(254,254,254,255)";
				_this.contextoUIDatos.fillText("Te han multado -1000$ ",10,90);
				setTimeout(function() {_this.contextoUIDatos.clearRect(0,77,118,25);}, 2000);
				
				if(_this.dinero == 0){
					gameOver = true;
				}
				//gameOver = true;
			}
			_this.contextoUIDatos.clearRect(0,100,118,18);
			_this.contextoUIDatos.fillStyle = "rgba(254,254,254,255)";
			_this.contextoUIDatos.fillText("Dinero = "+ _this.dinero + "$",10,110);
			clearTimeout(_this.temporizador);
			if(_this.pausa==false){_this.temporizador = setTimeout("_this.algoritmoBuscaCoche()",900);}
		};
		
		_this.hallarAngulo=function(x1,y1,x2,y2){				
			var m=(y2-y1)/(x2-x1);
			var angulo=Math.atan(m);
			return angulo;                               
		};
		
		_this.mueve = function(){
				contextoFinal2.clearRect(0,0,7552,4224);
				mapaFinal2.dibujar(contextoFinal2, camara.vistaX, camara.vistaY);
				_this.drawRotated(_this.direccion);
				_this.render();
				if(_this.contadorParaBuscar % 3 == 0){
					_this.buscaColor();
				}
				_this.contadorParaBuscar++;
		};	
		_this.drawRotated = function(radianes){
			contextoFinal2.clearRect(0,0,7552,4224);
			mapaFinal2.dibujar(contextoFinal2, camara.vistaX, camara.vistaY);
			contextoFinal2.save();
			contextoFinal2.translate(Math.round(_this.position.x-camara.vistaX), Math.round(_this.position.y-camara.vistaY));
			contextoFinal2.rotate(radianes);
			contextoFinal2.drawImage(cochePolicia, -cochePolicia.width / 2, -cochePolicia.height / 2,16,16);
			contextoFinal2.restore();
		};
		_this.aleatorio=function(){switch(Math.floor(69*Math.random()+1)){case 1:randomposx=532,randomposy=1374;break;case 2:randomposx=550,randomposy=280;break;case 3:randomposx=1346,randomposy=1185;break;case 4:randomposx=860,randomposy=1885;break;case 5:randomposx=1674,randomposy=1736;break;case 6:randomposx=1674,randomposy=2114;break;case 7:randomposx=1668,randomposy=2540;break;case 8:randomposx=1664,randomposy=2838;break;case 9:randomposx=1660,randomposy=3194;break;case 10:randomposx=2146,randomposy=2132;break;case 11:randomposx=2144,randomposy=2846;break;case 12:randomposx=2122,randomposy=3192;break;case 13:randomposx=2452,randomposy=3520;break;case 14:randomposx=3166,randomposy=1084;break;case 15:randomposx=3162,randomposy=1434;break;case 16:randomposx=3156,randomposy=2118;break;case 17:randomposx=3164,randomposy=2860;break;case 18:randomposx=3162,randomposy=3524;break;case 19:randomposx=4090,randomposy=632;break;case 20:randomposx=4090,randomposy=918;break;case 21:randomposx=4090,randomposy=1420;break;case 22:randomposx=4090,randomposy=1638;break;case 23:randomposx=4090,randomposy=2110;break;case 24:randomposx=4090,randomposy=2772;break;case 25:randomposx=4090,randomposy=3174;break;case 26:randomposx=4090,randomposy=3324;break;case 27:randomposx=4090,randomposy=3516;break;case 28:randomposx=4500,randomposy=626;break;case 29:randomposx=4500,randomposy=924;break;case 30:randomposx=4500,randomposy=1626;break;case 31:randomposx=4500,randomposy=2122;break;case 32:randomposx=4500,randomposy=2778;break;case 33:randomposx=4500,randomposy=3320;break;case 34:randomposx=4990,randomposy=646;break;case 35:randomposx=4990,randomposy=1146;break;case 36:randomposx=4990,randomposy=1662;break;case 37:randomposx=4990,randomposy=1762;break;case 38:randomposx=4994,randomposy=2108;break;case 39:randomposx=4728,randomposy=2110;break;case 40:randomposx=5334,randomposy=656;break;case 41:randomposx=5334,randomposy=1150;break;case 42:randomposx=5338,randomposy=1758;break;case 43:randomposx=5338,randomposy=2114;break;case 44:randomposx=5338,randomposy=2760;break;case 45:randomposx=5338,randomposy=3332;break;case 46:randomposx=5980,randomposy=636;break;case 46:randomposx=5980,randomposy=1156;break;case 47:randomposx=5978,randomposy=2108;break;case 48:randomposx=6318,randomposy=2104;break;case 49:randomposx=6832,randomposy=1136;break;case 50:randomposx=1680,randomposy=2113;break;case 51:randomposx=2145,randomposy=2113;break;case 52:randomposx=2703,randomposy=2113;break;case 53:randomposx=3165,randomposy=2113;break;case 54:randomposx=3540,randomposy=2113;break;case 55:randomposx=3939,randomposy=2113;break;case 56:randomposx=4185,randomposy=2113;break;case 57:randomposx=4521,randomposy=2113;break;case 58:randomposx=4992,randomposy=2113;break;case 59:randomposx=5349,randomposy=2113;break;case 60:randomposx=5668,randomposy=2113;break;case 61:randomposx=550,randomposy=1872;break;case 62:randomposx=869,randomposy=1257;break;case 63:randomposx=1140,randomposy=1895;break;case 64:randomposx=1135,randomposy=2462;break;case 65:randomposx=1672,randomposy=1891;break;case 66:randomposx=1674,randomposy=2113;break;case 67:randomposx=543,randomposy=1054;break;case 68:randomposx=864,randomposy=1884;break;case 69:randomposx=868,randomposy=1255;break;case 70:randomposx=552,randomposy=1600}return[randomposx,randomposy]};
}
	
			