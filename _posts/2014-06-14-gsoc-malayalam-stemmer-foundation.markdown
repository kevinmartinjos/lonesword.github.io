---
author: lonesword
comments: true
date: 2014-06-14 16:16:18+00:00
layout: post
slug: gsoc-malayalam-stemmer-foundation
title: 'GSoC : Malayalam stemmer foundation'
wordpress_id: 147
categories:
- gsoc
- programming
tags:
- c
- gsoc
- language
- libvarnam
- malayalam
- ruby
- smc
- transliterate
- unicode
- varnam
---

Another week, and I'm finally working on what I signed up to do - implement a malayalam stemmer. The algorithm itself is still a haze, and I will be sitting down and drawing flowcharts soon. Despite being harassed by university practical exams, I managed to squeeze in enough time to lay down a basic framework. Varnam now has the *potential* to stem.

Something wonderful happened during my last conversation with my mentor. The scheme file, which looked like an ordinary text file full of rules to convert manglish (a blend of Malayalam and English) into malayalam, turned out to be a ruby file. I'm telling you, [this](https://github.com/varnamproject/libvarnam/blob/master/schemes/ml) is a ruby program! Its actually called the scheme file. The titles "consonants" and "vowels" and the like are actually function calls. Ruby does not need paranthesis to call a function. Beautiful.

Yes, I learned a bit of ruby to add the functionality I needed. I added a few stem rules to the scheme file which gets added to an sqlite3 table when I compile the scheme file. I learned how to call c functions from ruby using [FFI](http://www.rubyinside.com/ruby-ffi-library-calling-external-libraries-now-easier-1293.html) and also added a "--stem" option to the list of arguments accepted by varnamc.

`varnamc --symbol ml --stem പരീക്ഷയാ`

gives the following output:

`പരീക്ഷയ്`

Doesn't make much sense, I know. But under the hoods, varnam checked if there is a stem rule for the ending "ാ" in the database and seeing that there is, substituted the ending of the supplied word with the ending specified in the stem rule ("്"). The above stemrule doesn't serve any purpose, and will be conveniently removed after I draft the algorithm.

Now I have to write tests for all the functions I wrote. I wonder how much of the codebase I broke already.
