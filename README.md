SVGMagic - Cross browser SVG support
========
A simple jQuery plugin that creates a fallback for .SVG images. In case your browser doesn't support .SVG images it will create a .PNG file and replace the .SVG with it. This means that you don't have to create two versions of your images to support IE8 and lower.

Installation
------------
Just include the script in your header and call the plugin in your document ready
```code
<script src="SVGMagic.js"></script>
<script>
	$(document).ready(function(){
		$('img').svgmagic();
	});
</script>
```

Support
-------
The plugin is tested in Internet Explorer Version 7 and 8 (other browsers already support SVG files).

Security
--------
The script makes use of a server side php script that converts the SVG to an PNG. The script will send a request to the server containing the images sources. The server will get those images, convert them to PNG, temporarily save them and send the new URL back. When the SVGMagic scripts receives the new URL it will replace the .SVG images with the new ones. 