---
layout: blog
title: "Retina Images Using Media Queries and LESS CSS: A responsive approach to supporting multiple pixel densities"
snippet: "I've owned a retina-equipped MacBook Pro since January, and for me, there's no going back. With retina versions of the iPhone, iPad, and many Android devices, supporting high-density devices has become unavoidable. At Twigkit, our library of user interface components has long been image-free. We were early adopters of font icons, whose vector format scales to any screen resolution or pixel density. When I set out to redesign our marketing site a couple of months ago, however, I needed an approach for images that would minimise bandwidth for low-density devices, while maximising quality for high-density screens."
category: frontend
---

I've owned a retina-equipped MacBook Pro since January, and for me, there's no going back. With retina versions of the iPhone, iPad, and many [Android](http://developer.android.com/guide/webapps/targeting.html) devices, supporting high-density devices has become unavoidable.

At [Twigkit](http://www.twigkit.com/), our library of user interface components has long been image-free. We were early adopters of font icons, whose vector format scales to any screen resolution or pixel density. When I set out to redesign our marketing site a couple of months ago, however, I needed an approach for images that would minimise bandwidth for low-density devices, while maximising quality for high-density screens.

## JavaScript vs. CSS
There are two main approaches to delivering images for multiple pixel densities:

1. **Use image tags with JavaScript** to replace the image's source attribute when appropriate
2. **Use CSS background images with media queries** to override the background image when appropriate

Both approaches are technically sound. But all else being equal, I personally prefer to use CSS for presentation and reserve JavaScript for interaction.

## Background images
The CSS approach relies on all images being set through the `background-image` property. If we have two images to display that are both 450x300, for instance, we could do as follows:

	<figure id="desert"></figure>
	<figure id="camel"></figure>

 And the CSS:

	figure {
		width: 450px;
		height: 300px;
	}
	figure#desert {
		background-image: url('images/sand-dune.jpg');
	}
	figure#camel {
		background-image: url('images/camel.jpg');
	}

## The Media Query
With the images displayed as `background-images`, we can then use a media query to detect the pixel density of the device viewing our page.

	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		figure#desert {
			background-image: url('images/sand-dune_2x.jpg');
			background-size: 100%;
		}
		figure#camel {
			background-image: url('images/camel_2x.jpg');
			background-size: 100%;
		}
	}

While `min-resolution: 192dpi` is [W3C-approved](http://www.w3.org/TR/css3-mediaqueries/#resolution) mechanism for targeting pixel density, it's not yet [well supported](http://drewwells.net/blog/2013/working-with-dppx/). For now, the vendor specific `-webkit-min-device-pixel-ratio` and `min--moz-device-pixel-ratio` (yes, believe it or not that Mozilla prefix is [correct](http://menacingcloud.com/?c=highPixelDensityDisplays)) are well supported by browsers likely to be used on high-density devices.

You will notice that this media query adds a `_2x` suffix to the filenames of our two images. This assumes that we have created these image files, and that they are twice the resolution of the original. In other words, if the original image is 450x300 pixels, our `_2x` images should be 900x600.

By default, the web browser on a retina device will automatically scale an image to its actual pixel size. That is, our 900x450 image would be scaled to occupy a full 900x450 "virtual pixels" on the screen, whereas what we actually want is for the image to be scaled down to the original 450x300 area. To achieve this, we can set `background-size: 100%;`. [This](http://quirksmode.org/css/backgrounds-borders/) instructs the browser to make the background image equal in width to its container.

## Nested Media Queries with LESS
So far, I'm sure you'll agree, we've hardly broken new ground. The biggest problem I have with the above approach, however, is that it requires the designer to organise their CSS according to pixel densities. Instead of structuring stylesheets around the logical structure of the website, in other words, it forces us to have different stylesheets (or different blocks within a single stylesheet) to address each pixel density that we want to target. I don't like that.

Fortunately, CSS preprocessors like [LESS](http://lesscss.org/#-nested-media-queries) and [SASS](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#media) support nesting media queries within selectors. For example, using LESS we could restructure our stylesheet as follows:

	figure {
		width: 450px;
		height: 300px;
	}
	figure#desert {
		background-image: url('images/sand-dune.jpg');

		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
			background-image: url('images/sand-dune_2x.jpg');
			background-size: 100%;
		}
	}
	figure#camel {
		background-image: url('images/camel.jpg');

		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
			background-image: url('images/camel_2x.jpg');
			background-size: 100%;
		}
	}

While the compiled output of this stylesheet would resemble the original example, LESS's nested media query support allows us to structure our stylesheet more naturally. However, having to remember to add these extra few lines for every image is still tedious.

## The Mixin, Take 1
CSS preprocessors provide a second tool which can make this process easier: *mixins*. The SASS documentation describes a [mixin](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#mixins) as follows:

> "Mixins allow you to define styles that can be re-used throughout the stylesheet... They can also take arguments which allows you to produce a wide variety of styles with very few mixins."

Let's experiment by moving our media query to a mixin called `.background-image()`:

	.background-image(@image) {
		background-image: url(@image);

		@media only screen and (-webkit-min-device-pixel-ratio: 2) {
			background-image: url(@image);
			background-size: 100%;
		}
	}

You will notice that the mixin accepts an `@image` parameter, which is then used to set the `background-image`. Having defined this mixin, we could then rewrite our primary stylesheet to reference it:

	figure {
		width: 450px;
		height: 300px;
	}
	figure#desert {
		.background-image('images/sand-dune.jpg');
	}
	figure#camel {
		.background-image('images/camel.jpg');
	}

Our compiled CSS would then look like:

	figure {
		width: 450px;
		height: 300px;
	}
	figure#desert {
		background-image: url('images/sand-dune.jpg');
	}
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		figure#desert {
			background-image: url('images/sand-dune.jpg');
			background-size: 100%;
		}
	}
	figure#camel {
		background-image: url('images/camel.jpg');
	}
	@media only screen and (-webkit-min-device-pixel-ratio: 2) {
		figure#camel {
			background-image: url('images/camel.jpg');
			background-size: 100%;
		}
	}

It's easy to see how a mixin could simplify configuration. Of course, this mixin isn't yet doing it's job; you'll notice that the retina image is still pointing to `images/sand-dune.jpg`, and not the `images/sand-dune_2x.jpg` that we need.

## The Regular Expression
The next step requires a bit of a leap. In order to add the `_2x` suffix to the image path, we could have our `.background-image()` mixin use a regular expression to split the image path into two parts — filename and extension. We can then piece the path back together, inserting the `_2x` suffix between them.

Ok, stay with me here. Lets first prototype our regular expression in JavaScript. I've created a [fiddle](http://jsfiddle.net/g7rqt/) where you can run this code for yourself.

	var image = '../images/image.png';
	var regex = /(.*)\.(jpg|jpeg|png|gif)/;
	var match = regex.exec(image);
	if (match != null) {
	    alert("background-image: url('"+match[1]+"_2x."+match[2]+"');");
	}

The regular expression has two [capture groups](http://www.regular-expressions.info/brackets.html), which are denoted by parenthesis: `(.*)` and `(jpg|jpeg|png|gif)`. The second capture group matches any of the listed extensions: `jpg`, `jpeg`, `png`, or `gif`. The first capture group captures everything before the full stop. Then, in the `alert()`, we reconstruct the image path.

## The Mixin, Take 2
Now that we've created a regular expression that works, we can incorporate this into our mixin by taking advantage of LESS's ability to evaluate JavaScript expressions.

	.background-image(@image){
		@filename:  ~`/(.*)\.(jpg|jpeg|png|gif)/.exec(@{image})[1]`;
		@extension: ~`/(.*)\.(jpg|jpeg|png|gif)/.exec(@{image})[2]`;
		background-image: ~`"url(@{filename}.@{extension})"`;

		@media (-webkit-min-device-pixel-ratio: 2) {
			background-image: ~`"url(@{filename}_2x.@{extension})"`;
			background-size: 100%;
		}
	}

Because there is no concept of arrays in LESS, I've had to run the same regular expression twice, once to grab the filename, and again to get the extension.

With the mixin now equipped with our regular expression, we can very simply reference our images and be certain that the correct resolution image is being delivered to the browser.

	figure {
		width: 450px;
		height: 300px;
	}
	figure#desert {
		.background-image('images/sand-dune.jpg');
	}
	figure#camel {
		.background-image('images/camel.jpg');
	}

You can view a [working demo](http://tylertate.github.io/background-image/demo.html) of this solution, as well as [browse the code](https://github.com/tylertate/background-image) on GitHub.


## Limitations
This approach has one particular limitation that it's important to point out. When compiled, each reference to the `.background-image()` mixin results in a few lines of CSS (in this case, five lines). A quick test seems to indicate that about five invocations of the mixin result in about 1 kilobyte of uncompressed CSS. This is acceptable if there are a couple dozen images involved, but not if there are hundreds.

## Advantages
That said, this approach of using background images, media queries, and a LESS mixin in combination does have a number of significant advantages:

* It relies purely on CSS — no JavaScript is required
* It's not necessary to restructure your stylesheets to support multiple pixel densities
* The mixin abstracts the media queries and references to retina images, so it's not necessary to add any extra configuration to main stylesheets
* The method for referencing images — `.background-image('images/camel.jpg')` is in keeping with CSS syntax