SVGMagic
========

A big advantage of SVGMagic is that you don't have to create multiple versions of your images. You can just focus on the .SVG images and let SVGMagic do the rest. 

You can find more information and demos on [our website](http://svgmagic.bitlabs.nl/).

SVG... what/why?
------------
SVG is a vector graphics format, meaning it's perfectly scalable. Whatever size it needs to display at, or whatever screen it needs to display on, an SVG will adapt perfectly. This means that you can use the same image for desktop and mobile (including Retina) visitors. They all get a perfectly sharp image.

![ScreenShot](http://www.chriscullmann.com/wp-content/uploads/2013/04/svg-image-comparison.png)

Installation
------------
Just include the script in your header and call the plugin in your ```$(document).ready()```
```code
<script src="SVGMagic.min.js"></script>
<script>
	$(document).ready(function(){
		$('img').svgmagic();
	});
</script>
```
SVGMagic also supports backgroundimages. You need to parse the div containing the backgroundimage including the ```backgroundimage``` option.
```code
<script src="SVGMagic.min.js"></script>
<script>
	$(document).ready(function(){
		$('.bgimage').svgmagic({
            handleBackgroundImages: true
        });
	});
</script>
```

Options
-------
You can parse an options object into SVGMagic. Currently it supports the following options:
```code
$('img').svgmagic({
    temporaryHoldingImage:  null, // Image that will appear when an image gets converted
    forceReplacements:      false, // Force replacement in all browsers
    handleBackgroundImages: false, // Search the dom for CSS background images
    additionalRequestData:  {}, // Add extra data to the ajax request. 
    postReplacementCallback:null, // Function to run before replacement

    // New options
    remoteServerUri:        'http://svgmagic.bitlabs.nl/converter.php', // Uri of the (remote) API script
    remoteRequestType:      'POST', // Request type for the API call
    remoteDataType:         'json', // Data type for the API call
});
```

additionalRequestData
-------
The ```additionalRequestData``` option gives you the posibility to add extra data to the ajax request. The default API script supports two extra options: ```{secure: true}``` and ```{dumpcache: true}```. 

Support
-------
The plugin is tested in Internet Explorer Version 7 and 8 (other browsers already support SVG files).

Security / How it works
--------
The script makes use of a server side php script that converts the SVG to an PNG. The plugin will send a request to the server containing the images' sources. The server will then grab those images, convert them to PNG, temporarily save them and send the URL of the new images back to the plugin. When the plugin receives the new URL it will replace the .SVG images with the new ones. 

This will only happen when the plugin notices that the user's browser doesn't support SVG images. At the moment IE8 and lower and Android 2.* don't support SVG images. 

Demo
----
A demo of SVGMagic can be found on the [SVGMagic website](http://svgmagic.bitlabs.nl/).

Known bugs
----------
[empty]
