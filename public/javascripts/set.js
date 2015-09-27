var set = angular.module('set', []);

set.controller('deckController',
function($scope){
	$scope.cards = [];
	var Card = function(colors, shades, shapes){
		return {
			color: colors[2*Math.random()],
			shade: shades[2*Math.random()],
			shape: shades[2*Math.random()],
			count: Math.ceil(3*Math.random())
		};
	};
	for(var i = 0; i < 12; i++){
		$scope.cards.push(new Card(
			['red', 'green', 'violet'], 
			['emtpy', 'solid', 'partial'], 
			['dot', 'cat', 'bat']
		));
	}
});