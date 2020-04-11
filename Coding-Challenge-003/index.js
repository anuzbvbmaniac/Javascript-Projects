/*****************************
 * CODING CHALLENGE 3
 */
/*
John and his family went on a holiday and went to 3 different restaurants. The bills were $124, $48 and $268.
To tip the waiter a fair amount, John created a simple tip calculator (as a function). He likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.
In the end, John would like to have 2 arrays:
1) Containing all three tips (one for each bill)
2) Containing all three final paid amounts (bill + tip).
(NOTE: To calculate 20% of a value, simply multiply it with 20/100 = 0.2)
GOOD LUCK 😀
*/

var bills = [124, 48, 268];
var paid = [];

bills.forEach(function (bill) {
    if (bill < 50) {
        paid.push(0.2 * bill);
    } else if (bill < 200 && bill > 50) {
        paid.push(.15 * bill);
    } else {
        paid.push(0.1 * bill)
    }
});

var finalPaid = [paid[0] + bills[0], paid[1] + bills[1], paid[2] + bills[2]]

console.log(paid);
console.log(finalPaid);



