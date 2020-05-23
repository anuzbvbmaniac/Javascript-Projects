/////////////////////////////////
// CODING CHALLENGE

/*
Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets
It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.
At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (formula: number of trees/park area)
2. Average age of each town's park (formula: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal
All the report data should be printed to the console.
HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.
*/

// Main Class
class Element {
    // constructor
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

// Park Class
class Park extends Element {
    // constructor
    constructor(name, buildYear, area, numOfTrees) {
        super(name, buildYear);
        this.area = area; //sq. km
        this.numOfTrees = numOfTrees;
    }

    // Calculate and Log Tree Density
    treeDensity() {
        const density = this.numOfTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per sq. km.`)
    }
}

// Streets Class
class Street extends Element {
    // constructor
    constructor(name, buildYear, length, size= 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    // Classify and Log Streets
    classifyStreets() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        // Lod the Details
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`)
    }
}

const allParks = [new Park('First Park', 1990, 5, 250),
                  new Park('Second Park', 1980, 3, 1543),
                  new Park('Third Park', 1950, 0.4, 3000)];

const allStreets = [new Street('Maligaun', 1980, 1.5, 4),
                    new Street('Hadigaun', 1950, 2.1),
                    new Street('Kalopul', 1910, 2.5, 5),
                    new Street('Ratopul', 1925, 2.1, 4)];

function calculate(arg) {
    const sum = arg.reduce((p, c) => p + c, 0);
    return [sum, sum / arg.length];
}


function reportParks(park) {

    console.log('1. Park Report ---------------------------');
    // Density
    park.forEach(el => el.treeDensity());

    // Average Age
    const ages = park.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, averageAge] = calculate(ages);
    console.log(`Our ${park.length} park have an average of ${averageAge} years.`)

    // Which park has more than 1000 trees.
    const i = park.map(el => el.numOfTrees).findIndex(el => el >= 1000);
    console.log(`${park[i].name} has more than 1000 trees.`);

}

function reportStreets(streets) {

    console.log('2. Street Report ---------------------------');

    // Total & Average length of the towns streets.
    const [totalLength, averageLength] = calculate(streets.map(el => el.length));
    console.log(`Our ${streets.length} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`);

    // Classify Sizes
    streets.forEach(el => el.classifyStreets());

}

reportParks(allParks);
reportStreets(allStreets);