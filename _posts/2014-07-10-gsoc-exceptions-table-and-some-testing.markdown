---
author: lonesword
comments: true
date: 2014-07-10 18:45:26+00:00
layout: post
slug: gsoc-exceptions-table-and-some-testing
title: 'GSoC : Exceptions table and some testing'
wordpress_id: 158
categories:
- gsoc
- programming
tags:
- gsoc
- libvarnam
- malayalam
- smc
- swathantra
- varnam
- varnamproject
---

Progress has been slow the past week, thanks to some non-academic preoccupations and a trip home. However, had I been a bit more organized, I would have been more successful at the rather mundane task of testing out the stemming accuracy.

<br/>
There are some design changes. Some stem rules did not gave the desired results in all cases. That is,there were exceptions. One particular stem rule that was giving me considerable headache was "ന്" => "ൻ". For example, ആദിത്യന് should stem to ആദിത്യൻ. But while this worked wonderfully, പിറ്റേന്ന് would be incorrectly stemmed to പിറ്റേന്ൻ. This is because ന്ന is actually a combination of ന് and ന. So ന്ന് is actually ന്+ന് and my algorithm stems the first ന് to ൻ (see previous post).
<br/><br/>
This problem can be solved by using a look ahead. A look ahead in its proper and fully scalable (that is, an algorithm that can look ahead any number of characters) can turn out to be too much so I decided to test the idea with a single look ahead. Along with stem rules, I added another table to the database "stem\_exceptions" that contain exceptions for each stem rule. For example, the exception rule for ന് is "ന്" => "ന്". This tells varnam to NOT stem ന് to ൻ if the syllable preceding ന് is another ന്. This will ensure that varnam will ന് to ൻ in all cases except when it occurs as a part of ന്ന്.
<br/><br/>
Lucky for me, the exceptions table proved useful with many other stem rules. A look ahead of a single syllable seems to satisfy varnam's need at least with malayalam. I had to implement some helper functions that returns the last syllable of a word (eg: in ആദിത്യന്, the last syllable would be "ന്", and the last unicode character would be "്") and another that can count the number of syllable in a word. The count of the syllables is useful to skip stemming of very short words. For example, varnam do not apply a stem rule if syllables\_in\_original\_word - syllables\_in\_suffix is less than 2. The number 2 is arbitrary, but solves some common problems such as മകൾ. As a happy consequence, now varnam will not stem മകൾ at all but will stem പേനകൾ to പേന. Though this is not a permanent nor a complete solution, it is enough to prevent some common stemming mistakes.
<br/><br/>
I've been able to test the accuracy of the algorithm on some malayalam wikipedia articles. I made 3 sets of about 1000 words each. Contents of each set belonged to a particular category. My rather small test data is hosted at this [repository](https://github.com/lonesword/mlstemmer/tree/master/test%20data). Here are the results for each set:
<br/><br/>
history\_wikipedia - 94%

Technical\_wikipedia - 89.7%

Art\_wikipedia - 92.6%
<br/><br/>
Give or take 2% from each set, though I've been quite liberal in flagging results as errors. The fact to be noted is that if a word that should not be stemmed is not stemmed, it counts as a correct result. I do not know if this is how other stemming algorithms are tested. If 3000 definitely stemmable words were given as input, there is a considerable chance that the accuracy would be lower.
<br/><br/>
I would have loved to test the data on some more recent corpus such as mathrubhumi newspaper archives. But there was some issue with the font, especially the chillus, that represented the malayalam letters quite differently on the konsole than how they were rendered on the browser. For example, words ending with ൽ in the browser was seen to be ending with ല് when I copied them to the konsole. Hence, the stem rules did not match with many suffixes and produced a lot of incorrect stemming or no stemming at all.
<br/><br/>
One thing I'm happy to observe is that given a word, the stemmer is producing multiple words that varnam can learn in diffent stages. For example, കാലങ്ങളുടെ would first stem to കാലങ്ങൾ (which varnam learns) and then to കാലം (learns again). If all goes well, I will be able to test and tweak the algorithm extensively this week and hopefully start estimating how much the suggestions are improved. Then, I hope, will be time for some code reviewing with my mentor.
