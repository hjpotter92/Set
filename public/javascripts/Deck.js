// bug if set is undefined
// Deck.js has dependecy on Card.js
Set = Set || {}

Set.Deck = (function(Set){
	var Card = Set.Card;
	var Deck = function(count, minSet, maxSet){
		// check is such deck can be generated
		if(count > 81 || count < 1 || minSet > maxSet || minSet > ( (count) * (count - 1) ) / 6){
			return null;
		}

		// public members
		this.cardsSelected = 0;
		this.setsFound = [];
		this.totalSets = [];
		this.cards = [];
		this.selectedCards = [];
		this.isSelected = [];

		// generate new cards on deck and find all sets
		while(this.cards.length != count || this.totalSets.length < minSet || this.totalSets.length > maxSet){
			this.cards = [];
			for(var i = 0; i < count; i++)
				this.cards.push(Card.generateNew(this.cards, i));
			this.totalSets = Card.findAllSets(this.cards);
		}

		// mark all cards as unselected
		for(var i = 0; i < count; i++){
			this.isSelected.push(false);
		}
	
		// method to toggle card selection
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

		// method to check if new set found. Return true or false.
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

		// method to clear selection
		this.clearSelection = function(){
			this.isSelected = [];
			this.selectedCards = [];
			for(var i = 0; i < count; i++){
				this.isSelected.push(false);
			}
		}
	}
	return Deck;
})(Set || {});