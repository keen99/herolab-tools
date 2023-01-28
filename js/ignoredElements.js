
    processedFileName = "";

    // Create the pdfDoc variable outside of any function
    let pdfDoc = false;
    let pdfVisible = false;

    // include .//  so it's easily available for flipping
    ignoredPaths = {
      ".//": false,
      ".//personal": true,
      ".//journals/journal": true,
      ".//spells": true,
      ".//spellsmemorized/spell": true,
      ".//skills": true,
      ".//minions/": true,
    };
    const origIgnoredPaths = {...ignoredPaths}; // make a copy

    ignoredNames = {
      "Additional Traits": true,
      "Arrows": true,
      "Saddle": true,
      "Silvered Arrows": true,
      "Spike, Iron": true,
      "Dagger": true,
      "Hammer": true,
      "Twine, Roll": true,
      "Rope, hempen": true,
      "Unarmed Strike": true,
      "Spell component pouch": true,
      "Aura (Ex)": true,
      "Subtype - Human": true,
      "Subtype - Dwarf": true,
      "Subtype - Elf": true,
      "Type - Animal": true,
      "Type - Humanoid": true,
      "Bolts, Crossbow": true,
      "Darkvision ": true,
      "Armor Proficiency": true,
      "Martial Weapon Proficiency": true,
      "Shield Proficiency": true,
      "Simple Weapon Proficiency - All": true,
      "Tower Shield Proficiency": true,
      "Item of Renown": true,
      "Masterwork Studded Leather": true,
    };
    const origIgnoredNames = {...ignoredNames}; // make a copy



function getOriginalIgnoredValue(nameOrPath) {
  // console.log("getOriginalIgnoredValue", nameOrPath);
  var nameOrPath = String(nameOrPath);
  if(nameOrPath.startsWith("./")){
      return origIgnoredPaths[nameOrPath];
  } else {
      return origIgnoredNames[nameOrPath];
  }
  return undefined;
}

