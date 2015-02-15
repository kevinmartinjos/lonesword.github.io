---
author: myzonez
comments: true
date: 2014-04-11 14:59:43+00:00
layout: post
slug: getting-machines-to-listen
title: Getting machines to listen
wordpress_id: 85
categories:
- programming
- sound
tags:
- alsa
- pcm
- pyaudioalsa
- raw
- S16_LE
- signal processing
- sound
---

I've been wanting to do this sound localization project for almost an year now. Its simple - have a few microphones ready, yell at it, and display the direction of sound on a screen. And being the electronics newbie I am, I had spent a considerable amount of time wondering how to connect an electret mic to my board/computer.

<br/>
However, the last few days have been extremely productive and now I understand what exactly goes on when you yell at your laptop mic.
<br/><br/>
**The Task** : Record something using the built in mics (or any mic), store it in RAW format, access it using a python program. Understand sound.
<br/><br/>
**The tool** : Ladies and Gentlemen, meet ALSA - Advanced Linux Sound Architecture
<br/><br/>
**Another tool** : pyaudioalsa. Helps us do the necessary stuff without resorting to the C API.
<br/><br/>
You already have ALSA if you are using any of the major Gnu/linux distributions. First get [pyalsaaudio](http://pyalsaaudio.sourceforge.net/) and install it on your computer.
<br/><br/>
The pyalsaaudio page have some nice examples as to how to record sound. Go through it. By default, your recordings are in RAW PCM format. PCM stands for pulse code modulation. The output of your recording is actually a set of values that denote the amplitude of the input sound at various points in time. Just go through and try running the examples that come with pyaudioalsa source - record.py and playback.py.
<br/><br/>
Your recording is saved as a PCM RAW file. Try opening it in a text editor and you will see junk values. 
<br/><br/>
But where are the amplitude values?
<br/><br/>
Exactly. Before that, we will try playing it back. Of course you can do it using the example program playback.py. But there's another way. Try this on the terminal :
<br/><br/>
`aplay -r 44100 -f S16_LE -c 1 `
<br/><br/>
That command will make ALSA play back the recording for you. 44100 is the sampling rate of the recording. How did we know that? Look inside record.py and you will see that the recording was sampled at 44.1KHz. S16\_LE denotes that there are 16 bits per sample in our recording stored in little endian format? Now how did we know _that_?. Again, check record.py. The '-c 1' tells ALSA that our recording is mono.
<br/><br/>
So that's how you playback raw PCM files.
<br/><br/>
But what if you want to do some signal processing? What if you want to draw one of those spectrums or waveforms and other seemingly complicated stuff? Then you will need to extract the data from the RAW PCM. It sounds complicated, I know. Have no fear, python (and numpy) is here:
<br/><br/>

```
import numpy

data = numpy.memmap("test.pcm", dtype='h', mode='r')

print "VALUES:",data
```

<br/><br/>
Finally, something human readable!
Why don't we draw a graph?
<br/><br/>

```
import numpy, pylab

data = numpy.memmap("test.pcm", dtype='h', mode='r')

print data

pylab.plot(data)

pylab.show()
```

<br/><br/>
Note : I'm very grateful to [this](http://www.swharden.com/blog/2009-06-19-reading-pcm-audio-with-python/) guy for showing me how to do this.
<br/><br/>
So what do we have here? We have successfully made use of the RAW PCM data. So? There are many algorithms in Scipy and numpy that can do amazing things with that data - cross correlation,fft,convolution. Thank God (and Guido Van Rossum) for python!

