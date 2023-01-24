
    var selectedOptions = [];


    // include .//  so it's easily available for flipping
    var ignoredPaths = {
      ".//": false,
      ".//personal": true,
      ".//journals/journal": true,
      ".//spells": false,
      ".//spellsmemorized/spell": true,
      ".//skills": true,
      ".//minions/": true,
    };

    var ignoredNames = {
      "Additional Traits": false,
      "Unarmed Strike": true,
      "Spell component pouch": true,
      "Aura (Ex)": true,
      "Subtype - Human": true,
      "Subtype - Dwarf": true,
      "Subtype - Elf": true,
      "Type - Humanoid": true,
      "Bolts, Crossbow": true,
      "Darkvision ": true,
      "Armor Proficiency": true,
      "Martial Weapon Proficiency": true,
      "Shield Proficiency": true,
      "Simple Weapon Proficiency - All": true,
      "Tower Shield Proficiency": true,
      "Item of Renown": true,
    };



