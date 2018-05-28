// TODO: Change class name to Saloris
// TODO: Make all variables _ case, not camel case

class Game {
	constructor() {
		this.deck = new Deck()
		this.player = new Player()
		this.computer = new Player(true)

		this.game_board = document.getElementById("board")
		this.current_season_ui = document.getElementById("current_season")
		this.computer_hand_ui = document.getElementById("computer_hand")
		this.play_area_ui = document.getElementById("play_area")
		this.player_hand_ui = document.getElementById("player_hand")
		this.draw_standby_ui = document.getElementById("draw_standby")

		this.can_proceed = false

		this.SEASONS = this.deck.getSeasons()
		this.currentSeason = this.SEASONS[0]
		this.mainSeason // Needed?

		this.current_round = 1

		this.player_card_in_play
		this.computer_card_in_play
		this.player_draw_card
		this.computer_draw_card
	}

	start() {
		this.deck = this.player.shuffle(this.deck)
		this.mainSeason = this.selectMainSeason()
		var numberOfRounds = 1 // TODO: Change to 4 rounds (actually may not need this)

		// Go into main flow
		this.startRound(this.current_round)

		// End game, put results, go back to starting screen
	}

	// TODO: Display 4 or 6 random cards and have the user choose 1
	// May not need this...
	selectMainSeason() {
		var index = Math.floor(Math.random() * this.SEASONS.length)
		return this.SEASONS[index]
	}

	startRound(roundNumber) {
		console.log("Round " + roundNumber + " has started")

		this.currentSeason = this.SEASONS[roundNumber - 1]
		this.current_season_ui.innerHTML = "Season: " + this.currentSeason
		// alert(this.currentSeason + "になりました")

		this.dealCardsAccordingTo(roundNumber)
		this.dealUI()

		this.player.turn = true
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

	dealUI() {
		for(var i = 0; i < game.player.hand.length; i++) {
			this.player_hand_ui.appendChild(game.player.hand[i].image)
			this.computer_hand_ui.appendChild(game.computer.hand[i].image) // change to backside image
		}	
	}

	playCards(card_image) {
		if(this.player.turn == false) { return }

		this.player.turn = false
		console.log("Comparing cards...")

		this.player_card_in_play = this.player.hand.find(function(hand) { return hand.image == card_image })

		// Select computer card
		var computer_card_idx = Math.floor(Math.random() * this.computer.hand.length)
		this.computer_card_in_play = this.computer.hand[computer_card_idx]

		// Make comparisons
		this.compareCards(this.player_card_in_play, this.computer_card_in_play)
	}

	compareCards(player_card, computer_card, draw = false) {
		// TODO: Change if 条件分岐 to methods
		// Make a class? WinConditions

		// Put cards in middle
		$(player_card.image).appendTo(play_area_ui)
		$(computer_card.image).prependTo(play_area_ui)

		if( // a draw
				((player_card.season == this.currentSeason && computer_card.season == this.currentSeason) &&
				(player_card.number == computer_card.number)) ||
				((player_card.season != this.currentSeason && computer_card.season != this.currentSeason) &&
				(player_card.number == computer_card.number))
			) {
			if(!draw) {
				// Move cards to draw_standby area
				$(player_card.image).appendTo(draw_standby)
				$(computer_card.image).prependTo(draw_standby)

				this.player_draw_card = player_card
				this.computer_draw_card = computer_card
				this.player.turn = true

				// TODO: cards get moved and then just disapper...
				// この後はユーザのclick eventが発生したら同じメソッドを呼び出すから大丈夫はず
				return 
			} else {
				if(this.player.hand.length == 0) {
					console.log("End process. Throw away cards and points")
				} else {
					compareCards(this.player_draw_card, this.computer_draw_card, true)
				}
			}
		} else if( // win
				(player_card.season == this.currentSeason && computer_card.season != this.currentSeason) ||
				((player_card.season == this.currentSeason && computer_card.season == this.currentSeason) &&
				(player_card.number > computer_card.number)) ||
				((player_card.season != this.currentSeason && computer_card.season != this.currentSeason) &&
				(player_card.number > computer_card.number))
			) {
			this.player.score += draw ? 2 : 1
		} else { // lose
			this.computer.score += draw ? 2 : 1
		}

		if (draw) {
			// delete the draw cards too
		}

		console.log("player card:")
		console.log(player_card)
		console.log("computer card:")
		console.log(computer_card)
		console.log("player score: " + this.player.score)
		console.log("computer score: " + this.computer.score)

		this.can_proceed = true
	}

	proceed() {
		if(!this.can_proceed) { return false }

		this.can_proceed = false

		$("#play_area").children().remove()

		if(this.player_draw_card && this.computer_draw_card) {
			$(this.player_draw_card.image).remove()
			$(this.computer_draw_card.image).remove()

			this.player_draw_card = null
			this.computer_draw_card = null
		}
		
		this.player.hand.splice(this.player.hand.indexOf(this.player_card_in_play), 1)
		this.computer.hand.splice(this.computer.hand.indexOf(this.computer_card_in_play), 1)

		this.player.turn = true // Needed?

		if(this.player.hand.length == 0 && this.current_round < 4) {
			this.current_round += 1
			this.startRound(this.current_round)
		}
	}
}
