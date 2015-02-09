---
author: myzonez
comments: true
date: 2013-01-16 08:49:27+00:00
layout: post
slug: greendots
title: Green dots ahead - playing with pygame
wordpress_id: 24
categories:
- game of life
- programming
- python
tags:
- conway
- game of life
- programming
- pygame
- python
---

Now that the 'core' of the program is up and running (see the previous post : game of life 101) it's time to add a little glamour to our 'life'!

So, here's the recipe :
<br/><br/>
####Dish name : 

Graphical interface for the game of life
<br/><br/>
#### Ingredients required :

1. Python interpreter and some knowledge in python (easily available at a programming site near you)
<br/><br/>
2. The pygame module for python. Download pygame [here](http://www.pygame.org/download.shtml)
<br/><br/>
3. A pygame introduction. I recommend inventing with python. Its a great book and serves as an excellent introduction to python AND pygame.
Find the book [here](http://inventwithpython.com/chapters/). I dare say that 'Invent with python' is the only book you'll ever need to start writing graphical applications in python in no time!
<br/><br/>
4. A wee bit of patience and a tiny pinch of interest
<br/><br/>
Now that we have all the ingredients ready, its time to cook some delicious stuff. First of all, let me show you how the 'game' will look like after our dish is ready (look at the picture, stupid! :p )

{% include image.html img="/images/2013-01-16-greendots/life.png" caption="Life in color" align="left"%}

And let me remind you that this is not going to be the graphical implementation of GOL. Why? Because, in this post, I'd just like to see the graphical display up and running. That is, the user must be able to populate the cells with dots, but updating the cells will have to wait until another post. The display window I create now will be completely independent of the text only game of life I had created earlier. But I have made the code flexible enough to be easily modified to suit our purpose at a later time.
<br/><br/>
So what does the program do exactly? It allows the user to click on a cell and create a green dot right in the middle of the cell. Period.
<br/><br/>
So, here's what I did:
<br/><br/>
1. Divided the screen into cells by drawing horizontal and vertical lines. This is done by first dividing the width (and height) of the window by the no of cells I want. I am assuming that the window will be a square and hence width=height. If the windows width is 400, I'll divide the width by 5 to get the length of each cell. I draw a vertical line at every 80 pixels on one side and horizontal lines at every 80 pixels on the other side to get the 'matrix'.
<br/><br/>
2. Finding the position of mouse in terms of row and column : I identify each cell with its row number and column number. For example, the cell on the top left corner would be the cell (0,0). To get the column on which the mouse pointer now reside, we first divide the X CO-ORDINATE of the mouse position by the length of each cell. Now since both the mouse position and length of cell are of integer type, dividing the x coordinate by the length of each cell gives an integer which says on which column the mouse pointer is.
<br/><br/>
For example, assume that the mouse pointer is at the position (120,300). The x coordinate is 120. Let the width of window be 400 and let there be 5 cells (as in the picture). So width of each cell is 80. Now to find the column on which the mouse resides, we divide 120 by 80. Since both are integers, we get 120/80 = 1. (If you do not understand this, go [here](http://stackoverflow.com/questions/3602827/what-is-the-behavior-of-integer-division-in-c)). And that means our mouse is at column 1. Not that this is the SECOND column in the window since column numbering starts from 0. A similar procedure (using height instead of width and the y coordinate) is used to find out on which row the mouse pointer is at.
<br/><br/>
3. On every left mouse click, the row and column of the cell on which the mouse click occurred is added (appended) to a list called circle\_list. If you are not familiar with lists in python, now might be a good time to do so!
<br/><br/>
4. A function called draw\_circles()  draws a green circle (or a dot) on the center of all the cells whose co-ordinates (row and column number) are in the circle\_list.
<br/><br/>
If you need any reference/example regarding the program, feel free to view/try my code. Download it from [here](https://docs.google.com/file/d/0B6gQ1pCnWlqbZDhDUUp1R1ZyYWc/edit). I have thrown some comments here and there inside the file to help any readers who might find themselves completely lost :)

In future, we might want the window to pass the information regarding the cells to the 'core' of the program to compute the next stage and then display the updated information in the window. To do this, we will be passing on the circle\_list to the other classes which will compute the next stage, and then pass back an UPDATED circle\_list to the display program. All the display program is to do then is to draw little green circles on the cells in the circle\_list (and also remove green circles from the cells that were previously in the list, but not anymore)

As for now, have fun conjuring green dots out of thin air. Until next time ;)
