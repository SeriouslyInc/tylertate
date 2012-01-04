---
layout: blog
title: Working with Sub-pixel Rounding
published: false
---

An ugly problem plagues fluid layouts: sub-pixel rounding. You've experienced this nasty issue when elements within your percentage-based layout unexpectedly wrap to the next line in Internet Explorer, or aren't flush with the right-hand edge in Safari and Chrome.

The culprit? How percentages are rounded into pixel values by the browser. As [John Resig documented](http://ejohn.org/blog/sub-pixel-problems-in-css/) back in 2008, browsers have adopted different rounding strategies: Webkit and Opera always round *down*, FireFox and Internet Explorer 8 and 9 round some numbers up, others down, and IE6 & IE7 always round up.

Here is the output of an [example page](http://tylertate.github.com/subpixel-rounding/examples/four/four.html) in the major browsers. I've extended John Resig's original demonstration by testing 4 boxes, each 25% wide, in a three differently sized containers: 49px, 50px, and 51px. The number shown below each example is the theoretical pixel width of one of the boxes (e.g. 50px * .25 = 12.5).

You'll notice that in Webkit and Opera, which use the rounding-down strategy, there is space remaining. FireFox, IE8, and IE9, on other hand, vary the widths of the boxes so that, in total, they occupy all of the available space. But crucially, when the floating decimal is 0.5 or greater, IE6 and IE7 round up, forcing the last box to wrap to the next line. And *that* is the source of my migraines.

<img src="http://localhost:4000/resources/images/2012-01-04/browser-subpixel-rounding.png" width="620" height="240" style="margin-left: -122px" />

### The Solution
Fortunately, there is a simple work around. Webkit, you'll remember rounds down. Even 12.99px wekbit would convert

<img src="http://localhost:4000/resources/images/2012-01-04/browser-subpixel-rounding-corrected.png" width="620" height="192" style="margin-left: -122px" />