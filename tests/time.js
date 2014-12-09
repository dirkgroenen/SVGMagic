/*
 * This time test will open the test page twice. Once with dumpcache enabled and once with dumpcache disabled.
 * Test will only pass when the time is lower than the given var
 */

// constants
var EXIT_SUCCESS = 0,
    EXIT_FAILURE = 1,
    EXIT_ERROR = 2;

// vars
var pageurl = 'http://bitlabs.nl/svgmagic/tests/all.php';
var tests = [
    {
        dumpcache: true,
        time: 0,
        maxtime: 2500,
        success: false,
        finished: false,
        error: false,
        started: false
    },
    {
        dumpcache: false,
        time: 0,
        maxtime: 1500,
        success: false,
        finished: false,
        error: false,
        started: false
    }
];

/*
 * Run a post request and return the collected data
 * 
 * @return object test
 */
function runTest(test){
    var page = require('webpage').create();

    page.open(pageurl + "?dumpcache=" + test.dumpcache, function(status) {
        // Check for error
        if (status !== 'success') {
            console.log('Unable to do request');

            // Set vars
            test.finished = true;
            test.error = true;
        } 
        else {
            // Get response
            var time = page.evaluate(function(){
                return $("#replacetime").text();
            });

            // Save response in batch and start validating
            test.time = time;
            validateTestResult(test);
        }
    });
};

/*
 * Run a post request and return the collected data
 *
 * @param object test
 */
function validateTestResult(test){
    // Loop through check batches
    if(test.time < test.maxtime)
        test.success = true;

    // Set batch to finished
    test.finished = true;

    // Call next test
    runNextTest();
};

/*
 * Run the next test in the tests
 */
function runNextTest(){
    // Loop through tests
    for(var x = 0; x < tests.length; x++){
        // check if test hasn't been started yet
        if(!tests[x].started){
            tests[x].started = true;
            runTest(tests[x]);

            // Stop the looping
            return;
        }
    }

    // At this point all tests have been done and batch results need to be finished
    validateBatchData();
};

/*
 * Validate all results in the batches to check if we had a succesfull test
 */
function validateBatchData(){
    for(var x = 0; x < tests.length; x++){

        console.log("\n===================");
        console.log("Validating test " + x);
        console.log("===================");

        if(tests[x].started && tests[x].finished){
            if(tests[x].error){
                console.log("Error in test: " + x);

                phantom.exit(EXIT_ERROR);
            }
            
            if(!tests[x].success){
                console.log("Failure in test " + x + " results. Time should have been below: " + tests[x].maxtime + ", but was: " + tests[x].time + ".");
                phantom.exit(EXIT_ERROR);
            }
            else{
                console.log("Test " + x + " success (dumpcache: " + tests[x].dumpcache + "). Time was " + tests[x].time + ". Max runtime was set on: " + tests[x].maxtime);
            }

        }
        else{
            console.log("Not all tests have been finished, calling next test again");

            runNextTest();
            return;
        }
    }

    phantom.exit(EXIT_SUCCESS);
};

/*
 * Init the testing
 */
function initAndStart(){
    console.log("===========================");
    console.log("Starting time test");
    console.log("===========================");

    runNextTest();
};

// Run tests
initAndStart();


