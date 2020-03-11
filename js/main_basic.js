$(document).ready(function() {
	
	var cards = ['S5', 'D6', 'C7', 'H8', 'S9', 'D10', 'AC', 'JH', 'KS', 'QD'];

	var pairs = cards.concat(cards); //create pairs of cards
	var chosenCards = [];
	var gameStarted = false;
	var running = false;
	var pairCount = 0;
	var audio = document.getElementById("audio");
	var elemCard = null;

	shuffleArray(pairs);//shuffle cards
	
	$('.back').each(function(i, element) {
	    $(this).attr('id', pairs[i]);//sets id in DOM for cards, access styles via css
	});
	
	$('.card-container').click(function () {
		
		elemCard = $(this);		
		var backId = elemCard.find('.back').attr('id');
		if (!running) {
			if (!gameStarted) { // If the game has not started and we press a valid number, we show all cards
				showAllCards();
			} else if (backId == chosenCards[0] && chosenCards[1] == null && elemCard.hasClass('flip')) {
				turnCard(null);
				console.log("isto");
			} else if (chosenCards[1] == null && !elemCard.hasClass('flip')) {
				if (chosenCards[0] == null) {
					turnCard(backId); // turnning First card	
				} else {
					turnCard(backId, 1); // turnning Second card
					checkMatch();
				}	
			}
		}
	});
	
	function shuffleArray(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

	function flipAll() {
		audio.play();
		$('.card-container').each(function () {
			$(this).toggleClass('flip');
		});
	}

	function showAllCards() {
		running = true;
		flipAll()
		setTimeout(function () {
			flipAll();
			gameStarted = true;
			running = false;
		}, 2000);
	}

	function turnCard(cardId, pos = 0) {
		running = true;
		audio.play();
		chosenCards[pos] = cardId;
		elemCard.toggleClass('flip');
		running = false;
	}

	function turnBackWrongMatch() {
		setTimeout(function () {
			$('*[id*=' + chosenCards[0] + ']').each(function () {
				$(this).closest('.flip').toggleClass('flip');
			});
			$('*[id*=' + chosenCards[1] + ']').each(function () {
				$(this).closest('.flip').toggleClass('flip');
			});
			chosenCards[0] = null;
			chosenCards[1] = null;
		}, 800);
	}

	function checkWin() {
		chosenCards[0] = null;
		chosenCards[1] = null;
		if (pairCount == cards.length) {
			win = true;
			displayWin();
		}
	}

	function displayWin() {
		alert("you win :D");
	}

	function checkMatch() {
		if (chosenCards[0] == chosenCards[1]) {
			pairCount++;
			checkWin();
		} else { 					
			turnBackWrongMatch()
		}
	}
});
