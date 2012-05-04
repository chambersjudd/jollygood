var jollyGood 	= {};

var elementsToIgnore	= '.uiAttachmentTitle a, .messageBody, .uiAttachmentDesc, .commentBody, .hasCaption, .uiStreamMessage';
// var elementsToIgnore 	= '';

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
		$("input[value='Like']").attr('value', adjective);
		
		/* Body text
		 ------------------------------------------------- */
		
		var $body 	= $("body *").not(elementsToIgnore);
		
		// NUMBER people like COMPANY
		$('.fbEmuContext').not('.jollied').replaceText( /people like/gi, "people think").replaceText('.', '').append(' is ' + adjective).addClass('jollied');
		
		// PERSON likes COMPANY
		// $body.replaceText( /[A-Z] likes [A-Z]/gi, "thinks $3 is " + adjective);
		
		// like this page
		$body.replaceText( /like this page/gi, "" + adjective);
		
		// person likes this
		$body.replaceText( /likes this/gi, "thinks this is " + adjective);
		
		// X people like this
		// person and 12 other like this
		$body.replaceText( /like this/gi, "think this is " + adjective);
		
		// Unlike
		$body.replaceText( /Unlike/gi, "This is not " + adjective + "");
		
		// Liked
		$body.replaceText( /liked /gi, "This is " + adjective + '');
		
		// like (link under a post)
		$body.replaceText( /like/gi,  adjective);
		
	}
	
}).apply(jollyGood);



window.setInterval(function() {
	
  	jollyGood.findLikes();

}, 250);
