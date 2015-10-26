---
author: lonesword
comments: true
date: 2014-10-21 17:38:17+00:00
layout: post
slug: sound-frequencies-with-aubio
title: Sound frequencies with aubio
wordpress_id: 172
categories:
- programming
- sound
tags:
- aubio
- audio
- libaubio
- pysoundcard
- python
- sound
---

Small python script I wrote so that you can yell at the console and see the frequency on the screen. The results can be slightly wrong (incorrect spikes in frequency occasionally) but it was great yelling at the computer with my hostel mates to see who's got the highest 'range' :D

Link to the github [gist](https://gist.github.com/lonesword/95356f8b637377766a06).

The code is too small to give an explanation. However, you need to set up a few libraries before running the gist (instructions for linux) :

1. [aubio](http://aubio.org/) - A fantastic library for analysing audio. Packages libaubio and python-aubio are available in the ubuntu/mint repositories. However, I ran into problems (repos have older versions I guess) and was able to fix them only after compiling the source. So head over to [this repo](https://github.com/piem/aubio), download the source code, and compile.

    To compile aubio, head over to the source directory and type:

    `./waf configure`

    That will spew out a list of packages you will need at the end. Make sure you install the dev versions of each package. For example, for sndfile, do

    `sudo apt-get install libsndfile1-dev`



    Similarly install all the packages that you would need to use with aubio. I did not have a clue as to what I will need so I installed them all.

    Now do `./waf build`
    and then `sudo ./waf install`

    That should install aubio on your linux system. Time to install the python wrappers. 'cd' to /python directory in the aubio source.

    `python setup.py build` to build the files and after building,
    `sudo python setup.py install` to install the python wrappers for aubio


<br/><br/>
2. The snippet depends on pysoundcard, which is not available in the repos. Head over [here](https://github.com/bastibe/PySoundCard) to download the source. Build and install this python package the same way you did the aubio python wrappers

Download (or type) the gist and run it! Happy yelling!
