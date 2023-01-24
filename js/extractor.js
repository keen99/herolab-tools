
function processXmlFile(fileLocation) {
  if (fileLocation) {
    var parsedXml;
    // Fetch the XML file
    var xhr = new XMLHttpRequest();
    xhr.open("GET", fileLocation, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
         var parser = new DOMParser();
         parsedXml = parser.parseFromString(xhr.responseText, "text/xml");
         // continue processing parsedXml
         processParsedXml(parsedXml);
      }
    }
    xhr.send();
    return;
  }
  // Get the file input element
  var xmlFileInput = document.getElementById("xml-file");
  // Get the selected file
  var selectedFile = xmlFileInput.files[0];
  // Update the status message
  document.getElementById("status").innerHTML = "Processing file: " + selectedFile.name;
  // Create a new FileReader
  var fileReader = new FileReader();
  // Add an event listener to be notified when the file has been read
  fileReader.addEventListener("load", function () {
    // Parse the file contents as XML
    var parser = new DOMParser();
    parsedXml = parser.parseFromString(fileReader.result, "text/xml");
    // continue processing parsedXml
    processParsedXml(parsedXml);
  });
  // Read the file as text
  fileReader.readAsText(selectedFile);
}


function processParsedXml(parsedXml) {

  // Get the grid container created earlier
  var mainGridContainer = document.querySelector(".main-container .grid-container")

  //Variable to hold found elements
  var xmlElements = new Set();
  //Find all elements with 'description'
  var xmlDescriptionElements = parsedXml.getElementsByTagName('description');
  for (var i = 0; i < xmlDescriptionElements.length; i++) {
    var path = getElementXPath(xmlDescriptionElements[i]);
    path = path.replace('/document/public/character', './');
    path = path.replace('/description', '');
    path = path.replace(/\[[0-9]+\]/g, '');
    xmlElements.add(path)
  } // end for
  // convert the set to an array
  var xmlElements = [...xmlElements];

  var elementsIgnored = new Set();
  console.log("xmlElements", JSON.stringify(xmlElements,null,2));

  // filter out elemets using ignoredPaths
  var [xmlElements, elementsIgnored] = Object.values(removeElements(xmlElements, ignoredPaths, elementsIgnored));

  console.log("ignoredPaths", JSON.stringify(ignoredPaths,null,2));
  console.log("filtered xmlElements", JSON.stringify(xmlElements,null,2));

  var extractedData = [];
  // create a set to store name + description combinations
  var nameDescriptionCombinations = new Set();

  // console.log("ignoredPaths", JSON.stringify(ignoredPaths,null,2));
  // console.log("ignoredNames", JSON.stringify(ignoredNames,null,2));

  // Iterate through the xmlElements and extract the data
  // label the outer loop so we can continue it from inside another
  // processelements:
  for (var i = 0; i < xmlElements.length; i++) {
    // console.log("xmlElements[i]: " + xmlElements[i]);
    var items = parsedXml.evaluate(xmlElements[i], parsedXml, null, XPathResult.ANY_TYPE, null);
    var item = items.iterateNext();
    while (item) {
      // console.log("  item name: ", item.getAttribute("name"));
      // skip based on ignoredNames
      var name = item.getAttribute("name");
      if ( filterIgnoredNames(name, elementsIgnored)) {
        item = items.iterateNext();
        continue;
      }
      // // gets descriptions, filters when apropos, and adds to the container is we should
      var handleDescriptionsResult = handleDescriptions(item, elementsIgnored, nameDescriptionCombinations, xmlElements[i]);
      if (handleDescriptionsResult.shouldCreateContainer) {
        extractedData.push({
          container: createDescriptionElement(handleDescriptionsResult.name, handleDescriptionsResult.element, handleDescriptionsResult.description),
          name: handleDescriptionsResult.name
        });
      }
      // Move to the next item
      item = items.iterateNext();
    } //end of while (item)
  } //end of  for (var i = 0; i < xmlElements.length; i++)

  // sort the xmlElements array by name
  sortextractedData(extractedData);

  // AFTER we sort, so the skipped section is last
  assembleSkipped(elementsIgnored, extractedData, name);
  //iterate through the sorted array and append the container elements to the grid container
  for (var i = 0; i < extractedData.length; i++) {
    mainGridContainer.appendChild(extractedData[i].container);
  }
  // now create our header/footer& pushes header, footer, and mainGridContainer
  createHeaderAndFooter(parsedXml);
  removeHtmlElements();
}


function assembleSkipped(elementsIgnored, extractedData, name) {
  // Check if there are any skipped elements
  if (elementsIgnored.size > 0) {
    var skippedDescription = document.createElement("div");
    skippedDescription.classList.add("grid-item", "description-text");
    var skippedText = "";
    for (var element of elementsIgnored) {
      skippedText += "'" + element + "' ";
    }
    // Add the container element to the elements array
    extractedData.push({
      container: createDescriptionElement("Skipped", "", skippedText),
      name: name
    });
  }
}

function sortextractedData(extractedData) {
  extractedData.sort(function (a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
  });
}


function createHeaderAndFooter(parsedXml) {
  // extract character name
  var characterName = parsedXml.querySelector("character").getAttribute("name");
  // extract race name
  var raceName = parsedXml.querySelector("race").getAttribute("name");
  // extract template names and levels
  var templateNodes = parsedXml.querySelectorAll("templates");
  // var templateNames = [];
  // var templateLevels = [];
  for (var i = 0; i < templateNodes.length; i++) {
    var template = templateNodes[i];
    var templateSummary = template.getAttribute("summary");
    // var parts = summary.split(" ");
    // templateNames.push(parts[0]);
    // templateLevels.push(parts[1]);
  }
  // extract class names and levels
  // var classNodes = parsedXml.querySelectorAll("class");
  var classNodes = parsedXml.querySelectorAll("classes");
  // var classNames = [];
  // var classLevels = [];
  for (var i = 0; i < classNodes.length; i++) {
    var classNode = classNodes[i];
    var classSummary = classNode.getAttribute("summary");
    // var name = classNode.getAttribute("name");
    // var level = classNode.getAttribute("level");
    // classNames.push(name);
    // classLevels.push(level);
  }
  // Select the existing header element
  var header = document.querySelector(".main-container .page-header");
  header.classList.add("page-header");
  header.innerHTML = "" + characterName + " -- " + raceName +
    " " + templateSummary + " " + classSummary;
  // Select the existing footer element
  var footer = document.querySelector(".main-container .page-footer");
  footer.classList.add("page-footer");
  footer.innerHTML = "Footer....: ";
  // Select the existing main-container element
  var higherLevelContainer = document.querySelector(".main-container");
  higherLevelContainer.classList.add("main-container");
  // Select the existing grid-container element
  var mainGridContainer = document.querySelector(".main-container .grid-container")
  // Append mainGridContainer, header and footer to the main container
  // be sure these are in the right order.  out of order will change the DOM and the rendering
  higherLevelContainer.appendChild(header);
  higherLevelContainer.appendChild(mainGridContainer);
  higherLevelContainer.appendChild(footer);
  // Append the main container to the body
  document.body.appendChild(higherLevelContainer);
}

function createDescriptionElement(name, elementpath, description) {
  // Create a new container element
  var container = document.createElement("div");
  container.classList.add("grid-item", "container");
  // Create a name element
  var nameEl = document.createElement("div");
  nameEl.classList.add("grid-item", "name-heading");
  nameEl.innerHTML = name;
  var elEl = document.createElement("div");
  elEl.classList.add("grid-item", "element-path");
  elEl.innerHTML = elementpath;
  // Create a description element
  var descEl = document.createElement("div");
  descEl.classList.add("grid-item", "description-text");
  descEl.innerHTML = description;
  // Append the name and description elements to the container
  container.appendChild(nameEl);
  container.appendChild(elEl);
  container.appendChild(descEl);
  return container;
}

function removeHtmlElements(elements = ["xml-file", "status", "xml-button", "addNameForm", "filterHeaderContainer", "filterContainer"]) {
  elements.forEach(elementId => {
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  });
}

