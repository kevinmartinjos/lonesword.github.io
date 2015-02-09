---
author: myzonez
comments: true
date: 2014-07-30 19:33:17+00:00
layout: post
slug: gsoc-memory-heap-corruption-and-code-rewrite
title: 'GSoC : Memory heap corruption and code rewrite'
wordpress_id: 164
categories:
- gsoc
- programming
tags:
- c
- gsoc
- libvarnam
- malayalam
- smc
- varnamproject
---

This week I've been busy rewriting the stemmer and debugging some memory heap corruption. My first implmentation of the stemmer used to crash ibus whenever certain words, like "ദൂരെയാണ്" and "വിദൂരമായ" were typed. I could not locate the problem, and the only error message I got was "free() - invalid next size" when ibus crashed. Some searching revealed that it might be due to a memory heap corruption. I used [valgrind](http://valgrind.org/) memcheck to debug the memory corruption. It was difficult to make sense of valgrind's output, and that eventually lead me to ask a [question](http://stackoverflow.com/questions/25008944/possible-heap-corruption-debugging-with-valgrind/25009103#25009103) at stackoverflow. However, before all this, I was convinced that I made some serious mistake somewhere along the development path and decided to sit down and rewrite the whole project. I thought that I made a mistake by not testing with ibus early on. I discovered what I was doing wrong to merit the memory corruption soon after (even before the guy came in and gave his answer at stackoverflow.com). However, I realised that a rewrite would do the project much good. To start with, I could then run valgrind as I went with the rewrite to make sure that I plugged all the possible memory leaks. Also, I was able to look into some unnecesary function calls among other things. In short, I cleaned the code and is ready for a code review.

Here's a changelog:

1. Tried implementing the "improvement scheme", as I had suggested in [this thread](http://lists.nongnu.org/archive/html/varnamproject-discuss/2014-06/msg00014.html). The results were far worse than expected. 60% of the words after suffix appending were not meaningful. Any further attempts along this path would require much more careful planning and reasearch of the malayalam language.

2. Located and avoided [did not stonewall it] an annoying memory corruption. Filed it under[ issue 51](https://github.com/varnamproject/libvarnam/issues/51).

3. Removed the level hierarchy. All stemrules are now grouped into one. Splitting the stemrules into 3 levels serve no real purpose, and complicates stemming by needing to check each level seperately. Also, removal of the level system has improved the code readability a lot.

4. Replaced some function calls with inline expansions. Made all the functions more defensive and freed memory wherever valgrind reported memory leaks.

5. Libvarnam ibus requires a clean build every time libvarnam.so changes. It seems that libvarnam-ibus has its own version of libvarnam or something. Should look into this. Ibus not reflecting the changes I made to libvarnam was a real headache - no amount of debugging could solve the issue. Tried recompiling libvarnam-ibus and things started to work.

6. Eliminated recursive calls to varnam_learn(). In the first implementation, varnam_learn() would call varnam_stem() which calls varnam_learn_internal(). This was bad design. Now varnam_stem() returns a varray to varnam_learn(), and varnam_learn() iterates over this varray to learn all the stemmed words.


These changes are not final. Some of it, like doing away with the level system, was done without consulting my mentor and would be reintroduced if he thinks that removing it was a bad decision. You can see all my changes [here](https://github.com/lonesword/libvarnam/commit/ea4acac4c777243a6e42ec3809e98e3e5cf20fe7) and make suggestions.

To do :

1. More tests
2. Make sure stemmer works well with other languages
3. Enable varnam to stem from the command line interface
