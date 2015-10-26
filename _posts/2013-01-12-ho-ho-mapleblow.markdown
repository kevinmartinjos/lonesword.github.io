---
author: lonesword
comments: true
date: 2013-01-12 10:52:39+00:00
layout: post
slug: ho-ho-mapleblow
title: Ho Ho MapleBlow!
wordpress_id: 2
categories:
- programming
- python
tags:
- computer
- gaming
- software
- technology
---

My very first Pygame project. Its not professional and it certainly isn't the best way to implement what I was hoping to implement. But as they say, a journey of thousand miles begins with a single step.

<br/><br/>
This little program here lets the user click around the screen to make a maple leaf move. The basic idea is, the closer you click, the faster the leaf moves. The user will have to do his part by imagining that a wind blows from the point of click to the center of the maple leaf. Also, simply keeping the mouse button pressed won't do the trick. You have to keep it pressed AND move it a little bit. The problem is, when u keep ur mouse button pressed, my program interprets it as a single mouse press as long as the location remains the same.
<br/><br/>
Everything done using python. The maple leaf is actualy a png image. Used pygame library for creating chunk of the program. The little menu u see before the program runs was created using wxpython. Oh, and I've converted the whole thing into an exe format using py2exe. Download the ready to execute version [here](https://docs.google.com/file/d/0B6gQ1pCnWlqbZWx0bEdQNVNGVFU/):
<br/><br/>
For the source code, go [here](https://docs.google.com/file/d/0B6gQ1pCnWlqbZ1pzVE54bi1CNFE/edit)
<br/><br/>
Note: The source code is in a tarball. Linux users just have to extract it. But windows users will have to find some software that can open tarball files.  But I think new versions of winrar can open that file.
<br/><br/>
Here's an overview of what I've done :
<br/><br/>
1. vector2.py : Created a vector class to handle all those vector additions (for adding velocity of wind to that of leaf)
<br/><br/>
2. wind.py : A Wind class which contains functions that calculate the direction and magnitude of the vector from a point to the centre of the leaf
<br/><br/>
3. World.py: Mainly contains the code for creating platforms (hurdles) that reflect the leaf. Since I found the collision detection a little buggy, I've programmed the game.py (main file) to skip over platforming creation
<br/><br/>
4. Leaf.py: Contains everything directly related to the protagonist of our story - the maple leaf. Contains functions to render the picture (which is really a static png image) , move the picture (update the coordinates) and collision detection in case the platforms are present
<br/><br/>
5. game.py: The main file. Calls every other function. Contains the code for creating a basic menu for the program as well
<br/><br/>
The program is not very complicated, even though it spans multiple files.
