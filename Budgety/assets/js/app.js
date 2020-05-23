// Budget Controller
let budgetController = (function () {

    // Expenses function constructor
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    // Income function constructor
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Calculate Total function
    let calculateTotal = function (type) {
        let sum = 0;
        data.allItems[type].forEach(function (current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    }


    // Data structure
    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: [],
            inc: [],
        },
        budget: 0,
        percentage: -1,
    }

    return {
        // Add Item to Data Structure
        addItem: function (type, desc, value) {
            let newItem, ID;

            // Create new ID || ID is 0 if there are no Items
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Check if the Item is Expense or Income and add into NewItem Variable
            if (type === 'exp') {
                newItem = new Expense(ID, desc, value);
            } else if (type === 'inc') {
                newItem = new Income(ID, desc, value);
            }

            // Add new Item to respective Item Object
            data.allItems[type].push(newItem);

            // return new item.
            return newItem;
        },

        // Delete Item from Data Structure
        deleteItem: function(type, id) {

            /** Example
             * id = 6
             * data.allItems[type][id]
             * ids = [1 2 4 6 8]
             * index = 3
             */

            let ids, index;

            ids = data.allItems[type].map(function (curr) {
                return curr.id;
            });

            index = ids.indexOf(id);

            if(index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        // Calculates the Total Expenses. budget and expense percentage
        calculateBudget: function() {

            // 1. Calculate Total Income and Expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // 2. Calculate the budget = income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // 3. Calculate the percentage of the income we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round(( data.totals.exp / data.totals.inc ) * 100);
            } else {
                data.percentage = -1;
            }
        },

        // Calculate Percentage
        calculatePercentages: function() {
            data.allItems.exp.forEach(function (cur) {
                cur.calcPercentage(data.totals.inc);
            });
        },

        // Get All Percentage
        getPercentage: function() {
            return data.allItems.exp.map(function (cur) {
                return cur.getPercentage();
            });
        },

        // Return budget Information/Data
        getBudget: function () {
            return {
                budget: data.budget,
                totalExp: data.totals.exp,
                totalInc: data.totals.inc,
                percentage: data.percentage
            }
        },

        testing: function () {
            console.log(data);
        }
    }

})();

// UI Controller
let UIController = (function () {

    // UI Strings
    let DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        btnAdd: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensePercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month',

    }

    // Format Numbers
    let formatNumber = function (num, type) {
        let numSplit, int, dec;

        num = Math.abs(num); // get exact numbers only without operator symbol.
        num = num.toFixed(2); // convert num to two decimal points num @result:: string

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    }

    let nodeListForEach = function (list, callback) {
        for (let i = 0; i < list.length; i++ ) {
            callback(list[i], i);
        }
    };

    return {
        // Get Inout Field Names
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            }
        },

        // Add Items to UI
        addListItem: function (obj, type) {
            let html, newHtml, element;

            // Create HTML string with placeholder
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%">' +
                        '<div class="item__description">%description%</div>' +
                        '<div class="right clearfix">' +
                        '   <div class="item__value">%value%</div>' +
                        '   <div class="item__delete">' +
                        '       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                        '   </div>' +
                        '</div>' +
                       '</div>';

            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>' +
                    '<div class="right clearfix">' +
                    '   <div class="item__value">%value%</div>' +
                    '   <div class="item__percentage">21%</div>' +
                    '   <div class="item__delete">' +
                    '       <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '   </div>' +
                    '</div>' +
                    '</div>';
            }

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML to DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        // Delete Items from UI
        deleteListItem: function(selectorId) {
            let element = document.getElementById(selectorId)
            element.parentNode.removeChild(element);
        },

        // Clear and Focus after Item Creation
        clearAndFocus: function () {
            let fields, fieldsArray;

            // Get the Input Fields
            fields = document.querySelectorAll(DOMStrings.inputDesc + ', ' + DOMStrings.inputValue);

            // Convert List from querySelectorAll to Array.
            fieldsArray = Array.prototype.slice.call(fields);

            // Clear the fields
            fieldsArray.forEach( function (current, index, array) {
                current.value = "";
            });

            // Focus on Description.
            fieldsArray[0].focus();
        },

        // Display Budget Data in UI
        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },

        // Display Percentages
        displayPercentages: function(percentages) {

            let fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);

            nodeListForEach(fields, function (current, index) {
                current.textContent = percentages[index];
            });
        },

        // Display date
        displayDate: function() {
            let today, months, month, year;
            today = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = today.getMonth();
            year = today.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ', ' + year;
        },

        //Change Color according to Type
        changedType: function() {

            let fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDesc + ',' +
                DOMStrings.inputValue
            );

            // Add Focus Border
            nodeListForEach(fields, function (current) {
                current.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.btnAdd).classList.toggle('red');

        },

        // Get DOMStrings
        getDOMStrings: function () {
            return DOMStrings;
        }
    }

})();

// Main Controller
let controller = (function (budgetCtrl, UICtrl) {

    // Event Listener Function
    let setupEventListeners = function () {
        let DOMString = UIController.getDOMStrings();

        // Event Listener :: On btn click
        document.querySelector(DOMString.btnAdd).addEventListener('click', ctrlAddItem);

        // Event Listener :: On Return Key Press
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        // Event Listener on Delete Btn Click
        document.querySelector(DOMString.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOMString.inputType).addEventListener('change', UIController.changedType);
    };

    // Update Budget Data
    let updateBudget = function () {

        // 1. Calculate the budget
        budgetController.calculateBudget();

        // 2 .Return the budget
        let budget = budgetController.getBudget();

        // 3. Display Budget in UI
        UIController.displayBudget(budget);

    };

    // Update Percentages
    let updatePercentage = function () {

        // 1. Calculate Percentage
        budgetController.calculatePercentages();

        // 2. Read Percentage From BudgetController
        let percentages = budgetController.getPercentage();

        // 3. Update UI with new Percentage Data.
        UIController.displayPercentages(percentages);

    };

    // Add Item
    let ctrlAddItem = function () {

        // variable declaration
        let input, newItem;

        // 1. Get HTML Input Field Data
        input = UIController.getInput();

        if( input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add Item to Budget Controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add Item to UI
            UIController.addListItem(newItem, input.type);

            // 4. Clear the Input Fields and set Focus to First Element
            UIController.clearAndFocus();

            // 5. Calculate & Update Budget
            updateBudget();

            // 6. Calculate and Update Percentage
            updatePercentage();
        }

    };

    // Delete Item
    let ctrlDeleteItem = function (event) {

        let itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete Item from Data Structure
            budgetController.deleteItem(type, ID);

            // 2. Delete Item from UI
            UIController.deleteListItem(itemID);

            // 3. Update and show the new Data
            updateBudget();

            // 4. Calculate and Update Percentage
            updatePercentage();
        }
    }

    return {
        init: function () {
            console.log('App Started.');
            UIController.displayDate();
            UIController.displayBudget({
                budget: 0,
                totalExp: 0,
                totalInc: 0,
                percentage: -1,
            })
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

