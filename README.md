 
# SML
Simple Markup Language

License Type: MIT 

Intro and Background: This arose from the need for the CollaboRate project to have a simple and human-readable way to represent hierarchical data consisting of named nodes of information.

Rules of the language:
1. An opening tag is a non-blank line of text ending with a colon, with no spaces or tabs immediately before the colon.
2. Leading blank lines and any whitespace they have, are ignored when finding opening tags. So we can have ignored blank lines between the start of the file and the first opening tag, or between 2 consecutive opening tags, or between a consecutive closing tag and an opening tag. Also blank lines after the last closing tag are ignored.
3. Closing tags start on a new line and are of the form 'END `<opening tag>`' where 'END' is in caps and `<opening tag>` is without the ending colon. 
4. Tabs and spaces on the same line and after the end of an opening/closing tag are ignored, because this kind of mistake is hard to spot. However whitespace is not allowed at the start of the line of the opening/closing tag. This is to discourage use of indentation with tabs etc; rather people should use the folding feature of the supporting editor/viewer. An online viewer/editor + HTML widget will be provided by this project.
5. The parsing output consists of only arrays and name-value pairs, to preserve order and to entertain sibling tags with duplicate tagnames. However a boolean option noDuplicateTagsExpected is provided that if set to true, returns a JS object like what would result from parsing valid JSON. This option will throw an exception in case there are duplicate tags that cannot be treated as array elements. For a group of duplicate tags to be considered as elements of an array, all the sibling elements must have the same tag. Note that this 'same tag' will be lost in the JS object that is output, however this is not expected to be a big problem in practice.
6. If there is any mismatch in an opening or closing tag, or if the opening/closing tag occurs in the middle of some non-blank lines of text, that tag will be treated as text of the previously open tag.
 
 That is all: there are no attributes, DTDs etc.
 
 TODO: 
 - Create a js function parseSml(text, noDuplicateTagsExpected), to parse text that is in SML format into a JS object.
 - Create a js function toSmlString(obj, isInNvFormat) to turn a JS object into text that is in SML format. The default value of isInNvFormat is 'autodetect'.
 - Create an HTML widget that allows viewing of SML text with expand and collapse of nodes.
