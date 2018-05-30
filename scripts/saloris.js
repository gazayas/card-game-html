// TODO: Make all variables _ case, not camel case

class Saloris {
	constructor() {
		this.player = new Player()
		this.computer = new Player(true)

		this.game_board =        document.getElementById("board")
		this.current_season_ui = document.getElementById("current_season")
		this.score_ui =          document.getElementById("score")
		this.computer_hand_ui =  document.getElementById("computer_hand")
		this.play_area_ui =      document.getElementById("play_area")
		this.player_hand_ui =    document.getElementById("player_hand")
		this.draw_standby_ui =   document.getElementById("draw_standby")
		this.start_button =      document.getElementById("start_button")

		this.can_proceed = false

		this.SEASONS = ["春", "夏", "秋", "冬"]
		this.currentSeason = this.SEASONS[0]

		this.current_round

		this.player_card_in_play
		this.computer_card_in_play
		this.player_draw_card
		this.computer_draw_card
		this.draw
		this.last_win // "player" or "computer"
	}

	start() {
		this.start_button.style.visibility = "hidden"
		this.deck = new Deck()
		this.deck = this.player.shuffle(this.deck)
		this.current_round = 1
		this.player.score = 0
		this.computer.score = 0
		this.score_ui.innerHTML = "Player score: 0  Computer score: 0"
		this.startRound(this.current_round)
	}

	startRound(roundNumber) {
		// TODO: Have the deck on the side. User clicks, and dealUI fires for animation
		console.log("Round " + roundNumber + " has started")

		this.currentSeason = this.SEASONS[roundNumber - 1]
		this.current_season_ui.innerHTML = "Season: " + this.currentSeason
		// ここでdivか何かで表示する
		// alert(this.currentSeason + "になりました")

		this.dealCardsAccordingTo(roundNumber)

		for(var i = 0; i < this.player.hand.length; i++) {
			this.player.hand[i].image.setAttribute("onclick", "saloris.playCards(this)")
			this.player.hand[i].image.imagePng = this.player.hand[i].image.src
		}

		for(i = 0; i < this.computer.hand.length; i++) {
			this.computer.hand[i].imagePng = this.computer.hand[i].image.src
			this.computer.hand[i].image.src = this.computer.hand[i].backside
			this.computer.hand[i].image.alt = ""
		}

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
		// Use setTimeout() to deal each card. this.player.turn = true after that
		for(var i = 0; i < saloris.player.hand.length; i++) {
			this.player_hand_ui.appendChild(saloris.player.hand[i].image)
			this.computer_hand_ui.appendChild(saloris.computer.hand[i].image)
		}
	}

	// Attached to card image in index.html
	playCards(card_image) {
		if(this.player.turn == false) { return }

		card_image.setAttribute("onclick", "")

		this.player.turn = false
		console.log("Comparing cards...")

		this.player_card_in_play = this.player.hand.find(function(hand) { return hand.image == card_image })

		var computer_card_idx
		var card_found = false
		while(!card_found) {
			computer_card_idx = Math.floor(Math.random() * this.computer.hand.length)
			if (this.computer.hand[computer_card_idx] != this.computer_draw_card) {
				card_found = true
			}
		}
		this.computer_card_in_play = this.computer.hand[computer_card_idx]
		this.computer_card_in_play.image.src = this.computer_card_in_play.imagePng

		// Make comparisons
		this.compareCards(this.player_card_in_play, this.computer_card_in_play)

		this.player.turn = true
	}

	compareCards(player_card, computer_card) {
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
			console.log("This is a draw")

			// TODO: Refactor
			if(this.player.hand.length == 1) {
				console.log("this is the last card. Points go to person who won last")
				this.draw = false
				if(this.last_win == "player") {
					this.player.score += 1
				} else if (this.last_win == "computer") {
					this.computer.score += 1
				} else {
					console.log("NO WAN GETZ POINTZ")
				}
			} else if(this.draw) { // TODO: Bug - Takes out extra card? When double draw
				console.log("Points go to person who won last")
				this.draw = false
				if(this.last_win == "player") {
					this.player.score += 1
				} else if (this.last_win == "computer") {
					this.computer.score += 1
				} else {
					console.log("NO WAN GETZ POINTZ")
				}
			} else {
				this.draw = true

				// Move cards to draw_standby area
				$("#play_area").children().appendTo(draw_standby)

				this.player_draw_card = player_card
				this.computer_draw_card = computer_card
				this.player.turn = true

				return
			}

			} else if( // win
				(player_card.season == this.currentSeason && computer_card.season != this.currentSeason) ||
				((player_card.season == this.currentSeason && computer_card.season == this.currentSeason) &&
				(player_card.number > computer_card.number)) ||
				((player_card.season != this.currentSeason && computer_card.season != this.currentSeason) &&
				(player_card.number > computer_card.number))
			) {
			this.player.score += this.draw ? 2 : 1
			this.draw = false
			this.last_win = "player"
		} else { // lose
			this.computer.score += this.draw ? 2 : 1
			this.draw = false
			this.last_win = "computer"
		}

		this.score_ui.innerHTML = "Player score: "   + this.player.score + " " +
															"Computer score: " + this.computer.score

		this.can_proceed = true
	}

	proceed() {
		if(!this.can_proceed) { return false }

		this.can_proceed = false

		console.log(this.draw)
		if(this.draw) { $("#play_area").children().appendTo("#draw_standby") }

		this.player.hand.splice(this.player.hand.indexOf(this.player_card_in_play), 1)
		this.computer.hand.splice(this.computer.hand.indexOf(this.computer_card_in_play), 1)
		$('#play_area').children().remove()

		if(this.player_draw_card && this.computer_draw_card) {
			$(this.player_draw_card.image).remove()
			$(this.computer_draw_card.image).remove()

			this.player.hand.splice(this.player.hand.indexOf(this.player_draw_card), 1)
			this.computer.hand.splice(this.computer.hand.indexOf(this.computer_draw_card), 1)

			this.player_draw_card = null
			this.computer_draw_card = null
		}

		if(this.player.hand.length == 0 && this.current_round < 4) {
			this.current_round += 1
			this.startRound(this.current_round)
		} else if(this.player.hand.length == 0 && this.current_round == 4) {
			var end_script = "The game is finished.\n" +
			"Player score: " + this.player.score + "\n" +
			"The computer's score: " + this.computer.score + "\n"
			if(this.player.score > this.computer.score) {
				end_script += "You won"
			} else if (this.player.score < this.computer.score) {
				end_script += "The computer won"
			} else {
				end_script += "It's a tie"
			}
			alert(end_script)

			this.current_season_ui.innerHTML = ""
			this.score_ui.innerHTML = ""
			this.start_button.style.visibility = "visible"
		}
	}
}
