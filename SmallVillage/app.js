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
    }

    calcDensity(){
        this.density = Math.round(this.treesNumber/this.parkArea);
    }

    calcAge(){
        this.age = Date.prototype.getFullYear() - this.buildYear;
    }
}

class Street extends TownEl{

    constructor(name,buildYear,length){
        super(name,buildYear);
        this.length = length;
    }

    getSize(){

        if(this.length === undefined)
            return 'normal';
        else if(this.length < 1)
            return 'tiny';
        else if(this.length < 2)
            return 'small';
        else if(this.length < 3)
            return 'normal';
        else if(this.length < 5)
            return 'big';
        else if(this.length > 5)
            return 'huge';

    }


}