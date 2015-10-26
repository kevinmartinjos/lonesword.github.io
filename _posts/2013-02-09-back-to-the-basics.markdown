---
author: lonesword
comments: true
date: 2013-02-09 19:25:08+00:00
layout: post
slug: back-to-the-basics
title: Back to the Basics
wordpress_id: 46
categories:
- General
tags:
- windows USB install
- wintoflash
---

I admit that what I am about to write will not really fit in with the 'theme' of the blog - share code. But yet, I feel compelled to share a tiny story happening around a windows xp iso image sitting inside a pendrive.

I have an old desktop at my home that is dying and in an attempt to make the remainder of its not so glorious life more useful, I decided to reinstall windows xp and installer a lighter version of linux (I deemed ubuntu 9.04 too heavy for my old war horse).  Now there was a problem - my war horse didn't have an optical disk drive. The CD-ROM drive was lost in battles long ago and the CD-RW drive that was put in there as a replacement has refused to show any sort of co-operation over the past few years. The damn thing just keeps on blinking whenever I give it a CD to read. So there was only one option left - the USB install.

Installing from a pen drive is a piece of cake as far as linux is concerned, but  with windows xp, it was expected to get a lot more complicated and buggy. And fortunately, Novicorp's [WinToFlash](http://wintoflash.com/home/en/) came to the rescue and I was able to create a bootable windows xp installation disk in no time. I erased my entire hard drive using gparted (using a live linux boot from a pendrive) and then plugged in my windows xp bootable pendrive. Everything went fine initially - the ugly blue screen still gave me the creeps. But I had to wait until the setup had loaded all the files to encounter my very first (and hopefully the last) hurdle - the setup didnt recognise my hard disk. It showed the USB stick with the windows setup on it though. I could either change the USB to NTFS and install windows  on it, or I could leave the USB as it is and install windows on it. And yes, I tried installing xp to the USB stick, and got a 'drive corrupted' error message. I simply couldn't get the setup to recognize my hard disk! As usual I went with outstretched arms to my ever benevolent friend google and spent the  next few hours reading forum posts and tutorials. And in the end, after 2 hours of toil, I found the solution - press ESC key when the set up shows the option to convert USB to NTFS!!! I tried it and there came my hard disk, arrayed in all the partitions that it could muster against a beautiful blue backdrop (suddenly blue didn't look THAT bad).

And it perplexes me as to why I didn't think of this earlier. Even though I do have the excuse that people don't go pressing ESC button when things go unexpected, I can say that I would have pressed the ESC button had I been the computer-savvy 6th grader that I once were. And to make me feel even more sorry, it was written at the bottom of the screen 'press ESC to cancel'. Yes yes, who would have thought that pressing ESC will give you a whole new menu instead of going back to the previous screen right? But given my past record, I can very well vouch that I would have pressed the ESC button just because it was mentioned at the bottom of the screen. This presents me with another dreadful thought - am I losing it? Am I becoming like them? Have my curiosity and knack of pressing the right keys at the right time finally left me? I've seen it happen with older people-the amazing guy who was so smart in the 80's and who can fix his own car being sluggish with computers. They use computers like anybody else - change the wallpaper, set screen savers, and use internet explorer. But they will not by any means install teracopy or use ccleaner to do a clean up. Am I becoming like them? I used to always believe that if some one is not good with computers, if some one cannot figure out the solutions to his computer problems, then its just because he's not looking around. I've always believed that craving to know "Oh, what does this button do?" will eventually lead you to all the wrong problems and all the right solutions.

And that's quite an awful lot of thought to revolve around an ESC key. So the next time you're in a fix, hit the damn ESC key first :p
