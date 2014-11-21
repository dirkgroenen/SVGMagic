var page = require('webpage').create(),
    server = 'http://bitlabs.nl/svgmagic/converter/3/',
    data = 'secure=false&dumpcache=false&svgsources[]=http://dev.svgmagic.bitlabs.nl/Fstyle/resizeicon.svg&version=3&origin=dev.svgmagic.bitlabs.nl';

page.open(server, "get", data, function (status) {
    if (status !== 'success') {
        console.log('Unable to post');
    } else {
        var response = JSON.parse(page.plainText);
        console.log(page.plainText);
    }
    phantom.exit(1);
});