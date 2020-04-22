/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. COMPLETE - A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. COMPLETE - Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out :)
3. COMPLETE - Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let score, roundScore, activePlayer, isPlaying, previousRolledDice;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (isPlaying) {
        // Generate Random Number
        let diceRolled = Math.floor(Math.random() * 6) + 1;
        let secondDiceRolled = Math.floor(Math.random() * 6) + 1;

        // Display Result
        let diceImage = document.querySelector('.dice');
        let secondDiceImage = document.querySelector('.dice1');
        diceImage.style.display = 'block';
        secondDiceImage.style.display = 'block';
        diceImage.src = 'assets/img/dice-' + diceRolled + '.png';
        secondDiceImage.src = 'assets/img/dice-' + secondDiceRolled + '.png';

        // Check if the player gets two 6 in a row or 1
        // if (diceRolled === 6 && previousRolledDice === 6) {
        //     // If Player gets 6 in a row, their score is 0 and its next player turn.
        //     showSnackBar('Two 6 in a row :(');
        //     score[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = '0';
        //     nextPlayer();
        // } else if (diceRolled !== 1) {
        //     // if dice rolled in not 1, update the round score value.
        //     roundScore += diceRolled;
        //     document.getElementById('current-' + activePlayer).textContent = roundScore;
        // } else {
        //     // if dice rolled is 1, change the turn to next player
        //     showSnackBar('You rolled 1.');
        //     nextPlayer();
        // }

        if (diceRolled !== 1 && secondDiceRolled !== 1) {
            // if dice rolled in not 1, update the round score value.
            roundScore += diceRolled + secondDiceRolled;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            // if dice rolled is 1, change the turn to next player
            showSnackBar('You rolled 1.');
            nextPlayer();
        }

        // store rolled dice data temporarily.
        previousRolledDice = diceRolled;

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

        let finalScore = document.querySelector('.final-score').value;
        let winningScore;

        if (finalScore) {
            winningScore = finalScore;
        } else {
            winningScore = 100;
        }

        // check if the score is equal ot higher than 100
        if (score[activePlayer] >= winningScore) {
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
    previousRolledDice = 0;

    // do not show dice when starting a game.
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice1').style.display = 'none';

    // set UI value to 0.
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // If new Game starts after winning remove winner classes
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    // change names to default name
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

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
    document.querySelector('.dice1').style.display = 'none';
}

function showSnackBar(msg) {
    // add show class to snackbar div.
    document.getElementById("snackbar").className = 'show';

    // Add Message to Snackbar.
    document.getElementById("snackbar").textContent = msg;

    // remove show class from DIV after 5 sec.
    setTimeout(function () {
        document.getElementById("snackbar").className = document.getElementById("snackbar").className.replace('show', '')
    }, 3000);
}



