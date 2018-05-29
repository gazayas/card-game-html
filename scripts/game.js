// TODO: Change class name to Saloris
// TODO: Make all variables _ case, not camel case

class Game {
	constructor() {
		this.deck = new Deck()
		this.player = new Player()
		this.computer = new Player(true)

		this.game_board =        document.getElementById("board")
		this.current_season_ui = document.getElementById("current_season")
		this.computer_hand_ui =  document.getElementById("computer_hand")
		this.play_area_ui =      document.getElementById("play_area")
		this.player_hand_ui =    document.getElementById("player_hand")
		this.draw_standby_ui =   document.getElementById("draw_standby")

		this.can_proceed = false

		this.SEASONS = this.deck.getSeasons()
		this.currentSeason = this.SEASONS[0]

		this.current_round = 1

		this.player_card_in_play
		this.computer_card_in_play
		this.player_draw_card
		this.computer_draw_card
		this.draw
	}

	start() {
		this.deck = this.player.shuffle(this.deck)

		// Go into main flow
		this.startRound(this.current_round)

		// End game, put results, go back to starting screen
	}

	startRound(roundNumber) {
		// TODO: Have the deck on the side. User clicks, and dealUI fires for animation
		console.log("Round " + roundNumber + " has started")

		this.currentSeason = this.SEASONS[roundNumber - 1]
		this.current_season_ui.innerHTML = "Season: " + this.currentSeason
		// ここでdivか何かで表示する
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
	}

	dealUI() {
		// Use setTimeout() to deal each card
		for(var i = 0; i < game.player.hand.length; i++) {
			this.player_hand_ui.appendChild(game.player.hand[i].image)
			this.computer_hand_ui.appendChild(game.computer.hand[i].image) // change to backside image
		}
	}

	// Attached to card image in index.html
	playCards(card_image) {
		if(this.player.turn == false) { return }

		this.player.turn = false
		console.log("Comparing cards...")

		this.player_card_in_play = this.player.hand.find(function(hand) { return hand.image == card_image })

		// Select computer card
		// var computer_card_idx = Math.floor(Math.random() * this.computer.hand.length)
		// set to 0 for testing
		var computer_card_idx = 0
		// This is an issue if card in the draw areaが当たってしまったら
		// Fix the bug
		this.computer_card_in_play = this.computer.hand[computer_card_idx]

		// Make comparisons
		this.compareCards(this.player_card_in_play, this.computer_card_in_play)
	}

	compareCards(player_card, computer_card, draw = false) {
		this.draw = draw
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
			//if(this.player.hand.length == 0) { end process here. Does the card need to be deleted first to register as 0?}
			if(!this.draw) {
				// Move cards to draw_standby area
				$(player_card.image).appendTo(draw_standby)
				$(computer_card.image).prependTo(draw_standby)

				this.player_draw_card = player_card
				this.computer_draw_card = computer_card
				this.player.turn = true

				return
			} else {
				this.draw = true
				if(this.player.hand.length == 0) {
					console.log("End process. Throw away cards and points")
					console.log("Notify player")
				} else {
					compareCards(player_card, computer_card, true)
				}
			}
			} else if( // win
				(player_card.season == this.currentSeason && computer_card.season != this.currentSeason) ||
				((player_card.season == this.currentSeason && computer_card.season == this.currentSeason) &&
				(player_card.number > computer_card.number)) ||
				((player_card.season != this.currentSeason && computer_card.season != this.currentSeason) &&
				(player_card.number > computer_card.number))
			) {
			console.log("a draw? " + this.draw)
			this.player.score += this.draw ? 2 : 1
			this.draw = false
		} else { // lose
			console.log("a draw? " + this.draw)
			this.computer.score += this.draw ? 2 : 1
			this.draw = false
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
