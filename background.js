function isMaliciousUrl(url){
	let params = (new URL(url)).searchParams;
	var str = params.get('data')
	if(str != null) str = str.trim();
	// console.log(str);
	var patt1 = /<[ ]*\/?[ ]*(script|meta|link|frame|iframe).*>/is;
	var patt2 = /(<|\\<).+(ondblclick|onclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onload|onunload|onerror)=.*(\".*\"|>)$/is;
	var patt3 = /<.+(javascript\s*:).*(\".*\"|>)$/is ;
	var patt4 = /(<|\\<).+alert.*(\".*\"|>)$/i;
	return patt1.test(str) || patt2.test(str) || patt3.test(str) || patt4.test(str)  || url.includes("googlesyndication.com");
}

function isMaliciousFormData(data){
	var str = data[0].trim();
	// console.log(str);
	var patt1 = /<[ ]*\/?[ ]*(script|meta|link|frame|iframe).*>/is;
	var patt2 = /(<|\\<).+(ondblclick|onclick|onkeydown|onkeypress|onkeyup|onmousedown|onmousemove|onmouseout|onmouseover|onmouseup|onload|onunload|onerror)=.*(\".*\"|>)$/is;
	var patt3 = /<.+(javascript\s*:).*(\".*\"|>)$/is ;
	var patt4 = /(<|\\<).+alert.*(\".*\"|>)$/i;
	return patt1.test(str) || patt2.test(str) || patt3.test(str) || patt4.test(str) ;
}

chrome.webRequest.onBeforeRequest.addListener(
(details) => {
		// console.log(details); 
		let isMalicious = false;
		if(details.requestBody !== undefined && details.requestBody.formData !== undefined) isMalicious = isMaliciousFormData(details.requestBody.formData.data);
		return {cancel: isMalicious || isMaliciousUrl(details.url)};
	},
	{urls: ["<all_urls>"]},
	["requestBody","blocking"]
);