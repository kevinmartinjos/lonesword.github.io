---
author: lonesword
date: 2018-02-15 18:33:21+05:30
layout: post
image: true
slug: squad-takes-joel-test
title: Squad takes the Joel test
categories:
- general
tags:
- culture
- squad
- joel
---

{% include image.html img="images/2018-02-15-squad-takes-the-joel-test/hand.jpeg" %}



__As originally published at [Squad Engineering](https://medium.com/squad-engineering/squad-takes-the-joel-test-9189709a6235)__

Considering that the [Joel test](https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/) dates back to the turn of the century, a time when Pentium III was state of the art and Linux was still obscure, it has aged quite gracefully. It is no more the golden standard against which development teams are rated, but it still is surprisingly relevant (for the most part).

At [Squad](https://www.squadplatform.com) we strive to build an engineering culture of doing more with less, and having a super smooth kick-ass development workflow is a necessity, not a luxury. Here we go.

### 1. Do you use source control?

Yes, git. All our code lives on Github. This one’s a no-brainer.

### 2. Can you make a build in one step?

One step builds are nice, but no builds are even nicer. In python-land, you [don’t build](https://softwareengineering.stackexchange.com/questions/24558/is-python-interpreted-or-compiled) — you deploy. As a developer, all I have to do is commit my changes to the `staging` branch, and do a `fab deploy` and voila! I can now test my changes on our staging server to my heart’s content . The whole deploy to staging process takes less than 5 minutes. Deploying to production is just another 5 minutes away, assuming you tested your feature on the staging server thoroughly.

### 3. Do you make daily builds?

As I said, we don’t really have ‘builds’ and that’s a good thing. What we do have is [continuous integration](https://www.thoughtworks.com/continuous-integration) using [CircleCI](https://circleci.com/). Unit tests are run automatically every time I commit to the repo and with a Slack integration, the team gets notified whenever a build is completed.

{% include image.html img="images/2018-02-15-squad-takes-the-joel-test/nitish.png" caption="Looks like Nitish is killing it today!"%}

### 4. Do you have a bug database?

Yes, we track all our features and bugs on [Pivotal Tracker](https://www.pivotaltracker.com/). We have git integrations and every commit to the repo is automatically recorded under the relevant [story](https://www.pivotaltracker.com/help/articles/quick_start/). All discussions relevant to a bug/story happens at a single place. Did I mention we seldom use emails? Yup, that’s right, I can count on my fingers the number of times I had to use email for communicating with my teammates.

### 5. you fix bugs before writing new code?

_Depends_. Before you go berserk thinking “Why would Squad dooo thaaat?” let me humbly point you to Jeff Atwood’s take on the matter — [not all bugs are worth fixing](https://blog.codinghorror.com/not-all-bugs-are-worth-fixing/). Since we strive to be as lean as possible, every hour we sink into a bug has to be justified. In fact, our developers ruthlessly confirm the ‘ROI’ first before diving into the code base to hunt down and fix the bug.

That being said, you’ll never see a Squad dev building a feature *on top* of an existing bug. If thou see-eth the bug, thou fixeth the bug while writing thy feature. Also [we don’t believe in titles](https://medium.com/@gokulrajaram/the-one-thing-ceos-should-delay-as-long-as-possible-ea28347714b0), so the decision to whether fix a bug or not usually comes down to you and not to a mystical manager two tiers above you.

### 6. Do you have an up-to-date schedule?

We have [‘solver teams’](https://labs.spotify.com/2014/03/27/spotify-engineering-culture-part-1/) that are super committed to solving a focused problem and each solver team has a set of [Objectives and Key Results (OKRs)](eleganthack.com/the-art-of-the-okr/) for a quarter. This results in a very transparent schedule, agreed on by the whole team, and meeting or breaking it (if necessary) is always a collective decision and not a directive from up top.

What this means is that if Squad was trying to colonize Mars, every member of the solver team would know exactly when to work on making the landing lights look nice and when to focus on just hurtling the shuttle in the approximate direction of Mars.

{% include image.html img="images/2018-02-15-squad-takes-the-joel-test/rocket.jpeg" caption="From when to fix the ignition swith to saying 'Hi' to the alien, the solver team has it all figured out."%}


But despite our best efforts, sometimes deadlines are missed. We try to shed more weight (no landing lights on the rocket) and invoke ** ‘focus on focus’ to get the most critical components shipped. What happens if we’re still unable to meet the schedule? That’s when we own up that our estimates were incorrect and do it better the next time.

** Focus solely on what is worth focusing on. Thanks, [Rishabh](https://www.linkedin.com/in/rishabhladha/)

### 7. Do you have a spec?

> Walking on water and developing software from a specification are easy if both are frozen — [Edward V. Berard](https://en.wikiquote.org/wiki/Edward_V._Berard)>

Remember what I said about stories in Pivotal Tracker? Our specs too live inside stories. This is the process we follow:

- Discuss with all stakeholders and draft a requirements doc. This doc will act as the source of truth for what needs to be solved and what needs to be built. This is our spec, and it is frozen as far as this story is concerned
- Design a solution. What’s the easiest, most elegant way to meet the specs? Write down the design, the tasks involved and [estimate the story](https://stackoverflow.com/questions/9362286/why-is-the-fibonacci-series-used-in-agile-planning-poker)
- A teammate reviews your design, and a meaningful discussion about the merits of your design and alternate solutions ensue
- You and your reviewer agree on a design, and you happily code away

### 8. Do programmers have quiet working conditions?

Oh this is my favorite part.

We have two really cool ‘silent rooms’ anybody can go to when they feel that the office bullpen is getting too loud. Once inside, you are not allowed to talk (unless you and your buddy have super-human whispering skills) and your phones should be on silent. Not on vibrate, but on silent. This is the metaphorical cave where programmers disappear into and come out with bags full of features. Silent rooms are our rock and our refuge, the one place where we won’t be disturbed. The rooms are insulated so that if someone revs their bike right outside the window, we wouldn’t know about it. And yes, I’m writing this blog sitting in one of the silent rooms.

{% include image.html img="images/2018-02-15-squad-takes-the-joel-test/silentroom.jpeg" caption="One of our two beloved silent rooms"%}

### 9. Do you use the best tools money can buy?

Yes, developers bring their own device to work. I actually moved my assembled desktop into the office since I was convinced that an underpowered laptop without a discrete GPU won’t be able to ‘handle me’. Whatever makes you productive.

IDEs too are up to you to decide, and my favorite contester is [PyCharm](https://www.jetbrains.com/pycharm/). We also have employed a slew of awesome tools like [Slack](https://slack.com/), [Sentry](https://sentry.io/welcome/) and [Loggly](https://www.loggly.com) to make sure that our developers are as productive as they can be. Look at our [StackShare](https://stackshare.io/squadrun/squadrun) page for more.

However, this does not mean we have a paid subscription for _insert your favorite tool for x here_. We don’t give MacBook Pros to our developers (but we do finance interest-free EMIs if they choose to buy one). We just recently got Slack premium. We are moving from Asana to [Clickup](https://clickup.com/). We have not maxed out the parallelism of our CircleCI builds. We also don’t swim in money. We only buy things that make us more productive.

### 10. Do you have testers?

No. The developers are responsible for their stories/features and they are expected to test it well before pushing to production. However, since another pair of eyes is always better, the person who requested the story (usually a Product Manager from the team) would do an ‘Acceptance Testing’ to make sure what you wrote conforms to the (hopefully frozen, rock solid) specs.

### 11. Do new candidates write code during their interview?

Yes, an _insane_ amount of code. These are the steps that you would go through to get hired as a Product Engineer at Squad:

- A call from our [awesome CTO, Vikas](https://www.linkedin.com/in/vikas-gulati/)
- A design round, over the phone
- A take-home assignment. (During my interview, I spent around 2 days on it and wrote a lot of code)
- The team at Squad runs your code, and see if it works as intended. Bonus points if you have a `readme.md` that makes our life easier
- The team then reviews your code. I want to stress this part. We actually read your code, and it ‘works’ does not mean you pass
- A meaningful discussion over email about your chosen design and execution
- You get invited for an on-premise interview. First round is ‘activity extension’ — extend your take-home assignment to add a couple of features. If your methods/modules were too tightly coupled and inflexible, you’d have a hard time here
- Another design round. You are expected to design the solution to a problem, and write skeleton code to solve it. Given the time constraint, you get bonus points if your code actually works
- A bug smash round. You are given a code base and your task is to refactor it according to your definition of ‘good code’

Yes, that’s a lot of code and I guarantee you that it will be the best technical interview you’ve ever had!

### 12. Do you do hallway usability testing?

Remember what I said about our high octane HQ? It is almost impossible to keep a feature under the wraps till the time it’s released. “Oh Kevin it looks cool but I don’t think it is really useful because of x and y” happens a lot and I’m grateful for it. Continuous improvement and constant iteration is part of our DNA. That being said, there has also been instances where I waited too long to show my features, or I committed to production and then asked the stakeholder to go through the feature. Hallway testing is a guideline. Though we strive to follow the best practices and guidelines whenever possible, it is not always possible. As they say, [it is easier to ask forgiveness than to ask for permission](https://stackoverflow.com/questions/12265451/ask-forgiveness-not-permission-explain). Not always, but sometimes.

So we’re finally here — time to count the points. I would claim that we scored a solid 11, but a skeptic would argue that we barely made a 10. You be the judge.

Also there are a lot of questions that the test does not address, like how easy it is for developers to work remotely (very easy, our team is partly remote) and how often do you refactor code (very often). But I’ll [defer](https://docs.djangoproject.com/en/2.0/ref/models/querysets/#django.db.models.query.QuerySet.defer) that to another post.

##### Image courtesies:

- [Hand holding the medal](https://www.freepik.com/free-vector/hand-holding-medal_1530827.htm)
- [The cool space collage](https://www.freepik.com/free-vector/flat-space-elements_1000182.htm)

_This post was much 'shittier' than it is now. Thanks to my wonderful friends at Squad for helping me fix it_