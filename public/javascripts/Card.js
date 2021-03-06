Set = Set || {};

Set.Card = (function(){
	// Constructor of new card
	var Card = function(id){
		this.id = id;
		this.iconColor = Card.iconColors[Math.floor(Math.random() * 3)];
		this.bgColor = Card.bgColors[Math.floor(Math.random() * 3)];
		this.icon = Card.icons[Math.floor(Math.random() * 3)];
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

	// attach properties of cards here
	Card.icons = ['asterisk', 'cloud', 'heart'];
	Card.iconColors = ['rgb(0, 204, 255)', 'rgb(51, 153, 102)', 'rgb(255, 255, 204)'];
	Card.bgColors = ['rgb(230, 230, 250)', 'rgb(153, 204, 204)', 'rgb(153, 204, 255)'];

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
		for(var i = 0; i < listCards.length; i++){
			for(var j = i + 1; j < listCards.length; j++){
				for(var k = j + 1; k < listCards.length; k++){
					if(Card.checkSet(listCards[i], listCards[j], listCards[k]))
						setList.push(([listCards[i].id, listCards[j].id, listCards[k].id]).sort());
				}
			}
		}
		return setList;
	}
	return Card;
})();