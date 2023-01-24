
    var selectedOptions = [];


    // skip these if we find them.
    var ignoredPaths = {
      ".//personal": true,
      ".//journals/journal": true,
      ".//spellsmemorized/spell": true,
      ".//skills": true,
      ".//skills/subpath": true,
      ".//minions/": true,
    };

    var ignoredNames = {
      "Additional Traits": true,
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



