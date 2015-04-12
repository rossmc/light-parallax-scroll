Lightweight Parallax Scroll
=====================

Simple lightweight parallax scroll script. The intention is for this script to be used as a starting point for developing your own custom parallax effects.

It simply scrolls elements at different speeds/direction in relation to the rest of the DOM.  Four parallax effects have been defined in the script but more can easily be added as you need them.

Have a look at the [demo here](http://rossmchugh.com/demos/light-parallax-scroll/ "Light Parallax Scroll").  And for more information see my [blog post](http://rossmchugh.com/lightweight-parallax-scrolling/).

You may also wish to **add smooth scrolling** to your site to give it a nicer effect, I followed [this method with TweenMax](http://bassta.bg/2013/05/smooth-page-scrolling-with-tweenmax/ "Smooth page scrolling with TweenMax").

#### Set Up
Add the script to the head section of your html doc.  It requires jQuery.
```
<script type="text/javascript" src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
<script type="text/javascript" src="light-parallax-scroll-1-0.js"></script>
```
Next add one of the following css classes to the the div which you wish to add the parallax effect to.
```
.prlx-down, .prlx-up, .prlx-down-right, .prlx-up-spin
```
You may also wish to give the above css classes a relative, absolute or fixed css position.

For parallax background images you only need to give them the css property of:
```
background-attachment: fixed;
```

You can add your own custom parallax effects to the *parallax function* in light-parallax-scroll script.