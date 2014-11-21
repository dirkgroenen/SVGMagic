// constants
var EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_ERROR = 2;

// vars
var apiurl = 'http://bitlabs.nl/svgmagic/converter/3/';

// Build data object for version 3 with a normal and data image
var v3data = "svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_1.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_2.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_3.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_4.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_5.svg&version=3&origin=travisCI";

// Build data for v2
var v2data = "svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_1.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_2.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_3.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_4.svg&svgsources[]=http%3A%2F%2Fdev.svgmagic.bitlabs.nl%2Fstyle%2Fresizeicon_5.svg&version=2&origin=travisCI";

/*
 * Run a post request and return the collected data
 * 
 * @return object data
 */
function runDataTest(data){
    var page = require('webpage').create();

    page.open(apiurl + "?" + data, function(status) {
        
        if (status !== 'success') {
            // Log and exit
            console.log('Unable to post');
            phantom.exit(EXIT_ERROR);
        } 
        else {
            var response = JSON.parse(page.plainText);
            validateData(response);
        }
    });
};

/*
 * Run a post request and return the collected data
 *
 * @param object testResults
 */
function validateData(testResults){
    // Loop through check batches
    if(testResults.error == true){

    }
};


// Run tests
runDataTest(v2data);

