
function processXmlFile(fileLocation) {
  if (fileLocation) {
    let parsedXml;
    // Fetch the XML file
    let xhr = new XMLHttpRequest();
    xhr.open("GET", fileLocation, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
         let parser = new DOMParser();
         parsedXml = parser.parseFromString(xhr.responseText, "text/xml");
         // continue processing parsedXml
         processParsedXml(parsedXml);
      }
    }
    processedFileName = fileLocation;
    console.log("processedFileName", processedFileName, " fileLocation",  fileLocation);
    xhr.send();
    return;
  }
  // Get the file input element
  let xmlFileInput = document.getElementById("xml-file");
  // Get the selected file
  let selectedFile = xmlFileInput.files[0];
  // Update the status message
  document.getElementById("status").innerHTML = "Processing file: " + selectedFile.name;
  // update global
  processedFileName = selectedFile.name;
  // console.log("processedFileName", processedFileName, "selectedFile.name",  selectedFile.name);
  // Create a new FileReader
  let fileReader = new FileReader();
  // Add an event listener to be notified when the file has been read
  fileReader.addEventListener("load", function () {
    // Parse the file contents as XML
    let parser = new DOMParser();
    parsedXml = parser.parseFromString(fileReader.result, "text/xml");
    // continue processing parsedXml
    processParsedXml(parsedXml);
  });
  // Read the file as text
  fileReader.readAsText(selectedFile);
}


function processParsedXml(parsedXml) {

  // Get the grid container created earlier
  let mainGridContainer = document.querySelector(".main-container .grid-container")

  //Variable to hold found elements
  var xmlElements = new Set();
  //Find all elements with 'description'
  let xmlDescriptionElements = parsedXml.getElementsByTagName('description');
  for (let i = 0; i < xmlDescriptionElements.length; i++) {
    let path = getElementXPath(xmlDescriptionElements[i]);
    path = path.replace('/document/public/character', './');
    path = path.replace('/description', '');
    path = path.replace(/\[[0-9]+\]/g, '');
    xmlElements.add(path)
  } // end for
  // convert the set to an array
  var xmlElements = [...xmlElements];

  var elementsIgnored = new Set();
  // console.log("xmlElements", JSON.stringify(xmlElements,null,2));

  // filter out elemets using ignoredPaths
  var [xmlElements, elementsIgnored] = Object.values(removeElements(xmlElements, ignoredPaths, elementsIgnored));
  // console.log("ignoredNames", JSON.stringify(ignoredNames,null,2));
  // console.log("ignoredPaths", JSON.stringify(ignoredPaths,null,2));
  // console.log("filtered xmlElements", JSON.stringify(xmlElements,null,2));
  let extractedData = [];
  // create a set to store name + description combinations
  let nameDescriptionCombinations = new Set();
  // Iterate through the xmlElements and extract the data
  // label the outer loop so we can continue it from inside another
  for (let i = 0; i < xmlElements.length; i++) {
    // console.log("xmlElements[i]: " + xmlElements[i]);
    let items = parsedXml.evaluate(xmlElements[i], parsedXml, null, XPathResult.ANY_TYPE, null);
    let item = items.iterateNext();
    while (item) {
      // console.log("  item name: ", item.getAttribute("name"));
      // skip based on ignoredNames
      let name = item.getAttribute("name");
      // this return as false-able if we should skip this.
      // console.log("name filter for name:", name);
      if ( !filterIgnoredNames(name, ignoredNames, elementsIgnored)) {
        // console.log("    skipping, next.");
        item = items.iterateNext();
        continue;
      }
      // // gets descriptions, filters when apropos, and adds to the container is we should
      let handleDescriptionsResult = handleDescriptions(item, elementsIgnored, nameDescriptionCombinations, xmlElements[i]);
      // if this returns a falseable, we dont push this item to the container
      // that could be empty or duplicate.
      if (handleDescriptionsResult.shouldCreateContainer) {
        // console.log("container creation for name:", name);
        extractedData.push({
          container: createDescriptionElement(handleDescriptionsResult.name, handleDescriptionsResult.element, handleDescriptionsResult.description),
          name: handleDescriptionsResult.name
        });
      }
      // Move to the next item
      item = items.iterateNext();
    } //end of while (item)
  } //end of  for (let i = 0; i < xmlElements.length; i++)
  // sort the xmlElements array by name for presentation
  sortextractedData(extractedData);
  // AFTER we sort, so the skipped section is last
  assembleSkipped(elementsIgnored, extractedData, name);
  //iterate through the sorted array and append the container elements to the grid container
  for (let i = 0; i < extractedData.length; i++) {
    mainGridContainer.appendChild(extractedData[i].container);
  }
  // now create our grid header/footer& pushes header, footer, and mainGridContainer
  let headerAndFooter = createGridHeaderAndFooter(parsedXml);

  const buttonHeader = document.querySelector(".button-header");
  buttonHeader.classList.add("show-button-header");

  // remove the original first page
  removeHtmlElements();

  // create the header buttons and form for controlling the columns and PDF view
  createHeaderButtons();

  const pdfDownloadButton = document.getElementById("download-pdf-button");
  // add to the existing onclick
  pdfDownloadButton.addEventListener("click", function(){
      const columnCount = getColumnCount();
      console.log("pdfDownloadButton onclick update pdfDoc:", pdfDoc);
        pdfDoc = createPdf(extractedData, headerAndFooter, columnCount, true);
        console.log("new pdfDoc: ", pdfDoc);

  });

  const columnCountInput = document.getElementById("column-count");
  columnCountInput.addEventListener("change", function() {
    const columnCount = getColumnCount();
    updateGridColumnCount(columnCount);

    if(pdfVisible) {
      pdfDoc = createPdf(extractedData, headerAndFooter, columnCount);
      console.log("new pdfDoc: ", pdfDoc);
    }
  });

  const pdfForm = document.getElementById("pdf-form");
  pdfForm.addEventListener("submit", function(event) {
    handlePdfFormSubmit(event, extractedData, headerAndFooter);
  });

} // end processParsedXml

function updateGridColumnCount(columnCount) {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.style.columns = columnCount;
}


function handlePdfFormSubmit(event, extractedData, headerAndFooter) {
  event.preventDefault(); // prevent the form from doing a real submit
  // update pdfButtonClick
  pdfButtonClick();
  const columnCount = getColumnCount();
  const pdfContainer = document.querySelector('.pdf-container');
  const mainContainer = document.querySelector('.main-container');

  console.log("pdfForm onsubmit update - pdfVisible: ", pdfVisible, "columnCount:", columnCount);

  if (pdfVisible && (!pdfDoc || pdfDoc.columns !== columnCount)) {
    pdfDoc = createPdf(extractedData, headerAndFooter, columnCount);
    console.log("new pdfDoc: ", pdfDoc);
  }
} // handlePdfFormSubmit


function getColumnCount() {
  // Get the column-count input element
  const columnCountInput = document.getElementById("column-count");
  // Get the value of the input
  const columnCount = columnCountInput.value;
  // Return the column count
  return columnCount;
}

function createHeaderButtons(){
  // Get the button-header div
  let buttonHeader = document.getElementById("button-header");
  // Create the form
  let form = createPdfForm();
  // Create the label
  let label = createPdfLabel();
  form.appendChild(label);
  // Create the input for column count
  let columnCountInput = createColumnCountInput();
  form.appendChild(columnCountInput);
  // Create the submit button
  let submitButton = createSubmitButton();
  form.appendChild(submitButton);
  // Create the download PDF button
  let downloadButton = createDownloadButton();
  // Append the form and buttons to the button-header div
  buttonHeader.appendChild(form);
  buttonHeader.appendChild(downloadButton);
} // createHeaderButtons

function createPdfForm() {
  let form = document.createElement("form");
  form.id = "pdf-form";
  form.className = "pdf-form";
  return form;
}

function createPdfLabel() {
  let label = document.createElement("label");
  label.for = "column-count";
  label.innerHTML = "PDF Columns:";
  return label;
}

function createColumnCountInput() {
  let columnCountInput = document.createElement("input");
  columnCountInput.type = "number";
  columnCountInput.id = "column-count";
  columnCountInput.min = "1";
  columnCountInput.max = "9";
  columnCountInput.value = "2";
  return columnCountInput;
}

function createSubmitButton() {
  let submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Show PDF";
  return submitButton;
}

function createDownloadButton() {
  let downloadButton = document.createElement("button");
  downloadButton.className = "download-pdf-button";
  downloadButton.id = "download-pdf-button";
  downloadButton.innerHTML = "Download PDF";
  return downloadButton;
}


function pdfButtonClick() {
  const pdfContainer = document.querySelector('.pdf-container');
  const mainContainer = document.querySelector('.main-container');
  const pdfForm = document.getElementById("pdf-form");

  console.log("pdfButtonClick - previous pdfVisible:", pdfVisible);
  if (!pdfVisible) {
    pdfContainer.classList.add("show-pdf");
    mainContainer.classList.add("half-main-container");
    pdfForm[1].value = "Hide PDF";
    pdfVisible = true;
  } else {
    pdfContainer.classList.remove("show-pdf");
    mainContainer.classList.remove("half-main-container");
    pdfForm[1].value = "Show PDF";

    pdfVisible = false;
  }
  pdfForm[1].value = pdfVisible ? "Hide PDF" : "Show PDF";

} //pdfButtonClick


function assembleSkipped(elementsIgnored, extractedData) {
  // Check if there are any skipped elements
  if (elementsIgnored.size > 0) {
    let skippedDescription = document.createElement("div");
    skippedDescription.classList.add("grid-item", "description-text");
    let skippedText = "";
    for (let element of elementsIgnored) {
      skippedText += "'" + element + "' ";
    }
    // Add the container element to the elements array
    extractedData.push({
      container: createDescriptionElement("Skipped", "", skippedText),
      name: "Skipped"
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


function createGridHeaderAndFooter(parsedXml) {
  // extract character name
  let characterName = parsedXml.querySelector("character").getAttribute("name");
  // extract race name
  let raceName = parsedXml.querySelector("race").getAttribute("name");
  // extract template names and levels
  let templateNodes = parsedXml.querySelectorAll("templates");
  // let templateNames = [];
  // let templateLevels = [];
  for (let i = 0; i < templateNodes.length; i++) {
    let template = templateNodes[i];
    var templateSummary = template.getAttribute("summary");
    // let parts = summary.split(" ");
    // templateNames.push(parts[0]);
    // templateLevels.push(parts[1]);
  }
  // extract class names and levels
  // let classNodes = parsedXml.querySelectorAll("class");
  let classNodes = parsedXml.querySelectorAll("classes");
  // let classNames = [];
  // let classLevels = [];
  for (let i = 0; i < classNodes.length; i++) {
    let classNode = classNodes[i];
    var classSummary = classNode.getAttribute("summary");
    // let name = classNode.getAttribute("name");
    // let level = classNode.getAttribute("level");
    // classNames.push(name);
    // classLevels.push(level);
  }
  // Select the existing header element
  let header = document.querySelector(".main-container .page-header");
  header.classList.add("page-header");
  header.innerHTML = "" + characterName + " - " + raceName +
    " " + templateSummary + " " + classSummary;
  // Select the existing footer element
  let footer = document.querySelector(".main-container .page-footer");
  footer.classList.add("page-footer");
  footer.innerHTML = "";
  // Select the existing main-container element
  let higherLevelContainer = document.querySelector(".main-container");
  higherLevelContainer.classList.add("main-container");
  // Select the existing grid-container element
  let mainGridContainer = document.querySelector(".main-container .grid-container")
  // Append mainGridContainer, header and footer to the main container
  // be sure these are in the right order.  out of order will change the DOM and the rendering
  higherLevelContainer.appendChild(header);
  higherLevelContainer.appendChild(mainGridContainer);
  higherLevelContainer.appendChild(footer);
  // Append the main container to the body
  document.body.appendChild(higherLevelContainer);
  return higherLevelContainer;
}

function createDescriptionElement(name, elementpath, description) {
  // Create a new container element
  let container = document.createElement("div");
  container.classList.add("grid-item", "container");
  // Create a name element
  let nameEl = document.createElement("div");
  nameEl.classList.add("grid-item", "name-heading");
  nameEl.innerHTML = name;
  let elEl = document.createElement("div");
  elEl.classList.add("grid-item", "element-path");
  elEl.innerHTML = elementpath;
  // Create a description element
  let descEl = document.createElement("div");
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
    let element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
  });
}

