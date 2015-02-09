---
author: myzonez
comments: true
date: 2014-06-24 17:14:27+00:00
layout: post
slug: gsoc-libvarnam-can-now-stem
title: 'GSoC : Libvarnam can now stem'
wordpress_id: 149
categories:
- gsoc
- programming
tags:
- gsoc
- libvarnam
- malayalam
- smc
- transliteration
- varnam
---

Very productive ten days. Libvarnam is finally stemming the words. I might not be so wrong in stating that the project is almost half complete. I've come up with a multi-pass stemming algorithm (although no flow-chart drawing was required - maybe I'll draw one for clarity later) that has the *potential* to stem with a reasonable accuracy. Since the algorithm is intended to serve as a platform for many Indian languages, proper documentation is quite important. As a first step, I've made a separate github repository putting together the thought process that went into designing the algorithm. The first draft of the algorithm is in the file "03algorithm" [here](https://github.com/lonesword/mlstemmer). Please note that the files 01classification and 02implementation are not updated -  those are just things I jotted down.

**A rather quick explanation :**

The varnam stemmer removes suffixes from malayalam words to obtain the base word. For example,
വേദനാജനകമായ : വേദനാജനകം

The algorithm does this by using a set of rules, called stem rules. The stem rule that was used in the above example is :

"മായ" => "ം"

These rules can be classified into 3 : level 1, level2, and level3. Level1 contains the shortest rules, and the most basic ones. Level2 contains the most common rules and are often 2 syllables or more long. Level3 contains the longest suffixes, like "യിരിക്കുന്നു" => "". (More on levels at "01classification" [here](https://github.com/lonesword/mlstemmer)). For now, the classification into levels is rather a convenience than a necessity. I decided that one long list of stem rules is ugly and dividing them into 3 would be nicer. So there you go.

These stem rules reside in a database.

`
1. Compile the scheme file and insert values into stemrules table
2. buffer = empty_string_bufer
3. Do not stem if size of word is less than 10 bytes. (Min_stem_size)
4. While (termination_condition() is not met)
4.1 Get last letter of the word and insert it at the beginning of the buffer
4.2 if buffer is in level1
4.2.1 apply stemrule from level1, word is modified
4.2.2 if(independent_existence)
4.2.2.1 learn word
4.2.3 clear buffer
4.3 else if buffer is in level2
4.3.1 apply stemrule from level2, word is modified
4.3.2 if(independent_existence)
4.3.2.1 learn word
4.3.3 clear buffer`

`4.4 else if buffer is in level3
4.4.1 apply stemrule from level3, word is modified
4.4.2 if(independent_existence)
4.4.2.1 learn word
4.4.3 clear buffer`

`
5. Learn the stemmed word`

`TERMINATION CONDITION
1. Return true if :
a) The word ends with ം.
b) If the word ends with a consonant and there is no added swara eg : പരീക്ഷ (pareeksha)
c) If the buffer contains the rest of the word (or whole of it).`

There is something wrong with code indentation in wordpress. Click on the screen shot to see the neatly indented version on sublime text editor.

[caption id="attachment_153" align="alignleft" width="500"][![The algorithm](https://kevincoder.files.wordpress.com/2014/06/algorithm.png?w=500)](https://kevincoder.files.wordpress.com/2014/06/algorithm.png) The algorithm[/caption]

For example, consider the stemming of the word എന്നിവിടങ്ങളിൽ. Initially, the buffer is empty.

1. Shift word ending to buffer. Buffer now contains ൽ

2. Buffer contents (ൽ) does not correspond to a stem rule in any level.

3. Shift word ending to buffer, buffer now contains ളിൽ

4. There exists a stem rule in level 2 "ളിൽ" => "ൾ". Apply this stem rule to the word. Word now becomes എന്നിവിടങ്ങൾ

5. Clear the buffer

6. എന്നിവിടങ്ങൾ is independent. That is, it is a meaningful word. Hence learn it. This step (learning) is not necessary in stemming, but is crucial to improve varnam's predictions.

7. Shift word ending to buffer. Buffer now contains ൾ. Not part of a stem rule.

8. Shift the next ending to buffer. Buffer now contains ങ്ങൾ. There is a stem rule "ങ്ങൾ" => "ം" in level 2. Apply stem rule, and the word becomes  എന്നിവിടം. (Varnam learns this word too)

9. The algorithm continues by shifting the endings of  എന്നിവിടം. Since the contents of the buffer will not correspond to a stem rule at any point of time, the algorithm eventually terminates.



The termination condition needs some refinement. Condition a) and b) is not being used right now. Stemming terminates when there is no more element left in the word to shift to the buffer. This seems to work fine right now, and if it continues to work, I will drop conditions a) and b) altogether.

The accuracy of the stemmer is ultimately determined by how good and accurate the design of stem rules are. This requires a lot of trial and error, and some of the stem rules are in the [mlstemmer](https://github.com/lonesword/mlstemmer) repository. By careful choice of the stem rules, an accuracy of more than 80% is expected.



**Preliminary testing**

I've implemented a stemmer.c program under the examples directory that can read words separated by blank spaces from a text file and stem them. This is the sample input :

വിവിധതരം വധശിക്ഷകളിൽ ഒന്നാണ് കുരിശിലേറ്റിയുള്ള വധശിക്ഷ. ഈ ശിക്ഷാരീതിയിൽ പ്രതിയെ ഒരു മരക്കുരിശിൽ ആണിയടിച്ച് തളയ്ക്കുകയാണ് ചെയ്യുക വേദനാജനകമായ വധശിക്ഷ നടപ്പാക്കണം എന്ന ഉദ്ദേശത്തോടുകൂടി രൂപപ്പെടുത്തിയ പുരാതനമായ ഒരു ശിക്ഷാരീതിയാണിത് സെല്യൂസിഡ് സാമ്രാജ്യം കാർത്തേജ് റോമാ സാമ്രാജ്യം എന്നിവിടങ്ങളിൽ ക്രിസ്തുവിന് മുൻപ് നാലാം ശതകം മുതൽ ക്രിസ്തുവിനു ശേഷം നാലാം ശതകം വരെ കുരിശിലേറ്റൽ താരതമ്യേന കൂടിയ തോതിൽ നടപ്പാക്കപ്പെട്ടിരുന്നു യേശുക്രിസ്തുവിനെ കുരിശിലേറ്റി വധിച്ചുവെന്നാണ് ക്രൈസ്തവ വിശ്വാസം. ക്രിസ്തുവിനോടുള്ള ബഹുമാനത്താൽ കോൺസ്റ്റന്റൈൻ ചക്രവർത്തി എ.ഡി. 337-ൽ ഈ ശിക്ഷാരീതി നിർത്തലാക്കുകയുണ്ടായി ജപ്പാനിലും ഒരു ശിക്ഷാരീതിയായി ഇത് ഉപയോഗത്തിലുണ്ടായിരുന്നു മരണശേഷം മൃതശരീരങ്ങൾ മറ്റുള്ളവർക്കുള്ള ഒരു താക്കീത് എന്ന നിലയ്ക്ക് പ്രദർശിപ്പിക്കപ്പെട്ടിരുന്നു കാഴ്ചക്കാരെ ഹീനമായ കുറ്റങ്ങൾ ചെയ്യുന്നതിൽ നിന്നും തടയുക എന്ന ഉദ്ദേശത്തോടെയാണ് കുരിശിലേറ്റൽ സാധാരണഗതിയിൽ നടത്തിയിരുന്നത്

I've removed almost all the punctuation so that they won't interfere with the stemming. I've taken 2 screen shots showing the results. The results are far from perfect, and that is certainly because I haven't added that many stem rules to the database. Things should improve significantly in the next few days.



[caption id="attachment_150" align="alignright" width="300"][![Stem results page 1](http://kevincoder.files.wordpress.com/2014/06/stem1.png?w=300)](http://kevincoder.files.wordpress.com/2014/06/stem1.png) Stem results page 1[/caption]

[caption id="attachment_151" align="alignright" width="300"][![Stem results page 2](http://kevincoder.files.wordpress.com/2014/06/stem2.png?w=300)](http://kevincoder.files.wordpress.com/2014/06/stem2.png) Stem results page 2[/caption]

**References **

I've referred two papers for designing this stemmer. The first one, [LALITHA](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?tp=&arnumber=6731658&queryText%3Dmalayalam+stemmer) uses a longest suffix stripping method and was of little use for varnam. The second one, [STHREE](http://ieeexplore.ieee.org/xpl/articleDetails.jsp?tp=&arnumber=6731640&queryText%3Dmalayalam+stemmer), uses a similar algorithm to mine but confines the number of iterations to 3. However, both the papers did not contain any links to stem rules or programs that could be reused. Hence I'd be relying on the [SILPA stemmer](https://github.com/diadara/silpa-stemmer), the first stemmer in Malayalam, for the invaluable stem rules.

But I would be looking for a more exhaustive set of rules (hopefully) and will have to do quite some Malayalam reading. Apart from the Mathrubhoomi newspaper which will definitely be soaked in curry and tea by the time I could carry it away from the mess hall, Malayalam reading materials are actually hard to come by. But wait, I saw a few SFI magazines on the other guy's room.  Gathi kettal puli pullum thinnum! :p
