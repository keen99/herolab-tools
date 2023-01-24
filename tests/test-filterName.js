const { filterIgnoredNames } = require('../js/filter.js');

function arraysContainSameElements(a, b) {
    var setA = new Set(a);
    var setB = new Set(b);
    return setA.size === setB.size && [...setA].every(val => setB.has(val));
}

function findArrayDifference(arr1, arr2) {
    if (!arr1) arr1 = [];
    if (!arr2) arr2 = [];
    return arr1.filter(x => !arr2.includes(x)).concat(arr2.filter(x => !arr1.includes(x)));
}


class FilterIgnoredNamesTestCase {
  constructor(name, ignoredNames, expectedOutput, expectedIgnored) {
    this.name = name;
    this.ignoredNames = ignoredNames;
    this.expectedOutput = expectedOutput;
    this.expectedIgnored = expectedIgnored;
  }

  run() {
    var elementsIgnored = new Set();
    var output = filterIgnoredNames(this.name, this.ignoredNames, elementsIgnored);

    // convert the set to an array
    var elementsIgnored = [...elementsIgnored];


    if (this.expectedOutput === false) {
      console.log("expected");
      if (output) {
        console.log("got output");
        return {
          result: "Fail",
          error: `Expected a false-able output but got a [true]. Output: ${(output === 'true')}`
        };
      }
    }

    if (output === this.expectedOutput) {
      if (arraysContainSameElements(elementsIgnored, this.expectedIgnored)) {
        return {
          result: "Pass"
        };
      } else {
        let ignoredDiff = findArrayDifference(elementsIgnored, this.expectedIgnored);
        return {
          result: "Fail",
          error: `Expected ignored elements [${this.expectedIgnored}], but got [${elementsIgnored}]. The difference: [${ignoredDiff}]. Output: ${output}`
        };
      }
    } else {
      return {
        result: "Fail",
        error: `Expected output [${this.expectedOutput}], but got [${output}]. Ignored elements: [${elementsIgnored}]`
      };
    }
  }
}


console.log("Test 15 - filter ignored names")
const test15 = new FilterIgnoredNamesTestCase("Additional Traits", {
  "Additional Traits": true,
  "Spell, Touch": true,
}, undefined, ["Additional Traits"]);
console.log(test15.run());


console.log("Test 16 - filter ignored names with false rule")
const test16 = new FilterIgnoredNamesTestCase("Additional Traits", {
"Additional Traits": false,
"Spell, Touch": true,
}, "Additional Traits", []);
console.log(test16.run());



console.log("Test 17 - filter ignored names by prefix")
const test17 = new FilterIgnoredNamesTestCase("Additional Traits", {
"Additional": true,
"Spell, Touch": true,
}, undefined, ["Additional Traits"]);
console.log(test17.run());

console.log("Test 18 - filter ignored names by prefix - included ")
const test18 = new FilterIgnoredNamesTestCase("Additional Traits", {
"Additional": false,
"Spell, Touch": true,
}, "Additional Traits", []);
console.log(test18.run());


console.log("Test 19 - filter ignored names in different order")
const test19 = new FilterIgnoredNamesTestCase("Additional Traits", {
"Spell, Touch": true,
"Additional Traits": false
}, "Additional Traits", []);
console.log(test19.run());


// this doesnt work right yet.
console.log("Test 20 - test a false output")
const test20 = new FilterIgnoredNamesTestCase("Additional Traits", {
"Additional Traits": true
}, false, []);
console.log(test20.run());
