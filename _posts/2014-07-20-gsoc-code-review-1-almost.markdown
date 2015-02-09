---
author: myzonez
comments: true
date: 2014-07-20 18:02:28+00:00
layout: post
slug: gsoc-code-review-1-almost
title: 'GSoC : Code review 1, almost.'
wordpress_id: 160
categories:
- gsoc
- programming
tags:
- code review
- IBus
- input method
- varnam
---

Before more thorough testing of the stemming algorithm and its effect on varnam's learning, my mentor and I decided that it would be a good idea to do some code review. So this week I fixed some problems with the stemming, tested how the stemming works with ibus input method, checked if learning is improving at all, and wrote some unit tests.


Stemming with IBus works, though with some bugs. Let us consider a case that works. The learnings database is now empty and we are starting with the blank state. Varnam does not know anything other than the symbols specified in the scheme file.
The below video demonstrates varnam learning a word with Ibus as the input method. The next time the user starts to type the same word, you can see that its stemmed forms are available in the suggestions.

<br/>

<br/>
Right now the only cause of concern with the suggestions is that incomplete words are suggested first, and the user has to go through the suggestions list to find the intended word. Also each time varnam learns a stemmed word, all its prefixes are learned as well. This will eventually lead to the incomplete prefixes coming up first on the suggestions list and the user will have to look through the list to find the word she is looking for.

There are some bugs, like some words dissappearing when I choose them from suggestions. The varnam_stem() function is possibly modifying some things that it isn't supposed to. I'm also getting errors when I'm using free() - invalid next size(fast). Maybe the upcoming code review will expose my mistakes.
