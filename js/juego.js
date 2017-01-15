var Juego = {

	cesta: null,
	fruta: null,
	vidas: 3,
	vidasImg: null,
	timer: null,
	musicOk: null,
	musicKo: null,

	txtPuntos: '',

	acerX: 0,

	preload: function(){
		juego.load.image('cesta', 'img/cesta.png');
		juego.load.image('frutas', 'img/sprite.png');
		juego.load.spritesheet('sprite', 'img/sprite.png', 50, 72);
		juego.load.image('corazon', 'img/corazon.png');
		juego.load.audio('musicKo', 'mp3/ko.mp3');
		juego.load.audio('musicOk', 'mp3/ok.mp3');
	},

	create: function(){

		juego.stage.backgroundColor = "#8b96e5";

    	cesta = juego.add.sprite(juego.width/2.5, juego.height - 75, 'cesta');
    	cesta.height = juego.height/10;
		cesta.width = juego.width/6;
		cesta.anchor.setTo(0.5);

		juego.physics.arcade.enable(cesta);
		cesta.enableBody = true;
		cesta.body.collideWorldBounds = true;


        cursores = juego.input.keyboard.createCursorKeys();
		

		fruta = juego.add.group();
		juego.physics.arcade.enable(fruta);
		fruta.enableBody = true;
		fruta.createMultiple(20, 'sprite', 0, false);
		fruta.setAll('anchor.x', 0.5);
		fruta.setAll('anchor.y', 0.5);
		fruta.setAll('checkWorldBounds', true);
		fruta.setAll('outOfBoundsKill', true);

		timer = juego.time.events.loop(2500, this.crearFruta, this);

		cursores = juego.input.keyboard.createCursorKeys();

		txtPuntos = juego.add.text(60, 20, puntos, {font:"30px 'Permanent Marker'", fill:"#c1457b"});		

		acerX = 0;

		if(window.DeviceMotionEvent){ 
			window.addEventListener('devicemotion',function(evt){
				acerX = Math.round((evt.accelerationIncludingGravity.x * 100) / 100);
			});
		} else {
		  //	alert("Sorry, your browser doesn't support Device Orientation");
		}
		
		musicOk = juego.add.audio('musicOk');
		musicOk.loop = false;
		musicKo = juego.add.audio('musicKo');
		musicKo.loop = false;
		vidas = 3;
		//pintar las vidas
		vidasImg = juego.add.group();
		vidasImg.createMultiple(vidas, 'corazon');
		vidasImg.setAll('anchor.x', 0.5);
		vidasImg.setAll('anchor.y', 0.5);
		for (var i = 1; i <= vidas; i++) {
			var life = vidasImg.getFirstDead();		
			life.reset(juego.width - (i * 45), 30);
		};
	},

	update: function(){		

		if (cursores.right.isDown || acerX < -0.5) {
			cesta.position.x += 5;
		} else if (cursores.left.isDown || acerX > 0.5) {
			cesta.position.x -= 5;
		}

		juego.physics.arcade.overlap(cesta, fruta, this.cogerFruta, null, this);

		var that = this;
        fruta.forEachAlive(function(fruit) {
            if(fruit.previousPosition.y > juego.height - 5 ) {                
                fruit.kill();
                that.perderFruta();
            }
        });

		
		if (puntos > 10 && puntos <= 20) {
			timer.delay = 2000;
		} else if (puntos > 20 && puntos <= 35) {
			timer.delay = 1500;
		} else if (puntos > 35 && puntos <= 50) {
			timer.delay = 1000;
		} else if (puntos > 50 && puntos <= 65) {
			timer.delay = 750;
		} else if (puntos > 65) {
			timer.delay = 500;
		}

	},
	

	crearFruta: function() {
		if (juego.state.current != 'Juego') {
			return;
		}
		var pos = Math.floor(Math.random() * (juego.width - 50)) + 25;
		var fruit = fruta.getFirstDead();
		fruit.physicsBodyType = Phaser.Physics.ARCADE;
		fruit.reset(pos, 0);

        fruit.frame = juego.rnd.integerInRange(0, 6);
		fruit.body.velocity.y = 100 + (Math.random() * 200);
	},
	cogerFruta: function(cesta, fruit) {
		if (juego.state.current != 'Juego') {
			return;
		}
		musicOk.play();
		fruit.kill();
		puntos += 1;
		txtPuntos.text = puntos;
	},

	perderFruta: function() {
		if (juego.state.current != 'Juego') {
			return;
		}
		musicKo.play();

		this.vidas = this.vidas - 1;
		if (this.vidas < 1) {	
			this.vidas = 3;
			this.state.start('End');
		} else {			
			if (vidasImg.children[2].alive) {
				vidasImg.children[2].kill();
			} else if (vidasImg.children[1].alive) {
				vidasImg.children[1].kill();
			} else if (vidasImg.children[0].alive) {
				vidasImg.children[0].kill();
			}
		}
	}
	
}