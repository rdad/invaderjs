
// missiles

game.missileManager = {

	nb_missile: 5,

	list: [],

	fired:false,

	fire: function(){

		if(this.fired==false){
			this.fired = true;
			var m = this.getMissile();
			if(m==false)	return false;
			m.position.y = game.player.position.y;
			m.position.x = game.player.position.x + (game.player.dimension.width * .5);
		}
	},

	getMissile: function(){
		for(var j=0; j<this.nb_missile; j++){
			if(this.list[j].alive == false){
				this.list[j].alive = true;
				return this.list[j];
			}	
		}
		return false;
	},

	init: function(){
		for(var j=0; j<this.nb_missile; j++){

			var m = {
				$prite: $('<div class="laser"></div>'),
				position: {
					x:-1000,
					y:0
				},
				vitessey: 8,
				dimension: {
					width: 13,
					height:23
				},
				alive:false,

				update: function(){
					if(this.alive){
						this.position.y -= this.vitessey;
						if(this.position.y<-(this.dimension.height+10)){
							this.alive = false;
						}
					}
				},
				render: function(){
					if(this.alive){
						this.$prite.css({
							left: (this.position.x-(this.dimension.width*.5))+'px',
							top: this.position.y+'px'
						});
					}
				}
			};

			m.$prite.css({
				width: m.dimension.width,
				height: m.dimension.height,
				'background-image': 'url(img/laser.jpg)',
				left: m.position.x+'px',
				top: m.position.y+'px',
				position: 'absolute'
			});

			this.list.push(m);
			$('body').append(m.$prite);
			game.gameloop.addEntity(m);
		}

		// fire!
		KeyboardJS.on('space', function(){
			game.missileManager.fire();
		}, function(){
			game.missileManager.fired = false;
		});
	}
};

