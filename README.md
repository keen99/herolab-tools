
in herolab, hit file > Save Custom Output, select the xml output for the active hero.

load that into the above, then print that to pdf (or paper).   it's mobile viewable but NO idea how/if mobile file upload works.

minus some exceptions, this will grab the description from the question mark mouseover info that's in herolab.

it's no better than what HL has, so it's not perfect for all things.  but.

exceptions right now:

    var exceptions = {
      ".//personal": true,
      ".//journals/journal": true,
      ".//skills/skill": true,
      ".//spellsmemorized/spell": true,
    };

    var exceptionNames = {
      "Additional Traits": true,
      "Spell, Touch": true,
      "Unarmed Strike": true,
      "Natural Armor": true,
      "Rations, trail (per day)": true,
      "Spell component pouch": true,
      "Waterskin": true,
      "Aura (Ex)": true,
      "Spell, Ranged": true,
      "Subtype - Human": true,
      "Type - Humanoid": true,
      "Bolts, Crossbow": true,
      "Darkvision (60 feet)": true,
      "Armor Proficiency (Heavy)": true,
      "Armor Proficiency (Light)": true,
      "Armor Proficiency (Medium)": true,
      "Martial Weapon Proficiency - All": true,
      "Shield Proficiency": true,
      "Simple Weapon Proficiency - All": true,
      "Tower Shield Proficiency": true,
      "Bedroll": true,
      "Backpack (empty)": true,
      "Item of Renown": true,
    };
