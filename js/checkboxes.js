
function addName() {
  // addName is ALSO called buy the other submit buttons, intentionally
  // in case there's unadded text in the field
  // we need to handle the empty case!
  var nameInput = document.getElementById("nameInput").value;
  if(nameInput) {
    ignoredNames[nameInput] = true;
    console.log("addName");
    if(nameInput.startsWith("./")){
        createCheckbox(nameInput, "filterPaths", true, true);
    } else {
        createCheckbox(nameInput, "filterNames", true, true);
    }
  }
}

function updateUrlParams(checkbox) {
    const url = new URL(window.location);
    const urlParams = new URLSearchParams(url.search);

    console.log("updateUrlParams value:", checkbox.value, "checked: " + checkbox.checked, "custom: " + checkbox.custom);
    // console.log(checkbox);
    //
    // add to url params when
    // checkbox.custom = true
    // or
    // checkbox.custom = false and checkbox.checked = false
    if (checkbox.custom === true || (checkbox.custom === false && checkbox.checked === false)) {
        // console.log(`Adding ${checkbox.value}=${checkbox.checked} to the URL query: ${url.href}`);
        // convert checkbox.checked from a boolean to a string
        let checkedValue = checkbox.checked ? 'true' : 'false';
        urlParams.set(checkbox.value, checkedValue);
    // remove from url params when
    // checkbox.custom = false
    // and
    // checkbox.checked = true
    } else if (checkbox.custom === false && checkbox.checked === true) {
        // console.log(`Removing ${checkbox.value}=${checkbox.checked} from the URL query: ${url.href}`);
        urlParams.delete(checkbox.value);
    }
    url.search = urlParams.toString();
    history.pushState(null, null, url);
    // console.log(`Updated URL query: ${url.href}`);
}


function createCheckbox(value, containerId, checked = true, custom = false) {
    // console.log("createCheckbox was called:  ", value, checked, custom)

    // force this to a bool. sometimes it could be a string, which doesnt work for the .checked property
    if(typeof checked === 'string') checked = (checked === 'true');
    if(typeof custom === 'string') custom = (custom === 'true');

    // console.log("createCheckbox was called:  ", value, checked, custom)
    var existingCheckbox = document.getElementById(value);
    if (existingCheckbox) {
        // console.log("createCheckbox skipping existing");
        return;
    }
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = value;
    checkbox.id = value;
    checkbox.name = "options";
    // console.log("checked:", checked);
    checkbox.checked = checked;
    // console.log("checkbox.checked:", checkbox.checked, checked);
    checkbox.custom = custom;
    // console.log("checkbox.custom:", checkbox.custom);

    // we need this for when we're called from Add
    if (custom && !existingCheckbox) {
        console.log("createCheckbox update for custom checkbox: ", custom, existingCheckbox);
        updateUrlParams(checkbox);
        handleCheckboxChange(checkbox);

    }
    checkbox.onchange = function(event) {
        console.log("createCheckbox onchange update");
        updateUrlParams(checkbox);
        handleCheckboxChange(checkbox);
    }
    var label = document.createElement("label");
    label.htmlFor = value;
    label.innerHTML = value;

    var container = document.getElementById(containerId);
    container.appendChild(checkbox);
    container.appendChild(label);
    container.appendChild(document.createElement("br"));
}

function handleCheckboxChange(checkbox) {
  // console.log("handleCheckboxChange: ", checkbox.value, checkbox.checked)

  if(checkbox.value.startsWith("./")){
      var ignoredData = ignoredPaths;
  } else {
      var ignoredData = ignoredPaths;
  }
  // console.log("handleCheckboxChange: ", checkbox.value, checkbox.checked)
  // console.log(ignoredData);
  ignoredData[checkbox.value] = checkbox.checked;
  // console.log(ignoredData);
  // Validate that the change happened
  if (ignoredData[checkbox.value] !== checkbox.checked) {
    throw new Error(`Expected ${checkbox.value} to be ${checkbox.checked} in ignoredData, but got ${ignoredData[checkbox.value]}.
    Full ignoredData dump: ${JSON.stringify(ignoredData)}`);
  }

}





function handleCheckAll(containerId, check) {
  const checkboxes = document.querySelectorAll(`${containerId} input[type="checkbox"]`);
  checkboxes.forEach(checkbox => {
    if (checkbox.checked !== check) {
      checkbox.checked = check;
      console.log("handleCheckAll update");
      updateUrlParams(checkbox);
      handleCheckboxChange(checkbox);
    }
  });
}
