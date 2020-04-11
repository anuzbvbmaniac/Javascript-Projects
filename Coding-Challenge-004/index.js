/*****************************
 * CODING CHALLENGE 4
 */

/*
Let's remember the first coding challenge where Mark and John compared their BMIs. Let's now implement the same functionality with objects and methods.
1. For each of them, create an object with properties for their full name, mass, and height
2. Then, add a method to each object to calculate the BMI. Save the BMI to the object and also return it from the method.
3. In the end, log to the console who has the highest BMI, together with the full name and the respective BMI. Don't forget they might have the same BMI.
Remember: BMI = mass / height^2 = mass / (height * height). (mass in kg and height in meter).
GOOD LUCK 😀
*/

// John's Object
var john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calculateBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

// Mark's Object
var mark = {
    fullName: 'Mark Evans',
    mass: 78,
    height: 1.69,
    calculateBMI: function() {
        mark.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

// Initiating calculateBMI
john.calculateBMI();
mark.calculateBMI();

// Check Who has the highest BMI or if they have the same BMI.
if (john.bmi > mark.bmi) {
    console.log(john.fullName + ' has the higest BMI which is ' + john.bmi);
} else if (mark.bmi > john.bmi) {
    console.log(mark.fullName + ' has the higest BMI which is ' + mark.bmi);
} else {
    console.log('Both Mark and John has the same BMI which is ' + mark.bmi);
}