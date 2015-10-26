---
author: lonesword
comments: true
date: 2013-01-17 16:40:17+00:00
layout: post
slug: living-the-life
title: Living the 'Life'!
wordpress_id: 33
categories:
- game of life
- programming
- python
tags:
- conway
- game
- game of life
- pygame
- python
- wxpython
---

After a lot of tinkering and pondering over the code, I managed to connect our gui to the core of the program. I even managed to throw in some sort of control using a few buttons and a slider (which determines the size of the board). Now the program works in two modes : One which lets you input an initial configuration and computes the next state on every right click. The user can click on any cell at any time to make it alive. The other mode, dubbed the 'continous mode', however lets you modify the board only at the start of the program. Once the user press the right mouse button, the program keeps on displaying subsequent states continuously - which is more fun to watch - and finally settles down in a stable state.

{% include image.html img="/images/2013-01-17-living-the-life/life.png" caption="Life in action" %}

The buttons (widgets) and the slider was created using the wxpython library. For a tutorial, visit [zetcode](http://zetcode.com/wxpython/).

I've tried to put together the code as neatly as possible and i have made a lot of comments too. I would like to point out that my version of the program has a little problem with the mouse clicks. It was unnoticeable when i was using a mouse but when i used the touchpad of my laptop, i found that in some cases i had to click a cell twice to make it alive.

Here's the source code : [github link](https://github.com/lonesword/gameoflife)

Use the launch.py script to run the program. And make sure you have the pygame and wxpython libraries installed.

Also, if you think that the programs moves all too quickly)or slowly) in the continous mode, change the framerate of the the display to your liking. To do this, open the display.py file and in line 49, change the value inside pygame.time.Clock().tick() to your desired framerate

I *might* convert the python script into an executable for windows and upload it. The conversion can be done using py2exe, but I again *might* have some enthusiasm left to add even more features to my humble program. If I do, then that's another post ;)
