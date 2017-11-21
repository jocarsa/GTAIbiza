Pajaro.prototype = new Animado();
var speed = 2;
function Pajaro() {



		for (var i = 0; i < manada.length; i++)  { //headingamiento pajaros
	      //Variables para el foco en el que se fijan los pajaros
	    	var centerx = 0;
	    	var centery = 0;
	    	var count = 0;

	    	var b = manada[i];

	    	for (var j = 0; j < manada.length; j++)
	    	{

					 //heading a puntos cercanos
	    		var distance = distanceBetween(b, manada[j]);
	    		if (distance < flockRadius)
	    		{
	    			centerx += manada[j].x;
	    			centery += manada[j].y;
	    			count++;
	          // console.log(count);
	    		}
	    	}
				//solo se sigue a uno
	      if (count > 1) {
	      	centerx = centerx / count;
	      	centery = centery / count;
	      }

	      else  { //si no, el foco es random
	      	centerx = Math.random() * contexto1.width;
	      	centery = Math.random() * contexto1.height;
	      }

	      var angleToCenter = angleBetween(b.x,b.y,centerx,centery);
	      var lerpangle = angleDifference(b.heading, angleToCenter);

	      b.heading += lerpangle * 0.01;

	      headingx = dir_x(b.speed,b.heading);
	      headingy = dir_y(b.speed,b.heading);
	      b.x += headingx;
	      b.y += headingy;


				//funcion parada por Energia

				// if (b.energia>0) {
				// 	b.volando = true;
				// 	b.posando = false;
				// } else {
				// 	// this.colorparada = contexto.getImageData(this.posx+5,this.posy+5,1,1);
				// 	// if (this.colorparada.data[0] == 92) {
				// 		b.posando = true;
        //
				// 	//}
				// }
        //
				// //Si el pajaro esta volando, se mueve y pierde energia
				// if (b.volando) {
				// 	b.speed = 2
				// 	b.energia--;
				// }
        //
				// //Si el pajaro esta posando, se para 5 segundos para recuperarse
				// if (b.posando) {
				// 	b.speed = 0;
				// 	b.tiempodescanso++;
				// 	if (b.tiempodescanso > 152) {
				// 		b.energia = Math.random()*(300-100)+100;
				// 		// this.velocidad = Math.random()*(4-2)+2;
				// 		b.posando = false;
				// 		b.volando = true;
				// 		b.tiempodescanso = 0;
				// 	}
				// }

	      //control de colision con bordes

	      if (b.x < 0) b.x = 1068;
	      if (b.y < 0) b.y = 1068;

	      if (b.x > 1068) b.x = 0;
	      if (b.y > 1068) b.y = 0;
		}
}
