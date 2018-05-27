class Player {
	constructor(isComputer = false) {
		this.isComputer = isComputer
		this.hand = []
		this.turn = false
		this.score = 0
	}

	shuffle(deck) {
		var indices = this.CreateRandomIndicesWithLengthOf(deck.cards.length)
		var old_card_array = deck.cards
		deck.cards = []

		for(var i = 0; i < old_card_array.length; i++) {
			deck.cards.push(old_card_array[indices[i]])
		}

		return deck
	}

	CreateRandomIndicesWithLengthOf(number) {
		var list = []

		for(var i = 0; i < number; i++) {
			var new_index = false
			while(!new_index) {
				var index = Math.floor(Math.random() * number)

				if(!list.includes(index)) {
					list.push(index)
					new_index = true
				}
			}
		}

		return list
	}
}
