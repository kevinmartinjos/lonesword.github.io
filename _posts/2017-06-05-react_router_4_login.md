---
author: lonesword
comments: true
date: 2017-06-02 19:22:21+05:30
layout: post
image: true
slug: react-router-login
title: Authentication with React-router 4.x
categories:
- programming
- web
tags:
- programming
- react-router
- reactjs
---

This article is inspired by the excellent tutorial by Scott Luptowski on [how to add authentication to you React app](https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1). I attempt to re-invent the wheel again because the original article cites an older version of react-router and the instructions do not work if you are using react-router 4.x. There are a lot of breaking changes when you migrate from 3.x to 4.x, and there is an answer to all the whys [here](https://github.com/ReactTraining/react-router/tree/v4.0.0-beta.8#why-a-major-version-bump)


### Disclaimer

I'm not a reactjs ninja or rockstar or paladin or anything of that sort. Just a dude with good intentions who had to spent an entire evening trying to figure out how authentication with react-router 4.x works, when the internet had only tutorials that uses 3.x. So take my advice with a pinch of salt - I might not be following the best practices.

### The goal

Your glorious new app requires the user to log in before they are allowed do certain things. For example, if you were building the next twitter, your users shouldn't be able to tweet unless they are logged in. The idea here is to put certain url patterns/pages behind an authentication wall so that if a user visits that page and the user is not logged in, he/she should be redirected to a login page. If the user is already logged in, proceed to show the requested content - and the user will have no idea about the karate chops we did behind the stage. Should the user try to navigate to a page that does not exist, we should show a 404 component as well.


### The How-To

The solution is simple enough. Just like Scott explained in the [original article](https://medium.com/the-many/adding-login-and-authentication-sections-to-your-react-or-react-native-app-7767fd251bd1), we create a React component that contains the login logic. This component wraps all of the routes that require authenticated users. Our entry point to the app would look something like this:

```js
ReactDOM.render(
  <Router>
	<App />
  </Router>,
  document.getElementById('app')
);
```

But where did all the routes go? From react-router 4.x, you don't get to define all your routes in one place. Yep, you read that right. So our `App` component will be doing its part in routing:

```js
class App extends Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				All the awesomeness in the world converged to a single component.
				<Switch>
					<Route exact path="/" component={Home} />
  					<Route path="/" component={RootRouteWrapper} />
  				</Switch>
			</div>
		
		)
	}
}
```

So what are we doing here? If the url exactly matches `/`, we render a `Home` component. For everything else that is a subset of `/`, we render `RootRouteWrapper` which will subsequently route our requests. So all the other url patterns (eg: `/pizza`, `/pizza/yummy`) would go on to render the `RootRouteWrapper` component. But what's that `Switch` component doing there? If we had not enclosed the routes in a `Switch`, react-router would have rendered all routes that matched the url. So if the user visits your-awesome-app.com, all the routes for `/` will trigger - both `Home` and `RootRouteWrapper`! If your routes are enclosed in `Switch`, react-router will render **only** the first match - in our example the `Home` component.

OK. So now we can show a home page. What does the `RootRouteWrapper` component do again?

```js
class RootRouteWrapper extends Component {
	render() {
		return (
			<div id="RootRouteWrapper">
				<Switch>
					<Route exact path="/login" component={LoginRedirectComponent} />
					<Route path = "/tweet" component={EnsureLoggedInContainer} />
					<Route component={PageNotFound} />
				</Switch>
			</div>
		)
	}
}
```

We define 2 routes here - `/login` to show the user a login prompt and `/tweet` to let the user post a tweet. Now `/tweet` should be accessible only if the user is logged in. `EnsureLoggedInContainer` is the magic component that will handle the login logic for us. The idea is to configure all routes that needs authentication to render the `EnsureLoggedInContainer`. You can also see that we have defined a route that will render the `PageNotFound` component if the url does not match any configured routes. On to our login logic:

```js
import {Route, Switch, withRouter} from 'react-router-dom';

class EnsureLoggedInContainer extends Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		const {dispatch, currentURL, isLoggedIn} = this.props;

		if(!isLoggedIn){
			this.props.history.replace('/login');
		}
	}

	render() {
		const {isLoggedIn} = this.props;

		return (
			<Switch>
				<Route path="/tweet" component={Tweet} />
			</Switch>
		)

	}
}


export default withRouter(EnsureLoggedInContainer);
```

The assumption is that the `Tweet` component shows the user an input box to type a message.
Notice how we have declared a Route for `/tweet` again inside the `EnsureLoggedInContainer`. When the user navigates to `/tweet`, `RootRouteWrapper` renders `EnsureLoggedInContainer` which in turn renders `Tweet`. If the user is not logged in, `componentDidMount` will redirect the user to the login page. Remember that you need to export the class with `withRouter` for the history to be available in the props. Also, you would need to maintain the state of the application separately - this article assumes that you have laid down the necessary plumbing to pass `isLoggedIn` as a prop to `EnsureLoggedInContainer`. `isLoggedIn` should come from your application state - and react-redux seems to be the most popular choice here. How to use react-redux to pass properties to your component is beyond the scope of this article. If you are interested, there's a really good introduction [here](http://redux.js.org/docs/introduction/)

In case you wanted to add another page that displays a tweet - say `/tweet/1`- that would show the tweet with id 1 in a `TweetContainer` component - you would have to write the necessary routing logic inside the `Tweet` component. `/tweet/:id` would automatically require authentication since its parent route - `/tweet` - renders `EnsureLoggedInContainer`.


### Caveats

You have to make changes at 2 places to add a new route that needs authentication - in the `RootRouteWrapper` component and then again in `EnsureLoggedInContainer`. I wonder if there is a more elegant solution