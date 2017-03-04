firstPlayer = {
    height : 180,
    age : 21,

    calculatePoints : function () {
        return this.height + (this.age * 5);
    }
};

secondPlayer = {
    height : 170,
    age : 22,

    calculatePoints : function () {
        return this.height + (this.age * 5);
    }
};

thirdPlayer = {
    height : 190,
    age : 19,

    calculatePoints : function () {
        return this.height + (this.age * 5);
    }
};

if((firstPlayer.calculatePoints() > secondPlayer.calculatePoints())&&(firstPlayer.calculatePoints() > thirdPlayer.calculatePoints()))
{
    console.log("First player won ! It was " + firstPlayer.calculatePoints() + ' - ' + secondPlayer.calculatePoints() + ' - ' + thirdPlayer.calculatePoints());
}
else if((secondPlayer.calculatePoints() > firstPlayer.calculatePoints())&&(secondPlayer.calculatePoints() > thirdPlayer.calculatePoints()))
{
    console.log("Second player won ! It was " + firstPlayer.calculatePoints() + ' - ' + secondPlayer.calculatePoints() + ' - ' + thirdPlayer.calculatePoints());
}
else if((thirdPlayer.calculatePoints() > firstPlayer.calculatePoints())&&(thirdPlayer.calculatePoints() > secondPlayer.calculatePoints()))
{
    console.log("Third player won ! It was " + firstPlayer.calculatePoints() + ' - ' + secondPlayer.calculatePoints() + ' - ' + thirdPlayer.calculatePoints());
}
else
{
    console.log("DRAW ! It was " + firstPlayer.calculatePoints() + ' - ' + secondPlayer.calculatePoints() + ' - ' + thirdPlayer.calculatePoints());
}
