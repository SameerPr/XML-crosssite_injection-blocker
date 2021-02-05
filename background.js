function isMaliciousUrl(url){

 let params = (new URL(url)).searchParams;

 var str = params.get('data')

 if(str != null) str = str.trim();

 console.log(str);

 var patt1 = /^<[ ]*script.*>.*<\/[ ]*script[ ]*>$/i;

 var patt2 = /^<[ ]*img.*(\".*\"|>)$/i;

 var patt3 = /^(<|\\<).+(alert|onload|onerror|onmouseover|onclick|onsubmit).*>$/i;

 // console.log(patt1.test(str));

 return patt1.test(str) || patt2.test(str) || patt3.test(str) || url.includes("googlesyndication.com");

}

function isMaliciousFormData(data){

 var str = data[0].trim();

 var patt1 = /^<[ ]*script.*>.*<\/[ ]*script[ ]*>$/i;

 var patt2 = /^<[ ]*img.*(\".*\"|>)$/i;

 var patt3 = /^(<|\\<).+(alert|onload|onerror|onmouseover|onclick|onsubmit).*>$/i;

 console.log(str);

 // console.log(patt1.test(str));

 return patt1.test(str) || patt2.test(str) || patt3.test(str) ;

}

chrome.webRequest.onBeforeRequest.addListener(

 (details) => {

  // console.log(details); 

  let isMalicious = false;

  if(details.requestBody !== undefined && details.requestBody.formData !== undefined) 

  {

   isMalicious = isMaliciousFormData(details.requestBody.formData.data);   

  } 

  else

  {

   isMalicious = isMaliciousUrl(details.url);

  }

  return {cancel: isMalicious };

 },

 {urls: ["<all_urls>"]},

 ["requestBody","blocking"]

);
