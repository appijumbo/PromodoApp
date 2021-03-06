# [PromodoApp](https://appijumbo.github.io/PromodoApp/)

<a href="https://appijumbo.github.io/PromodoApp/"><img src="./extras/three.jpg" width="600"></a>


This timer is also on [Codepen](http://codepen.io/tom_o/pen/XdXqOB)

Made for the [Free Code Camp course](http://www.freecodecamp.com/challenges/build-a-pomodoro-clock)

## Objectives

The basic Free Code camp requirements were:-

* start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed
* reset the clock for my next pomodoro
* customise the length of each pomodoro


In addition to the basic Free Code camp requirements, 
professional versions also favoured:

* Dark theme capable
* Charts of achievements of past promodos
* Different screens for promodo and break-time



## Market Review
Basic [market Research](https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/Market%20research%20%26%20Spec%20v1.pdf) was done by looking at comments from users on other promodo apps in the Google App store. 
Some conclusions were

Basic market research suggests:

  * Not always possible to complete sessions

  * Thin circles are not easy to see

  * Can Pick break or promodo

  * Color customization is useful; dark mode




## Design Process

The concept look and feel UI focused on dark colours and simplicity because that seemed to be what the market research indicated

<img src="https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/initial%20concept%20look%20n%20feel.jpg" width="350">

However with more consideration the design changed a litle.

[Initial design](https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/IA%20v3.jpg) looked like

<img src="./promodo_design/IA v3.jpg" width="800">

### Creating an MVP
The design was simplified and screen workflow (roughly speaking a 'Information Architecture' (IA) design) was produced to focus on some minimal viable product

[Promodo IA v1](https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/Promodo%20IA%20v1.jpg)

<img src="./promodo_design/Promodo IA v1.jpg" width="500">


secong version MVP
[Promodo IA v2](https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/Promodo%20map%20v2.jpg)

<img src="./promodo_design/Promodo map v2.jpg" width="500">

The 'final' detailed wireframe MVP was 'tested' by using a scaled pdf for a mobile screen.

Note that the tool tips wasn't implemented but would have been acheived by employing data attributes in the html. The dark theme that was implemented in the final version used as similar approach.

[Final MVP design](https://github.com/appijumbo/PromodoApp/blob/master/promodo_design/wireframe%20v14.pdf)

<img src="./promodo_design/wireframe%20v14_pg1.jpg" width="500">

<img src="./promodo_design/wireframe%20v14_pg2.jpg" width="500">

<img src="./promodo_design/wireframe%20v14_pg3.jpg" width="500">

### Sass

Variables: widths, heights, colors, z-index's
[Google Color Palette](https://github.com/danlevan/google-material-color) and [restricted fonts](https://mendel.me/development/using-google-fonts-css-stylesheet)

### Event  bubbling

Rather than lots of addEventListers; use the event object and allow the event flow carol built into the browser to ‘bubble’ up to get the element ID clicked

Mini-state machine used
The different states can be be represented in a global variable, then a switch case statement can control the state flow, like a mini-state machine.


### d3

Using d3 to make an arc for the counter graphic is probably a bit of an overkill as we could use CSS. However if the app were to be used for real, I’d probably add charts to display records of promodos used. Also Im going to have to learn how to use d3.
So for those two reasons I decided to use d3 to make the arc for the countdown.


### Input Range Slider

Decided to use a slider to control the primed time rather than a button as used in the FCC version.
See [input range](https://github.com/darlanrod/input-range-sass) 

### One-click Dark Theme
As part of the design process I determined that having a simple click for a dark theme may prove to be a usefull addition given it is intended for use on a desktop where dark themes are often prefered. By clicking this a data attribute is toggled which informs the CSS. The implementing proved to be a little tedious, I've personaly found the function quite usefull.


### SVG's id's given and Xlink used

By using xlink, we can put in-line svg’s at the top of the HTML, then link them into the appropriate place using \<use id=“the_link_id”> 


### Data attributes on HTML

We can define an attribute data-state=“on” or off, which will toggle the CSS. This might work better than simply having a class applied


### Sound

Just for fun, add a couple of sound files that play at the beginning and end of the primed. Decided to mix some free ones found on Freesound.org


## Conclusions

Overall I felt the project went well producing a design based on market research, optimising and building went well. 

**The main issue is that clearly HTML5 based apps are not optimised for mobile**. For instance the range adjustment behaves poorly in mobiles hving tested in in several browser on a few of different mobile devices.

However the **Free Code Camp spec didn't even include mobile as a desired platform** so in this respect mobile usage is a bonus. Indded if mobile were required I would proably build the app in [AngulaJS](https://angularjs.org/) and [Ionic](https://ionicframework.com/docs/intro/installation/) employing [Ionic's range UI](https://ionicframework.com/docs/api/components/range/Range/) component.


