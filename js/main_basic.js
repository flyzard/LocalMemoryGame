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
	
	$('#cardN').bind('keypress', function (e) {
		var nCard = parseInt($(this).val()) || 0;
		$(this).val('');
		if (nCard > 0 && nCard <= 20) {
			elemCard = $(".card-container:nth-of-type(" + nCard + ")");		
			nCard = nCard -1;
		} else {
			return;
		}

		if (!running) {
			if (!gameStarted) { // If the game has not started and we press a valid number, we show all cards
				showAllCards();
			} else if (elemCard.find('.back').attr('id') == chosenCards[0] && chosenCards[1] == null && elemCard.hasClass('flip')) {
				turnCard(null);
			} else if (chosenCards[0] == null && chosenCards[1] == null && !elemCard.hasClass('flip')) {
				turnCard(elemCard.find('.back').attr('id')); // turnning First card
			} else if (chosenCards[0] != null && chosenCards[1] == null && !elemCard.hasClass('flip')) {
				turnCard(elemCard.find('.back').attr('id'), 1); // turnning Second card
				checkMatch();				
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
		setTimeout(function () {//flip back the chosen cards that did not match
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
		} else { //if the brands did not match - empty the chosenCards & flip the cards back over 					
			turnBackWrongMatch()
		}
	}
});
