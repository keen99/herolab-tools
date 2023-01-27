// for throwing with a try/catch
function Info(msg) {
  this.msg = msg;
}

function getElementXPath(element) {
  if (element && element.id)
    return '//*[@id="' + element.id + '"]';
  else
    return getElementTreeXPath(element);
}

function getElementTreeXPath(element) {
  var paths = [];
  // Use nodeName (instead of localName) so namespace prefix is included (if any).
  for (; element && element.nodeType == Node.ELEMENT_NODE; element = element.parentNode) {
    var index = 0;
    for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      // Ignore document type declaration.
      if (sibling.nodeType == Node.DOCUMENT_TYPE_NODE)
        continue;
      if (sibling.nodeName == element.nodeName)
        ++index;
    }
    var tagName = element.nodeName.toLowerCase();
    var pathIndex = (index ? "[" + (index + 1) + "]" : "");
    paths.splice(0, 0, tagName + pathIndex);
  }
  return paths.length ? "/" + paths.join("/") : null;
}


function strip_extension(str) {
    return str.substr(0,str.lastIndexOf('.'));
}
function basename (path, sep = '/') {
  return path.substring(path.lastIndexOf(sep) + 1)
}
