/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////						 	Funciones del mapa											/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function dibujaMapaBonito() {
	mapaBonito.onload = function() {
		//contexto1.drawImage(mapaBonito, 0, 0);
		contexto1.drawImage(mapaPeces, 0, 0);
		
		puedesIniciar++;
	}
}
function dibujaMapaPerro(){
	mapaPerro.onload = function() {
		contextoPerro.drawImage(mapaPerro, 0, 0);
		creaPerros();
		puedesIniciar++;
	}
}
function dibujaMapaCoche(){
	mapaCoche.onload = function() {
		contextoCoche.drawImage(mapaCoche, 0, 0);
		puedesIniciar++;
	}
}
function dibujaMapaPlanta(){
	mapaPlanta.onload = function() {
		contextoPlanta.drawImage(mapaPlanta, 0, 0);
		puedesIniciar++;
	}
}
function dibujaMapaPajaro(){
	mapaPajaro.onload = function() {
		contextoPajaro.drawImage(mapaPajaro, 0, 0);
		creacionPajaros();
		puedesIniciar++;
	}
}
function dibujaMapaPeces(){
	mapaPeces.onload = function() {
		contextoPeces.drawImage(mapaPeces, 0, 0);
		puedesIniciar++;
	}
}
function dibujaMapaFinal(){
	mapaFinal.onload = function() {
		contextoFinal.drawImage(mapaFinal, 0, 0);
		puedesIniciar++;
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones del coche Bot										/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function hallarAngulo(x1,y1,x2,y2){				//hayo el angulo con referencia el eje x de un punto a otro
	var m=(y2-y1)/(x2-x1);
	angulo=Math.atan(m);
	return angulo;                               //me retorna el valor que es el angulo calculado 
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de los perros										/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
//Condiciones iniciales de los perros
function creacionClasesPerros(){
	for (var i =0; i<numeroperros; i++){
		perro[i] = new Perro();
		perro[i].posx;
		perro[i].posy;
		perro[i].direccion;
		perro[i].velocidad;
		perro[i].numeroperros = 10;
		perro[i].tempx;
		perro[i].tempy; 
	}
}
function creaPerros(){
	var contador = numeroperros;
	var randomPosicionPerro = 0;
	var lastx = 0;
	var lasty = 0;
	var distance = 100;
	while(contador>-1)
	{
		var pruebax = Math.round(Math.random()*1000);
		var pruebay = Math.round(Math.random()*1000);
		var colormapaperro = contextoPerro.getImageData(pruebax, pruebay,1,1);
		if (colormapaperro.data[0]==80 &&
			(pruebax > (lastx+distance) || pruebax < (lastx-distance)) &&
			(pruebay > (lasty+distance) || pruebay < (lasty-distance)))
		{
			perro[contador] = new Perro();
			perro[contador].posx = pruebax;
			perro[contador].posy = pruebay;
			perro[contador].direccion = Math.random()*Math.PI*2;
			perro[contador].velocidad = 1;
			contador--;
 		}
 		lastx = pruebax;
 		lasty = pruebay;
	}
	perroMeos[0] = new PerroMeo();
	perroMeos[0].posx = perro[0].posx;
	perroMeos[0].posy = perro[0].posy;
}
function muevePerro(){
	limpiaMeos();
	for (var i = 0; i<numeroMeos; i++){
		contextoFinal.drawImage(imagenmeo, perroMeos[i].tempx, perroMeos[i].tempy,5,5);
	}
 	for (var i = 0; i<numeroperros; i++){
		perro[i].direccion += (Math.random()-0.5) * 0.5;				// Varío el ángulo aleatoriamente
		perro[i].tempx = perro[i].posx + Math.cos(perro[i].direccion)*perro[i].velocidad;					// Miro hacia donde voy en x
		perro[i].tempy = perro[i].posy + Math.sin(perro[i].direccion)*perro[i].velocidad;		// Miro hacia donde voy en y
		var color = contextoPerro.getImageData(perro[i].tempx,perro[i].tempy,1,1);	// Miro el color en ese punto
		if (color.data[0]==80){
			perro[i].posx += Math.cos(perro[i].direccion)*perro[i].velocidad;					// Trabajo la proyección horizontal
			perro[i].posy += Math.sin(perro[i].direccion)*perro[i].velocidad;					// Trabajo la proyección vertical
			buscaPerroMeo(perro[i].posx, perro[i].posy, i);
		}
		if (color.data[3] == 0) {										// Si el valor de la transparencia es 0 el perro da la vuelta
			perro[i].direccion += Math.PI;
		}
		contextoFinal.drawImage(imagenperro, perro[i].posx, perro[i].posy,16,16);     		
	}
}
function buscaPerroMeo(_posx, _posy, iperro){
	var encuentreMeo 	= false;
	var tocaMeo 		= false;
	for (var i = 0; i<numeroMeos; i++){
		if (_posx > (perroMeos[i].tempx-3) &&
			_posx < (perroMeos[i].tempx+3) &&
			_posy > (perroMeos[i].tempy-3) &&
			_posy < (perroMeos[i].tempy+3))
		{
			if (perro[iperro].acabademear == true){
				perro[iperro].acabademear = false;
			}else{
				encuentreMeo = true;
			}
		}
	}
	if (!encuentreMeo && tiempoSinMeos%3000==0){
		perro[iperro].acabademear = false;
		tocaMeo = true;
	}
	if ((encuentreMeo || tocaMeo) && perro[iperro].acabademear == false){
		var newx = _posx+Math.round(Math.random()*8);
		var newy = _posy+Math.round(Math.random()*10);
		perroMeos[numeroMeos] = new PerroMeo();
		perroMeos[numeroMeos].tempx = newx;
		perroMeos[numeroMeos].tempy = newy;
		perroMeos[numeroMeos].tiempoDeEsteMeo = caducidadDelMeo;
		perro[iperro].acabademear = true;
		contextoFinal.drawImage(imagenmeo,newx,newy,5,5);
		numeroMeos++;
		caducidadDelMeo++;
	}
	tiempoSinMeos++;
}
function limpiaMeos(){
	if (numeroMeos > 0){
		for (var i = 0; i<numeroMeos; i++){
			if ((caducidadDelMeo - perroMeos[i].tiempoDeEsteMeo) > 500){
				perroMeos.splice(i, 1);
				numeroMeos--
				break;
			}
		}
	}
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de las plantas									/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function generarArboles(){
	pruebax = Math.round(Math.random()*1000);
	pruebay = Math.round(Math.random()*1000);
	colorMapaArbol = contextoPlanta.getImageData(pruebax, pruebay,1,1);
	var tamaño = (Math.random()+0.5)*20;
	if (colorMapaArbol.data[0]==167 &&
		(pruebax > (lastX+distance) || pruebax < (lastX-distance)) &&
		(pruebay > (lastY+distance) || pruebay < (lastY-distance)))
	{
		arbol[contador] = new Arbol();
		arbol[contador].puntoX = pruebax;
		arbol[contador].puntoY = pruebay;
		contexto1.drawImage(arbol,arbol[contador].puntoX,arbol[contador].puntoY,tamaño,tamaño); 
 	}
 	lastx = pruebax;
 	lasty = pruebay;
}
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones de los pajaros									/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function creacionPajaros(){
	var Boid = function(x, y, heading, size, energia, speed) {

		this.x = x;
		this.y = y;
		this.heading = heading;
		this.size = size;
		this.energia = energia;
		this.volando = true;
		this.posando = false;
		this.tiempodescanso = 0;
		this.colorparada;
		this.speed = speed;

	};

	for (var i = 0; i < 40; i++)
		{
			manada.push(new Boid(Math.random() * 1068, Math.random() * 1068, Math.random() * 360, 10, Math.random()*(1000-100)+100, 2));
			
		}

}
function movimientoPajaros(){
	for (var i = 0; i < manada.length; i++)
	{
		var b = manada[i];
		if(b.volando){
			dibpajvolando(b.x, b.y,10, 10, manada[i].heading);
		}else{
			dibpajposando(b.x, b.y);
		}

	clearTimeout(temporizador);
	temporizador = setTimeout("bucle()", 16);

	}
	Pajaro();

	function dibpajvolando(x, y, width, height, radianes) {
	// contexto.drawImage(imagenPajaro, x, y, 10, 10);
	contextoFinal.save();
	contextoFinal.translate(x+width/2, y+height/2);
	contextoFinal.rotate(radianes*Math.PI/180);
	contextoFinal.drawImage(imagenPajaro, -width/2, -height/2);
	contextoFinal.restore();
	}

	function dibpajposando(x, y) {
		contextoFinal.drawImage(imagenpajaroP,x, y);
	}
}
function drawRotated1(radianes) {
  //contextoFinal.clearRect(0,0,lienzo1.width,lienzo1.height);

  // save the unrotated context of the canvas so we can restore it later
  // the alternative is to untranslate & unrotate after drawing
  contextoFinal.save();

  // move to the center of the canvas
  contextoFinal.translate(imagenPajaro.posX, imagenPajaro.posY);

  // rotate the canvas to the specified degrees
  contextoFinal.rotate(radianes);

  // draw the image
  // since the context is rotated, the image will be rotated also
  contextoFinal.drawImage(imagenPajaro, -imagenPajaro.width / 2, -imagenPajaro.height / 2);

  // we’re done with the rotating so restore the unrotated context
  contextoFinal.restore();
}
function distanceBetween(a, b)  {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  function angleBetween(x1, y1, x2, y2)
  {
    return Math.atan2(y1 - y2, x1 - x2) * (180.0 / Math.PI);
  }

  function angleDifference(a1, a2)
  {
    return ((((a1 - a2) % 360) + 540) % 360) - 180;
  }

  function degreesToRadians(degrees){
    return degrees * (Math.PI / 180);
  }

  function dir_x(length, angle){
    return length * Math.cos(degreesToRadians(angle));
  }

  function dir_y(length, angle){
    return length * Math.sin(degreesToRadians(angle));
  }
/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////							Funciones del coche protagonista							/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
function actualizarCocheProtagonista() {
	cocheProtagonista.dibuja();
	cocheProtagonista.barraCombustible.dibujar();
	// Se actualizan los valores cuando acelera	
	if (cocheProtagonista.acelerando) {
		cocheProtagonista.acelerar();
	}
	// Se actualizan los valores cuandro frena
	if (cocheProtagonista.frenando) {
		cocheProtagonista.frenar();
	}
	// Se actualizan los valores en inercia (sin acelerar ni frenar)
	if (!cocheProtagonista.frenando && !cocheProtagonista.acelerando) {
		cocheProtagonista.frenarRozamiento();
	}
	// Se actualizan valores al girar. Sólo gira si está en movimiento
	if (cocheProtagonista.izquierda || cocheProtagonista.derecha) {
		cocheProtagonista.girar();
	}
	// Ajuste de velocidad a cero cuando es despreciable
	if (Math.abs(cocheProtagonista.velocidad) < cocheProtagonista.rozamiento) {
		cocheProtagonista.velocidad = 0
	}
	// Comprueba colisiones
	cocheProtagonista.compruebaColision();
	// Comprueba cambios de terreno (diferente rozamiento)
	cocheProtagonista.compruebaTerreno();
	// Si cambia la velocidad máxima del coche por entrar en un terreno con más rozamiento, por daños, etc.
	// se actualiza la velocidad actual si está por encima de la máxima
	cocheProtagonista.actualizaVelocidadMax();
	// Actualizar posición del coche. Sólo actualiza las coordenadas x e y cuando el coche se está moviendo
	if (Math.abs(cocheProtagonista.velocidad) > 0 ) {
		cocheProtagonista.mover();
	}
	cocheProtagonista.compruebaGasolinera();
	// Actualizar el porcentaje de combustible que le queda al coche
	cocheProtagonista.barraCombustible.actualizarPorcentaje(cocheProtagonista);
}
function drawRotated(radianes) {
	//contextoFinal.clearRect(0,0,lienzo1.width,lienzo1.height);

	// save the unrotated context of the canvas so we can restore it later
	// the alternative is to untranslate & unrotate after drawing
	contextoFinal.save();
	// move to the center of the canvas
	contextoFinal.translate(cocheProtagonista.posX, cocheProtagonista.posY);
	// rotate the canvas to the specified degrees
	contextoFinal.rotate(radianes);
	// draw the image
	// since the context is rotated, the image will be rotated also
	contextoFinal.drawImage(imagenCoche, -imagenCoche.width / 2, -imagenCoche.height / 2);
	// we’re done with the rotating so restore the unrotated context
	contextoFinal.restore();
}
function condicionesInicialesCocheProtegonista(){
	// Condiciones iniciales del coche protagonista
	cocheProtagonista = new CocheProtagonista();
	cocheProtagonista.posX									= 350;
	cocheProtagonista.posY									= 1023;
	cocheProtagonista.rotZ									= 0;
	
	cocheProtagonista.velocidad								= 0;
	cocheProtagonista.velocidadMax							= 4;
	cocheProtagonista.velocidadNitro						= 8;
	cocheProtagonista.velocidadMaxAtras						= 1;
	
	cocheProtagonista.combustibleCapacidad					= 800;
	cocheProtagonista.combustible							= cocheProtagonista.combustibleCapacidad; // Se empieza con el depósito lleno
	cocheProtagonista.consumoMin							= 0.05;
	cocheProtagonista.consumoMax							= 0.5;
	cocheProtagonista.consumoNitro							= 2;
	
	cocheProtagonista.aceleracion							= 0.05;
	cocheProtagonista.aceleracionAtras						= 0.05;
	cocheProtagonista.aceleracionNitro						= 0.5;
	cocheProtagonista.frenada								= 0.2;
	cocheProtagonista.rozamiento							= 0.03;
	cocheProtagonista.ratioGiro								= 0.1;
	
	cocheProtagonista.barraCombustible						= new InterfazBarraCombustible();
	cocheProtagonista.barraCombustible.posX 				= 0;
	cocheProtagonista.barraCombustible.posY 				= 10;
	cocheProtagonista.barraCombustible.anchura				= 30;
	cocheProtagonista.barraCombustible.altura				= 4;
	cocheProtagonista.barraCombustible.porcentajeInicial	= 100;
	cocheProtagonista.barraCombustible.porcentaje			= cocheProtagonista.barraCombustible.porcentajeInicial;
}
function eventosCocheProtagonista() {
	// Escribir el código que se encarga de la pulsación de las teclas	
	$(document).keydown(function(event) {
		if (event.which == 87) {
			// Acelera W
			cocheProtagonista.acelerando = true;
		}
		if (event.which == 83) {
			// Frena S
			cocheProtagonista.frenando = true;
		}
		if (event.which == 65) {
			// Gira izquierda A
			cocheProtagonista.izquierda = 1;
		}
		if (event.which == 68) {
			// Gira derecha D
			cocheProtagonista.derecha = 1;
		}
		if (event.which == 32) {
			// Nitro			
			cocheProtagonista.activarNitro(true);
		}
	});
	
	$(document).keyup(function(event) {
		if (event.which == 87) {
			cocheProtagonista.acelerando = false;
		}
		
		if (event.which == 83) {
			cocheProtagonista.frenando = false;
		}

		if (event.which == 65) {
			cocheProtagonista.izquierda = false;
		}
		
		if (event.which == 68) {
			cocheProtagonista.derecha = false;
		}		
		if (event.which == 32) {
			// Nitro
			cocheProtagonista.activarNitro(false);
		}
	});
}
function dibujarBarraCombustible() {
	// Calcula el porcentaje (en pixels) que le queda de combustible
	var anchuraRellenada = Math.ceil((cocheProtagonista.barraCombustible.porcentaje * cocheProtagonista.barraCombustible.anchura) / 100);
	// Pinto el contorno y el fondo de la barra de combustible en negro
	// La posición de la barra es relativa a la del cocheProtagonista
	contextoFinal.fillStyle = "#000000";
	contextoFinal.fillRect(cocheProtagonista.posX - 16, cocheProtagonista.posY - 21, cocheProtagonista.barraCombustible.anchura + 2, cocheProtagonista.barraCombustible.altura + 2);
	if (cocheProtagonista.barraCombustible.porcentaje < 33) {			// Si el combustible es menor del 33%
		contextoFinal.fillStyle = "#FF0000";							// Pinto con el color rojo (aviso de que se acaba el combustible)
	} else {															// Si el combustible es mayor o superior al 33%
		contextoFinal.fillStyle = "#1F9639";							// Pinto con el color verde
	}
	// Pinto el relleno de la barra de combustible
	// La posición de la barra es relativa a la del cocheProtagonista
	contextoFinal.fillRect(cocheProtagonista.posX - 15, cocheProtagonista.posY - 20, anchuraRellenada, cocheProtagonista.barraCombustible.altura);
}

/////////////////////////////////////////////////////////////////////////////////////////////////
////																						/////
////				Funciones de los peces. Están en funcionespez.js						/////
////																						/////
/////////////////////////////////////////////////////////////////////////////////////////////////
