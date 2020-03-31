/******************************
 * Coding Challenge 001 - BMI Calculator
 */

/*
  Mark and John are trying to compare their BMI (Body Mass Index), which is calculated using the formula: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).

1. Store Mark's and John's mass and height in variables
2. Calculate both their BMIs
3. Create a boolean variable containing information about whether Mark has a higher BMI than John.
4. Print a string to the console containing the variable from step 3. (Something like "Is Mark's BMI higher than John's? true").
GOOD LUCK 😀
*/

// Asking users to input Mark's Mass and John's Mass in KG.
var markMass = prompt('What is the mass of Mark? (in KG)');
var johnMass = prompt('What is the mass of John? (in KG)');

// Asking users to input Mark's Height and John's Height in KG.
var markHeight = prompt('What is the height of Mark? (in meter)');
var johnHeight = prompt('What is the height of John? (in meter)');

// Calculation of BMI
var BMIOfMark = markMass / (markHeight * markHeight);
var BMIOfJohn = johnMass / (johnHeight * johnHeight);

// Logging BMI Value.
console.log('BMI of Mark is ' + BMIOfMark);
console.log('BMI of John is ' + BMIOfJohn);

// Check if BMI of Mark is greater than John's.
var BMIHigherThanJohn = BMIOfMark > BMIOfJohn;

// Logging Answer.
console.log("Is Mark's BMI higher than John's? " + BMIHigherThanJohn);