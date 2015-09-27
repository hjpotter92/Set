var set = angular.module('set', []);

set.controller('deckController',
function($scope){
	$scope.cards = [];
	$scope.getNumber = function(num){
		return new Array(num);
	}
	var Card = function(iconColors, bgColors, shapes){
		return {
			iconColor: iconColors[Math.floor(Math.random() * 3)],
			bgColor: bgColors[Math.floor(Math.random() * 3)],
			icon: shapes[Math.floor(Math.random() * 3)],
			count: Math.floor(Math.random() * 3) + 1
		};
	};
	for(var i = 0; i < 12; i++){
		$scope.cards.push(new Card(
			['red', 'green', 'blue'], 
			['white', 'yellow', 'pink'], 
			['bolt', 'child', 'heartbeat']
		));
	}
});
