---
author: myzonez
comments: true
date: 2014-04-24 17:45:22+00:00
layout: post
slug: google-summer-of-code
title: Google Summer of Code!
wordpress_id: 92
categories:
- gsoc
tags:
- c
- gsoc
- malayalam
- smc
- swathantra
- transliterator
- varnam
---

{% include image.html img="/images/2014-04-24-google-summer-of-code/gsoc.png" width="278" height="250"%}

I'm excited to announce that I've been selected to this year's google summer of code. My mentoring organization is SMC - Swathantra Malayalam Computing and I will be working on the varnam project.

Varnam means 'colors'. Varnam is a transliterator for indic languages. My task is to improve the learning capability of varnam by coming up with a stemmer algorithm for indic languages. A stemmer algorithm returns a base word when it is supplied a complex word. In english, supplying 'retirement' to the porter stemmer algorithm will trim it down to 'retire' and subsequently return 'retir'. I have to do the same thing with malayalam words. The trick is to design the whole thing in such a way that stemming support for other languages can be easily added. The stemming rules will differ from language to language. Though I will be laying down the rules for malayalam, I should provide room for someone else if she decides to add support for another language. In short, my algorithm should be designed to read a 'rule file'.

The varnam project can be found [here](https://gitorious.org/varnamproject). Why use varnam when you have, say, google input tools? For one, google input tools work only in windows. Two, I'm not sure if you can use it in your own programs. I guess not. Three, it is not open source which means google won't let you take a peek inside. Four, varnam can render the whole linux shell in malayalam if need be (and if you are willing to put in the effort)! To be frank, seeing small round malayalam alphabets on my desktop konsole was quite unexpected!

I'm so grateful to SMC for letting me work on this and even more grateful to google for the upcoming paycheck ;). SMC requires us to keep the blog updated on a weekly basis, so I guess everyone will be hearing an awful lot from me :D
