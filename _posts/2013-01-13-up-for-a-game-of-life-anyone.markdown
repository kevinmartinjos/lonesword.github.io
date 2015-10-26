---
author: lonesword
comments: true
date: 2013-01-13 17:42:21+00:00
image: true
image_path: /images/2013-01-13-up-for-a-game-of-life-anyone/game-of-life.png
layout: post
slug: up-for-a-game-of-life-anyone
title: Up for a game of life, anyone?
wordpress_id: 10
categories:
- game of life
- programming
- python
tags:
- conway
- gaming
- life
- n
- pygame
- python
---

No, I'm not talking about the board game. This particular game of life, was thought up by a (respected) guy named Conway way back in the 70s. The rules are pretty simple, and a little time with our friend Google can fish out a lot of info on the subject. But for the uninitiated and the lazy, let me elaborate:

{% include image.html img="/images/2013-01-13-up-for-a-game-of-life-anyone/game-of-life.png" caption="Looks creepy, but trust me, the black dots are supposed to be alive!"%}

Imagine space - not necessarily where the space shuttles go, but ordinary two dimensional, sheet-like space would do just fine. Now imagine a speck in that space. Imagine earth, or imagine little round stones. Now imagine it to be alive (easier if you imagine earth). Now forget your 3rd grade science textbook and imagine little planets AROUND the earth - and no sun. Done?  Now imagine all the planets and the earth to cuddle together! Now the Earth is your 'live' cell (or planet) and the little planets around the earth are the 'neighbors' of the cell called Earth. Imagine that our Earth and little planets are confined to a 2-d space. That is, the earth and the planets are like the drawings on a piece of paper (I know that's a little too much elaboration, but I couldn't somehow help writing that). The 'neighbours' of the cell Earth can either be alive (as in Extra terrestrial life) or dead (as in a chunk of rock). Imagine the little planets around the earth to have other different planets near them as well. Now we have a pretty crowded (it depends) sheet of paper with many live and dead cells. Here are the rules:
<br/><br/>


  1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
	<br/><br/>
  2. Any live cell with two or three live neighbours lives on to the next generation.
	<br/><br/>
  3. Any live cell with more than three live neighbours dies, as if by overcrowding.
<br/><br/>
  4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction (imagine planets reproducing :p )
<br/><br/>

That's it. The stage for the game of life is ready. What's all this? It doesn't sound very 'interesting'?
<br/><br/>
Check out the wiki : [http://en.wikipedia.org/wiki/Conway's_Game_of_Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life)
<br/><br/>
Unimpressed? Boring? Drab?
<br/><br/>
Have another shot :[ http://conwaysgameoflife.appspot.com/](http://conwaysgameoflife.appspot.com/)
<br/><br/>
A warning though. We are now walking along the shores of that vast sea called cellular automata. Now 'cellular automata' was one of those words I used to specifically avoid and classify as 'complicated un-readable stuff'. And it is complicated. But I read about the game of life on a different context and it sounded simple enough, and thus forms the basis of my next little program!
<br/><br/>
Here's an overview of what I HOPE to implement :
<br/><br/>
1. A grid. Lines running horizontal and vertical divides the grid into cells.
<br/><br/>
2. an Initial pattern, and a target cell. The goal of the player is to make the target cell alive and maybe keep it alive for 3 turns
<br/><br/>
3. In each turn, the user can click on a limited no of cells to turn them 'live'
<br/><br/>
I guess that's pretty much it. No complicated Artificial intelligence. No simulation of cool patterns. Just a bunch of boxes to click on and green dots to populate them. Let's see how far it goes. I guess it shouldn't be much of a problem, since python and pygame always comes to the rescue ;)
<br/><br/>
But before going all graphical, let me try to get it up and running in text mode!
