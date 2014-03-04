[![ScreenShot](http://svgmagic.bitlabs.nl/svgmagic_tweakers.png)](http://svgmagic.bitlabs.nl)
SVGMagic - Cross browser SVG
========
This ease-to-use jQuery plugin will create a fallback for .SVG images on your website. When the plugin notices that the visitors browser doesn't support .SVG images it will replace those images with new .PNG images. Those .PNG images are created on the run using a serverside script. When the visitors browser does support .SVG images it will just go back to sleep.

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
            backgroundimage: true
        });
	});
</script>
```

Options
-------
You can parse an options object into SVGMagic. Currently it supports the following options:
```code
$('img').svgmagic({
    preloader: {url-to-preloader/false}, // Preloader before the image gets replaced, default: false
    testmode: {false/true}, // SVGMagic works in every browser if set to true, default: false
    secure: {false/true}, // Images are sent via https:// if set to true, default: false
    backgroundimage: {false/true}, // Check given div for backgroundimages, default: false
    callback: {false/function} // Function to run after images are changed, default: false
    dumpcache: {false/true} // Force to remove the cache and create a new .PNg, default: false
});
```

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