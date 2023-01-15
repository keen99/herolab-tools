import xml.etree.ElementTree as ET

def print_structure(root, indent = "", tags = set()):
    for element in root:
        if element.tag not in tags:
            tags.add(element.tag)
            print(indent + element.tag)
        print_structure(element, indent + "    ", tags)


tree = ET.parse('Bronn_Skyfall_L6.xml')
root = tree.getroot()
print_structure(root)
