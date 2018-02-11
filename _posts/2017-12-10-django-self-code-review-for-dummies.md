---
author: lonesword
date: 2017-12-10 21:28:21+05:30
layout: post
image: true
slug: django-self-code-review
title: Django self code review for dummies
categories:
- programming
- backend
tags:
- programming
- python
- django
---

After 2 years at an enterprise backup software firm, I finally took the plunge and joined a startup. I love the engineering culture we have here at [Squad](http://squadplatform.com), and rigorous code reviews are very much a part of it. Since I often found myself repeating the same mistakes again (and again, and again..), I went ahead and wrote a check list to help me. 

<blockquote class="imgur-embed-pub" lang="en" data-id="3ou5Lg6"><a href="//imgur.com/3ou5Lg6">Very wise words from Jake the dog</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

This is *not* a generic list, and is very much tied to me and the mistakes that I made. The list helped me, but your mileage may vary

### The TL;DR:

Read through the code you wrote, and stop and ponder at each line. 

### The actual (noobie) list:

1. Are you making `create()` or `update()` calls in a loop? Have you considered whether they could be replaced with [`bulk_create()`](https://docs.djangoproject.com/en/2.0/ref/models/querysets/#bulk-create) and [`bulk_update()`](https://github.com/aykut/django-bulk-update)?

2. Are you writing `post.id` where you could have gotten away with `post_id`? For example:

	```py
	class Blog(models.Model):
		title = models.CharField(max_length=200)


	class Post(models.Model):
		blog = models.ForeignKey(Blog)
		time = models.TimeField()
		author = models.CharField(max_length=100)
	```

	Let's say you want to know the `id` of the blog to which a particular post belongs to

	__The noobie way:__
	```py
	post = # some how get a reference to a Post object
	print post.blog.id
	```

	__The better way:__
	```py
	print post.blog_id
	```

	What's the difference? In the first case, we are asking django to fetch the `id` attribute from the post's blog entry. As you would probably  know, `Post` and `Blog` are separate tables in the database. So when you ask for `post.blog.id`, django will query the `Blog` table to fetch the id that we need. That's an extra query. However, this is not really necessary because we have the information we need in the `Post` object itself. Since we have a foreign key relationship from `Post` to `Blog`, django must somehow keep track of which post is related to which blog. Django does this by storing a special `blog_id` attribute in `Post` which would store the primary key of its parent `Blog`. So `post.blog_id` would give us the information we need, without resulting in an extra query. 

3. Read through the docstrings and comments. It might seem unimportant to read the docstrings and comments when you have a feature to ship. But a wrong comment/docstring can throw the next developer who reads your code off track, and trust me you don't want to be that guy.

4. Be mindful of where you write your business logic. Coming from jquery world, I had a tendency to put my business logic wherever I please. Avoid writing business logic in `ModelAdmin` classes or `ModelForm` classes (yikes!) and write them where they belong - `Model` classes. This would ensure:
	- Consistency in the codebase. If it's business logic, there's only one place it could be.
	- Better tests. If it's in a `Model` class, then you know you should write unit tests for it

5. Speaking of unit tests, how do you decide when to write unit tests and when not to? If it's business logic, it need unit tests. No buts, no maybes, just write the damn tests. If it is say, something in your `ModelAdmin`, then you can afford not to write unit tests for that as long as you don't do any fancy `if..else`s there. Test your business logic, not your boilerplate

6. Check if your changes require data migration. I made the rookie mistake of happily coding away on my feature with nary a thought about the existing data in the database, and regretted it afterwards. See [here](https://realpython.com/blog/python/django-migrations-a-primer/) for a primer on django migrations

7. While doing self code review, keep an eye out for things that can be cached. Find yourselves fetching 'top 10 scorers of all time' from the db everytime the page loads? Cache it! Though this should be fairly obvious, it's easy to forget about the cache when you are busy writing your feature. 

8. Keep an eye out for async tasks. Okay, this one's specific to our particular stack. Let's say you have a feature where your user presses 'generate cats report' button and you wade through the entire database to figure out how much of your total traffic involved pictures of grumpy cats. It is probably not a good idea to make your user stare at a loading screen while we crunch gigabytes of cat data. Here's what you could have done:

	- When the user presses the button, start an async task to calculate grumpy cat traffic volume. We use [celery](http://www.celeryproject.org/) to make this happen.
	- Once you fire the async task, immediately respond to the http request with the message "Looking for grumpy cats in the system, we will let you know when we are done". Now your user can use his/her time for something more productive
	- Message the user in slack/send an email/display a button on the page when your async task is done.

	This will let us offload heavier tasks to spare EC2 instances so that more critical requests/queries do not get slower because of grumpy cats

	<blockquote class="imgur-embed-pub" lang="en" data-id="YOmDuDV"><a href="//imgur.com/YOmDuDV">Grumpy Cat Programmer</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

9. Don't pass whole model instances around when all you need is an id.

	__The noobie way:__

	```py
	def update_blog(blog, title)
		# blah blah blah..

		Blog.objects.filter(id=blog.id).update(title=title)

		# more blah blah blah
	```

	__The better way:__


	```py
	def update_blog(blog_id, title)
		# blah blah blah..

		Blog.objects.filter(id=blog_id).update(title=title)

		# more blah blah blah
	```

	Do not keep whole model instances in memory when all you need is an id. 

10. Know your python. Use [list comprehensions over for loops](https://stackoverflow.com/questions/30245397/why-is-list-comprehension-so-faster), [izip over zip](https://stackoverflow.com/questions/4989763/when-is-it-better-to-use-zip-instead-of-izip), et cetera. This comes with time and practice, so don't sweat it. Oh and don't forget this:

	__The noobie way:__
	```py
	need_refuel = None
	if fuel_level < 0.2:
		need_refuel = True
	else
		need_refuel = False
	```

	__The better way:__
	```py
	need_refuel = True if fuel_level < 0.2 else False
	```

	or even better:

	```py
	need_refuel = fuel_level < 0.2 or False
	```

11. Get only the attributes you need. If you had a model like this:
	```py
	class Banana(models.Model):
		gorilla = models.CharField()
		tree = models.CharField()	
		jungle = models.CharField()
	```

	(God save you if you actually have a class structure like that in production, but it would serve our example well)
	And you want to do something like this:
	```py
	banana = Banana.objects.get(id=3)
	```

	What you wanted was a banana, but what you got was a gorilla holding the banana with the tree it was sitting on along with the entire fricking jungle (thanks, Joe Armstrong for the quote). Not cool. 

	What you *can* do instead is:
	```py
	banana = Banana.objects.get(id=3).only('id')
	```
	Here's the documentation for [only](https://docs.djangoproject.com/en/2.0/ref/models/querysets/#django.db.models.query.QuerySet.only). No more gorillas, just the banana.

	<blockquote class="imgur-embed-pub" lang="en" data-id="kD1K7VP"><a href="//imgur.com/kD1K7VP">Minion Banana</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>

12. [Django debug tools](https://django-debug-toolbar.readthedocs.io/en/stable/) is your friend. Lavishly using `only()` and `defer()` could bite you back if not carefull. If you defer loading attributes that you don't think you will need, but you end up needing them anyways, that would be an extra db query. At least in the django list pages, this would result in the dreaded n+1 query. Let's say you want to tabulate bananas and gorillas:

	|	id|	Gorilla Details|
	|-----|--------|
	|	1 | Chump, Amazon rainforest|
	|	2 |	Rick, Cambodia|
	|	3 | Appu, Kerala |

	You thought all you need is `id` and `Gorilla`, so you did `Banana.objects.all().only('id', 'gorilla')`, so that we don't need the tree and the jungle. But 3 months later, you thought it would be a good idea to display where the gorilla came from in your table. So you fire up a custom function in the `ModelAdmin` to do this:

	```py
	def gorilla_details(self, obj)
		return '{0} {1}'.format(obj.gorilla, obj.jungle)
	```

	And everything worked smooth. But unbeknownst to you, django is making db queries in a loop. We had told django to get only `id` and `gorilla` through the `only()` method. We now need the `jungle` as well. So whenever we access `obj.jungle`, django queries the db to get the jungle   because we specifically told it not to fetch the jungle earlier. So we end up making 10 calls to the db for 10 gorillas (or bananas, whatever). The fix is to include `jungle` in the `only()` clause, but more often than not we do not even know that we are making an n+1 query.

	Enter [django debug tools](https://django-debug-toolbar.readthedocs.io/en/stable/).

	Among many other things, DDT will tell you how many queries were fire to load your page. So if our banana-gorilla table makes 35 queries to datase to load, we know something's wrong. Always look at what the debug toolbar has to say before you send in that pull request for review


### Sorry for the long post. Here's a potato

<blockquote class="imgur-embed-pub" lang="en" data-id="VHkw3UU"><a href="//imgur.com/VHkw3UU">This tiny potato will get you through it</a></blockquote><script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
