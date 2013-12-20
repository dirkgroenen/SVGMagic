SVGMagic - Cross browser SVG
========
A simple jQuery plugin that creates a fallback for .SVG images. In case your browser doesn't support .SVG images it will create a .PNG file and replace the .SVG with it. This means that you don't have to create two versions of your images to support IE8 and lower.

Big difference with other fallback plugins: this plugin CREATES the PNG image automatically. That means that you don't have to create an extra folder with PNG images.

SVG is a vector graphics format, meaning it’s perfectly scalable. Whatever size it needs to display at, or whatever screen it needs to display on, an SVG will adapt perfectly. This means that you can use the same image for desktop and mobile (including Retina) visitors. They all get a perfectly sharp image.

![ScreenShot](http://www.chriscullmann.com/wp-content/uploads/2013/04/svg-image-comparison.png)

You can find more information and demos on [our website](http://svgmagic.bitlabs.nl/).

Installation
------------
Just include the script in your header and call the plugin in your document ready
```code
<script src="SVGMagic.min.js"></script>
<script>
	$(document).ready(function(){
		$('img').svgmagic();
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
    callback: {false/function} // Function to run after images are changed, default: false
});
```

Support
-------
The plugin is tested in Internet Explorer Version 7 and 8 (other browsers already support SVG files).

Security
--------
The script makes use of a server side php script that converts the SVG to an PNG. The script will send a request to the server containing the images sources. The server will get those images, convert them to PNG, temporarily save them and send the new URL back. When the SVGMagic scripts receives the new URL it will replace the .SVG images with the new ones. 

Demo
----
A demo of SVGMagic can be found on the [SVGMagic website](http://svgmagic.bitlabs.nl/).
