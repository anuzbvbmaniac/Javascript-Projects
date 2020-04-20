/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let score, roundScore, activePlayer, isPlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (isPlaying) {
        // Generate Random Number
        let diceRolled = Math.floor(Math.random() * 6) + 1;

        // Display Result
        let diceImage = document.querySelector('.dice');
        diceImage.style.display = 'block';
        diceImage.src = 'assets/img/dice-' + diceRolled + '.png';

        // Check if the dice rolled value is one or not
        if (diceRolled !== 1) {
            // if dice rolled in not 1, update the round score value
            roundScore += diceRolled;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // if dice rolled is 1, change the turn to next player
            nextPlayer();
        }
    } else {
        showSnackBar('Please Start a New Game!');
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {

    if (isPlaying) {
        // add the score to player
        score[activePlayer] += roundScore;
        // show the score in the UI Dashboard
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        // check if the score is equal ot higher than 100
        if (score[activePlayer] >= 20) {
            // If score is >= 100, mark the active user as winner
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isPlaying = false;
        } else {
            // Else Continue with next player.
            nextPlayer();
        }
    } else {
        showSnackBar('Please Start a New Game!');
    }

});


// New Game Button Click
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // Initialize with 0 and true
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;
    isPlaying = true;

    // do not show dice when starting a game.
    document.querySelector('.dice').style.display = 'none';

    // set UI value to 0.
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    // If new Game starts after winning remove winner classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // change names to default name
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';

    // remove active class from player if they have any.
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // add active class to player 1.
    document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
    // Change the current player to next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // Change UI style when Player change
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function showSnackBar(msg) {
    document.getElementById("snackbar").classList.add('show');
    document.getElementById("snackbar").textContent = msg;
    setTimeout(function () {
        document.getElementById("snackbar").className = document.getElementById("snackbar").className.replace('show', '')
    }, 5000);
}