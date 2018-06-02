 
# SML
Simple Markup Language

License Type: MIT 

Intro and Background: This arose from the need for the CollaboRate project to have a simple and human-readable way to represent hierarchical data consisting of named nodes of information.

Rules of the language:
1. An opening tag is a non-blank line of text ending with a colon, with no spaces or tabs immediately before the colon.
2. Leading blank lines and any whitespace they have, are ignored when finding opening tags. So we can have ignored blank lines between the start of the file and the first opening tag, or between 2 consecutive opening tags, or between a consecutive closing tag and an opening tag. Also blank lines after the last closing tag are ignored.
3. Closing tags start on a new line and are of the form 'END `<opening tag>`' where 'END' is in caps and `<opening tag>` is without the ending colon. 
4. Tabs and spaces on the same line and after the end of an opening/closing tag are ignored, because this kind of mistake is hard to spot. However whitespace is not allowed at the start of the line of the opening/closing tag. This is to discourage use of indentation with tabs etc; rather people should use the folding feature of the supporting editor/viewer. An online viewer/editor + HTML widget will be provided by this project.
5. Siblings with the same tag name will be parsed as follows: In the parsed output, the tag will have an array of the siblings. As such the parser does not preserve the structure of the data passed in, neither does it guarantee to retain the tag order (based on no order guarantee of keys of JS objects).
6. If there is any mismatch in an opening or closing tag, or if the opening/closing tag occurs in the middle of some non-blank lines of text, that tag will be treated as text of the previously open tag.
 
 That is all: there are no attributes, DTDs etc.
 
 TODO: 
 - Create a js function parseSml(text) to parse text that is in SML format into a JS object
 - create a js function toSmlString(obj) to turn a JS object into text that is in SML format
 - create an HTML widget that allows viewing of SML text with expand and collapse of nodes.
