var jollyGood 	= {};

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
		
		/* Timeline
		 ------------------------------------------------- */
		$("input[value='Liked']").attr('value', "I think this is " + adjective);
		
		/* Body text
		 ------------------------------------------------- */
		// like this
		$("body *").replaceText( /like this/gi, "think this is " + adjective);
		
		// like this
		$("body *").replaceText( /Unlike/gi, "No, this isn't " + adjective + "");
		
		// likes this
		$("body *").replaceText( /likes this/gi, "thinks this is " + adjective);
		
		
		// liked *****
		$("body *").replaceText( /liked /gi, "" + adjective + ' that ');
		
		// clean up and uncaught likes
		$("body *").replaceText( /like/gi,  adjective);
		
	}
	
}).apply(jollyGood);



window.setInterval(function() {
	
  	jollyGood.findLikes();

}, 100);
