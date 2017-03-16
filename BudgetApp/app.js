var budgetController = (function(){

})();

var UIController = (function(){

    var DOMStrings = {

        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'

    };

    return{
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        getDOMStrings : function(){
            return DOMStrings;
        }
    }

})();

var controller = (function(budgetCtrl,UICtrl){

    var setupEventListeners = function(){

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(event) {

            //For older browsers event.which == 13
            if(event.keyCode == 13 || event.which == 13)
                ctrlAddItem();

        });
    };

    var ctrlAddItem = function()
    {
        //1. Get the input data

        var input = UICtrl.getInput();
        console.log(input);

        //2. Add the item to the budget controller

        //3. Add the item to the UI

        //4. Calculate the buget

        //5. Display the budget in the UI

    };

    return{
        init: function () {
            console.log('Application has started.');
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();