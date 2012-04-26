var jollyGood 	= {};

// var elementsToIgnore	= '.messageBody, .uiAttachmentDesc, .commentBody, .hasCaption, .uiStreamMessage';
var elementsToIgnore 	= '';

var adjective 		= 'Jolly Good';

chrome.extension.sendRequest({method: "getLocalStorage", key: "adjective"}, function(response) {
	
	// Set the adjective to use 
	adjective 		= response.data;

});


(function() {
	
	this.findLikes		= function() {
		
		/* Link titles
		 ------------------------------------------------- */
		$("*[title*='Like'], *[title*='like']").attr('title', "I think this is " + adjective);
		
		$("*[title*='Stop liking this item']").attr('title', "This is not " + adjective);
		
		/* Timeline
		 ------------------------------------------------- */
		$("input[value='Liked']").attr('value', "I think this is " + adjective);
		
		/* Body text
		 ------------------------------------------------- */
		// like this
		$("body *").not(elementsToIgnore).replaceText( /like this/gi, "This is " + adjective);
		
		// like this
		$("body *").not(elementsToIgnore).replaceText( /Unlike/gi, "This is not " + adjective + "");
		
		// likes this
		$("body *").not(elementsToIgnore).replaceText( /likes this/gi, "thinks this is " + adjective);
		
		
		// liked *****
		$("body *").not(elementsToIgnore).replaceText( /liked /gi, "" + adjective + ' that ');
		
		// Someone likes something - TODO
		// $("body *").not(elementsToIgnore).replaceText( /like/gi,  adjective);
		
		// clean up and uncaught likes
		$("body *").not(elementsToIgnore).replaceText( /like/gi,  adjective);
		
	}
	
}).apply(jollyGood);



window.setInterval(function() {
	
  	jollyGood.findLikes();

}, 250);
