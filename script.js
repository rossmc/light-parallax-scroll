    /*********************
     PARALLAX SCROLL START
     ********************/
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
    var prlx1 = jQ('.prlx-1');
    var prlx2 = jQ('.prlx-2');
    function parallax(){
        var prlx_effect_1= +(window.pageYOffset *.55).toFixed(2); // .55 for slow | .7 good for fast
        var prlx_str_1 = "translate3d(0, "+prlx_effect_1+"px, 0)";
        jQ(prlx1).css({
            "transform":prlx_str_1,
            "-ms-transform":prlx_str_1,
            "-webkit-transform":prlx_str_1
        });

        var prlx_effect_2= -(window.pageYOffset *.25 ).toFixed(2); // .2 for slow | .4 good for fast
        var prlx_str_2 = "translate3d(0, "+prlx_effect_2+"px, 0)";
        jQ(prlx2).css({
            "transform":prlx_str_2,
            "-ms-transform":prlx_str_2,
            "-webkit-transform":prlx_str_2
        });

        if (requesting) {
            requestAnimationFrame(parallax);
        }
    }
    if(jQ(".cms-index-index.cms-home").length != 0){
        window.addEventListener("scroll", onScroll, false);
    }
    /*******************
     PARALLAX SCROLL END
     ******************/
