---
author: myzonez
comments: true
date: 2014-05-14 17:00:39+00:00
layout: post
slug: gsoc-community-bonding
title: 'GSoC : Community bonding'
wordpress_id: 95
categories:
- gsoc
- programming
tags:
- c
- gsoc
- libvarnam
- malayalam
- transliterator
- varnam
---

The community bonding period of this year's google summer of code is nearing an end. Its been a rather busy week, and I had to juggle time between exam preps and GsoC. I cannot say that I have made much progress. However, an IRC meeting with the mentor turned out to be very fruitful. It was about setting up the right development environment, and I did learn a lot!

<br/><br/>
**1. ctags/etags** : I was complaining how hard it is to find function definitions in the libvarnam codebase. There are a lot of header files. That's when I heard about ctags. I had to install the ctags package from the ubuntu repositories, and configure it to catalogue the libvarnam folder. Then I got myself the sublime text editor and installed the plugin for ctags. Now all I have to do is press ctrl+t+t when I encounter a function call and sublime will open the the definition of that function in a separate tab! Productivity multiplied – ten fold!

Another convenient way (though not as convenient) would be to use grep -iR. The -iR argument makes grep list the files from which the pattern matches were found.

<br/><br/>
**2. Nemiver** : I have used the gnu debugger (gdb) in my lab before. The programs I wrote then were rather small and I could live without a debugger. But mentor says no. Nemiver is a rather neat front end to gdb and I don't have to look up line numbers to insert break points anymore – I click on the line instead. Also, nemiver makes the print command in gdb quite obsolete. Nemiver shows the values of all the variables in the scope as a list.

<br/><br/>
**3. Sample project** : My first task. In order to get myself familiar with libvarnam and learn some debugging in the process, the mentor asked me to write a sample project. My sample program, found [here](https://gist.github.com/lonesword/8abd32272310b86d9462), would convert all the string literals in a python program into their corresponding Malayalam equivalent. Simple and buggy. But I did learn how to make nemiver branch into the libvarnam API and do some transliteration.
<br/><br/>
Now that I'm getting a few days gap before the last exam, I must fix a bug or two. I hope I'll be able to start working on the stemming algorithm starting May 20th.

