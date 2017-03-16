var budgetController = (function(){

})();

var UIController = (function(){

})();

var controller = (function(budgetCtrl,UICtrl){

    var ctrlAddItem = function()
    {
        //1. Get the input data

        //2. Add the item to the budget controller

        //3. Add the item to the UI

        //4. Calculate the buget

        //5. Display the budget in the UI

        console.log('It works');

    };

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress', function(event) {

        //For older browsers event.which == 13
        if(event.keyCode == 13 || event.which == 13)
            ctrlAddItem();

    });

})(budgetController,UIController);