function shuffleArray(array) {
	let shuffled = array.slice();

	for (let i = shuffled.length - 1; i > 0; i--) {
	const j = Math.floor(Math.random() * (i + 1));

	[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled;
}


function count(string, letter) {
	string += "";

	let newstr = string.replace(letter, "");

	return string.length - newstr.length
}


const game = {
	acromax: 10,
	currAcro: 0,
	selection: [],
	points: 0,
	pointeligable: true,


	ui: {
		acrodisplay: document.getElementById("acronymdisplay"),
		word1: document.getElementById("word1"),
		word2: document.getElementById("word2"),
		word3: document.getElementById("word3"),
		word4: document.getElementById("word4"),
		input: document.getElementById("input"),
		pointsDisplay: document.getElementById("points"),
		answer: document.getElementById("answer"),
		pointwarn: document.getElementById("pointwarn"),
		revealbutton: document.getElementById("revealbutton"),
	},

	init() {
		this.selection = shuffleArray(securityPlusAcronyms).slice(0, this.acromax);
		this.currAcro = 0;
		this.points = 0;
		this.updateDisplay();
		this.bindInput();
	},

	revealans() {
		const current = this.selection[this.currAcro];
		answer.innerText = current.full;
		answer.style.display = "block";

		revealbutton.style.display = "none";
		
		pointwarn.style.display = "block";
		this.pointeligable = false;
	},
	
	hideans() {
		answer.innerText = "";
		answer.style.display = "none";
		
		revealbutton.style.display = "block";

		pointwarn.style.display = "none";
		this.pointeligable = true;
	},

	bindInput() {
		this.ui.input.addEventListener("input", () => {
		this.checkPartialAnswer();
		});

		this.ui.input.addEventListener("keydown", (e) => {
		if (e.key === "Enter") {
			this.checkFullAnswer();
		}
		});
	},
	

	setWordVisibility(wordCount) {
		const feedbackEls = [
			this.ui.word1,
			this.ui.word2,
			this.ui.word3,
			this.ui.word4,
		];
		
		feedbackEls.forEach((el, index) => {
			if (index < wordCount) {
				el.style.display = "inline-block"; // or "block" depending on your layout
			} else {
				el.style.display = "none";
			}
		});
	},
	

	updateDisplay() {
		const current = this.selection[this.currAcro];
		if (current) {
			this.ui.acrodisplay.innerText = current.acro;
			this.clearFeedback();
			this.ui.input.value = "";
		
			// Set how many word boxes to show
			const wordCount = current.full.split(" ").length;
			this.setWordVisibility(wordCount);
		}
	},
	

	clearFeedback() {
		this.ui.word1.innerText = "";
		this.ui.word2.innerText = "";
		this.ui.word3.innerText = "";
		this.ui.word4.innerText = "";
	},

	checkPartialAnswer() {
		const current = this.selection[this.currAcro];
		const userInput = this.ui.input.value.trim().toLowerCase();
		const userWords = userInput.split(" ");
		const correctWords = current.full.toLowerCase().split(" ");
	
		const feedbackEls = [
			this.ui.word1,
			this.ui.word2,
			this.ui.word3,
			this.ui.word4,
		];
	
		this.clearFeedback();
	
		let matched = 0;
	
		for (let i = 0; i < feedbackEls.length; i++) {
		if (userWords[i] && userWords[i] === correctWords[i]) {
			feedbackEls[i].innerText = capitalize(userWords[i]);
			matched++;
		}
		}
	},
	

	checkFullAnswer() {
		const current = this.selection[this.currAcro];
		const userInput = this.ui.input.value.trim().toLowerCase();
	
		if (userInput === current.full.toLowerCase()) {

			if(this.pointeligable) {this.points++;}
			
			this.currAcro++;
			this.hideans();
		
			if (this.ui.pointsDisplay) {
				this.ui.pointsDisplay.innerText = `Points: ${this.points}`;
			}
		
			if (this.currAcro < this.selection.length) {
				this.updateDisplay();
			} else {
				alert("Session complete");
			}
		}
	},
	
};

// Capitalize helper
function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Start the game
game.init();

