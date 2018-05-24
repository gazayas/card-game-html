class Player {
	constructor(isComputer = false) {
		this.isComputer = isComputer
		this.hand = []
		this.score = 0
	}

	playCard() {
		if(this.isAi){
			var card_to_play = Math.floor(Math.random() * this.hand.length)
			// Automate
		} else {
			// wait for user input
		}
	}
}
