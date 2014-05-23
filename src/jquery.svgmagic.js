/*  Version 2.3.1
    It's a simple jQuery plugin that searchs for SVG images on your website and creates PNG versions on the run. 
    Meaning that you don't have to create different versions of the images yourself.
    Copyright (C) 2013 - Dirk Groenen [Bitlabs Development]

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
 * -------
 * Options
 * -------
 * * preloader                [string or boolean] This is the URI to an image file which is used as a "holding" image
 *                            for your SVG images while the PNG replacements load from the remote server.  If set to
 *                            boolean false (the default behaviour) then no such holding image is used.
 * 
 * * testmode                 [boolean] If set to true then the SVG replacement will be forced on all browsers,
 *                            including those which report that they support SVG natively.  If set to false (the default
 *                            behaviour) then the SVG replacement will only be performed upon browsers which do not
 *                            support it natively.
 * 
 * * secure                   [boolean] The value (true or false) of this option is passed to the remote SVG replacement
 *                            server as part of the HTTP POST parameters.  Whilst the server may honour it or not, it is
 *                            intended that if the value is true, then the remote server will return a series of HTTPS
 *                            URIs (for the PNG replacement images). If set to false (the default behaviour) then the
 *                            remote server should return HTTP (non-secured) URIs.
 * 
 *                            Regardless of the setting of this option - the initial call to the remote server will be
 *                            performed via unsecured HTTP.
 * 
 * * callback                 [function()] An optional callback function which executes once all of the PNG replacement
 *                            image URIs have been retrieved from the remote server and all of the SVG images have had
 *                            their URIs replaced.  This is not quite a callback which executes after the replacement
 *                            images have loaded.  If the value is set to false (the default behaviour) then no
 *                            additional callback is executed.  No parameters are passed to this callback.
 * 
 * * backgroundimage          [boolean] If set to true then additional inspection will be performed upon all matched
 *                            elements in order to find a CSS background-image property.  If such a property is found
 *                            then it will be included in the replacement process.  If set to false (the default
 *                            behaviour) then no additional work will be performed to find background-images which are
 *                            SVG.
 * 
 * * dumpcache                [boolean] The value (true or false) of this option is passed to the remote SVG replacement
 *                            server as part of the HTTP POST parameters.  If set to true, then the server is requested
 *                            to clear any cached PNG copy of the replaced SVG image.  This will result in the remote
 *                            server re-generating the PNG replacement.  If set to false (the default behaviour) then
 *                            the remote server is expected to serve cached PNG replacement images where possible. 
 */
(function( $ ){
    $.fn.svgmagic = function(givenoptions) {  
        var defaultoptions = {
            preloader: false,
            testmode: false,
            secure: false,
            callback: false,
            backgroundimage: false,
            dumpcache: false
        };
        var options = $.extend(defaultoptions,givenoptions);
        var preloaderTimer = [];
		
        if(options.testmode || !document.createElement('svg').getAttributeNS)
        {

            var obj = this, images = [], domimages = [], cssimages = [];

            obj.each(function(){
                if($(this).attr("src") != undefined){
                    if($(this).attr("src").split(".").pop() == "svg" || $(this).attr("src").substr(0, 18) == "data:image/svg+xml"){
                        $obj = $(this);
                        var image = new Image();
                        image.src = $(this).attr('src');
                        images.push(image.src);
                        domimages.push($obj);
                        
                        if(options.preloader != false){
                            preloaderTimer.push(setTimeout(function(){
                                $obj.attr("src", options.preloader);
                            },500));
                        }
                    }

                }
            });	
            
            // If backgroundimage option is enabled it will search for background images in the div
            if(options.backgroundimage){
                obj.each(function(){
                    if($(this).css('background-image') != "none" && $(this).css('background-image') != undefined){
                        var bgsrc = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                        if(bgsrc.split('.').pop() == 'svg'){
                            var image = new Image();
                            image.src = bgsrc;
                            images.push(image.src);
                            cssimages.push($(this));
                        }
                    }
                });
            }
            
            var data = {
                svgsources: images,
                secure: options.secure,
                dumpcache: options.dumpcache
            };
            
            if(images.length > 0){
                var i = 0;
                $.ajax({
                    dataType: "json",
                    method: "POST",
                    url: "http://svgmagic.bitlabs.nl/converter.php",
                    data: data,
                    success: function(response){
                        var i;
                        for(i = 0;i < domimages.length; i++){
                            clearTimeout(preloaderTimer[i]);
                            domimages[i].attr('src', response.results[i].url);
                        }
                        
                        if(options.backgroundimage){
                            for(i;i < (domimages.length+cssimages.length); i++){
                                var fakeindex = (i - domimages.length);
                                cssimages[fakeindex].css('background-image', 'url("'+response.results[i].url+'")');
                            }
                        }
                        
                        if(options.callback){
                            options.callback();
                        }
                    }
                });
        
            }
        }
    };
}(jQuery));
