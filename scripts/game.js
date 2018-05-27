//TODO: Change class name to Saloris
// TODO: Make all variables _ case, not camel case

class Game {
	constructor() {
		this.deck = new Deck()
		this.player = new Player()
		this.computer = new Player(true)

		this.SEASONS = this.deck.getSeasons()
		this.currentSeason = this.SEASONS[0]
		this.mainSeason

		this.player_draw_card
		this.computer_draw_card
	}

	start() {
		this.deck = this.player.shuffle(this.deck)
		this.mainSeason = this.selectMainSeason()
		var numberOfRounds = 1 // TODO: Change to 4 rounds

		// Go into main flow
		for(var i = 1; i <= numberOfRounds; i++) {
			this.startRound(i)
		}

		// End game, put results, go back to starting screen
	}

	// TODO: Display 4 or 6 random cards and have the user choose 1
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

	playCards(card_image) {
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
		var result = this.compareCards(player_card, computer_card)

		// Update score

		var resetTurn = setTimeout(function() {
			console.log("play again")
			console.log(this.game.player.turn = true)
		}, 2000)
	}

	compareCards(player_card, computer_card, draw = false) {
		var result

		// TODO: Refactor
		if(player_card.season == this.currentSeason && !computer_card.currentSeason) {
			this.player.score += draw ? 2 : 1
		} else if (player_card.season != this.currentSeason && computer_card.currentSeason == this.currentSeason) {
			this.computer += draw ? 2 : 1
		} else if (player_card.number > computer_card.number) {
			this.player_card.score += draw ? 2 : 1
		} else if (player_card.number < computer_card.number) {
			this.computer += draw ? 2 : 1
		} else {
			if(!draw) {
				// 
				compareCards(player_card, computer_card, draw = true)
			} else if (this.player.hand.length == 0) {
				console.log("End process, throw away cards and points")
			}
		}

		// Delete cards

		if (draw) {
			// delete the draw cards too
		}

		return result
	}
}
