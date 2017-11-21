const frameTime     = 33;

// Lienzos
var lienzo1 = document.getElementById("lienzo1");
var contexto1 = lienzo1.getContext("2d");
var lienzoCoche = document.getElementById("lienzoCoche");
var contextoCoche = lienzoCoche.getContext("2d");
var lienzoPerro = document.getElementById("lienzoPerro");
var contextoPerro = lienzoPerro.getContext("2d");
var lienzoPlanta = document.getElementById("lienzoPlanta");
var contextoPlanta = lienzoPlanta.getContext("2d");
var lienzoPajaro = document.getElementById("lienzoPajaro");
var contextoPajaro = lienzoPajaro.getContext("2d");
var lienzoPeces = document.getElementById("lienzoPeces");
var contextoPeces = lienzoPajaro.getContext("2d");
var lienzoFinal = document.getElementById("lienzoFinal");
var contextoFinal =  lienzoFinal.getContext("2d");
var temporizador;
var gameOver = false;
var puedesIniciar = 0;
// Mapas dibujados
var mapaBonito = new Image();
mapaBonito.src = "img/ciudad.png";
var mapaPerro = new Image();
mapaPerro.src = "img/ciudadperro.png";
var mapaCoche = new Image();
mapaCoche.src = "img/ciudadcoche.png";
var mapaPlanta = new Image();
mapaPlanta.src = "img/ciudadplanta.png";
var mapaPajaro = new Image();
mapaPajaro.src = "img/ciudadpajaro.png";
var mapaPeces = new Image();
mapaPeces.src = "img/ciudadpeces.png";
var mapaFinal = new Image();
mapaFinal.src = "img/mapaFinal.png";

//---------------------------------------+ PERROS
//Imagen de los perros
var imagenperro = new Image();
imagenperro.src = "img/perro.png";
var numeroperros = 50;
var perro = new Array();
//Meos
var imagenmeo = new Image();
imagenmeo.src = "img/meo.png";
var tiempoSinMeos = 0;
var caducidadDelMeo = 0;
var numeroMeos = 0;
var perroMeos  = new Array();
//---------------------------------------+ 

//---------------------------------------+ COCHE PROTAGONISTA
// Cargamos la imagen del coche
var imagenCoche = new Image();
imagenCoche.src = "img/coche.png";
//---------------------------------------+ 

//---------------------------------------+ COCHE BOT
var posPx=[1080,745,575,745,365,575,365,365,890,890,890,1080,1080,915,915,935,935,765,765,552,552,788,788,958,958,915,915,340,340,1080];
var posPy=[999,999,999,1080,999,675,730,155,155,255,440,255,243,243,136,440,620,620,655,655,1018,675,639,639,413,413,255,136,1018,1018];
var bot1=new botObj(4,6,"1D","1I","1ARRB","1ABJ");
var bot2=new botObj(0,1,"2D","2I","2ARRB","2ABJ");
var bot3=new botObj(12,13,"3D","3I","3ARRB","3ABJ");
var bot4=new botObj(11,9,"4D","4I","4ARRB","4ABJ");
var bot5=new botObj(3,1,"1D","1I","1ARRB","1ABJ");
var bot6=new botObj(5,21,"5D","5I","5ARRB","5ABJ");
var bot7=new botObj(13,14,"6D","6I","6ARRB","6ABJ");
var bot8=new botObj(16,17,"3D","3I","3ARRB","3ABJ");
var bot9=new botObj(8,9,"5D","5I","5ARRB","5ABJ");
var bot10=new botObj(2,5,"4D","4I","4ARRB","4ABJ");

//---------------------------------------+ 

//---------------------------------------+ PLANTAS
var arbol= new Image();
arbol.src = "img/arbol1.png";
var contadorCreacionArboles = 0;
var numeroArboles = 15000;
var contador = numeroArboles;
var randomPosicionArboles = 0;
var lastX = 0;
var lastY = 0;
var distance = 100;
var pruebax;
var pruebay;
var colorMapaArbol;
//---------------------------------------+ 

//---------------------------------------+ PAJAROS
var temporizador;
var manada = [];
var flockRadius = 250;

//Cargamos la imagen de los pajaros
var imagenPajaro = new Image();
imagenPajaro.src = "img/pajarovolando.png";
var imagenpajaroP = new Image();
imagenpajaroP.src = "img/pajaroposando.png";
var imagenpajaro2 = new Image();
imagenpajaro2.src = "img/pajaroFor.png";
//---------------------------------------+

//---------------------------------------+ PECES

//Objetivo Comun Peces
var nBancos = 2; //Numero de peces que habra en cada banco
var objetivosComunes = new Array();
// Se define el número de peces por banco
var nPeces = 100;

// Creo el cursor
var cursor;	

//Cargar Sprite del tiburon
var imgTiburon = new Image();
imgTiburon.src = "img/SStiburon.png";
//Declaramos un tiburon
var tiburon = new Tiburon();
//Iniciamos Conteo del SpriteSheet del Tiburon
var sx = 0;
var sy = 0;


//---------------------------------------+ PAJAROS

inicio();