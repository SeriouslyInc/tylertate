---
layout: work
title: "Rideshare: Improving Surge"
excerpt: ""
cover_image: "/resources/images/work/rideshare/cover-small.jpg"
---

<figure class="large">
  <img src="/resources/images/work/rideshare/cover-wide.jpg" alt="Rideshare: Improving Surge" />
</figure>
<br/>

In this pilot project I used the design process to tackle the brief:

> Increase the number of drivers on shift for a particular rideshare company to meet the demands of customers in San Francisco, particularly at peak times.

## 1. User research
I’ve never driven for a rideshare company, so I feel far removed from the problem. To help me empathize with drivers, I took a couple of rides—one on Uber, the other on Lyft—and asked the drivers questions about how they choose where and when to drive. Here’s what I learned.

### William, pro Uber driver
William works Uber full time. He aims to maximize his number of rides and minimize his down time to achieve his target income of $200/day. He is skeptical of chasing surge fares, citing the delays of bad traffic often associated with surge events, and instead stays focused on doing as many rides as possible. He often seeks out places like shopping malls and the Stanford campus that’s he found have short waits between passengers.

### Abay, new Lyft driver
Abay just started driving for Lyft last week, aiming to earn money in his spare time. He’s still trying to get the hang of things and hasn’t developed a strategy for choosing where to drive—he just starts from home (South San Jose) and sees where his passengers take him. He’s tried going into downtown San Jose and heading towards “prime time” areas (Lyft’s version of surge), but it hasn’t paid off for him yet; he’s gone to a surge area a couple of time only to pickup a non-surge fare in the end (this is a common complaint among Lyft drivers in online forums).

## 2. Problem Definition
Neither driver I talked to found it effective to pursue surge fairs, and drivers in online forums dismiss “chasing the surge” as an ineffective strategy. This is a problem for rideshare companies. It indicates that surge pricing is not effective as a mechanism for balancing supply and demand.

My research suggests the reason drivers ignore the surge signal is because negative factors—such as bad traffic and lengthy pickup times—often counteract the benefit of higher fares.

> To get drivers to respond to increased demand, we need to provide them with both the positive and negative information they need to make informed decisions about maximizing their income.

## 3. Ideation
With the problem clearly defined, I then moved on to generating ideas for addressing it, starting on paper.

### Alerts
Alerting drivers when they can earn more money than usual would help get more drivers on the road at peak times.

The existing app already provides surge notifications. However, surge is only one of many factors that determines a driver’s earning potential.

Here are two ideas for more driver-centric notifications: 1) “Alert me when I can earn $X in Y hours”, and 2) "Alert me when X, Y, and Z occur within N miles of me.”

* **Earnings / Time.** One approach would be to alert based on projected earnings over time.
* **Multiple Alerts.** Another approach would be to support multiple highly- configurable alerts.
* **Alert Config.** Thresholds not just for surge, but also fares, ETAs, waits, and proximity.

<figure class="large">
  <img src="/resources/images/work/rideshare/sketch-alerts.jpg" alt="Alerts" />
  <figcaption>Alerting sketches.</figcaption>
</figure>

### Plan
“Where should I go to maximize my earnings for the day?” Helping drivers answer that question accurately would both optimize driver earnings as well as the company's supply-side.

One way to facilitate that could be to introduce a “Plan” tab. Using a slider, the driver could input how many hours they’d like to work. The map could display median projected earnings for that time period. Tapping on a given area would provide additional details, including a 24-hour histogram.

* **Where to go?** Select the number of hours you’d like to work, then see earning projections.
* **Area detail.** Tap on an area for details, including a histogram showing projected earnings.
* **When to go?** Manipulate the histogram to see how much you could earn at different times.

<figure class="large">
  <img src="/resources/images/work/rideshare/sketch-plan.jpg" alt="Plan Tab" />
  <figcaption>Sketches for a "Plan" tab.</figcaption>
</figure>

### Map overlays
“I’m out driving—where should I head next?”

While the Plan tab could help drivers plan their strategy for the day as a whole, map overlays could give them the real-time information they need for deciding where to head right now.

But as we’ve seen, just showing surge areas is not sufficient. Here’s a concept for showing several different types of information.

* **Overlay button.** Like Google Maps, a “layers” icon could be used to reveal a map options menu.
* **Menu sheet.** Select what type of information you’d like to see on the map.
* **Overlay.** Want to see where surge fares are currently in effect? Here’s a heatmap.

<figure class="large">
  <img src="/resources/images/work/rideshare/sketch-overlays.jpg" alt="Map Overlays" />
  <figcaption>Map overlay sketches.</figcaption>
</figure>

## 4. Prototyping
While I believe Alerts and a Plan tab are both concepts worth consideration, I decided to proceed by prototyping the Map Overlays concept. I sense it is the feature that would be used most often by the largest number of drivers, is a logical evolution of the existing interface, and would likely be able too leverage existing app capabilities, minimizing the engineering resources required to achieve it.

### Legacy Design

<figure class="small">
  <img src="/resources/images/work/rideshare/legacy.jpg" alt="Area Detail" />  
</figure>

The Driver App released in late 2015 included a surge heatmap that could be shown and hidden using a toggle. The control was situated alongside a traffic toggle and location button at the top right of the screen. Three buttons already risks cluttering the interface; to add additional functions, we need to consider displacing some of the controls.

### Overlay Menu
We’ll keep the location button, but consolidate the surge and traffic toggles into a separate menu. This displaced menu can be reached by tapping the Google Maps-style layers icon. Moving from a three-button design to a two-button selection declutters the main interface while expanding the functions we can offer the user.

The user can choose what type of information they’d like presented on the map:

* **Passenger ETAs.** The average time it takes to pick up the passenger once requested.
* **Surge.** The only visualization currently offered.
* **Fares.** The average passenger fare. Takes into account both surge and ride distance.
* **Wait time.** The average time after one ride is completed before the next ride is assigned.
* **Smart areas.** Considers all of the above, highlight- ing high-fare areas with low ETAs and waits.
* **None.** Turn off the active overlay.

Only one overlay can be displayed at a given time.

<figure class="medium">
  <img src="/resources/images/work/rideshare/mockup-menu.jpg" alt="Map Overlay Menu" />
  <figcaption>The Map Overlay menu is accessed by tapping the layer icon.</figcaption>
</figure>

### Map Overlays
Now we can see where the highest passenger fares can be found. Surge is a proxy for this, but fails to take into account other factors such as journey distance.

Drivers would rather have a non-surge but long-distance fare than a surge route that’s really short, so my theory is that average fare could be a more salient metric than surge. But that needs to be validated/invalidated by talking to more drivers.

Data labels appear as the user zooms in, in this case displaying the average fare in each area.

<figure class="medium">
  <img src="/resources/images/work/rideshare/mockup-overlays.jpg" alt="Map Overlays" />
  <figcaption>The map with the Fare Overlay activated.</figcaption>
</figure>

### Smart Overlay & Area Detail
The smart overlay takes into account positive indicators—like surge and average fare—but balances them with negative indicators—such as passenger ETA and wait time—to surface areas with optimum risk vs. reward. This guides drivers to places they can get “the most bang for their buck” and, by extension, optimizes the productivity of the company's workforce.

Every area tile is tappable. Tapping a tile reveals key information about the selected area:

* **Distance.** How long will it take me to get there?
* **Surge.** Is a surge fare in effect?
* **Fare.** What is the average fare?
* **ETA.** How long does it take to reach passengers?
* **Wait.** What’s the time gap between rides?

From my conversations with Uber and Lyft drivers, these are the key factors drivers are thinking about when deciding where to drive. Putting this information at their fingertips would help new drivers get up to speed more quickly, and make experienced drivers more productive.

<figure class="medium">
  <img src="/resources/images/work/rideshare/mockup-detail.jpg" alt="Area Detail" />
  <figcaption>Tap on any tile to see key information about that area.</figcaption>
</figure>

## 5. Testing
Next, I’d like to put this Map Overlay prototype in front of drivers. Here are some of the areas in which I would seek validation:

* **Area details.** What information do you care about for a given area? My prototype assumes surge, average fare, passenger eta, and wait time. Are those all metrics you think about? Are there others that are important to you?
* **Map overlays.** What information is it actually helpful to see visualized on the map? Surge and average fare seem important. But would you ever use the ETA and wait time visualizations? Is there another metric it would be helpful to visualize?
* **Smart areas.** Talk me through how you think about the tradeoffs between high fares vs. bad traffic, long ETAs, etc. When is it worth it?

## Presentation

<figure class="medium">
  <iframe src="//www.slideshare.net/slideshow/embed_code/key/u0j9JUmcwkyCU7" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe>
</figure>