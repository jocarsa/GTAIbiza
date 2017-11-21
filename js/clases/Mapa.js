function Mapa(anchura, altura, imagenFuente) {
	// dimensiones del mapa
	this.anchura = anchura;
	this.altura = altura;
	
	// imagen del mapa
	this.imagen = new Image();
	this.imagen.src = imagenFuente;
	
	// El dibujado se hace recortando el trozo de mapa que necesitamos y pegándolo en el canvas
	// Ver ejemplo: https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
	this.dibujar = function(contexto, vistaX, vistaY) {
		var coordOrigenX, coordOrigenY, coordDestinoX, coordDestinoY;
		var anchuraOrigen, alturaOrigen, anchuraDestino, alturaDestino;
		
		// punto de desfase para cortar la imagen
		coordOrigenX = vistaX;
		coordOrigenY = vistaY;
		
		// dimensiones de la imagen recortada
		anchuraOrigen =  contexto.canvas.width;
		alturaOrigen = contexto.canvas.height;
		
		// si la imagen recortada es más pequeña que el canvas, necesitamos cambiar las dimensiones de origen
		if (this.imagen.width - coordOrigenX < anchuraOrigen) {
			anchuraOrigen = this.imagen.width - coordOrigenX;
		}
		if (this.imagen.height - coordOrigenY < alturaOrigen) {
			alturaOrigen = this.imagen.width - coordOrigenY;
		}
		
		// localización en el canvas para dibujar la imagen recortada
		coordDestinoX = 0;
		coordDestinoY = 0;
		
		// hacer encajar el destino con el origen para que la imagen no se reescale
		anchuraDestino = anchuraOrigen;
		alturaDestino = alturaOrigen;
		
		//this.imagen.onload = function() {
			// dibujar la imagen recortada en el canvas
			contexto.drawImage(this.imagen,
				coordOrigenX, coordOrigenY,
				anchuraOrigen, alturaOrigen,
				coordDestinoX, coordDestinoY,
				anchuraDestino, alturaDestino
			);
		//};
	}
}