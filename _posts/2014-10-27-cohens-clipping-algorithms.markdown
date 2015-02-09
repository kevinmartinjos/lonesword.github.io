---
author: myzonez
comments: true
date: 2014-10-27 16:22:52+00:00
layout: post
slug: cohens-clipping-algorithms
title: Cohen's clipping algorithms in javascript
wordpress_id: 177
categories:
- programming
- web
tags:
- clipping
- cohen
- cohen-hodgson
- cohen-sutherland
- computer-graphics
- html5
- javascript
- polygon-clipping
---

Okay this was homework. I searched for a really long time for a javascript implementation of cohen's clipping algorithms and could find none. Professor said write it in c but its hard to program mouse clicks in c. With javascript, all it takes is a browser.

1. [Cohen-sutherland](https://gist.github.com/lonesword/cafc9a7aa9db3f7bfc52) - line clipping algorithm in javascript

2.  [Sutherland-Hodgman](https://gist.github.com/lonesword/a9463090a8c69f8d4ff2)  - polygon clipping algorithm in javascript.

![clipping_in_action]({{site.baseurl}}/images/2014-10-27-cohens-clipping-algorithms/clipping.png)

I believe the code is pretty readable - I had commented lavishly. Save them as html files, open in a browser, and keep clicking left mouse button.

And yes, the implementation is not perfect. I basically drew over the edges in white to "erase" it and that is why you see a very thin line outside the rectangle in the image.

