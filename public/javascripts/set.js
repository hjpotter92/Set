var set = angular.module('set', []);

set.controller('deckController',
function($scope){
	
	// Constructor of new card
	var Card = function(id){
		var iconColors = ['red', 'green', 'blue'];
		var bgColors = ['white', 'yellow', 'pink'];
		var shapes = ['bolt', 'child', 'heartbeat'];
		this.id = id;
		this.iconColor = iconColors[Math.floor(Math.random() * 3)];
		this.bgColor = bgColors[Math.floor(Math.random() * 3)];
		this.icon = shapes[Math.floor(Math.random() * 3)];
		this.count = Math.floor(Math.random() * 3) + 1;
		this.equals = function (other){
			if( this.iconColor == other.iconColor &&
				this.bgColors == other.bgColor &&
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
	
	// Build 12 unique cards
	$scope.cards = [];
	var temp = new Card(0);
	for(var i = 0; i < 12; i++){
		for(var j = 0; j < i; j++){
			if(temp.equals($scope.cards[j])){
				temp = new Card(i);
				j = -1;
			}
		}
		$scope.cards.push(temp);
		temp = new Card(i+1);
	}
	
	// check if three card form set
	var checkSet = function(a, b, c){
		if(a.iconColor == b.iconColor && a.iconColor != c.iconColor)
			return false;
		if(a.bgColor == b.bgColor && a.bgColor != c.bgColor)
			return false;
		if(a.icon == b.icon && a.icon != c.icon)
			return false;
		if(a.count == b.count && a.count != c.count)
			return false;	
		if(a.iconColor != b.iconColor && a.iconColor == c.iconColor)
			return false;
		if(a.bgColor != b.bgColor && a.bgColor == c.bgColor)
			return false;
		if(a.icon != b.icon && a.icon == c.icon)
			return false;
		if(a.count != b.count && a.count == c.count)
			return false;				
		return true;				
	};
	
	// Current status of deck
	$scope.selectedCount = 0;
	$scope.isSelected = [];
	for(var i = 0; i < 12; i++)
		$scope.isSelected.push(false);
		
	// On card click
	$scope.toggleCard = function(id){
		if($scope.isSelected[id] == false){
			$scope.selectedCount += 1;
			$scope.isSelected[id] = true;
		}
		else{
			$scope.selectedCount -= 1;
			$scope.isSelected[id] = false;
		}
		
		if($scope.selectedCount == 3){
			var selectedCards = [];
			for(i = 0; i < 12; i++){
				if($scope.isSelected[i] == true){
					selectedCards.push($scope.cards[i]);
					$scope.isSelected[i] = false;
					$scope.selectedCount -= 1;
				}
			}
			var isSet = checkSet(selectedCards[0], selectedCards[1], selectedCards[2]);
			alert(isSet);
		}
			
	}
	 
	$scope.getNumber = function(num){
	return new Array(num);
}
});
