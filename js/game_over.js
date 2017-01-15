var Game_Over = {

	musicEnd: null,
	botonEnd: null,
	fondoEnd: null,

	preload: function() {
		juego.load.image('boton', 'img/play.png');
		juego.load.image('fondo', './img/fin.png');
		juego.load.audio('musicEnd', 'mp3/fin.mp3');
	},
	
	create: function() {

		fondoEnd = juego.add.sprite(0, 0, 'fondo');

		fondoEnd.height = juego.height;
		fondoEnd.width = juego.width;

		botonEnd = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		
		var that = this;

		var txtEnd = juego.add.text(juego.width/2, (juego.height/2.5) - 50, "Your Score: \n\t" + puntos, {font: "60px 'Permanent Marker'", fill:"#c1457b", stroke: '#000000', align:"center"});
		txtEnd.anchor.setTo(0.5);
		txtEnd.setShadow(2,2, 'rgba(0,0,0,1)', 0);

		puntos = 0;

		var boton = juego.add.button(juego.width/2, (juego.height/2) + 100, 'boton', this.iniciarJuego, this);
		boton.anchor.setTo(0.5);
		boton.height = juego.height/8;
		boton.width = juego.width/3;

		musicEnd = juego.add.audio('musicEnd');
		musicEnd.loop = true;
		musicEnd.play();
	},

	update: function() {
		if(botonEnd.isDown) {
			this.iniciarJuego();
        }
	},

	iniciarJuego: function() {
		musicEnd.stop();
		this.state.start('Juego');
	}
};

var puntos = 0;

var alto  = document.documentElement.clientHeight;
var ancho = document.documentElement.clientWidth > 800 ? 800 : document.documentElement.clientWidth;
var juego = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'bloque-juego'); // TODO cambiar ancho y alto por el del dispositivo, max 800px de ancho

juego.state.add('Inicio', Inicio);
juego.state.add('Juego', Juego);
juego.state.add('End', Game_Over);

juego.state.start('Inicio');
