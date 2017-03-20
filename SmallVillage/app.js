/**
 * Created by puman on 20.03.2017.
 */

class TownEl {

    constructor(name,buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends TownEl {

    constructor(name,buildYear,treesNumber,parkArea){
        super(name,buildYear);
        this.treesNumber = treesNumber;
        this.parkArea = parkArea;
        this.calcDensity();
        this.calcAge();
    }

    calcDensity(){
        this.density = parseFloat((this.treesNumber/this.parkArea).toFixed(2));
    }

    calcAge(){
        let year = new Date;
        year = year.getFullYear();
        this.age = year - this.buildYear;
    }
}

class Street extends TownEl{

    constructor(name,buildYear,length){
        super(name,buildYear);
        this.length = length;
        this.getSize();
    }

    getSize(){

        if(this.length === undefined)
            this.size = 'normal';
        else if(this.length < 1)
            this.size =  'tiny';
        else if(this.length < 2)
            this.size =  'small';
        else if(this.length < 3)
            this.size =  'normal';
        else if(this.length < 5)
            this.size =  'big';
        else if(this.length > 5)
            this.size =  'huge';

    }

}

let greenPark = new Park('Green Park',1990,2000,30);

let orangeStreet = new Street('Orange Street',1500,3);

console.log(orangeStreet);
console.log(greenPark);