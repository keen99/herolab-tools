const { removeElements } = require('../js/filter.js');

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


class TestCase {
  constructor(elements, ignoredPaths, expectedOutput, expectedIgnored) {
    this.elements = elements;
    this.ignoredPaths = ignoredPaths;
    this.expectedOutput = expectedOutput;
    this.expectedIgnored = expectedIgnored;
  }

  run() {
    var elementsIgnored = new Set();
    var { filteredElements, elementsIgnored } = removeElements(this.elements, this.ignoredPaths, elementsIgnored);
    // convert the set to an array
    var elementsIgnored = [...elementsIgnored];

    if (arraysContainSameElements(filteredElements, this.expectedOutput)) {
      if (arraysContainSameElements(elementsIgnored, this.expectedIgnored)) {
        return {
          result: "Pass"
        };

      } else {
        let ignoredDiff = findArrayDifference(elementsIgnored, this.expectedIgnored);
        return {
          result: "Fail",
          error: `Expected ignored elements [${this.expectedIgnored}], but got [${elementsIgnored}]. The difference: [${ignoredDiff}].  Filtered elements: [${filteredElements}]`
        };
      }
    } else {
      let filteredDiff = findArrayDifference(filteredElements, this.expectedOutput);
      return {
        result: "Fail",
        error: `Expected filtered elements [${this.expectedOutput}], but got [${filteredElements}]. The difference: [${filteredDiff}].`
      };
    }
  } // end run()
} //end testCase




console.log("Test 00: spells, less and more specific")
const test00 = new TestCase([".//spellselementthatdoesnt/exist", ".//spellsmemorized/spell"], {
    ".//spells": false,
    ".//spellsmemorized/spell": true,
  }, [".//spellselementthatdoesnt/exist"], [".//spellsmemorized/spell"])
console.log(test00.run())


// return;

console.log("Test 01: Check if all elements are removed when all paths are set to true in ignoredPaths.")
const test01 = new TestCase([".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//minions/": true,
  }, [], [".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"])
console.log(test01.run())

console.log("Test 02: Check if more specific paths(set to false) are not removed when parent path is set to true in ignoredPaths.")
const test02 = new TestCase([".//personal", ".//skills/secondary", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//skills/subpath", ".//minions/"], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//skills/subpath": false,
    ".//minions/": true,
  }, [".//skills/subpath"], [".//personal", ".//skills/secondary", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"])
console.log(test02.run())


console.log("Test 03: Check if more specific paths are not removed when parent path is set to true in ignoredPaths and include subpath.")
const test03 = new TestCase([".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//skills/subpath", ".//skills/subpath/subsubpath", ".//minions/"], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//skills/subpath": false,
    ".//minions/": true,
}, [".//skills/subpath", ".//skills/subpath/subsubpath"], [".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"])
console.log(test03.run())



console.log("Test 1 for empty input.")
const test1 = new TestCase([], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//minions/": true,
  }, [], [])
console.log(test1.run())

console.log("Test 2 for input where no elements match any path in ignoredPaths.")
const test2 = new TestCase([".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"], {
    ".//other/path": true,
    ".//another/path": true,
  }, [".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"], [])
console.log(test2.run())

console.log("Test 3 for input where every element match a path in ignoredPaths.")
const test3 = new TestCase([".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"], {
".//personal": true,
".//journals/journal": true,
".//spellsmemorized/spell": true,
".//skills": true,
".//minions/": true,
}, [], [".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"])
console.log(test3.run())


console.log("Test 4 for empty input.")
const test4 = new TestCase([], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//minions/": true,
  }, [], [])
console.log(test4.run())

console.log("Test 5 for input where no elements match any path in the ignoredPaths.")
const test5 = new TestCase([".//test1", ".//test2", ".//test3"], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//minions/": true,
  }, [".//test1", ".//test2", ".//test3"], [])
console.log(test5.run())

console.log("Test 6 for input where every element match a path in ignoredPaths.")
const test6 = new TestCase([".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"], {
    ".//personal": true,
    ".//journals/journal": true,
    ".//spellsmemorized/spell": true,
    ".//skills": true,
    ".//minions/": true,
  }, [], [".//personal", ".//journals/journal", ".//spellsmemorized/spell", ".//skills", ".//minions/"])
console.log(test6.run())

console.log("Test 7 checks that elements that match a path set to false in ignoredPaths are included in the output, while elements that match a path set to true in ignoredPaths are excluded from the output.")
const test7 = new TestCase([".//personal", ".//journals/journal", ".//personal", ".//personal/subpath", ".//minions/"], {
    ".//personal": true,
    ".//journals/journal": false,
    ".//minions/": false
}, ['.//journals/journal', './/minions/'], ['.//personal', './/personal', './/personal/subpath'])
console.log(test7.run())




console.log("Test 8 for input where multiple elements match the same path in ignoredPaths.")
const test8 = new TestCase([".//personal", ".//journals/journal", ".//personal", ".//personal/subpath", ".//minions/"], {
    ".//personal": false,
    ".//journals/journal": true,
    ".//minions/": true
}, [".//personal", ".//personal", ".//personal/subpath"], ['.//journals/journal','.//minions/'])
console.log(test8.run())



console.log("Test 9 - ignorePaths order 1")
const test9 = new TestCase(['.//senses/special', './/personal', './/defensive/special', './/immunities/special', './/skills/skill', './/feats/feat', './/traits/trait', './/flaws/flaw', './/attack/special', './/melee/weapon', './/melee/weapon/itempower', './/ranged/weapon', './/defenses/armor', './/defenses/armor/itempower', './/magicitems/item', './/magicitems/item/itempower', './/gear/item', './/otherspecials/special', './/journals/journal', './/minions/character/senses/special', './/minions/character/personal', './/minions/character/skills/skill', './/minions/character/feats/feat', './/minions/character/melee/weapon', './/minions/character/defenses/armor', './/minions/character/magicitems/item', './/minions/character/gear/item', './/minions/character/otherspecials/special', './/minions/character/journals/journal'], {
".//": true,
".//journals/journal": true,
".//minions/": false,
".//personal": true,
".//skills": true,
".//spellsmemorized/spell": true }, [
    './/minions/character/senses/special',
    './/minions/character/personal',
    './/minions/character/skills/skill',
    './/minions/character/feats/feat',
    './/minions/character/melee/weapon',
    './/minions/character/defenses/armor',
    './/minions/character/magicitems/item',
    './/minions/character/gear/item',
    './/minions/character/otherspecials/special',
    './/minions/character/journals/journal'
], ['.//senses/special', './/personal', './/defensive/special', './/immunities/special', './/skills/skill', './/feats/feat', './/traits/trait', './/flaws/flaw', './/attack/special', './/melee/weapon', './/melee/weapon/itempower', './/ranged/weapon', './/defenses/armor', './/defenses/armor/itempower', './/magicitems/item', './/magicitems/item/itempower', './/gear/item', './/otherspecials/special', './/journals/journal'])
console.log(test9.run())




console.log("Test 10 - ignorePaths order 2")
const test10 = new TestCase(['.//senses/special', './/personal', './/defensive/special', './/immunities/special', './/skills/skill', './/feats/feat', './/traits/trait', './/flaws/flaw', './/attack/special', './/melee/weapon', './/melee/weapon/itempower', './/ranged/weapon', './/defenses/armor', './/defenses/armor/itempower', './/magicitems/item', './/magicitems/item/itempower', './/gear/item', './/otherspecials/special', './/journals/journal', './/minions/character/senses/special', './/minions/character/personal', './/minions/character/skills/skill', './/minions/character/feats/feat', './/minions/character/melee/weapon', './/minions/character/defenses/armor', './/minions/character/magicitems/item', './/minions/character/gear/item', './/minions/character/otherspecials/special', './/minions/character/journals/journal'], {
  ".//personal": true,
  ".//journals/journal": true,
  ".//spellsmemorized/spell": true,
  ".//skills": true,
  ".//minions/": false,
".//": true }, [
    './/minions/character/senses/special',
    './/minions/character/personal',
    './/minions/character/skills/skill',
    './/minions/character/feats/feat',
    './/minions/character/melee/weapon',
    './/minions/character/defenses/armor',
    './/minions/character/magicitems/item',
    './/minions/character/gear/item',
    './/minions/character/otherspecials/special',
    './/minions/character/journals/journal'
], ['.//senses/special', './/personal', './/defensive/special', './/immunities/special', './/skills/skill', './/feats/feat', './/traits/trait', './/flaws/flaw', './/attack/special', './/melee/weapon', './/melee/weapon/itempower', './/ranged/weapon', './/defenses/armor', './/defenses/armor/itempower', './/magicitems/item', './/magicitems/item/itempower', './/gear/item', './/otherspecials/special', './/journals/journal' ])
console.log(test10.run())


console.log("Test 11 - ignorePaths order 1")
const test11 = new TestCase([
  './/senses/special',
  './/personal',
  './/skills/skill',
  './/skills/random',
  './/minions/character/skills/skill'
], {
  ".//": true,
  ".//minions/": false,
  ".//personal": true,
  ".//skills/random": false,
  ".//skills": true,
}, [
  './/skills/random',
  './/minions/character/skills/skill'
], [
  './/personal',
  './/senses/special',
  './/skills/skill'
])
console.log(test11.run())

console.log("Test 12 - ignorePaths order 2")
const test12 = new TestCase([
  './/senses/special',
  './/personal',
  './/skills/skill',
  './/skills/random',
  './/minions/character/skills/skill'
], {
  ".//personal": true,
  ".//skills": true,
  ".//skills/random": false,
  ".//minions/": false,
  ".//": true
}, [
  './/skills/random',
  './/minions/character/skills/skill'
], [
  './/senses/special',
  './/personal',
  './/skills/skill',
])
console.log(test12.run())


console.log("Test 13 - ignorePaths reorder elements")
const test13 = new TestCase([
  './/senses/special',
  './/personal',
  './/skills/skill',
  './/minions/character/skills/skill',
  './/skills/random'
], {
  ".//personal": true,
  ".//skills": true,
  ".//skills/random": false,
  ".//minions/": false,
  ".//": true
}, [
  './/skills/random',
  './/minions/character/skills/skill'
], [
  './/senses/special',
  './/personal',
  './/skills/skill',
])
console.log(test13.run())


console.log("Test 14 - spells")
const test14 = new TestCase([
  ".//personal",
  ".//spellsmemorized/spell"
], {
  ".//personal": false,
  ".//journals/journal": true,
  ".//spellsmemorized/spell": false,
  ".//skills": true,
  ".//minions/": true,
  ".//": true,
  ".//spells": true
}, [
  ".//personal",
  ".//spellsmemorized/spell"
], [])
console.log(test14.run())


