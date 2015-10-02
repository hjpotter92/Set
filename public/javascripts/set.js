var set = angular.module('set', ['ngAnimate']);

set.controller('deckController',
function($scope, $timeout){
	
	// Constructor of new card
	var Card = function(id){
		this.iconColors = ['BurlyWood', '#2DBD75', 'RebeccaPurple'];
		this.bgColors = ['#50AD58', '#BF7F6B', '#4374C4'];
		this.shapes = ['asterisk', 'cloud', 'heart'];
		
		this.id = id;
		this.iconColor = this.iconColors[Math.floor(Math.random() * 3)];
		this.bgColor = this.bgColors[Math.floor(Math.random() * 3)];
		this.icon = this.shapes[Math.floor(Math.random() * 3)];
		this.count = Math.floor(Math.random() * 3) + 1;
		this.equals = function (other){
			if( this.iconColor == other.iconColor &&
				this.bgColor == other.bgColor &&
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

	// method to check if three cards form a set
	Card.checkSet = function(a, b, c){
		if(a.iconColor == b.iconColor && (a.iconColor != c.iconColor || b.iconColor != c.iconColor))
			return false;
		if(a.bgColor == b.bgColor && (a.bgColor != c.bgColor || b.bgColor != c.bgColor))
			return false;
		if(a.icon == b.icon && (a.icon != c.icon || b.icon != c.icon))
			return false;
		if(a.count == b.count && (a.count != c.count || b.count != c.count))
			return false;	
		if(a.iconColor != b.iconColor && (a.iconColor == c.iconColor || b.iconColor == c.iconColor))
			return false;
		if(a.bgColor != b.bgColor && (a.bgColor == c.bgColor || b.bgColor == c.bgColor))
			return false;
		if(a.icon != b.icon && (a.icon == c.icon || b.icon == c.icon))
			return false;
		if(a.count != b.count && (a.count == c.count || b.count == c.count))
			return false;				
		return true;				
	};

	// create a new card different from the ones
	// in input list with a given id
	Card.generateNew = function(listCards, id){
		var temp = new Card(id);
		for(var j = 0; j < listCards.length; j++){
			if(temp.equals(listCards[j])){
				temp = new Card(id);
				j = -1;
			}
		}
		return temp;
	}

	// find all sets
	Card.findAllSets = function(listCards){
		var setList = []
		for(var i = 0; i < 12; i++){
			for(var j = i + 1; j < 12; j++){
				for(var k = j + 1; k < 12; k++){
					if(Card.checkSet(listCards[i], listCards[j], listCards[k]))
						setList.push([listCards[i].id, listCards[j].id, listCards[k].id]);
				}
			}
		}
		return setList;
	}

	// Constructor for deck object representing deck state
	var Deck = function(count){
		if(count > 81)
			return null;
		this.cardsSelected = 0;
		this.setsFound = [];
		this.totalSets = 0;
		this.cards = [];
		this.selectedCards = [];
		this.isSelected = [];

		// generate new cards
		for(var i = 0; i < count; i++)
			this.cards.push(Card.generateNew(this.cards, i));

		// find all sets on deck
		this.totalSets = Card.findAllSets(this.cards);

		// mark all cards as unselected
		for(var i = 0; i < count; i++){
			this.isSelected.push(false);
		}
	
		// toggle card selection
		this.toggleCardSelection = function(id){
			if(this.isSelected[id] == true){
				for(var i = 0; i < this.selectedCards.length; i++)
					if(id == this.selectedCards[i])
						break;
				this.selectedCards.splice(i, 1);
				this.isSelected[id] = false;
			}
			else{
				this.isSelected[id] = true;
				this.selectedCards.push(id);
			}
		}

		// check if new set found. Return true or false.
		// clears selected cards if selection is wrong.
		// also push the set if new. Push as 3 element array
		// comprising of the id, in increasing order
		this.checkIfNewSet = function(){
			var isSet = Card.checkSet(this.cards[this.selectedCards[0]], this.cards[this.selectedCards[1]], this.cards[this.selectedCards[2]]);
			if(!isSet){
				return false;
			}

			var uniqueSetFound = true;
			this.selectedCards.sort();
			for(var i = 0; i < this.setsFound.length && uniqueSetFound == true; i++)
				if(this.setsFound[i][0] == this.selectedCards[0] && this.setsFound[i][1] == this.selectedCards[1] && this.setsFound[i][2] == this.selectedCards[2])
					uniqueSetFound = false;
			if(uniqueSetFound){
				this.setsFound.push(this.selectedCards);
				return true;
			}
			return false;
		}

		// clears selection
		this.clearSelection = function(){
			this.isSelected = [];
			this.selectedCards = [];
			for(var i = 0; i < count; i++){
				this.isSelected.push(false);
			}
		}
	}

	$scope.deck = new Deck(12);	
	$scope.state = 'waiting';
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
	 
	$scope.getNumber = function(num){
		return new Array(num);
	}
});
