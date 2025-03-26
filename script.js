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
	tries: 0,
	badInputStreak: 0,


	ui: {
	acrodisplay: document.getElementById("acronymdisplay"),
	word1: document.getElementById("word1"),
	word2: document.getElementById("word2"),
	word3: document.getElementById("word3"),
	word4: document.getElementById("word4"),
	input: document.getElementById("input"),
	pointsDisplay: document.getElementById("points"), // optional
	},

	init() {
	this.selection = shuffleArray(securityPlusAcronyms).slice(0, this.acromax);
	this.currAcro = 0;
	this.points = 0;
	this.tries = 0;
	this.updateDisplay();
	this.bindInput();
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
	  
		// If no words matched, increase streak
		if (matched === 0 && userInput !== "") {
		  this.badInputStreak++;
		} else {
		  this.badInputStreak = 0; // Reset streak if at least one word is right
		}
	  
		// If player has had 6 "bad inputs" in a row, count it as a try
		if (this.badInputStreak >= 6) {
		  this.badInputStreak = 0;
		  this.tries++;
	  
		  if (this.tries === 3) {
			this.showHint(current);
		  }
	  
		  if (this.tries >= 5) {
			this.revealAnswer(current.full);
			this.currAcro++;
			this.tries = 0;
			setTimeout(() => {
			  if (this.currAcro < this.selection.length) {
				this.updateDisplay();
			  } else {
				alert("Game over! You've completed all acronyms.");
			  }
			}, 2000);
		  }
		}
	  },
	  

	  checkFullAnswer() {
		const current = this.selection[this.currAcro];
		const userInput = this.ui.input.value.trim().toLowerCase();
	  
		if (userInput === current.full.toLowerCase()) {
		  this.points++;
		  this.currAcro++;
		  this.tries = 0;
		  this.badInputStreak = 0;
	  
		  if (this.ui.pointsDisplay) {
			this.ui.pointsDisplay.innerText = `Points: ${this.points}`;
		  }
	  
		  if (this.currAcro < this.selection.length) {
			this.updateDisplay();
		  } else {
			alert("You completed the game! 🎉");
		  }
		}
	  },
	  
	  

	showHint(current) {
	  alert(`Hint: ${current.category}`);
	},

	revealAnswer(fullAnswer) {
	  alert(`The correct answer was: ${fullAnswer}`);
	}
};

// Capitalize helper
function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

// Start the game
game.init();

