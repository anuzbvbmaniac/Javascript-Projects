// Budget Controller
let budgetController = (function () {

    // Expenses function constructor
    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // Income function constructor
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
    }

    return {
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
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: document.querySelector(DOMStrings.inputValue).value,
            }
        },

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

        // Event Listener :: On btn click || return [Enter] key
        document.querySelector(DOMString.btnAdd).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    let ctrlAddItem = function () {

        // variable declaration
        let input, newItem;

        // 1. Get HTML Input Field Data
        input = UIController.getInput();

        // 2. Add Item to Budget Controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add Item to UI

        // 4. Calculate Budget

        // 5. Display Budget on UI

    }

    return {
        init: function () {
            console.log('App Started.');
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();

