# Let's talk about Context

**THIS IS DRAFT AF. READ WITH CAUTION.**
[open an issue](https://github.com/learnreact/reactcontext.com) to ask for for additional sections

## Table of Contents

## How to Read This

This page is a supplement to the React doc on Context—found [here](https://reactjs.org/docs/context.html).

It's a collection of my motions that helped me understand Context.
Your mileage may vary.

### Thanks

This thing was much worse (read "wrong") before [Dan Abramov](https://twitter.com/dan_abramov/)'s review.
Thanks Dan for your patience, empathy, and clarity.

### Learn other React stuff

<!-- Begin MailChimp Signup Form -->
<div id="mc_embed_signup" style="padding-top: 1em">
<form action="https://learnreact.us9.list-manage.com/subscribe/post?u=03b6ee2f58c8b4427c8ba9735&amp;id=f97aebbc64" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
	
	<input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_03b6ee2f58c8b4427c8ba9735_f97aebbc64" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->

## A "Shit" Example

This is a shit example of Context.
Shit because it uses "shit" as an illustration and because it's simplistic.

Don't worry, we'll get to **the why** after we cover **the how**.

### "Shit" is a fine word

My kids are allowed tasteful expletives.
"Shit" is fine word in my house.
But my mom hates the word.

I tell Rock—my 7 year old—"there's nothing wrong with the word 'shit'.
Mr. Roger's loved the word.
Some people hate it.
Your grandmother is one of those people.
Don't say "shit" around her.
Use 'poop' instead."

"Who is Mr. Rogers?", he asks.

I think he gets it.

Let's implement this scenario of "shit", Rock, and grandma's house using React's Context API (>= v16.4).

```jsx
// It's ok to say "shit" as a default.
let ExpletiveContext = React.createContext("shit");

// Some people don't like the word "shit".
// Use a different word, when in their company.
// It's good manners.
let ContextualExclamation = () => (
  <ExpletiveContext.Consumer>
    {word => <span>Oh {word}!</span>}
  </ExpletiveContext.Consumer>
);

// Grandma *hates* the word "shit".
// Say "poop" at Grandma's house.
let GrandmasHouse = props => (
  <ExpletiveContext.Provider value="poop">
    {props.children}
  </ExpletiveContext.Provider>
);

// What do you say when anything bad or exciting happens?
let VisitToGrandmasHouse = () => (
  <GrandmasHouse>
    <ContextualExclamation />
  </GrandmasHouse>
);

// => Oh poop!
```

Prefer video? [Watch along at learnreact.com.](https://learnreact.com/lessons/2018-the-context-api-a-shit-example)

## Create, Consume, and Provide Context

Context is a 3-part system:
**Create**, **Consume**, **Provide**.

### Create

Create context using `React.createContext`.

```jsx
import React from "react";

let NameContext = React.createContext();
```

This function takes an argument.

```jsx
let NameContext = React.createContext("Guest");
```

`NameContext` comprises two components, `Consumer` and `Provider`.

Let's dive into the `Consumer`.

Prefer video? [Watch along at learnreact.com.](https://learnreact.com/lessons/2018-the-context-api-create-context)

### Consume

`Consumer` is a component that takes a [function as children](https://reactpatterns.com/#render-callback).

Provided functions get the Context's `value` as their first argument.

```jsx
let NameContext = React.createContext("Guest");

let ContextGreeting = () => (
  <NameContext.Consumer>
    {value => <h1>👋 {value}!</h1>}
  </NameContext.Consumer>
);

// => <h1>👋 Guest!</h1>
```

In this example, `value` is the default value used to create `NameContext`.

So, how do we provide Context?
I'm always glad you ask...

Prefer video? [Watch along at learnreact.com.](https://learnreact.com/lessons/2018-the-context-api-create-context)

### Provide

`Provider` is a component that takes a `value` prop and makes it available to every component in the component tree below it.

```jsx
let NameContext = React.createContext("Guest");

let ContextGreeting = () => (
  <NameContext.Provider value="Michael">
    <NameContext.Consumer>
      {name => <h1>👋 {name}!</h1>}
    </NameContext.Consumer>
  </NameContext.Provider>
);

// => <h1>👋 Michael!</h1>
```

`Providers` work where components are deeply nested.

```jsx
let NameContext = React.createContext("Guest");

let ContextAwareName = () => (
  <NameContext.Consumer>
    {name => <h1>👋 {name}!</h1>}
  </NameContext.Consumer>
);

let NestedContextAwareName = () => <ContextAwareName />;

let DeeplyNestedContextAwareName = () => (
  <NestedContextAwareName />
);

let ContextGreeting = () => (
  <NameContext.Provider value="No Prop Drills">
    <DeeplyNestedContextAwareName />
  </NameContext.Provider>
);

// => <h1> Welcome No Prop Drills!</h1>
```

Prop Drills not required for assembly.

Prefer video? [Watch along at learnreact.com.](https://learnreact.com/lessons/2018-the-context-api-consume-context)

## Provide `value`

A Context's `value` can take any shape.
Here are examples of valid Contexts values, using a default `value`:

```jsx
let StringContext = React.createContext("string");

let NumberContext = React.createContext(42);

let FunctionContext = React.createContext(() =>
  alert("Context function")
);

let ArrayContext = React.createContext([
  "some",
  "array",
  "elements"
]);

let ObjectContext = React.createContext({
  aString: "string",
  aNumber: 42,
  aFunction: () => alert("Context function"),
  anArray: ["some", "array", "elements"]
});
```

`value` can be complex structures like React Elements, class components, and function components.

```jsx
let ReactElementContext = React.createContext(
  <span>React Element</span>
);

let FunctionalComponentContext = React.createContext(
  props => <span>Function Component</span>
);

let ClassComponentContext = React.createContext(
  class extends React.Component {
    render() {
      return <span>Class Component</span>;
    }
  }
);
```

### `value` is required on Context Providers

Where a Context `Provider` is used, the `value` prop is required.

```jsx
// NOPE
<SomeContext.Provider>
</SomeContext.Provider>

// YEP!
<SomeContext.Provider value="value is a required prop">
</SomeContext.Provider>
```

### What about the default `value` given to `createContext`?

The default value given to `createContext` is used for `Consumer` components without a `Provider`.

Where `Provider`s wrap their `Consumer`s, all bets are off.
You must explicitly provide a `value`.

```jsx
let UserContext = React.createContext("Guest");

let ContextGreeting = () => (
  <UserContext.Consumer>
    {word => <span>Hi {word}!</span>}
  </UserContext.Consumer>
);

let App = props => (
  <div>
    <ContextGreeting /> {/* => Hi Guest! */}
    <UserContext.Provider>
      <ContextGreeting /> {/* => Hi ! */}
    </UserContext.Provider>
    <UserContext.Provider value="Bulbasaur">
      <ContextGreeting /> {/* => Hi Bulbasaur! */}
    </UserContext.Provider>
  </div>
);
```

Prefer video? [Watch along at learnreact.com.](https://learnreact.com/lessons/2018-the-context-api-provide-context)

## Authoring and Modules

A Context's `Consumer` and `Provider` components can be accessed in 2 ways.

The Examples above use JSX' property access syntax.
This is the style used in official documentation.

```jsx
<SomeContext.Provider value="some value">
  <Context.Consumer>
    {value => <span>{value}</span>}
  </Context.Consumer>
</SomeContext.Provider>
```

Above, you access the `Provider` and `Consumer` components through the Context object.

You may prefer to use [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) to assign `Provider` and `Consumer` components to local variables.

```jsx
// Destructure your Context's Consumer and Provider
let { Consumer, Provider } = SomeContext;

<Provider value="some value">
  <Consumer>{value => <span>{value}</span>}</Consumer>
</Provider>;
```

Take care where multiple contexts are used.

```jsx
let {
  Consumer: OrganizationConsumer,
  Provider: OrganizationProvider
} = React.createContext();

let {
  Consumer: PersonConsumer,
  Provider: PersonProvider
} = React.createContext();

let App = () => (
  <OrganizationProvider value="ACME Co.">
    <PersonProvider value="Yakko">
      <OrganizationConsumer>
        {organization => (
          <PersonConsumer>
            {person => (
              <span>
                {person}, {organization}
              </span>
            )}
          </PersonConsumer>
        )}
      </OrganizationConsumer>
    </PersonProvider>
  </OrganizationProvider>
);

// => Yakko, ACME Co.
```

### Modularazing Context

In the "real world", you'll likely expose Contexts via ES Modules.

```js
// person_context.js
import React from "react";

let { Provider, Consumer } = React.createContext();

export { Provider, Consumer };
```

```js
// organization_context.js
import React from "react";

let { Provider, Consumer } = React.createContext();

export { Provider, Consumer };
```

`Consumer`s can be imported to compose context-aware components.

```jsx
import React from "react";
import { Consumer as PersonConsumer } from "./person_context";
import { Consumer as OrganizationConsumer } from "./organization_context";

export function ContextBizCard() {
  return (
    <OrganizationConsumer>
      {organization => (
        <PersonConsumer>
          {person => (
            <div className="business-card">
              <h1>{person}</h1>
              <h3>{organization}</h3>
            </div>
          )}
        </PersonConsumer>
      )}
    </OrganizationConsumer>
  );
}
```

`Provider`s can be imported to contain and supply values to context-aware components.

```jsx
// app.js
import { Provider as OrganizationProvider } from "./organization_context";
import { Provider as PersonProvider } from "./person_context";
import { ContextBizCard } from "./context_biz_card";

let App = () => (
  <OrganizationProvider value="ACME Co.">
    <PersonProvider value="Yakko">
      <ContextBizCard />
    </PersonProvider>
  </OrganizationProvider>
);

// => Yakko, ACME Co.
```

<div style="margin-bottom: 8rem"></div>

&copy; 2018 Michael Chan Some Rights Reserved

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
