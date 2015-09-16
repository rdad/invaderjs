
var game = game || {

	stats: null,

	init: function(){

		// shim layer with setTimeout fallback
		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
		          window.webkitRequestAnimationFrame ||
		          window.mozRequestAnimationFrame    ||
		          window.oRequestAnimationFrame      ||
		          window.msRequestAnimationFrame     ||
		          function( callback ){
		            window.setTimeout(callback, 1000 / 60);
		          };
		})();

		// fps

		this.stats = new Stats();

		var s = $(this.stats.domElement);
		s.css({
			position: 'absolute',
			left: '0px',
			top: '0px',
			'display': 'none'
		});

		$('body').append(s);

		KeyboardJS.on('ctrl + f', game.switchFps);

		// player

		this.player.init();

		// missiles

		this.missileManager.init();

		// aliens

		this.alienManager.init();

	},

	switchFps: function(){
		var show = $(game.stats.domElement).css('display');
		show = (show=='block') ? 'none' : 'block';
		$(game.stats.domElement).css('display',show);
		return false;
	},

	run: function(){

		(function animloop(){		
		  	requestAnimFrame(animloop);

		  	//game.stats.begin();
		  	game.gameloop.run();
    		//game.stats.end();
		})();

		console.log('game running ...');
	}
};

// gameloop

game.gameloop = {

	list: [],

	addEntity: function(entity){
		this.list.push(entity);
	},

	run: function(){
		for(var j=0; j<this.list.length; j++){
			this.list[j].update();
		}
		for(var j=0; j<this.list.length; j++){
			this.list[j].render();
		}
	}
};