class Deck {
	constructor() {
		this.cards = []

		var SEASONS = ["春", "夏", "秋", "冬"]

		for(var i = 0; i < SEASONS.length; i++) {
			for(var number = 1; number <= 10; number++) {
				var image = "dummy image"
				this.cards.push(new Card(SEASONS[i], number, image))
			}
		}
	}
}
