$(document).ready(function () {    
    // First a browser polyfill... 
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // MIT license
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for ( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
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


    // cache jQuery selectors to which the animations will occur
    var prlxDown = $('.prlx-down');
    var prlxUp = $('.prlx-up');
    var prlxDownRight = $('.prlx-down-right');
    var prlxUpSpin = $('.prlx-up-spin');

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
        
    function parallax(){
        // prlxDownAnim 
        // setting the speed/animation effect to be a multiple of the windows Y scroll position
        // moving it down the page by giving it a positive(+) value
        var prlxDownAnim= ( window.pageYOffset * .55 ).toFixed(2); // Rounding the value
        // putting value into a string for the transform css property
        var prlxDownStr = "translate3d(0, " + prlxDownAnim + "px, 0)"; 
        // applying parallax effect to element      
        $(prlxDown).css({
            "transform":prlxDownStr,
            "-ms-transform":prlxDownStr,
            "-webkit-transform":prlxDownStr
        });

        // prlxUpAnim
        // moving it up the page by giving it a negative(-) value
        var prlxUpAnim= - ( window.pageYOffset * .25 ).toFixed(2); 
        var prlxUpStr = "translate3d(0, " + prlxUpAnim + "px, 0)";
        $(prlxUp).css({
            "transform":prlxUpStr,
            "-ms-transform":prlxUpStr,
            "-webkit-transform":prlxUpStr
        });

        // prlxUpSpinAnim
        var prlxUpSpinAnim= ( window.pageYOffset * .35 ).toFixed(2);
        var prlxUpSpinStr = "rotate(" + prlxUpSpinAnim + "deg) translate3d(0, " + prlxUpAnim + "px, 0)";
        $(prlxUpSpin).css({
            "transform":prlxUpSpinStr,
            "-ms-transform":prlxUpSpinStr,
            "-webkit-transform":prlxUpSpinStr
        });

        // prlxDownRightAnim
        var prlxDownRightAnim= ( window.pageYOffset * .45  ).toFixed(2);
        var prlxDownRightStr = "translate3d(" + prlxDownRightAnim + "px, " + prlxDownAnim + "px, 0)";
        $(prlxDownRight).css({
            "transform":prlxDownRightStr,
            "-ms-transform":prlxDownRightStr,
            "-webkit-transform":prlxDownRightStr
        });

        if (requesting) {  // check the flag before calling itself again
            requestAnimationFrame(parallax);
        }
    }
    
    window.addEventListener("scroll", onScroll, false);
});