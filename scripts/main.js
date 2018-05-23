// TODO: Change name

class Main {
	constructor() {
		this.deck = new Deck()
		//this.person = new Person()
		//this.computer = new Person()
	}

	start() {
		// shuffle deck
		// Select main season
		// Select stage of progress (current season)
		// pass out stuff
	}
/*
	shuffleDeck() {
		// Generate array of indices with
		var indices = this.CreateIndicesWithLengthOf(40)
		// Make new array and clear deck.cards
		// Push randomized ones to 
	}

	CreateIndicesWithLengthOf(number) {
		// Populate binary tree
		//var tree = [[][20],[7, 15], [25, 45], [3, 10], [20, 30], [40, 50]]
		var tree = []
		for(var i = 0; i < number; i++) {
			var no_new_index = true

			while(no_new_index) {
				var node = 1;
				var index = Math.floor(Math.random() * 40)
				var search_not_finished = true;

				while(search_not_finished) {
					if (tree[node] == undefined) {
						tree[node] = [number]
						no_new_index = false
						search_not_finished = false
					} else if(tree[node].length == 1 || tree[node] == null) {
						tree[node] = [number]
						no_new_index = false
						search_not_finished = false
					} else if(number == tree[node][0] || number == tree[node][1]) {
						search_not_finished = false
						// Restart index generation
					} else if(number < tree[node][0]) {
						node = node * 2
					} else if(number > tree[node][1]) {
						node = node * 2 + 1
					} 
				}
			}
		}

		console.log(tree)
		return tree
	}

*/
	dealCards() {

	}
}
