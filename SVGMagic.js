(function( $ ){
	$.fn.svgmagic = function() {	
		var ieversion = false;
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)){ 
		   ieversion=new Number(RegExp.$1);
		}
		
		if(ieversion < 9 && ieversion != false){
			var obj = this;		
			var images = [];

			obj.each(function(){
				var $obj = $(this);
				if($obj.attr('src').split('.').pop() == 'svg'){
					var image = new Image();
					image.src = $obj.attr('src');
					images.push(image.src);
				}
			});	
			
			if(images.length > 0){
				var data = {
					svgsources: JSON.stringify(images)
				};

				$.post("http://svgmagic.bitlabsbeta.nl/converter.php", data, function(response){
					obj.each(function(i){	
						$(this).attr('src', response.results[i].url);
					});
				}, 'json');
			}
		}
	};
}(jQuery));