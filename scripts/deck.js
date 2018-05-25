class Deck {
	constructor() {
		this.cards = []

		var SEASONS = this.getSeasons()

		for(var i = 0; i < SEASONS.length; i++) {
			for(var number = 1; number <= 10; number++) {
				var image = this.generateImgFrom(i, number)
				this.cards.push(new Card(SEASONS[i], number, image))
			}
		}
	}

	getSeasons() {
		return ["春", "夏", "秋", "冬"]
	}

	generateImgFrom(season, number) {
		// TODO: not good programming. Refactor this.
		// Would be ideal to make a hash like { "spring":"春", ... }
		var season_paths = ["spring", "summer", "fall", "winter"]

		var image = new Image()
		image.src = 'sprites/' + season_paths[season] + '_' + number + '.png'
		image.id = season_paths[season] + '_' + number
		image.className = "card"

		return image
	}
}
