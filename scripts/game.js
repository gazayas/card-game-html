class Game {
	constructor() {
		this.deck = new Deck()
		this.player = new Player()
		this.computer = new Player(true)

		this.SEASONS = this.deck.getSeasons()
		this.currentSeason = this.SEASONS[0]
		this.mainSeason
	}

	start() {
		this.shuffleDeck()
		this.meanSeason = this.selectMainSeason()

		// Go into main flow
		for(var i = 1; i <= 4; i++) {
			this.startRound(i)
		}

		// Put results, go back to starting screen
	}

	shuffleDeck() {
		var indices = this.CreateIndicesWithLengthOf(this.deck.cards.length)
		var old_card_array = this.deck.cards
		this.deck.cards = []

		for(var i = 0; i < old_card_array.length; i++) {
			this.deck.cards.push(old_card_array[indices[i]])
		}
	}

	CreateIndicesWithLengthOf(number) {
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

	// TODO: Display 4 random cards and have the user choose 1
	selectMainSeason() {
		var index = Math.floor(Math.random() * this.SEASONS.length)
		return this.SEASONS[index]
	}

	startRound(roundNumber) {
		// Declare season
		this.dealCardsAccordingTo(roundNumber)

		/*while(this.player.hand.length != 0) {
			// wait for user input
			// after input is done, computer goes
			// calculate score
		}*/

		// Change seasons
		this.currentSeason = this.SEASONS[roundNumber - 1]
	}


	dealCardsAccordingTo(roundNumber) {
		for(var i = 0; i < 7 - roundNumber; i++) {
			this.player.hand.push(this.deck.cards.pop())
			this.computer.hand.push(this.deck.cards.pop())
		}
	}

	compareCards(player_card, computer_card) {

	}
}
