var budgetController = (function(){

    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0)
            this.percentage = Math.round((this.value/totalIncome) * 100);
        else
            this.percentage = -1;
    };

    Expense.prototype.getPercentage = function () {
      return this.percentage;
    };

    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum = sum+current.value;
        });

        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc:[]
        },
        budget: 0,
        percentage: -1,
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
                ID = 0;

            //Create new item in array
            if(type === 'exp')
                newItem = new Expense(ID, des,val);
            else if(type === 'inc')
                newItem = new Income(ID,des,val);

            //Push it into our data structure
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },

        getBudget : function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage

            }
        },

        deleteItem: function(type,id) {
            var ids, index;

            ids = data.allItems[type].map(function(current){
               return current.id;
            });

            index = ids.indexOf(id);

            if(index !== -1)
                data.allItems[type].splice(index,1);

        },

        calculateBudget: function() {

            //Calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //Calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //Calculate the percentage of income that we spent
            if(data.totals.inc > 0)
                data.percentage = Math.round(data.totals.exp/data.totals.inc * 100);
            else
                data.percentage = -1;


        },

        calculatePercentages: function () {

            data.allItems.exp.forEach(function (current) {
               current.calcPercentage(data.totals.inc);
            });

        },
        
        getPercentages: function () {
            var allPerc = data.allItems.exp.map(function (current) {
               return current.getPercentage();
            });

            return allPerc;
        }

    }

})();

var UIController = (function(){

    var DOMStrings = {

        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel:  '.item__percentage',
        dateLabel: '.budget__title--month'

    };

    function formatNumber(number, type){

        var numSplit,int,dec;

        /*
         + or - before number
         exactly 2 decimal points
         comma separating the thousands
         */

        number = Math.abs(number);
        number = number.toFixed(2);

        numSplit = number.split('.');

        int = numSplit[0];

        if(int.length > 3) {
            int = int.substr(0,int.length-3) + ',' + int.substr(int.length-3,int.length);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int +'.' + dec;

    };

    var nodeListForEach  = function (list, callback) {
        for(var i=0; i < list.length; i++)
        {
            callback(list[i],i);
        }
    };

    return{
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type){
            var html, newHtml,element;
            //Create HTML string with placegolder text

            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix">' +
                    ' <div class="item__value">%value%</div>  <div class="item__delete"> ' +
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div>  </div>  </div>';
            }
            else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = ' <div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> ' +
                    '<div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> ' +
                    '<div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';
            }

            //Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value,type));

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
        },

        clearFields : function(){
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' +DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function(current,index, array) {
                current.value = "";
            });

            fieldsArray[0].focus();

        },

        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent = formatNumber(obj.totalExp,'exp');

            if(obj.percentage > 0)
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage +"%";
            else
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';

        },
        
        deleteListItem: function (selectorId) {
            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);
        },

        displayPercanteges: function(percentages) {

            var fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEach(fields, function (current, index) {
                if(percentages[index] > 0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '---';
            });
            
        },

        displayMonth: function () {

            var now,year,month, months;

            now = new Date();

            months = ['January','February','March','April','May','June','July','August','September','October','November','December']
            month= now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        changeType: function(){

            var fields = document.querySelectorAll(
                    DOMStrings.inputType + ',' +
                    DOMStrings.inputDescription + ',' +
                    DOMStrings.inputValue);

            nodeListForEach(fields,function (cur) {
               cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
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

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);

    };

    var updateBugdet = function(){

        //1. Calculate the buget
        budgetCtrl.calculateBudget();

        //2. Return the bugdet
        var budget = budgetCtrl.getBudget();

        //3. Display the budget in the UI
        UICtrl.displayBudget(budget);
    };

    var updatePercentages = function(){

        //1. Calculate percentages
        budgetCtrl.calculatePercentages();

        //2. Read percentage from the budget controller
        var percentages = budgetCtrl.getPercentages();

        //3. Update the UI with the new percentages
        UICtrl.displayPercanteges(percentages);

    };

    var ctrlAddItem = function(){
        var input, newItem;

        //1. Get the input data
        input = UICtrl.getInput();
        //console.log(input);

        if(input.description !== "" && !isNaN(input.value) && input.value > 0)
        {

            //2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value);

            //3. Add the item to the UI
            UICtrl.addListItem(newItem,input.type);

            //4. Clear the fields
            UICtrl.clearFields();

            //5. Calculate and update budget
            updateBugdet();
        }

        //6. Calculate and update the percentages
        updatePercentages();

    };

    var ctrlDeleteItem = function(event){
        var itemID,splitID,type, ID;

        //I can do this bcs i hardcoded html structure.
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){

            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. Delete the item from the data structure
            budgetCtrl.deleteItem(type,ID);

            //2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            //3. Update and show the new budget
            updateBugdet();

            //4. Calculate and update the percentages
            updatePercentages();
        }

    };

    return{
        init: function () {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1

            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }

})(budgetController,UIController);

controller.init();