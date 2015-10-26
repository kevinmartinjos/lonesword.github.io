---
author: lonesword
comments: true
date: 2014-06-01 10:40:23+00:00
layout: post
slug: gsoc-unit-tests-merges-and-travis
title: 'GSoC : Unit tests, Merges and Travis'
wordpress\_id: 109
categories:
- gsoc
- programming
tags:
- c
- gsoc
- libvarnam
- malayalam
- transliterator
- travis
- Unit tests
- varnam
- varnamproject
---

Its been two weeks since community bonding got over and I've been making slow but steady progress. A couple of new bugs has surfaced and I will be fixing them before moving on to my main task.

Also, [varnam project](https://github.com/varnamproject/) has been moved to github owing to gitorious being too unstable/unreliable.

I walked (crawled would be more appropriate) into some new territory the past week :
<br/><br/>
**1**. **Unit tests** : Every software project need unit tests. Unit tests make sure that all the tiny little parts (units) of the software function the way they are supposed to function and that you did not accidentally break anything with your new commit. I had heard of them, but I never thought I'd have to do them in c. Varnam uses [check](http://check.sourceforge.net/) for unit testing. I wrote a patch that checks for the validity of the suggestions file libvarnam receives and wrote a test case for it. I learned to do stat calls to a path, rather than using fopen() to check if the file exists. Being the beginner I am, I did break something because the test fails at 70%. Should look into it.
<br/><br/>
**2. Merging**: I finally understood what merging is in git, though a bit painfully. Somehow I couldn't digest the fact that git could simply "merge" all the changes that I made and all the changes (possibly overlapping) that some one else made into something that works. The other guy could have completely removed the stuff I've been working on from his commit! I just found out that doing so results in conflicts, and git won't merge the branches until the conflicts are resolved. Bloody mess. Thankfully, there are wonderful tools like [meld](http://meldmerge.org/) that makes resolving conflicts a lot less painful. Besides, the conflicts I had was of a less "violent" nature. So there I go, making my very first (meaningful) merge and a pull request
<br/><br/>
**3. Travis**: Just when I thought that the day is done, [Travis CI](https://travis-ci.org/) reported that the build failed. Travis? Travis is a continous integrations tool integrated into github. This means, every time I push into a repository, Travis builds (does cmake . , and make) the project after merging my pull request and then runs the test cases to see if anything is broken. And yes, I had broken quite a few things. My new patch completely fails a few assertions.
<br/><br/>

_I called it a day and went to sleep_
<br/><br/>



I spent almost the entire day debugging and the tests continued to fail. Apparently some files that should have been generated are simply not there. I created a quick hack, and put together a new pull request. At least the tests are proceeding better now. Travis still fails. Perhaps my mentor can help me with that.

<br/><br/><br/>





[The pull request](https://github.com/varnamproject/libvarnam/pull/47)
