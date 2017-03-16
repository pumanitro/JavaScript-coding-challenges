var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return{
        addItem: function(type, des, val){
            var newItem, ID;

            //Create new ID
            if(data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            else
                ID =0;

            //Create new item in array
            if(type === 'exp')
                newItem = new Expense(ID, des,val);
            else if(type === 'inc')
                newItem = new Income(ID,des,val);

            //Push it into our data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        }
    }

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
        var input, newItem;

        //1. Get the input data
        input = UICtrl.getInput();
        //console.log(input);

        //2. Add the item to the budget controller
        newItem = budgetCtrl.addItem(input.type,input.description,input.value);


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