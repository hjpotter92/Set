var set = angular.module('set', ['ngAnimate']);

set.controller('deckController',
function($scope, $timeout){
	// card Click event handler
	$scope.toggleCard = function(id){
		$scope.deck.toggleCardSelection(id);
		if($scope.deck.selectedCards.length == 3){
			$timeout(function(){
				$isSet = $scope.deck.checkIfNewSet();
				$scope.deck.clearSelection();
				if($isSet) $scope.state = 'success';
				else $scope.state = 'failure';
				$timeout(function(){
					$scope.state = 'waiting';
				}, 500);
			}, 500);
		}
		else{
			$scope.deckState = 'waiting'
		}	
	}

	// generate New Deck event handler
	$scope.generateNewDeck = function(){
		$scope.deck = new Set.Deck(12, 4, 16);
		$scope.state = 'waiting';
	}

	// initialize new deck
	$scope.generateNewDeck();
	$scope.getNumber = Set.getNumber;
});
