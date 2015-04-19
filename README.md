[![ScreenShot](http://svgmagic.bitlabs.nl/svgmagic_tweakers.png)](http://svgmagic.bitlabs.nl)
SVGMagic - Cross browser SVG
========
This ease-to-use jQuery plugin will create a fallback for .SVG images on your website. When the plugin notices that the visitors browser doesn't support .SVG images it will replace those images with new .PNG images. Those .PNG images are created on the run using a serverside script. When the visitors browser does support .SVG images it will just go back to sleep.

A big advantage of SVGMagic is that you don't have to create multiple versions of your images. You can just focus on the .SVG images and let SVGMagic do the rest. 

You can find more information and demos on [our website](http://svgmagic.bitlabs.nl/).

[![Build Status](https://travis-ci.org/dirkgroenen/SVGMagic.svg?branch=master)](https://travis-ci.org/dirkgroenen/SVGMagic)
[![Help me with a cup of coffee ](https://pledgie.com/campaigns/28130.png?skin_name=chrome)](https://pledgie.com/campaigns/28130)

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
    remoteServerUri:        'https://bitlabs.nl/svgmagic/converter/3/', // Uri of the (remote) API script
    remoteRequestType:      'POST', // Request type for the API call
    remoteDataType:         'jsonp', // Data type for the API call
    debug:                  'false' // Show usefull debug information in the console
});
```

### additionalRequestData
The ```additionalRequestData``` option gives you the posibility to add extra data to the ajax request. The default API script supports two extra options: ```{secure: true}``` and ```{dumpcache: true}```. 

Local development
-----------------
SVGMagic needs public access to the images on your website, which means that you can't use it when developing in a local environment. In case you still need to use the plugin you can download the ```converter.php``` script and place it on your local machine. 

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
- When many images need to be replaced the URL can get too long which will result in a server 414 error.

Changelog
----------
## 3.0.0 (2014-11-22)
#### Client:
    New features:
        - SVGMagic can now return usefull debug information while replacing SVG images. 
        - Added timeout to ajax request. Show debug information when timeout gets exceeded.

    New options:
        - debug: Show usefull debug information in the console

    Documentation:
        - Added changelog to the bottom of the README
        - Automatically return images over https when request was over https.

#### Server:
    New features:
        - Fully rewrite of the server script. The server will now provide much more information about the convert process.
        - Response will contain the creation date of cached images.
        - Data images are now also cached.

## 2.4.0 (2014-08-01)
    
    New features: 
        - Add extra post data to the ajax request
        - Now also finds data:image SVGs
        
    New options:
        - temporaryHoldingImage:    replacement for preloader
        - forceReplacements:        replacement for testmode
        - handleBackgroundImages:   replacement for backgroundimage
        - additionalRequestData:    send extra data to the server that replaces the SVGs for PNGs
        - postReplacementCallback:  callback function that will be executed before replacement
        - remoteServerUri:          the URI of the remote server that converts the images to PNG
        - remoteRequestType:        set the type of the ajax request (post/get)
        - remoteDataType:           the datatype sent to and received from the remote server
        
    Deprecated options:
        - preloader         > temporaryHoldingImage
        - testmode          > forceReplacements
        - backgroundimage   > handleBackgroundImages
        - secure            > additionalRequestData
        - callback          > postReplacementCallback
        - dumpcache         > additionalRequestData
