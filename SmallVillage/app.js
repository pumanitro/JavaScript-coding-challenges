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
        {
            this.size = 'normal';
            this.length = -1;
        }
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

class Parks{
    constructor(parks){
        this.parks = parks;
    }

    showAgeAverage(){
        let value = 0;
        this.parks.forEach(cur => {
           value += cur.age;
        });
        value = value/this.parks.length;
        value = parseFloat(value.toFixed(2));

        console.log(`Our ${this.parks.length} parks have an average age of ${value} years.`);

    }

    showWoody(treesAmount){

        this.parks.forEach(cur => {

            if(cur.treesNumber > treesAmount)
                console.log(`${cur.name} has more than ${treesAmount} trees.`);

        });

    }

    showReport(){
        console.log('------Parks Report------');
        this.showAgeAverage();

        this.parks.forEach(cur => {
            console.log(`${cur.name} has a tree density of ${cur.density} trees per square km.`)
        });

        this.showWoody(1000);

    }

}

class Streets{

    constructor(streets){
        this.streets = streets;
        this.calcTotalLength();
        this.calcLengthAverage();
    }

    calcTotalLength(){
        this.totalLength = 0;
        this.streets.forEach(cur => {
            if(cur.length != -1)
                this.totalLength += cur.length;
        });
    }

    calcLengthAverage(){
        let sum = 0, givenLengths = 0;
        this.streets.forEach(cur => {
            if(cur.length != -1) {
                sum += cur.length;
                givenLengths++;
            }
        });
        this.lengthAverage = parseFloat((sum/givenLengths).toFixed(2));
    }

    showReport(){
        console.log('------Streets Report------');
        console.log(`Our ${this.streets.length} streets have a total length of ${this.totalLength} km, with an average of ${this.lengthAverage} km.`);

        this.streets.forEach(cur => {
           console.log(`${cur.name}, build in ${cur.buildYear}, is a ${cur.size} street.`);
        });

    }

}


let greenPark = new Park('Green Park',1990,2000,30);
let bluePark = new Park('Blue Park',1876,1001,10);
let yellowPark = new Park('Yellow Park',1400,500,100);

let orangeStreet = new Street('Orange Street',1873,6);
let appleStreet = new Street('Apple Street',1500,3);
let bananaStreet = new Street('Banana Street',1689,1);
let potatoStreet = new Street('Potato Street',1900);

let allParks = new Parks([greenPark,bluePark,yellowPark]);

let allStreets = new Streets([orangeStreet,appleStreet,bananaStreet,potatoStreet]);


allParks.showReport();

allStreets.showReport();

