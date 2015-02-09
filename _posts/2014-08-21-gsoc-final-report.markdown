---
author: myzonez
comments: true
date: 2014-08-21 05:31:48+00:00
layout: post
slug: gsoc-final-report
title: 'GSoC : Final report'
wordpress_id: 166
categories:
- gsoc
- programming
tags:
- c
- gsoc
- libvarnam
- malayalam
- smc
- varnam
- varnamproject
---

<br /><br />


Putting together a quick report of how I spent my last 3 months on improving varnam, an awesome transliteration project. My task was to implement a stemmer to improve the learning in varnam.  

A stemmer is an algorithm that, upon giving a word as the input, gives the base word as the output.




For example, giving മരത്തിലൂടെ as the input would give you മരത്തിൽ and മരം as outputs. മരം is the final output of the stemmer and മരത്തിൽ is an intermmediate output of the stemmer. The algorithm is described [here](https://github.com/lonesword/mlstemmer/blob/master/03algorithm). The stemmer is similar to SILPA stemmer created by Santhosh Thottingal except that my version makes use of an exceptions table and produces meaningful intermmediate words.




A screencast that explains my work is posted above. Make sure you watch it in 720p to clearly see the words being typed.



As far as statistics go, see [this thread](https://lists.nongnu.org/archive/html/varnamproject-discuss/2014-08/msg00010.html) to know how much the learning has improved. This is not the final result, as the number of words learned is of no consequence if the stemmer does not improve transliteration accuracy. Transliteration accuracy tests before and after the tests are yet to be done thoroughly. Judging by the number of new words in the word corpus alone, varnam saw an improvement of 63% in learning when tested with 408 words.See the above thread for the exact results and the word corpus used.

