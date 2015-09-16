// player

game.player = {
	live: 0,

	position: {
		x:200,
		y:200
	},
	vitesse: {
		x:0,
		y:0
	},
	step: {
		x:0,
		y:0
	},
	stepSpeed: .4,
	dimension: {
		width: 128,
		height:128
	},
	init: function(){
		this.live = 3;

		this.$prite = $('<div><div class="div3d"></div></div>');
		this.$prite.css({
			width: 				this.dimension.width+'px',
			height: 			this.dimension.height+'px',
			left: 				this.position.x+'px',
			top: 				this.position.y+'px',
			position: 			'absolute',
			'z-index': 100, 
		});
		this.$prite.children('.div3d').css({
			width: 				this.dimension.width+'px',
			height: 			this.dimension.height+'px',
			'background-image': 'url(img/spaceship.png)'
		});

		$('body').append(this.$prite);

		game.gameloop.addEntity(this);

		// Keyboard Events

		KeyboardJS.on('up', function(){
			game.player.step.y = -game.player.stepSpeed;
		}, function(){
			game.player.step.y = 0;
		});

		KeyboardJS.on('down', function(){
			game.player.step.y = game.player.stepSpeed;
		}, function(){
			game.player.step.y = 0;
		});

		KeyboardJS.on('left', function(){
			game.player.step.x = -game.player.stepSpeed;
		}, function(){
			game.player.step.x = 0;
		});

		KeyboardJS.on('right', function(){
			game.player.step.x = game.player.stepSpeed;
		}, function(){
			game.player.step.x = 0;
		});

		console.log('player inited');
	},
	update: function(){
		this.vitesse.x += this.step.x;
		this.vitesse.y += this.step.y;

		this.position.x += this.vitesse.x;
		this.position.y += this.vitesse.y;

		// limite left
		if(this.position.x<0)	this.position.x = 0;

		this.vitesse.x *=0.95;
		this.vitesse.y *=0.95;

		if(this.vitesse.x>-(this.stepSpeed*.5) && this.vitesse.x<(this.stepSpeed*.5)){
			this.vitesse.x = 0;
		}

	},
	render: function(){
		var r = parseInt(this.vitesse.x*6);
		this.$prite.css({
			left: this.position.x+'px',
			top: this.position.y+'px'
		}).children('.div3d').css({
			'-webkit-transform': 'rotateY('+r+'deg) rotateZ('+(r*.2)+'deg)',
			'-moz-transform': 'rotateY('+r+'deg) rotateZ('+(r*.2)+'deg)',
		});
	}
};
