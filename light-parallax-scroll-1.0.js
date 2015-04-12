$(document).ready(function () {    
    // cache jQuery selectors to which the parallax animations will occur
    var prlxDown = $('.prlx-down');
    var prlxUp = $('.prlx-up');
    var prlxDownRight = $('.prlx-down-right');
    var prlxUpSpin = $('.prlx-up-spin');
    // set the parallax value vars used for setting setting the speed and direction, 
    // it is calculated in the getYOffsetValue() function with the position of the Y scroll position.
    // A positive value moves the element down the page or infront of the x axis, 
    // while a negative value moves it up the page or behind the x axis.
    var prlxDownValue = .55;
    var prlxUpValue = -.25;
    var prlxUpSpinValue = .35;
    var prlxDownRightValue = .45;
    // declare the vars which will be used to hold the css transform property values in the parallax() function.
    var prlxDownStr;
    var prlxUpStr;
    var prlxUpSpinStr;
    var prlxDownRightStr;
    // set a variable flag which will be used to check weather to run the animations or not.
    var requesting = false;
    
    // Use the debounce() function to kill the animations 100 milliseconds after the last scroll event using the requesting flag.
    var killRequesting = debounce(function () {
        requesting = false;
    }, 100);

    window.addEventListener("scroll", onScroll, false); // Start the parallax animations on the scroll event by calling the onScroll function.

    function onScroll() {
        if (!requesting) {  // checks to see that the requesting flag is false before running the animations.
            requesting = true;
            requestAnimationFrame(parallax);  // using requestAnimationFrame browser API to perfomr cheaper animations
        }
        killRequesting();
    }
        
    function parallax() {  // animations drawn on the page by changeing the css transform properties
        // prlxDown
        prlxDownStr = "translate3d(0, " + getYOffsetValue(prlxDownValue) + "px, 0)";  // putting the transform property into a string
        $(prlxDown).css({  // applying parallax effect to element  
            "transform":prlxDownStr,
            "-ms-transform":prlxDownStr,
            "-webkit-transform":prlxDownStr
        });

        // prlxUp
        prlxUpStr = "translate3d(0, " + getYOffsetValue(prlxUpValue) + "px, 0)";
        $(prlxUp).css({
            "transform":prlxUpStr,
            "-ms-transform":prlxUpStr,
            "-webkit-transform":prlxUpStr
        });

        // prlxUpSpin
        prlxUpSpinStr = "rotate(" + getYOffsetValue(prlxUpSpinValue) + "deg) translate3d(0, " + getYOffsetValue(prlxUpValue) + "px, 0)";
        $(prlxUpSpin).css({
            "transform":prlxUpSpinStr,
            "-ms-transform":prlxUpSpinStr,
            "-webkit-transform":prlxUpSpinStr
        });

        // prlxDownRight
        prlxDownRightStr = "translate3d(" + getYOffsetValue(prlxDownRightValue) + "px, " + getYOffsetValue(prlxDownValue) + "px, 0)";
        $(prlxDownRight).css({
            "transform":prlxDownRightStr,
            "-ms-transform":prlxDownRightStr,
            "-webkit-transform":prlxDownRightStr
        });

        function getYOffsetValue(prlxValue) {
            // setting the speed/Value ation effect to be a multiple of the windows Y scroll position
            return ( window.pageYOffset * prlxValue ).toFixed(2)
        }

        if (requesting) {  // check the flag before calling itself again
            requestAnimationFrame(parallax);
        }
    }

    // A browser polyfill for requestAnimationFrame 
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
});