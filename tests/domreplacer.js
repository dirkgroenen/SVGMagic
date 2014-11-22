/*
 * This requests test will open the all.html test page and check if the images have been replaced.
 */

// constants
var EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_ERROR = 2;

var checks = [
	{
		domid: "n-one",
		background: false,
		svg: false
	},
	{
		domid: "n-two",
		background: false,
		svg: false
	},
	{
		domid: "b-one",
		background: true,
		svg: false
	},
	{
		domid: "d-one",
		background: false,
		svg: false
	}
];

var pageurl = "http://bitlabs.nl/svgmagic/tests/all.php?dumpcache=false";
var page = require('webpage').create();
var returnerror = false;

page.open(pageurl, function(status) {
	console.log("===================");
	console.log("Start checking dom");
	console.log("===================");

    // Check for error
    if (status !== 'success') {
        console.log('Unable to do request. Exit.');

        phantom.exit(EXIT_ERROR);
    }
    else {

    	// Do all checks
    	for(var x = 0; x < checks.length; x++){
    		console.log("\nEvaluating page for #" + checks[x].domid + " src");

    		var getsrc = page.evaluate(function(check){
    			if(check.background)
    				return $("#" + check.domid).css("background-image");
				else
    				return $("#" + check.domid).attr("src");
	    	}, checks[x]);

    		if(getsrc.match("(.png){1}")){
				console.log("Check #" + checks[x].domid + " succes. Image got replaced by: " + getsrc);
				checks[x].svg = true;
    		}
			else {
				console.log("Check #" + checks[x].domid + " failed");
				returnerror = true;
			}

    	}

    	// Get the total load time
    	var runtime = page.evaluate(function(){
    		return $("#replacetime").text();
    	});

    	console.log("\nTotal runtime: " + runtime + "ms");

    	phantom.exit((returnerror) ? EXIT_FAILURE : EXIT_SUCCESS);

	}
});
