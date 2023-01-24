
// // // this suffers an order of ignorePaths problem?
// function shouldIncludeElement(element, pathMap) {
//   let include = true;
//   for (const [path, shouldInclude] of pathMap) {
//     if (element.startsWith(path)) {
//         include = shouldInclude;
//     }
//   }
//   // console.log("include..");
//   // console.log(include);
//   return include;
// }

// function shouldIncludeElement(element, pathMap) {
//     let include = true;
//     for (const [path, shouldInclude] of pathMap) {
//         if (element === path || element.startsWith(path)) {
//             include = shouldInclude;
//         }
//     }
//     return include;
// }




// // this suffers an order of ignorePaths problem
// function removeElements(elements, ignoredPaths) {
//   // console.log("removeElements: ", elements, ignoredPaths);
//   var pathMap = new Map();
//   for (const [path, shouldInclude] of Object.entries(ignoredPaths)) {
//     pathMap.set(path, !shouldInclude);
//   }
//   return elements.filter(element => shouldIncludeElement(element, pathMap));
// }

// function removeElements(elements, ignoredPaths) {
//   var pathMap = new Map();
//   for (const path in ignoredPaths) {
//     pathMap.set(path, !ignoredPaths[path]);
//   }
//   return elements.filter(element => shouldIncludeElement(element, pathMap));
// }


// function removeElements(elements, ignoredPaths) {
//   return elements.filter(element => {
//     for (const path in ignoredPaths) {
//       if (element.startsWith(path) && (element[path.length] === '/' || element.length === path.length) && !ignoredPaths[path]) {
//         return false;
//       }
//     }
//     return true;
//   });
// }



// function removeElements(elements, ignoredPaths) {
//   const pathMap = new Map(Object.entries(ignoredPaths));
//   return elements.filter(element => shouldIncludeElement(element, pathMap));
// }

// function shouldIncludeElement(element, pathMap) {
//     let exclude = false;
//     for (const [path, shouldExclude] of pathMap) {
//         if (element === path || element.startsWith(path + '/')) {
//             exclude = shouldExclude;
//         }
//     }
//     return !exclude;
// }




// function removeElements(elements, ignoredPaths) {
//   return elements.filter(element => {
//     // Iterate over the ignoredPaths object
//     for (let path in ignoredPaths) {
//       console.log("path: ", path);
//       console.log("ignoredPaths["+path+"]: ", ignoredPaths[path]);
//       // Check if the element starts with the path and the value for that path is true
//       if (element.startsWith(path) && ignoredPaths[path] === false) {
//         console.log(true);
//         return true;
//       }
//     }
//         console.log(false);
//     return false;
//   });
// }


// function removeElements(elements, ignoredPaths) {
//   // Create a new array to store the filtered elements
//   var filteredElements = [];
//   // Iterate over the elements array
//   for (let i = 0; i < elements.length; i++) {
//     // Initialize a flag variable to false
//     var add = true;
//     // Iterate over the ignoredPaths object
//     for (let path in ignoredPaths) {
//       // Check if the element starts with the path and the value for that path is true
//       if (elements[i].startsWith(path) && ignoredPaths[path] === true) {
//         console.log(elements[i] + " ignored as it starts with " + path + " and value is true");
//         // If it does, set the flag variable to false and break out of the loop
//         add = false;
//         break;
//       }
//     }
//     // If the flag variable is true, add the current element to the filteredElements array
//     if (add) {
//       filteredElements.push(elements[i]);
//     }
//   }
//   // Iterate over the filteredElements array
//   for (let i = 0; i < filteredElements.length; i++) {
//     // Initialize a flag variable to false
//     var remove = false;
//     // Iterate over the ignoredPaths object
//     for (let path in ignoredPaths) {
//       // Check if the element starts with the path and the value for that path is false
//       if (filteredElements[i].startsWith(path) && ignoredPaths[path] === false) {
//         console.log(filteredElements[i] + " included as it starts with " + path + " and value is false");
// // If it does, set the flag variable to true and break out of the loop
// remove = true;
// break;
// }
// }
// // If the flag variable is false, remove the current element from the filteredElements array
// if (!remove) {
// console.log(filteredElements[i] + " removed as it does not match any false paths");
// filteredElements.splice(i, 1);
// i--;
// }
// }
// // Return the filteredElements array
// console.log("Final Filtered Elements: ", filteredElements);
// return filteredElements;
// }




// function removeElements(elements, ignoredPaths) {
//   let filteredElements = [];
//   for (let i = 0; i < elements.length; i++) {
//     let include = true;
//     for (let path in ignoredPaths) {
//       if (elements[i].startsWith(path) && ignoredPaths[path] === false) {
//         include = false;
//         break;
//       }
//     }
//     if (include) {
//       filteredElements.push(elements[i]);
//     }
//   }
//   console.log("Final Filtered Elements: ", filteredElements);
//   return filteredElements;
// }

// function rRemoveElements(elements, ignoredPaths) {
//   let filteredElements = [...elements]; // Create a copy of the elements array

//   // Iterate over the ignoredPaths object
//   for (let path in ignoredPaths) {
//     console.log("for ignoredPath:", path, ignoredPaths[path]);
//     // Iterate over the filteredElements array
//     for (let i = 0; i < filteredElements.length; i++) {
//       console.log("  filteredElements["+i+"]", filteredElements[i], );
//       if (filteredElements[i].startsWith(path) && ignoredPaths[path] === true) {
//         // If the element starts with the path and the value for that path is true, check for more specific paths
//         for (let subPath in ignoredPaths) {
//           console.log("    subpath: ", subPath);
//           console.log("    ",filteredElements[i].startsWith(subPath), subPath !== path, ignoredPaths[subPath] === false);
//           if (filteredElements[i].startsWith(subPath) && subPath !== path && ignoredPaths[subPath] === false) {
//             // If the subPath value is false, do not remove the element from the filtered array
//             console.log(`      Not removing element: ${filteredElements[i]} as subPath value is false, path:`, path);
//             break;
//           } else {
//             // If the subPath value is true or the subPath is not more specific, remove the element from the filtered array
//             console.log(`      Removing element (first): ${filteredElements[i]} as path value is true, path:`, path);
//             filteredElements.splice(i, 1);
//             i--; // Decrement the counter to account for the removed element
//             break;
//           }
//         }
//       } else if (filteredElements[i].startsWith(path) && ignoredPaths[path] === false) {
//         // If the element starts with the path and the value for that path is false, check for more specific paths
//         for (let subPath in ignoredPaths) {
//          console.log("    subpath: ", subPath);
//           console.log("    ",filteredElements[i].startsWith(subPath), subPath !== path, ignoredPaths[subPath] === false);
//           if (filteredElements[i].startsWith(subPath) && subPath !== path && ignoredPaths[subPath] === true) {
//             // If the subPath value is true, remove the element from the filtered array
//             console.log(`      Removing element (second): ${filteredElements[i]} as subPath value is true, path:`, path);
//             filteredElements.splice(i, 1);
//             i--; // Decrement the counter to account for the removed element
//             break;
//           } else {
//             console.log(`      Not Removing element (second): ${filteredElements[i]} as subPath value is false, path:`, path);
//           }
//         }
//       }
//     }
//   }

//   console.log("Final Filtered Elements: ", filteredElements);
//   return filteredElements;
// }



// function removeElements(elements, ignoredPaths) {
//   let filteredElements = [...elements]; // Create a copy of the elements array

//   // Iterate over the ignoredPaths object
//   for (let path in ignoredPaths) {
//     console.log("for ignoredPath:", path, ignoredPaths[path]);
//     // Iterate over the filteredElements array
//     for (let i = 0; i < filteredElements.length; i++) {
//       console.log("  filteredElements["+i+"]", filteredElements[i], );
//       if (filteredElements[i] && filteredElements[i].startsWith(path) && ignoredPaths[path] === true) {
//         // If the element starts with the path and the value for that path is true, check for more specific paths
//         for (let subPath in ignoredPaths) {
//           console.log("    subpath: ", subPath);
//           console.log("    ",filteredElements[i].startsWith(subPath), subPath !== path, ignoredPaths[subPath] === false);
//           if (filteredElements[i].startsWith(subPath) && subPath !== path && ignoredPaths[subPath] === false) {
//             // If the subPath value is false, do not remove the element from the filtered array
//             console.log(`      Not removing element: ${filteredElements[i]} as subPath value is false, path:`, path);
//             break;
//           } else {
//             // If the subPath value is true or the subPath is not more specific, remove the element from the filtered array
//             console.log(`      Removing element (first): ${filteredElements[i]} as path value is true, path:`, path);
//             filteredElements.splice(i, 1);
//             i--; // Decrement the counter to account for the removed element
//             break;
//           }
//         }
//             } else if (filteredElements[i] && filteredElements[i].startsWith(path) && ignoredPaths[path] === false) {
//         // If the element starts with the path and the value for that path is false, check for more specific paths
//         for (let subPath in ignoredPaths) {
//           console.log("    subpath: ", subPath);
//           console.log("    ",filteredElements[i].startsWith(subPath), subPath !== path, ignoredPaths[subPath] === true);
//           if (filteredElements[i].startsWith(subPath) && subPath !== path && ignoredPaths[subPath] === true) {
//             // If the subPath value is true, remove the element from the filtered array
//             console.log(`      Removing element (second): ${filteredElements[i]} as subPath value is true, path:`, path);
//             filteredElements.splice(i, 1);
//             i--; // Decrement the counter to account for the removed element
//             break;
//           } else {
//             console.log(`      Not Removing element (second): ${filteredElements[i]} as subPath value is false, path:`, path);
//           }
//         }
//       }
//     }
//   }

//   console.log("Final Filtered Elements: ", filteredElements);
//   return filteredElements;
// }




// doesnt update elementsIgnored
// this seems to pass all tests right now
function removeElements(elements, ignoredPaths) {
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
        } else {
          // If the ignoredPath value is false, include the element
          filteredElements.push(element);
          included = true;
        }
      }
    }

    // If the element was not included or excluded, add it to the filteredElements array
    if (!included) {
      filteredElements.push(element);
    }
  }
  // console.log("filteredElements: ",filteredElements);
  return filteredElements;
}


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
