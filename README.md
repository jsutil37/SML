
# SML
Simple Markup Language - a more readable, simple and intuitive alternative than XML, JSON or YAML.

License Type: MIT 

Intro and Background: This arose from the need for the CollaboRate project to have a simple, intuitive and readable way to represent hierarchical data consisting of named nodes of information. Specifically in terms of readability, Enter characters in the information should be shown as such rather than `'\n'`.

Rules of the language:
1. An opening tag is a non-blank line of text starting with the word 'START' in all caps followed by a single space and then a non-whitespace character. Similarly, a closing tag is a non-blank line of text starting with the word 'END' in all caps followed by a single space and then a non-whitespace character. Both opening the closing tags end with the end of the line.
2. Leading blank lines (by 'blank lines' we also count lines that may have just whitespace on them), are ignored when finding opening tags. So we can have ignored blank lines between the start of the file and the first opening tag, or between 2 consecutive opening tags, or between a consecutive closing tag and an opening tag. Also blank lines after the last closing tag are ignored.
3. Tabs and spaces on the same line and after the end of an opening/closing tag are ignored and considered not to be part of the tag, because differences in this respect are hard to spot. However whitespace is not allowed at the start of the line of the opening/closing tag. This is to discourage use of indentation with tabs etc; rather people should use the folding feature of the supporting editor/viewer. An online viewer/editor + HTML widget will be provided by this project.
4. The parser output consists of only arrays and name-value pairs. This is done to preserve order of tags, as well as  to entertain sibling tags with duplicate tagnames. However a boolean option noDuplicateTagsExpected is provided that if set to true, returns a JS object like what would result from parsing valid JSON. This option will throw an exception in case there are duplicate tags that cannot be treated as array elements. For a group of duplicate tags to be considered as elements of an array, all the sibling elements must have the same tag. This same-tag is preserved in the output as follows: each element of the array will be a js object that has a single key that is this same tag, and the value will be the actual value of the array element.
5. If there is any mismatch in an opening or closing tag, or if the opening/closing tag occurs in the middle of some non-blank lines of text, that tag will be treated as text of the previously open tag.
 
 That is all: there are no attributes, DTDs, XSL etc. yet. If any are developed that are significantly better than what the XML or JSON world has to offer, this will be announced here.

# Current Status
Under development

# Usage
Reference the file https://github.io/CollaboRateMgmt/SML/sml.js in your html file. 

# API
 - parseSml(text, noDuplicateTagsExpected): parses text that is in SML format into a JS object.
 - toSmlString(obj, isInNvFormat): turns a JS object into text that is in SML format. The default value of isInNvFormat is 'autodetect'.
 - Create an HTML widget that allows viewing of SML text with expand and collapse of nodes.
