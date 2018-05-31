 
# SML
Simple Markup Language

License Type: MIT 

Intro and Background: This arose from the need for the CollaboRate project to have a simple and human-readable way to represent hierarchical data consisting of named nodes of information.

Features of the language:
1. Opening tags are lines of text ending with a colon. Tabs and spaces after the colon is ignored, because this kind of mistake is hard to spot. However whitespace is not allowed at the start of the line of the opening tag. This is to discourage use of indentation with tabs etc; rather people should use the folding feature of the supporting editor/viewer. An online viewer/editor + HTML widget will be provided by this project.
2. Leading blank lines and any whitespace they have, are ignored when finding opening tags. So we can have ignored blank lines between the start of the file and the first opening tag, or between 2 consecutive opening tags, or between a consecutive closing tag and an opening tag.
3. Closing tags start on a new line and are of the form 'END `<opening tag>`' where 'END' is in caps and `<opening tag>` is without the ending colon. Again spaces and tabs after the closing tag are ignored, because this kind of mistake is hard to spot.
 
 That is all: there are no attributes, DTDs etc.
 
 TODO: 
 - create a js function parseSml(text) to parse text that is in SML format into a JS object
 - create a js function toSmlString(obj) to turn a JS object into text that is in SML format
 - create an HTML widget that allows viewing of SML text with expand and collapse of nodes.
