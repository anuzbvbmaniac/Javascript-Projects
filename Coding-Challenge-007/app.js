/////////////////////////////
// CODING CHALLENGE 007


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

// Immediately invoked function for privacy
(function () {
    // Function Constructor
    function Question(question, answer, correct) {
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);
        for (let i = 0; i < this.answer.length; i++) {
            console.log(i + ': ' + this.answer[i]);
        }
    }

    Question.prototype.correctAnswer = function (answer) {
        if (answer === this.correct) {
            console.log('Correct Answer!');
        } else {
            console.log('Incorrect Answer. Try Again 😂.');
        }
    }

    //Questions
    let question1 = new Question('Is Javascript the coolest programming language?', ['Yes', 'No'], 0);
    let question2 = new Question('Is Javascript same as Java programming Language?', ['Yes', 'No'], 1);
    let question3 = new Question('"Everything in Javascript is Object", Is this statement true?', ['Yes', 'No'], 0);

    // storing questions to an array
    let questions = [question1, question2, question3];

    // Creating random question.
    let n = Math.floor(Math.random() * questions.length);

    // Display Question in Console.
    questions[n].displayQuestion();

    // prompt user to write correct answer.
    let iAnswer = parseInt(prompt('Please select the correct answer.'));

    // Check the correct answer
    questions[n].correctAnswer(iAnswer);
})();

