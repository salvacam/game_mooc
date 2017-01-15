var Inicio = {

	musicInit: null,
	botonInicio: null,
	melocoton: null,
	fresa: null,
	boton: null,

	preload: function() {
		juego.load.image('boton', 'img/play.png');
		juego.load.image('fondo', './img/inicio.png'); 
		juego.load.image('fresa', './img/fresa.png'); 
		juego.load.image('melocoton', './img/melocoton.png'); 
		juego.load.image('cesta', './img/cesta.png'); 
		juego.load.audio('musicInit', 'mp3/inicio.mp3');
	},

	create: function() {		
        var fondoInicio = juego.add.sprite(0, 0, 'fondo');

    	fondoInicio.height = juego.height;
    	fondoInicio.width = juego.width;

    	botonInicio = juego.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		
		var that = this;

		var txtTitulo = juego.add.text(juego.width/2, (juego.height/2.5) - 50, "Crazy \n\tFruits", 
			{font: "65px 'Permanent Marker', cursive", fill:"#c1457b", stroke: '#000000', align:"center"});
		txtTitulo.anchor.setTo(0.5);
		txtTitulo.setShadow(2,2, 'rgba(0,0,0,1)', 0);

		setTimeout(function() {
			if (juego.state.current != 'Inicio') {
				return;
			}
        	melocoton = juego.add.sprite(juego.width/6.5, juego.height/3, 'melocoton');
        	melocoton.height = juego.height/8;
    		melocoton.width = juego.width/8;
		}, 500);

		setTimeout(function() {
			if (juego.state.current != 'Inicio') {
				return;
			}
        	fresa = juego.add.sprite(juego.width/1.25, juego.height/2, 'fresa');
        	fresa.height = juego.height/8;
    		fresa.width = juego.width/8;
		}, 1000);

		setTimeout(function() {
			if (juego.state.current != 'Inicio') {
				return;
			}
        	cesta = juego.add.sprite(juego.width/2.5, juego.height - 150, 'cesta');
        	cesta.height = juego.height/8;
    		cesta.width = juego.width/6;
		}, 1250);
		
		setTimeout(function() {
			that.crearBoton();			
		}, 1500);

		musicInit = juego.add.audio('musicInit');
		musicInit.loop = true;
		musicInit.play();
	},

	update: function() {
		if(botonInicio.isDown) {
			this.iniciarJuego();
        }
	},

	iniciarJuego: function() {
		musicInit.stop();
		this.state.start('Juego');
	},

	crearBoton: function() {
		if (juego.state.current != 'Inicio') {
			return;
		}
		var boton = juego.add.button(juego.width/2, (juego.height/2) + 100, 'boton', this.iniciarJuego, this);
		boton.anchor.setTo(0.5);
		boton.height = juego.height/8;
		boton.width = juego.width/3;
	}
};