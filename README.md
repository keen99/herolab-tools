
# HeroLab Tools

This repository contains a collection of tools for working with data exported from HeroLab, a character creation and management tool for role-playing games.

## HeroLab XML Data Extractor

The HeroLab XML Data Extractor is a tool that allows you to easily extract item, object, and power descriptions from HeroLab character sheets exported in XML format. To use the tool, follow these steps:

1. Open the HeroLab application sheet and go to the "File" menu.
2. Select "Save Custom Output" and choose "Generate XML File" as the output format.
3. Save the XML file to your computer.
4. Upload the XML file using the file input field on the tool's page. You can also use one of the sample files provided for a demo.
5. The extracted data will be displayed on the page and can be saved as a PDF using your browser's Print function for future reference.

To use the tool, go to the [HeroLab XML Data Extractor page](https://keen99.github.io/herolab-tools/)

## Ignored Data

  In this tool, ignoredPaths and ignoredNames from `js/ignoredElements.js` are used as lists of elements and attributes to ignore while extracting data from the XML file. These elements and attributes are ignored because they do not contain useful information. For example, elements related to personal information or journals are ignored. Similarly, elements such as "Additional Traits" and "Spells".  It's worth noting that this tool is not perfect and may not be able to extract all desired information, especially if the data is not present in the mouseover tooltip in the original HeroLab sheet.

## Additional Tools

Additional tools for working with HeroLab data will be added to this repository in the future.

## Contributing

If you would like to contribute to this project, please fork the repository and make your changes in a separate branch. Once you have made your changes, submit a pull request for review.

## Support

If you encounter any issues or have any questions about this tool, please open an issue in the repository's issue tracker.

## Credits

This version of the tools written primarily by [ChatGPT](https://chat.openai.com/chat) with guidance by [David Raistrick](https://www.brasstack.net/)

## License

This project is in the public domain, and is released without any rights reserved.

