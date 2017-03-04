var years1 = [1999,2000,1950,2007];
var years2 = [1979,2010,2000,2002];

function printfFullAge(yearsVector)
{
    var fullAge = [];
    var fullAgeBoolean = [];

    for(var i=0;i<yearsVector.length;i++)
    {
        fullAge[i] = yearsVector[i];
    }

    console.log(fullAge);

    for(i=0;i<yearsVector.length;i++)
    {
        var date = new Date();

        console.log(date.getFullYear());

        fullAgeBoolean[i] = (date.getFullYear() - yearsVector[i]) >= 18;
    }

    console.log(fullAgeBoolean);

    return fullAgeBoolean;
}

var full_1 = printfFullAge(years1);
var full_2 = printfFullAge(years2);

console.log("Full1 = "+full_1);
console.log("Full2 = "+full_2);
