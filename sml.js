//repo location: https://github.com/CollaboRateMgmt/SML
//license: MIT

function parseSml(text)
{
	//convert to unix format
	text = text.replaceAll("\r\n","\n")
    
	//ignore leading whitespaces when finding the first tag
	for (var i = 0; i < text.length; i++) 
	{
		var chr = text.charAt(i);
		if(chr == '\n' || chr == ' ' || chr == '\t')
		{
			continue;
		}
		var foundTagRef = []
		var startIdxOfNextLineRef = []
		if(isStartOfTag(i,text, foundTagRef, startIdxOfNextLineRef))
		{
			return parseSmlFromStartOfTag(i,text,foundTagRef[0], startIdxOfNextLineRef[0])
		}
		else
		{
			return text
		}
	}
}

function parseSmlFromStartOfTag(i,text,foundTag, startIdxOfNextLine)
{
	
}

String.prototype.replaceAll = 
function(search, replacement) 
{
	var target = this
	return target.replace(new RegExp(search, 'g'), replacement)
}
