$(document).ready(function(){
    /*********************
     PARALLAX SCROLL START
     ********************/
     
    // First a browser polyfill... 
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());

    // debounce is taken from _underscore.js
    // http://underscorejs.org/#debounce
    function debounce(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        return function() {
            context = this;
            args = arguments;
            timestamp = new Date();
            var later = function() {
                var last = (new Date()) - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                } else {
                    timeout = null;
                    if (!immediate) result = func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) result = func.apply(context, args);
            return result;
        };
    }


    // Start the requestAnimationFrame loop when the user begins scrolling and 
    // kill it 100 milliseconds after the last scroll event using a flag.
    var requesting = false;

    var killRequesting = debounce(function () {
        requesting = false;
    }, 100);

    function onScroll() {
        if (!requesting) {
            requesting = true;
            requestAnimationFrame(parallax);
        }
        killRequesting();
    }
    
    
    // cache jQuery selectors to which the animations will occur
    var prlx1 = $('.prlx-element-1');
    var prlx2 = $('.prlx-element-2');
    
    function parallax(){
        // setting the speed for prlx_effect_1 to be by .55
        // moving it down the page by ginving it a positive(+) value
        var prlx_effect_1= +(window.pageYOffset *.55).toFixed(2); // Round values
        var prlx_str_1 = "translate3d(0, "+prlx_effect_1+"px, 0)";
        $(prlx1).css({
            "transform":prlx_str_1,
            "-ms-transform":prlx_str_1,
            "-webkit-transform":prlx_str_1
        });

        // setting the speed for prlx_effect_1 to be by .25
        // moving it up the page by ginving it a negative(-) value
        var prlx_effect_2= -(window.pageYOffset *.25 ).toFixed(2); // Round values
        var prlx_str_2 = "translate3d(0, "+prlx_effect_2+"px, 0)";
        // applying parallax effect to element
        $(prlx2).css({
            "transform":prlx_str_2,
            "-ms-transform":prlx_str_2,
            "-webkit-transform":prlx_str_2
        });

        if (requesting) {  // check the flag before calling itself again
            requestAnimationFrame(parallax);
        }
    }
    
    window.addEventListener("scroll", onScroll, false);
    /*******************
     PARALLAX SCROLL END
     ******************/
});
