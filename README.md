SVGMagic
========
A simple jQuery plugin that creates a fallback for .SVG images. In case your browser doesn't support .SVG images it will create a .PNG file and replace the .SVG with it.

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