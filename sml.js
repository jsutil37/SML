//repo location: https://github.com/CollaboRateMgmt/SML
//license: MIT
"use strict"

let smlShowAlertBeforeThrowingException = true

function parseSml(text, noDuplicateTagsExpected, warningsRef)
{
	//convert to unix format
	text = text.replaceAll("\r\n","\n")
	let rv = parseSml2(text, warningsRef)
	alert('rv='+JSON.stringify(rv))
	if(!noDuplicateTagsExpected){return rv}
	return nvArrBasedObjToJsObj(rv,[])
}

function parseSml2(text, warningsRef)
{
	let listOfOpenTags = [{name:"<docu$$ment>",value:[]}]
	text+="\nEND <docu$$ment>"
	let someNonBlankNonTagTextPresent = false
	let lineAtWhichTheNonBlankNonTagTextIsPresent
	let lines = text.split('\n')	
	for (let i = 0; i < lines.length; i++) 
	{
		let line = lines[i]
		let foundTagRef = []
		let tag
		if(isStartOfATag(line, foundTagRef))
		{
			tag = foundTagRef[0]			
			if(someNonBlankNonTagTextPresent)
			{				
				warningsRef.push("Tag '"+tag+"' at line "+i+" is not considered as an opening tag because there is non-blank text present at line "+lineAtWhichTheNonBlankNonTagTextIsPresent+".")
				continue;
			}
			listOfOpenTags.push({name:tag,value:[],lineNumber:i})
			continue;
		}
		else if(isEndOfATag(line,foundTagRef))
		{
			tag = foundTagRef[0]
			//For a closing tag, even if some non-blank non-tag text was present, we still need 
			//to check for matching previously encountered opening tag.
			let wasOpeningTagFound = false
			//Check whether any open opening tag is present, that matches this closing tag
			for(let openingTagIdx = listOfOpenTags.length - 1; openingTagIdx >=0; openingTagIdx--)
			{
				let openingTagData = listOfOpenTags[openingTagIdx]
				let openingTag = openingTagData.name		
				if(openingTag != tag){continue}			
				wasOpeningTagFound = true
				
				//If no mismatch of opening tags, then the FOR loop below will not be entered.
				for(let openingTagIdx2 = listOfOpenTags.length - 1; openingTagIdx2 > openingTagIdx; openingTagIdx2--)
				{
					//opening tag was found, but some open tags may be mismatched, 
					//remove these with a warning issued for each mismatched tag!
					
					let openTagData = listOfOpenTags.pop()
					let mismatchedTag = openTagData.name
					let lineOfMismatchedTag = openTagData.lineNumber
					warningsRef.push("Tag '"+mismatchedTag+"' at line "+lineOfMismatchedTag+
					" is not considered as a closing tag, because its closing tag could not be "+
					"found before the closing tag '"+tag+"' at line "+i+".")
				}
				let idxAfterOpeningTag = openingTagData.lineNumber + 1
				let completedTagData = listOfOpenTags.pop()
				if(someNonBlankNonTagTextPresent)
				{
					let value=""
					for(let j=idxAfterOpeningTag;j<i;j++)
					{
						value+=lines[j]
						if(j != i-1){value+="\n"}
					}
					completedTagData.value = value
					someNonBlankNonTagTextPresent = false
				}
				if(Array.isArray(completedTagData.value) && completedTagData.value.length==1)
				{
					completedTagData.value =  completedTagData.value[0]
				}
				if(listOfOpenTags.length == 0){return completedTagData.value}
				let parentTagData = listOfOpenTags[listOfOpenTags.length - 1]
				assert(Array.isArray(parentTagData.value))
				parentTagData.value.push(completedTagData)								
				break				
			}
			if(!wasOpeningTagFound)
			{
				warningsRef.push("Tag '"+tag+"' at line "+i+
					" is not considered as a closing tag, because its opening tag could not be found.")
			}
		}
		else if(line.trim() != "")
		{
			someNonBlankNonTagTextPresent = true
			lineAtWhichTheNonBlankNonTagTextIsPresent = i			
			let currentlyOpenTagData = listOfOpenTags[listOfOpenTags.length - 1]
			if(Array.isArray(currentlyOpenTagData.value))
			{
				currentlyOpenTagData.value.forEach
				(
					function(childTagData)
					{
						warningsRef.push("The completed tag '"+childTagData.name+"' at line "+
						childTagData.lineNumber+
						" is not considered as a tag, because the parent tag encountered a line no. "+i+
						" that is not within a child tag.")
					}
				)
				currentlyOpenTagData.value = null
			}
		}		
	}	
	shouldnotcomehere
}

function throwException(msg)
{
	if(smlShowAlertBeforeThrowingException)
	{
		alert(msg)
	}
	throw new Error(msg)
}



function nvArrBasedObjToJsObj(nvArrBasedObj,pathToObj)
{
	if(typeof nvArrBasedObj == "string")
	{
		return nvArrBasedObj		
	}
	if(Array.isArray(nvArrBasedObj))
	{
		return nvArrToJsObj(nvArr,pathObj)
	}
	alert("Line 141: "+JSON.stringify(nvArrBasedObj))
	assert(nvArrBasedObj.keys.length == 3)//name, value, lineNumber
	let rv = {}
	rv[nvArrBasedObj.name] = nvArrBasedObj.value
	return rv
}

function nvArrToJsObj(nvArr,pathObj)
{
	assert(Array.isArray(nvArr))
	rv = {}
	let rvMightBeAnArray
	let rvMustBeAnArray
	rvArr = []
	let uniqueKeys = {}
	nvArr.forEach
	(
		function(el,idx)
		{	
			let k = el.name			
			pathToObj.push(k)
			let v = nvArrBasedObjToJsObj(el.value,pathToObj)
			pathToObj.pop()			
			let isADuplicateKey = (k in uniqueKeys)
			uniqueKeys[k]=0
			if(isADuplicateKey && Object.keys(uniqueKeys).length > 1)
			{
				throwException(JSON.stringify(pathToObj) + " - duplicate key '" + k + "' at idx "+idx+
					" - cannot convert to JS object! ")
			}			
			rvMustBeAnArray = isADuplicateKey
			if(!rvMustBeAnArray)
			{
				rv[k] = v
			}
			rvMightBeAnArray = (rvMustBeAnArray || idx == 0)			
			if(rvMightBeAnArray)
			{
				let obj = {}
				obj[k] = v
				rvArr.push(obj)				
			}		
		}
	)
	if(rvMustBeAnArray){return rvArr}
	return rv
}

function assert(x)
{
	if(x){return}
	throwException("assertion failed")
}
function isStartOfATag(line, foundTagRef)
{
	if(!line.startsWith("BEGIN ")){return false}
	let tag = line.trimRight()
	if(tag.length <= 6){return false}//6 = "BEGIN ".length	
	tag = tag.substring(6)
	if(tag != tag.trimLeft()){return false}
	foundTagRef[0] = tag	
	return true
}

function isEndOfATag(line, foundTagRef)
{	
	if(!line.startsWith("END ")){return false}
	let tag = line.trimRight()
	if(tag.length <= 4){return false}//4 = "END ".length	
	tag = tag.substring(4)
	if(tag != tag.trimLeft()){return false}
	foundTagRef[0] = tag	
	return true
}

String.prototype.replaceAll = 
function(search, replacement) 
{
	let target = this
	return target.replace(new RegExp(search, 'g'), replacement)
}
