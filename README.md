
# SML
Simple Markup Language

License Type: MIT 

Background: This arose from the need for the CollaboRate project to have a simple and human-readable way to represent hierarchical data consisting of named nodes of information.

Features of the language:
1. Leading and trailing enter characters are ignored when finding opening tags. Whitespace however is not ignored.
2. Opening tags are lines of text ending with a colon. Whitespace ater the colon is fine, but is not allowed at the start of the line.
3. Closing tags start on a new line and are of the form 'END `<opening tag>`' where 'END' is in caps and `<opening tag>` is without the ending colon. Whitespace (spaces and tabs) must after the closing tag is fine.
 
 That is all: there are no attributes, DTDs etc.
 
 TODO: create js library to parse text that is in SML format, and a tool that allows viewing of SML text with expand and collapse of nodes.
