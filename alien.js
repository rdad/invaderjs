
game.alienManager = {

	nb: 10,

	list: [],

	fire: function(){

		if(this.fired==false){
			this.fired = true;
			var m = this.getMissile();
			if(m==false)	return false;
			m.position.y = game.player.position.y;
			m.position.x = game.player.position.x + (game.player.dimension.width * .5);
		}
	},

	getAlien: function(){
		for(var j=0; j<this.nb; j++){
			if(this.list[j].alive == false){
				this.list[j].alive = true;
				return this.list[j];
			}	
		}
		return false;
	},

	init: function(){

		for(var j=0; j<this.nb; j++){

			var m = {
				$prite: $('<div class="alien"></div>'),
				position: {
					x: 0,
					y: 0
				},
				vitesse: {
					x: 0,
					y: Math.floor(Math.random()*5)+2
				},
				dimension: {
					width: 128,
					height:128
				},
				alive:true,

				respawn: function(){
					this.position.x = Math.floor(Math.random()*window.innerWidth);
					this.position.y = -(Math.floor(Math.random()*window.innerHeight)+this.dimension.height); 
				},

				update: function(){
					if(this.alive){
						this.position.y += this.vitesse.y;
						if(this.position.y>window.innerHeight+10){
							this.respawn();
						}
					}
				},
				render: function(){
					if(this.alive){
						this.$prite.css({
							left: this.position.x+'px',
							top: this.position.y+'px'
						});
					}
				}
			};

			m.respawn();

			m.$prite.css({
				width: m.dimension.width,
				height: m.dimension.height,
				'background-image': 'url(img/alien.png)',
				left: m.position.x+'px',
				top: m.position.y+'px',
				position: 'absolute'
			});

			this.list.push(m);
			$('body').append(m.$prite);
			game.gameloop.addEntity(m);
		}
	}
};
