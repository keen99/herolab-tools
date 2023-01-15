# import xml.etree.ElementTree as ET

# def print_structure(root, indent = "", tags = set(), paths = set()):
#     for element in root:
#         if element.find("description") is not None:
#             paths.add(indent + element.tag)
#         print_structure(element, indent + element.tag + " > ", tags, paths)
#     return paths

# tree = ET.parse('Bronn_Skyfall_L6.xml')
# root = tree.getroot()
# paths = print_structure(root)
# print(paths)

# import xml.etree.ElementTree as ET
# import sys
# import shlex

# if len(sys.argv) != 2:
#     print("Usage: python script.py <XML file path>")
#     sys.exit()

# # use shlex to parse your command line argument, so that it is whitespace safe.
# file_path = shlex.split(sys.argv[1])[0]

# tree = ET.parse(file_path)
# root = tree.getroot()


# def print_structure(root, indent = "", tags = set(), paths = set()):
#     for element in root:
#         if element.find("description") is not None:
#             paths.add(indent + element.tag)
#         print_structure(element, indent + element.tag + " > ", tags, paths)
#     return paths

# paths = print_structure(root)

# elements = [path.replace(' > ', '/') for path in paths]
# elements = [path.replace('public/character', './') for path in elements]
# print("var elements = " + str(elements) + ";")


# import xml.etree.ElementTree as ET
# import sys

# def print_structure(root, indent = "", paths = set()):
#     for element in root:
#         if element.find("description") is not None:
#             paths.add(indent + element.tag)
#         print_structure(element, indent + element.tag + " > ", paths)
#     return paths

# def main():
#     if len(sys.argv) < 2:
#         # If no argument passed, read from stdin
#         data = sys.stdin.read()
#         root = ET.fromstring(data)
#     else:
#         # If an argument passed, try to parse it as a file
#         try:
#             tree = ET.parse(sys.argv[1])
#             root = tree.getroot()
#         except FileNotFoundError:
#             print("Usage: python script.py [file.xml]")
#             sys.exit(1)

#     paths = print_structure(root)
#     elements = [path.replace(' > ', '/') for path in paths]
#     elements = [path.replace('public/character', './') for path in elements]
#     print("var elements = " + str(elements) + ";")


# if __name__ == "__main__":
#     main()



# import xml.etree.ElementTree as ET
# import argparse

# def print_structure(root, paths = set()):
#     for element in root:
#         if element.find("description") is not None:
#             paths.add(element.tag)
#         print_structure(element, paths)
#     return paths

# parser = argparse.ArgumentParser(description='Process XML files')
# parser.add_argument('files', metavar='file', type=str, nargs='+',
#                     help='XML files to process')
# args = parser.parse_args()

# paths = set()
# for file in args.files:
#     tree = ET.parse(file)
#     root = tree.getroot()
#     paths.update(print_structure(root))

# elements = [path.replace(' > ', '/') for path in paths]
# elements = [path.replace('public/character', './') for path in elements]
# print("var elements = " + str(elements) + ";")


import xml.etree.ElementTree as ET
import sys

def print_structure(root, indent = "", paths = set()):
    for element in root:
        if element.find("description") is not None:
            paths.add(indent + element.tag)
        print_structure(element, indent + element.tag + " > ", paths)
    return paths

paths = set()
for i in range(1, len(sys.argv)):
    tree = ET.parse(sys.argv[i])
    root = tree.getroot()
    paths = paths.union(print_structure(root))

elements = [path.replace(' > ', '/') for path in paths]
elements = [path.replace('public/character', './') for path in elements]
print("var elements = " + str(elements) + ";")



##

# lof:.../Bronn Skyfall/6th/Bronn Skyfall L6%% python3 dump-descr.py Bronn_Skyfall_L6.xml Flen_Nightinfire.6.xml
# var elements = ['.//flaws/flaw', './/spellsmemorized/spell', './/defenses/armor/itempower', './/defensive/special', './/senses/special', './/magicitems/item/itempower', './/skills/skill', './/movement/special', './/otherspecials/special', './/feats/feat', './/immunities/special', './/gear/item', './/attack/special', './/melee/weapon/itempower', './/ranged/weapon', './/magicitems/item', './/defenses/armor', './/melee/weapon', './/journals/journal', './/traits/trait', './/personal'];


