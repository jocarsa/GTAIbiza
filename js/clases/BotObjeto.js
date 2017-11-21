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
			contexto1.drawImage(cocheBotI,this.posX-camara.vistaX,this.posY-camara.vistaY,15,15);
		}
		if(posPy[nodoPrimario]<posPy[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contexto1.drawImage(cocheBotAb,this.posX-camara.vistaX,this.posY-camara.vistaY,15,15);
		}
		if(posPx[nodoPrimario]<posPx[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contexto1.drawImage(cocheBot,this.posX-camara.vistaX,this.posY-camara.vistaY,15,15);
		}
		if(posPy[nodoPrimario]>posPy[nodoActual]){	
			this.posX+=Math.cos(this.rotZ);
			this.posY+=Math.sin(this.rotZ);
			contexto1.drawImage(cocheBotAr,this.posX-camara.vistaX,this.posY-camara.vistaY,15,15);	
		}
		if(this.posX==posPx[nodoActual] && this.posY==posPy[nodoActual]){
			this.posX=posPx[nodoActual];										//recoloco bot para que no almacene decimas de error
			this.posY=posPy[nodoActual];										//recoloco bot para que no almacene decimas de error
			nodoPrimario=nodoActual;
			/////////////////CONTROL DE LOS NOODS////////////////////////
			
			if(nodoPrimario==1){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=3;}else{nodoActual=2;}
			}
			if(nodoPrimario==3){
				nodoActual=4;
			}
			if(nodoPrimario==4){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=6;}else{nodoActual=5;}
			}
			if(nodoPrimario==5){
				nodoActual=7;
			}
			if(nodoPrimario==7){
				nodoActual=8;
			}
			if(nodoPrimario==8){
				nodoActual=9;
			}
			if(nodoPrimario==9){
				nodoActual=10;
			}
			if(nodoPrimario==10){
				nodoActual=11;
			}
			if(nodoPrimario==11){
				nodoActual=12;
			}
			if(nodoPrimario==12){
				nodoActual=13;
			}
			if(nodoPrimario==13){
				nodoActual=1;
			}
			if(nodoPrimario==2){
				nodoActual=15;
			}
			if(nodoPrimario==15){
				nodoActual=16;
			}
			if(nodoPrimario==16){
				nodoActual=17;
			}
			if(nodoPrimario==17){
				nodoActual=18;
			}
			if(nodoPrimario==18){
				nodoActual=19;
			}
			if(nodoPrimario==19){
				nodoActual=20;
			}
			if(nodoPrimario==20){
				nodoActual=21;
			}
			if(nodoPrimario==21){
				nodoActual=22;
			}
			if(nodoPrimario==22){
				nodoActual=23;
			}
			if(nodoPrimario==23){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=25;}else{nodoActual=24;}
			}
			if(nodoPrimario==24){
				nodoActual=2;
			}
			if(nodoPrimario==25){
				nodoActual=4;
			}
			if(nodoPrimario==6){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=14;}else{nodoActual=26;}
			}
			if(nodoPrimario==14){
				nodoActual=27;
			}
			if(nodoPrimario==27){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=28;}else{nodoActual=30;}
			}
			if(nodoPrimario==26){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=29;}else{nodoActual=32;}
			}
			if(nodoPrimario==30){
				nodoActual=33;
			}
			if(nodoPrimario==33){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=36;}else{nodoActual=31;}
			}
			if(nodoPrimario==31){
				nodoActual=40;
			}
			if(nodoPrimario==40){
				nodoActual=42;
			}
			if(nodoPrimario==42){
				nodoActual=72;
			}
			if(nodoPrimario==72){
				nodoActual=43;
			}
			if(nodoPrimario==43){
				nodoActual=41;
			}
			if(nodoPrimario==41){
				nodoActual=35;
			}
			if(nodoPrimario==35){
				nodoActual=36;
			}
			if(nodoPrimario==36){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=62;}else{nodoActual=37;}
			}
			if(nodoPrimario==62){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=61;}else{nodoActual=63;}
			}
			if(nodoPrimario==63){
				nodoActual=60;
			}
			if(nodoPrimario==60){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=74;}else{nodoActual=73;}
			}
			if(nodoPrimario==74){
				nodoActual=71;
			}
			if(nodoPrimario==71){
				nodoActual=73;
			}
			if(nodoPrimario==73){
				nodoActual=70;
			}
			if(nodoPrimario==70){
				var aux=Math.ceil(Math.random()*3);
				if(aux==1){nodoActual=69;}else{nodoActual=53;}
			}
			if(nodoPrimario==69){
				nodoActual=28;
			}
			if(nodoPrimario==28){
				nodoActual=38;
			}
			if(nodoPrimario==36){
				nodoActual=62;
			}
			if(nodoPrimario==62){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=61;}else{nodoActual=63;}
			}
			if(nodoPrimario==61){
				var aux=Math.ceil(Math.random()*2);
				if(aux==1){nodoActual=70;}else{nodoActual=60;}
			}
			if(nodoPrimario==37){
				var aux=Math.ceil(Math.random()*3);
				if(aux==1){nodoActual=61;}else{nodoActual=38;}
			}
			if(nodoPrimario==37){
				var aux=Math.ceil(Math.random()*3);
				if(aux==1){nodoActual=61;}else{nodoActual=38;}
			}
			if(nodoPrimario==38){
				var aux=Math.ceil(Math.random()*3);
				if(aux==1){nodoActual=53;}else{nodoActual=39;}
			}
			if(nodoPrimario==39){
				nodoActual=44;
			}
			if(nodoPrimario==44){
				nodoActual=50;
			}
			if(nodoPrimario==50){
				nodoActual=45;
			}
			if(nodoPrimario==45){
				nodoActual=34;
			}
			if(nodoPrimario==34){
				nodoActual=26;
			}
			if(nodoPrimario==61){
				nodoActual=70;
			}
			if(nodoPrimario==70){
				nodoActual=53;
			}
			if(nodoPrimario==53){
				nodoActual=52;
			}
			if(nodoPrimario==52){
				nodoActual=58;
			}
			if(nodoPrimario==58){
				nodoActual=64;
			}
			if(nodoPrimario==64){
				nodoActual=65;
			}
			if(nodoPrimario==65){
				nodoActual=51;
			}
			if(nodoPrimario==51){
				nodoActual=50;
			}
			if(nodoPrimario==37){
				nodoActual=69;
			}
			


			
			
			this.rotZ = hallarAngulo(posPx[nodoPrimario],posPy[nodoPrimario],posPx[nodoActual],posPy[nodoActual]);
		}
	}
}
	