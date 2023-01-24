
// this still doesnt work for spells
function removeElements(elements, ignoredPaths, elementsIgnored = new Set()) {
  let filteredElements = []; // Create an empty array for the filtered elements
  // Sort the ignoredPaths by length (shortest to longest)
  let sortedIgnoredPaths = Object.keys(ignoredPaths).sort((a, b) => a.length - b.length);
  // console.log("sortedIgnoredPaths", sortedIgnoredPaths);

  // Iterate over the elements array
  for (let i = 0; i < elements.length; i++) {
    // console.log("elements["+i+"]", elements[i]);
    let element = elements[i];
    let included = false; // Flag to check if the element has been included or excluded

    // Iterate over the sorted ignoredPaths
    for (let j = 0; j < sortedIgnoredPaths.length; j++) {
      let ignoredPath = sortedIgnoredPaths[j];
      // console.log("  sortedignoredPath["+j+"]", ignoredPath, element.startsWith(ignoredPath));
      if (element.startsWith(ignoredPath)) {
        if (ignoredPaths[ignoredPath] === true) {
          // If the ignoredPath value is true, exclude the element
          included = true;
          elementsIgnored.add(element);
        } else {
          // If the ignoredPath value is false, include the element
          filteredElements.push(element);
          included = true;
          // Check if the element is already in elementsIgnored and remove it
          elementsIgnored.delete(element);
        }
      }
    }

    // If the element was not included or excluded, add it to the filteredElements array
    if (!included) {
      filteredElements.push(element);
    }
  }
  // console.log("filteredElements: ",filteredElements);
  return { filteredElements: filteredElements, elementsIgnored: elementsIgnored };
}



// function filterIgnoredNames(name, ignoredNames, elementsIgnored) {
//   console.log("filterIgnoredNames: name: ", name);
//   console.log("filterIgnoredNames: ignoredNames: ", ignoredNames);
//   // we may enter into a section with a description but no name. that's a valid case.
//   if (name === null) {
//     return null;
//   }
//   // if name STARTS with the test in the exception list, and it's not set false in the list, then skip
//   for (var ignoredName in ignoredNames) {
//     if (ignoredNames.hasOwnProperty(ignoredName) && ignoredNames[ignoredName] && name.startsWith(ignoredName)) {
//       if (!elementsIgnored.has(name)) {
//         elementsIgnored.add(name);
//         console.log("    Skipping ignoredNames: " + name);
//         return undefined;
//       } // if ! ignored name
//       return name;
//     } // if........name matchin
//   } // for ignoredNames
//   // if we somehow got through here, return undefined.
//   console.log("ERROR: something happened in filterIgnoredNames.", name, ignoredNames, elementsIgnored);
//   return undefined;
// }


function filterIgnoredNames(name, ignoredNames, elementsIgnored) {
  // console.log("filterIgnoredNames: name: ", name);
  // console.log("filterIgnoredNames: ignoredNames: ", ignoredNames);
  // we may enter into a section with a description but no name. that's a valid case.
  if (name === null) {
    // console.log("  got a null name, this is ok");
    return null;
  }
  // if name STARTS with the test in the exception list, and it's not set false in the list, then skip
  for (var ignoredName in ignoredNames) {
    // console.log("   ignoredName: ", ignoredName);
    // console.log("logic:", ignoredNames.hasOwnProperty(ignoredName),ignoredNames[ignoredName], name.startsWith(ignoredName));
    // does it match the filter?  enter the filter.
    if (ignoredNames.hasOwnProperty(ignoredName) && ignoredNames[ignoredName] && name.startsWith(ignoredName)) {
      // console.log("past logic");
      if (!elementsIgnored.has(name)) {
        elementsIgnored.add(name);
        console.log("    Skipping ignoredNames: " + name);
        return undefined;
      } // if ! ignored name
    } // if........name matchin
  } // for ignoredNames
  // console.log("  fallthrough, returning name as true");
  return name;
}




function handleDescriptions(item, elementsIgnored, nameDescriptionCombinations, element) {
  var descriptions = item.getElementsByTagName("description");
  var description = descriptions[0].textContent;
  var name = item.getAttribute("name");
  if (descriptions.length === 0) {
    elementsIgnored.add(name);
    console.log("    No description tag (len=0) found for element " + element + " name: " + name + " descr: " + description);
    return false;
  }
  if (description === "") {
    elementsIgnored.add(name);
    console.log("    No description tag (empty) found for element " + element + " name: " + name + " descr: " + description);
    return false;
  }
  var combination = name + description;
  if (nameDescriptionCombinations.has(combination)) {
    console.log("    duplicate name + description combination found: " + name);
    return false;
  } else {
    nameDescriptionCombinations.add(combination);
    return {
      shouldCreateContainer: true,
      name: name,
      element: element,
      description: description
    }
  }
}



// be conditional so we can use this in a browser or node
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    removeElements: removeElements,
    filterIgnoredNames: filterIgnoredNames,
  };
}
