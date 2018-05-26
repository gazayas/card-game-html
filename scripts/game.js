class Game {

	// TODO: Make all variables _ case, not camel case

	constructor() {
		this.deck = new Deck()
		this.player = new Player()
		this.computer = new Player(true)

		this.SEASONS = this.deck.getSeasons()
		this.currentSeason = this.SEASONS[0]
		this.mainSeason

		this.cardComparisonResult
	}

	start() {
		this.shuffleDeck()
		this.meanSeason = this.selectMainSeason()
		var numberOfRounds = 1 // TODO: Change to 4 rounds

		// Go into main flow
		for(var i = 1; i <= numberOfRounds; i++) {
			this.startRound(i)
		}

		// End game, put results, go back to starting screen
	}

	shuffleDeck() {
		var indices = this.CreateRandomIndicesWithLengthOf(this.deck.cards.length)
		var old_card_array = this.deck.cards
		this.deck.cards = []

		for(var i = 0; i < old_card_array.length; i++) {
			this.deck.cards.push(old_card_array[indices[i]])
		}
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

	// TODO: Display 4 random cards and have the user choose 1
	selectMainSeason() {
		var index = Math.floor(Math.random() * this.SEASONS.length)
		return this.SEASONS[index]
	}

	startRound(roundNumber) {
		// Declare season
		this.dealCardsAccordingTo(roundNumber)

		// wait for user input
		// after input is done, computer goes
		// calculate score
		this.player.turn = true

		// Change seasons
		this.currentSeason = this.SEASONS[roundNumber - 1]
	}

	dealCardsAccordingTo(roundNumber) {
		for(var i = 0; i < 7 - roundNumber; i++) {
			this.player.hand.push(this.deck.cards.pop())
			this.computer.hand.push(this.deck.cards.pop())
		}

		for(i = 0; i < this.player.hand.length; i++) {
			var player = this.player
			var computer = this.computer
		}
	}

	compareCards(card_image) {
		if(this.player.turn == false) { return }

		this.player.turn = false
		console.log("Comparing cards...")

		var player_card = this.player.hand.find(function(hand) { return hand.image == card_image })
		// Do all the logic
		// Give it some time (the equivalent it takes to do all the animation),
		// and then do the setTimeout back to this.game.player.turn = true

		// Select computer card
		var computer_card_idx = Math.floor(Math.random() * this.computer.hand.length)
		var computer_card = this.computer.hand[computer_card_idx]

		// Make comparisons

		// Update score

		var resetTurn = setTimeout(function() {
			console.log("play again")
			console.log(this.game.player.turn = true)
		}, 2000)
	}
}
