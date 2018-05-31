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
		if(isStartOfTag(i,text, foundTagRef))
		{
		}
		else
		{
		
		}
	}
}

String.prototype.replaceAll = 
function(search, replacement) 
{
	var target = this
	return target.replace(new RegExp(search, 'g'), replacement)
}
