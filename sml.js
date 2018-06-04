//repo location: https://github.com/CollaboRateMgmt/SML
//license: MIT
"use strict"

let smlShowAlertBeforeThrowingException = true

function parseSml2(text, warningsRef)
{
	let listOfOpenTags = []
	let someNonBlankNonTagTextPresent = false
	let lineAtWhichTheNonBlankNonTagTextIsPresent
	let lines = text.split('\n')
	let rv=[]
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
			listOfOpenTags.push([tag,i+1])
			continue;
		}
		else if(isEndOfATag(line,foundTagRef))
		{
			tag = foundTagRef[0]
			//For a closing tag, even if some non-blank non-tag text was present, we still need 
			//to check for matching previously encountered opening tag.
			let wasOpeningTagFound = false
			//check whether any open opening tag is present, that matches this closing tag
			for(let openingTagIdx = listOfOpenTags.length - 1; openingTagIdx >=0; openingTagIdx--)
			{
				let openingTagData = listOfOpenTags[openingTagIdx]
				let openingTag = openingTagData[0]				
				if(openingTag != tag){continue}			
				wasOpeningTagFound = true
				
				//opening tag was found, but some open tags may be mismatched, 
				//remove these with warning!
				for(let openingTagIdx2 = listOfOpenTags.length - 1; openingTagIdx2 > openingTagIdx; openingTagIdx2--)
				{
					let openTagData = listOfOpenTags.pop()
					let mismatchedTag = openTagData[0]
					let lineOfMismatchedTag = openTagData[1]-1
					warningsRef.push("Tag '"+mismatchedTag+"' at line "+lineOfMismatchedTag+
					" is not considered as a closing tag because its closing tag could not be "+
					"found before the closing tag '"+tag+"' at line "+i+".")
				}
				let idxAfterOpeningTag = openingTagData[1]
				let nvpair
				if(someNonBlankNonTagTextPresent)
				{
					let value=""
					for(let j=idxAfterOpeningTag;j<i;j++)
					{
						value+=lines[j]
						if(j != i-1){value+="\n"}
					}
					let nvPair ={name: tag, value: value, line:idxAfterOpeningTag-1}
				}
				else
				{
					//hmmmmm
				}
				todo - put this either into rv or 3rd element of previously open tag
				
				someNonBlankNonTagTextPresent = false
				break				
			}
			if(!wasOpeningTagFound)
			{
				todo
			}
		}
		else if(line.trim() != "")
		{
			someNonBlankNonTagTextPresent = true
			lineAtWhichTheNonBlankNonTagTextIsPresent = i
			clearChildElementsOfTheCurrentlyOpenTag(openingTagData, warningsRef)
		}
		return text
	}
	if(someNonBlankNonTagTextPresent)
	{		
		clearChildElements(openingTagData, warningsRef)
		return ""
	}
	return rv
}

function clearChildElementsOfTheCurrentlyOpenTag(openingTagData, warningsRef)
{
	
}

function throwException(msg)
{
	if(smlShowAlertBeforeThrowingException)
	{
		alert(msg)
	}
	throw msg
}

function parseSml(text, noDuplicateTagsExpected, warningsRef)
{
	//convert to unix format
	text = text.replaceAll("\r\n","\n")
	let rv parseSml2(text, warningsRef)
	if(!noDuplicateTagsExpected){return rv}
	return nvArrBasedObjToJsObj(rv,[])
}

function nvArrBasedObjToJsObj(nvArrBasedObj,pathToObj)
{
	if(typeof nvArrBasedObj == "string")
	{
		return nvArrBasedObj		
	}
	if(typeof nvArrBasedObj == "object")
	{
		assert(nvArrBasedObj.keys.length == 1)
		let rv = {}
		rv[nvArrBasedObj.name] = nvArrBasedObj.value
		return rv
	}
	return nvArrToJsObj(nvArr,pathObj)
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
				throwException(JSON.stringify(pathToObj) + " - duplicate key '" + k "' at idx "+idx+
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
				rvArr.push({""+k:v})				
			}		
		}
	)
	if(rvMustBeAnArray){return rvArr}
	return rv
}

function assert(x)
{
	if(x){return}
	alert('assertion failed')
	throw new Exception("assertion failed")
}
function isStartOfATag(line, foundTagRef)
{
	if(!line.startsWith("BEGIN "){return false}
	let tag = line.trimRight()
	if(tag.length <= 6){return false}//6 = "BEGIN ".length	
	tag = tag.substring(6)
	if(tag != tag.trimLeft()){return false}
	foundTagRef[0] = tag	
	return true
}

function isEndOfATag(line, foundTagRef)
{	
	if(!line.startsWith("END "){return false}
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
