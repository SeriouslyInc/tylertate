---
layout: blog
title: Semantic Semantics
published: false
---

Yesterday we released a new CSS grid called the [Semantic Grid System](http://coding.smashingmagazine.com/2011/08/23/the-semantic-grid-system-page-layout-for-tomorrow/), or [Semantic.gs](http://Semantic.gs) for short. Not long afterwards, [Nathan Smith](https://twitter.com/nathansmith) had a long discussion on Twitter over the meaning of "semantic." But, as is often the case, Twitter just doesn't do justice to nuanced discussions. Hence this blog post.

### The Backdrop
One key difference between Semantic.gs and "traditional" CSS Grid systems is that layout decisions are **isolated to the stylesheet** in the case of former, while layout commands are **mixed with the HTML markup** in the latter. Here is an example of the same operation in Semantic.gs, and my [1KB Grid](http://1kbgrid.com) from a couple years ago (which borrowed from the landmark [960 Grid](http://960.gs)):

The Semantic.gs way:
	
	// HTML
	<article>Main</article>
	<section>Sidebar</section>
	
	// STYLESHEET
	article { .column(9); }
	section { .column(3); }
	
The traditional grid system way:

	// HTML
	<article class="column grid_9">
		Main
	</article>
	<section class="column grid_3">
		Sidebar
	</section>

### The Question
While the traditional approach references both content and display information in the HTML, Semantic.gs clearly distinguishes between the two, isolating presentational information to the stylesheet. I describe this approach as "semantic." However, there seems to be contention over the definition of the word, and whether or not its fair to describe the traditional CSS grid approach as non-semantic. In particular, do CSS class names apply to the conversation of semantics, or are they completely neutral of any semantic/non-semantic quality? Here's what I think.


### Lowercase Semantic Web
The [Wikipedia definition](http://en.wikipedia.org/wiki/Meaning_%28linguistic%29) of semantic is: "content carried by words or signs … when communicating through language."

In context of the web, however, it's helpful to begin by differentiating between two uses of the word in question. Founding figures of microformats such as [Eric Meyer](http://complexspiral.com/events/archive/2005/sxsw/) and [Tantek Çelik and Kevin Marks](http://tantek.com/presentations/2004etech/realworldsemanticspres.html) used to distinguish between the "lowercase semantic web" as thought of in standards-based web design, and [The Semantic Web](http://www.w3.org/DesignIssues/Semantic.html), Tim Berners-Lee's grand plan to re-architect the future Internet. I speak of lowercase semantics.

The general thrust of the now decade-old web standards movement has been towards greater separation between content and display by shunning table-based layouts and font tags, while embracing semantic markup and CSS. Here's how Dan Cederholm explained semantics in his book *Web Standards Solutions*:

> "What I mean when I talk about semantics is that we're striving to use tags that imply meaning, rather than a presentational instruction… By structuring web pages with semantic markup, we'll move closer to separating content from presentation." — *Dan Cederholm*


### CSS Classes Count
Taken to its logical conclusion, semantics must refer to the entire body of the HTML document; no parts are spared, including the CSS class names added to HTML elements. In fact, the `id` and `class` attributes are repeatedly discussed as inherent means of extending the semantic nature of HTML's limited vocabulary of elements. John Allsopp, in his informative [three-part series on semantics](http://microformatique.com/?p=83), says:

> "The semantics of HTML were, and remain, lightweight - though the small number of mechanisms for extending the semantics of HTML marked up documents, such as the use of the class attribute, and attributes such as rel have been increasingly used over the last half a decade or so to **increase the semantic nature** of web content, and extend HTML’s reasonably limited built in semantics." — *John Allsopp*

Not only can `id` and `class` attributes be used to *extend* the semantics of the document, but using them haphazardly can indeed detract from the semantic-ness of the page, as Jeffrey Zeldman explains in his book *Designing with Web Standards*:

> "Gladys" or "orangebox" would be perfectly kosher [names] within the rules of XHTML. But semantic or meta-structureal names (names that explain the function performed by elements contained within) are best. You would feel pretty sill having labeled a part of your site "orangebox" when the client decides to go with blue." — *Jeffrey Zeldman*

So if a class of "orangebox" is considered non-semantic, the same logic would apply to class names like "grid_6". Zeldman goes on to draw a very sharp distinction between `id` / `class` names and design:

> "Crafting structural `id` labels like 'menu' or 'content' or 'search form' helps you remember that markup is not design and that a well-structured page can be made to look any way you desire."

### But it Still Validates
There are a lot of wise voices who advocate semantic markup, including semantic CSS classes, to achieve separation between content and presentation. However, a distinction should be made between *semantic* markup and *valid* markup. Do non-semantic CSS classes like "orangebox" or "grid_6" still validate? Of course! Do they still render correctly in browsers, screen readers, and search engines? Naturally. This harks back to [Jason Kottke's](http://www.kottke.org/03/08/standards-semantically-correct) observation back in 2003:

> "Last time I checked (about two minutes ago...to see if I was actually correct), both the `<table>` and `<font>` tags are valid XHTML 1.0 Transitional tags and the `<table>` tag is a valid XHTML 1.1 tag. Documents with `<table>` and `<font>` tags are standards-compliant." — *Jason Kottke*
	
To which [Dave Shea](http://www.mezzoblue.com/archives/2003/08/26/semantics_an/) replied:

> "Jason is absolutely correct. You are allowed to use `<font>` tags in your valid XHTML. You are allowed to continue designing with tables. As long as you lowercase your tags and watch your nesting, there is nothing stopping you from building your XHTML sites without a lick of CSS. But if this is all you’re doing, you are like the driver of the VW Beetle carefully pulling to a stop at the light, failing to move for the Mack truck barrelling toward him at 120km/h. Sure he’s following the letter of the law, but the light was put there for his safety. He’s completely missing the spirit in which it was written." — *Dave Shea*

### Is Semantic Better?
David Shea's response was a bit harsh. Absolute purity is not always necessary, and there are plenty who think that [more semantic is not always better](http://www.lukew.com/ff/entry.asp?1379). It is sometimes worth cutting a few semantic corners — such as by using "grid_x" class names — to save time or make things simpler for developers. It's a tradeoff that should be made judiciously rather than pursuing pure semantics at all cost.

However, truly semantic markup (including semantic `class` names) does have distinct advantages. Above all else, non-semantic markup will always be tied to a given format. To achieve a future of [responsive design](http://www.alistapart.com/articles/responsive-web-design/), we need to separate content from how it is presented.