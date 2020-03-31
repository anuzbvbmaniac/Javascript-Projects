/*****************************
 * Average Score Calculator - Coding Challenge 002
 */

/*
John and Mike both play basketball in different teams. In the latest 3 games, John's team scored 89, 120 and 103 points, while Mike's team scored 116, 94 and 123 points.
1. Calculate the average score for each team
2. Decide which teams wins in average (highest average score), and print the winner to the console. Also include the average score in the output.
3. Then change the scores to show different winners. Don't forget to take into account there might be a draw (the same average score)
4. EXTRA: Mary also plays basketball, and her team scored 97, 134 and 105 points. Like before, log the average winner to the console. HINT: you will need the && operator to take the decision. If you can't solve this one, just watch the solution, it's no problem :)
5. Like before, change the scores to generate different winners, keeping in mind there might be draws.
GOOD LUCK 😀
*/

// Calculate Avg Score of both Teams
var avgScoreJohn = (97 + 134 + 108) / 3;
var avgScoreMike = (97 + 134 + 106) / 3;

// Conditional Statement
if (avgScoreJohn > avgScoreMike) {
    console.log('The winner on the basis of Average Score is John\'s Team, with the average score of ' + avgScoreJohn + ' points.');
} else if (avgScoreMike > avgScoreJohn) {
    console.log('The winner on the basis of Average Score is Mikes\'s Team, with the average score of ' + avgScoreMike + ' points.');
} else {
    console.log('The result is DRAW with the score of ' + avgScoreJohn + ' points.');
}

// Average score of Mary's Team
var avgScoreMary = (97 + 134 + 107) / 3;

// new Conditional Statement
if (avgScoreJohn > avgScoreMike && avgScoreJohn > avgScoreMary) {
    console.log('The winner on the basis of Average Score is John\'s Team, with the average score of ' + avgScoreJohn + ' points.');
} else if (avgScoreMike > avgScoreJohn && avgScoreMike > avgScoreMary) {
    console.log('The winner on the basis of Average Score is Mike\'s Team, with the average score of ' + avgScoreMike + ' points.');
} else if (avgScoreMary > avgScoreJohn && avgScoreMary > avgScoreMike) {
    console.log('The winner on the basis of Average Score is Mary\'s Team, with the average score of ' + avgScoreMary + ' points.');

    // Check if Any of two teams have same avg points and check for winner
} else if (avgScoreJohn === avgScoreMike && avgScoreJohn !== avgScoreMary) {
    // Check winners between the two teams
    if (avgScoreJohn > avgScoreMary) {
        console.log('The result is DRAW with the score of ' + avgScoreJohn + ' points. The teams are John & Mike');
    } else {
        console.log('The winner on the basis of Average Score is Mary\'s Team, with the average score of ' + avgScoreMary + ' points.');
    }
} else if (avgScoreJohn === avgScoreMary && avgScoreJohn !== avgScoreMike) {
    if (avgScoreJohn > avgScoreMike) {
        console.log('The result is DRAW with the score of ' + avgScoreJohn + ' points. The teams are John & Mary');
    } else {
        console.log('The winner on the basis of Average Score is Mike\'s Team, with the average score of ' + avgScoreMike + ' points.');
    }
} else if (avgScoreMike === avgScoreMary && avgScoreMike !== avgScoreJohn) {
    if (avgScoreMike > avgScoreJohn) {
        console.log('The result is DRAW with the score of ' + avgScoreMike + ' points. The teams are Mike & Mary');
    } else {
        console.log('The winner on the basis of Average Score is John\'s Team, with the average score of ' + avgScoreJohn + ' points.');
    }

    // Other wise There is draw between all the teams which is avgScoreJohn === avgScoreMike === avgScoreMary
} else {
    console.log('The result is DRAW with the score of ' + avgScoreJohn + ' points.');
}