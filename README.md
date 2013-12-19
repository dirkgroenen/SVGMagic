SVGMagic
========
A simple jQuery plugin that creates a fallback for .SVG images. In case your browser doesn't support .SVG images it will create a .PNG file and replace the .SVG with it.

Installation
------------
Just include the script in your header and call the plugin in your document ready
```code
<head>
	<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
	<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
	<script src="SVGMagic.js"></script>
	<script>
		$(document).ready(function(){
			$('img').svgmagic();
		});
	</script>
</head>
```