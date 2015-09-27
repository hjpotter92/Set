var set = angular.module('set', []);

set.controller('deckController',
function($scope){

	var Card = function(iconColors, bgColors, shapes){
		var iconColors = ['red', 'green', 'blue'];
		var bgColors = ['white', 'yellow', 'pink'];
		var shapes = ['bolt', 'child', 'heartbeat'];
		this.iconColor = iconColors[Math.floor(Math.random() * 3)];
		this.bgColor = bgColors[Math.floor(Math.random() * 3)];
		this.icon = shapes[Math.floor(Math.random() * 3)];
		this.count = Math.floor(Math.random() * 3) + 1;
		this.equals = function (other){
			if( this.iconColor == other.iconColor &&
				this.bgColors == other.bgColors &&
				this.icon == other.icon &&
				this.count == other.count
			){
				return true;
			}
			else{
				return false;
			}
		};
	};

	$scope.cards = [];
	for(var i = 1; i < 12; i++){
		var foundNew = false
		while(!foundNew){
			var temp = new Card();
			if(i == 0) 
				foundNew = true;
			for(var j = 0; j < i; j++){
				if(temp.equals($scope.cards[j]))
					break;
				if(j == i - 1)
					foundNew = true;
			}
		}
	}

	$scope.getNumber = function(num){
	return new Array(num);
}
});
