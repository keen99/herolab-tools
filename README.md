
# HeroLab Tools

This repository contains a collection of tools for working with data exported from HeroLab, a character creation and management tool for role-playing games.

## HeroLab XML Data Extractor

The HeroLab XML Data Extractor is a tool that allows you to easily extract item, object, and power descriptions from HeroLab character sheets exported in XML format. To use the tool, follow these steps:

1. Open the HeroLab application sheet and go to the "File" menu.
2. Select "Save Custom Output" and choose "Generate XML File" as the output format.
3. Save the XML file to your computer.
4. Upload the XML file using the file input field on the tool's page. You can also use one of the sample files provided for a demo.
5. The extracted data will be displayed on the page and can be saved as a PDF using your browser's Print function for future reference.

To use the tool, go to the [HeroLab XML Data Extractor page](herolab-xml-data-extractor.html)

## Additional Tools

Additional tools for working with HeroLab data will be added to this repository in the future.

## Contributing

If you would like to contribute to this project, please fork the repository and make your changes in a separate branch. Once you have made your changes, submit a pull request for review.

## Support

If you encounter any issues or have any questions about this tool, please open an issue in the repository's issue tracker.

## License

This project is in the public domain, and is released without any rights reserved.






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
