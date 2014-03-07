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
(function( $ ){
    $.fn.svgmagic = function(givenoptions) {	
        var defaultoptions = {
            preloader: false,
            testmode: false,
            secure: false,
            callback: false,
            backgroundimage: false,
            dumpcache: false
        }
        var options = $.extend(defaultoptions,givenoptions);
        var preloaderTimer = [];
		
        if(options.testmode || !document.createElement('svg').getAttributeNS){
            if (typeof JSON == 'undefined') {
                if(typeof JSON!=="object"){JSON={}}(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t==="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];if(a&&typeof a==="object"&&typeof a.toJSON==="function"){a=a.toJSON(e)}if(typeof rep==="function"){a=rep.call(t,e,a)}switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a){return"null"}gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1){u[n]=str(n,a)||"null"}i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep==="object"){s=rep.length;for(n=0;n<s;n+=1){if(typeof rep[n]==="string"){r=rep[n];i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}else{for(r in a){if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);if(i){u.push(quote(r)+(gap?": ":":")+i)}}}}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;if(typeof JSON.stringify!=="function"){JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n==="number"){for(r=0;r<n;r+=1){indent+=" "}}else if(typeof n==="string"){indent=n}rep=t;if(t&&typeof t!=="function"&&(typeof t!=="object"||typeof t.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":e})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i==="object"){for(n in i){if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);if(r!==undefined){i[n]=r}else{delete i[n]}}}}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}})()
            }	
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
