//botObj.prototype = new Coche();
var botObj = function(ini,dir,colorD,colorI,colorARRB,colorABJ){				//nodo de donde empieza, nodo al que apunta,color de los sprite(derecha izquierda arriba abajp)
	this.posX;
	this.posY;

	///////////LOS SPRITE///////////
	var cocheBot = new Image();
	cocheBot.src = "img/"+colorD+".png";
	var cocheBotI = new Image();
	cocheBotI.src = "img/"+colorI+".png";
	var cocheBotAr = new Image();
	cocheBotAr.src = "img/"+colorARRB+".png";
	var cocheBotAb = new Image();
	cocheBotAb.src = "img/"+colorABJ+".png";
	/////////VAR DE LA IA///////////
	var nodoPrimario=ini;//nodo donde empieza
	var nodoActual=dir;//nodo al que donde se dirije
	this.rotZ=hallarAngulo(posPx[nodoPrimario],posPy[nodoPrimario],posPx[nodoActual],posPy[nodoActual]);//calcula hacia donde mirar
	///////////POSICIONO///////////
	this.posX=posPx[nodoPrimario];												//ponemos el coche bot en el nodo ddobde debe comenzar
	this.posY=posPy[nodoPrimario];												//ponemos el coche bot en el nodo ddobde debe comenzar
	////////////AKI LA MAGIA////////////
	this.player=function(){
		if(posPx[nodoPrimario]>posPx[nodoActual]){	
			this.posX-=Math.cos(this.rotZ);
			this.posY-=Math.sin(this.rotZ);
			contextoFinal.drawImage(cocheBotI,this.posX,this.posY,15,15);
		}
		if(posPy[nodoPrimario]<posPy[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contextoFinal.drawImage(cocheBotAb,this.posX,this.posY,15,15);
		}
		if(posPx[nodoPrimario]<posPx[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contextoFinal.drawImage(cocheBot,this.posX,this.posY,15,15);
		}
		if(posPy[nodoPrimario]>posPy[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contextoFinal.drawImage(cocheBotAr,this.posX,this.posY,15,15);	
		}
		if(this.posX==posPx[nodoActual] && this.posY==posPy[nodoActual]){
			this.posX=posPx[nodoActual];										//recoloco bot para que no almacene decimas de error
			this.posY=posPy[nodoActual];										//recoloco bot para que no almacene decimas de error
			nodoPrimario=nodoActual;
			/////////////////CONTROL DE LOS NOODS////////////////////////
			if(nodoPrimario==1){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=2}else{nodoActual=3}
			}
			else if(nodoPrimario==3){nodoActual=1;}
			else if(nodoPrimario==2){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=5;}else{nodoActual=4;}
			}
			else if(nodoPrimario==4){nodoActual=6;}
			else if(nodoPrimario==6){nodoActual=7;}
			else if(nodoPrimario==7){nodoActual=8;}	
			else if(nodoPrimario==8){nodoActual=9;}
			else if(nodoPrimario==9){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=10;}else{nodoActual=11;}
			}
			else if(nodoPrimario==11){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=9;}else{nodoActual=12;}
			}
			if(nodoPrimario==12){nodoActual=13;}
			else if(nodoPrimario==13){nodoActual=14;}
			else if(nodoPrimario==10){nodoActual=15;}
			else if(nodoPrimario==15){nodoActual=16;}	
			else if(nodoPrimario==16){nodoActual=17;}
			else if(nodoPrimario==17){nodoActual=18;}
			else if(nodoPrimario==18){nodoActual=19;}
			else if(nodoPrimario==19){nodoActual=20;}
			else if(nodoPrimario==5){nodoActual=21;}
			else if(nodoPrimario==21){nodoActual=22;}
			else if(nodoPrimario==22){nodoActual=23;}
			else if(nodoPrimario==23){nodoActual=24;}
			else if(nodoPrimario==24){nodoActual=25;}
			else if(nodoPrimario==25){nodoActual=26;}
			else if(nodoPrimario==26){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=11;}else{nodoActual=13;}
			}
			else if(nodoPrimario==14){nodoActual=27;}
			else if(nodoPrimario==27){nodoActual=28;}
			else if(nodoPrimario==28){nodoActual=20;}
			else if(nodoPrimario==20){nodoActual=29;}
			else if(nodoPrimario==29){nodoActual=0;}
			else if(nodoPrimario==0){nodoActual=1;}
			this.rotZ = hallarAngulo(posPx[nodoPrimario],posPy[nodoPrimario],posPx[nodoActual],posPy[nodoActual]);
		}
	}
}
	