---
author: lonesword
comments: true
date: 2013-05-10 09:55:33+00:00
layout: post
slug: '66'
title: Coloring the canvas - the processing way
wordpress_id: 66
categories:
- processing
- programming
- web
tags:
- html5
- paint
- processing
- processing.js
---

I thought it was time somebody started painting on the canvas. Its been a couple of months since I wrote this program and it was lying in a corner of my hard disk all along. Realized kevinkoder.tk is pretty low on contents and decided to add it to the site.

[http://kevinkoder.hostei.com/paint7.htm](http://kevinkoder.hostei.com/paint7.htm)

And the source code can be viewed by pressing ctrl+u (in chrome). But I must warn you though - I've put absolutely zero effort into making the code readable. I'm pretty sure even I can't make sense of it right now. I was in a hurry to do something with processing and thought "Hey, lets make a paint program". The development came to an abrupt stand still when i tried to implement the 'fill bucket' tool using the flood fill algorithm - the damn thing simply refused to work the way I wanted it to.

Anyways, the program proves beyond all doubt that a lot of amazing things are simply doable with processing.

And I had to choose not to include a lot of additional libraries that might have made it a lot easier to develop the program (like a java library that can add additional drawing layers) because 3rd party processing java libraries are incompatible with processing.js , ie, they wont work when you convert the processing code into javascript.

A few handy 'features' were added to compensate for the ultimate pathetic-ness of the program. More info can be found in the documentation.

And the documentation : [http://kevinkoder.hostei.com/paint_doc.htm](http://kevinkoder.hostei.com/paint_doc.htm)

.
