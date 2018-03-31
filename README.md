# WIP: React Context

**THIS IS DRAFT AF. DON'T READ IT IF YOU DON'T LIKE CONFUSION.**

## TOC

* [A "Shit" Example](#a-shit-example)
* [Create, Consume, and Provide Context](#create-consume-and-provide-context)
* [Provide value](#provide-value)
* [Stylistic Options](#stylistic-options)
* [Modularizing Contexts](#modularizing-contexts)
* [Multiple Context Providers](#stacking-contexts)
* [Data Distribution, Not State Management](#data-distribution-not-state-management)
* [Distribute Component state with Context](#distribute-component-state-with-context)
* [A Mental Model for Context](#a-mental-model-for-context)

## A "Shit" Example

My kids are allowed tasteful explitives.
"Shit"—for example—is fine in my house.
My mom—however—hates the word.

I tell Rock—my 7 year old—"there's nothing wrong with the word 'shit'.
Mr. Roger's loved the word.
But you're grandma hates it.
So don't say it around her.
Use 'poop' instead."

"Who is Mr. Rogers?", he'll asks.
I think he gets it.

Let's implement this scenareo of "shit", Rock, and grandma's house using React's Context API (>= v16.4).

```jsx
// It's ok to say "shit" as a default.
let ExpletiveContext = React.createContext("shit");

// Some people don't like the word "shit".
// Use a differnt word, when in their company.
// It's good manners.
let ContextualExclamation = () => (
  <ExpletiveContext.Consumer>
    {word => <span>Oh {word}!</span>}
  </ExpletiveContext.Consumer>
);

// Grandma *hates* the word "shit".
// Say "poop" at Grandma's house.
let GrandmasHouse = props => (
  <ExpletiveContext.Provider value="poop" {...props} />
);

// Go have fun at Grandma's!
// What do you say when anything bad or exciting happens?
let VisitToGrandmasHouse = () => (
  <GrandmasHouse>
    <ContextualExclamation />
  </GrandmasHouse>
);

// => Oh poop!
```

## Create, Consume, and Provide Context

Context is a 3-part system.
You **create** it, **consume** it, and **provide** it.

**Create, consume, provide**. Create, consume, provide... keep repeating that.

### Create Context

Create a Context using React's `createContext` function.

```jsx
import React from "react";

let NameameContext = React.createContext();
```

Provide a default "value" for Context by calling `createContext` with an argument.
Let's start easy with a string.

```jsx
let NameContext = React.createContext("Guest");
```

Our `NameContext` comprises two components, a `Consumer` and a `Provider`.

Let's dive into the `Consumer`.

### Consume Context

A Context's `Consumer` is a component that takes a [function as children](https://reactpatterns.com/#render-callback).

```jsx
let NameContext = React.createContext("Guest");

let ContextGreeting = () => (
  <NameContext.Consumer>{value => <h1>👋 {value}!</h1>}</NameContext.Consumer>
);

// => <h1>👋 Guest!</h1>
```

Here, `NameContext.Consumer` calls is `children` function with the default `value` it was created with.

Leterally:

```js
this.props.children("Guest")
```

So, how do we provide Context, where the default isn't acceptable?
I'm always glad you ask...

### Provide Context

A Context's `Provider` is a component that takes a `value` prop and makes it available to every nested component—no mater how deep.

Context Providers in close proximity:

```js
let NameContext = React.createContext("Guest");

let ContextGreeting = () => (
  <NameContext.Provider value="Michael">
    <NameContext.Consumer>{name => <h1>👋 {name}!</h1>}</NameContext.Consumer>
  </NameContext.Provider>
);

// => <h1>👋 Michael!</h1>
```

Context Providers also work where components are deeply nested:

```js
let NameContext = React.createContext("Guest");

let ContextAwareName = () => (
  <NameContext.Consumer>{name => <h1>👋 {name}!</h1>}</NameContext.Consumer>
);

let NestedContextAwareName = () => <ContextAwareName />;

let DeeplyNestedContextAwareName = () => <NestedContextAwareName />;

let ContextGreeting = () => (
  <NameContext.Provider value="No Prop Drills">
    <DeeplyNestedContextAwareName />
  </NameContext.Provider>
);

// => <h1> Welcome No Prop Drills!</h1>
```

Prop Drills not required for assembly.

## Provide value

A Context's `value` can take any shape.
Here are examples of valid Context, using a default `value`:

```jsx
let StringContext = React.createContext("string");

let NumberContext = React.createContext(42);

let FunctionContext = React.createContext(() => alert("Context function"));

let ArrayContext = React.createContext(["some", "array", "elements"]);

let ObjectContext = React.createContext({
  aString: "string",
  aNumber: 42,
  aFunction: () => alert("Context function"),
  anArray: ["some", "array", "elements"],
});
```

`value` can be more complex structures like React Elements, class components, and functional components.

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

### value is required for Providers

Where a Context's `Provider` component is used, a `value` is required.

```jsx
<SomeContext.Provider value="value is a required prop">
  ...
</SomeContext.Provider>
```

## Stylistic authoring options

A Context's `Consumer` and `Provider` components can be accessed in 2 ways.

The Examples above use JSX' property access syntax.

```jsx
<SomeContext.Provider value="some value">
  <Context.Consumer>
    {value => <span>{value}</span>}
  </Context.Consumer>
</SomeContext.Provider>
```

You may prefer [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) to assign Context components to local variables.

```jsx
// Destructure your Context's Consumer and Provider
const { Consumer, Provider } = NameContext;

<Provider value="some value">
  <Consumer>
    {value => <span>{value}</span>}
  </Consumer>
</Provider>
```

That works fine with one Context but take care where multiple contetx apee 

```jsx
const { Consumer: OrgConsumer, Provider: OrganizationProvider } = OrganizationContext;
const { Consumer: UserConsumer, Provider: UserProvider } = UserContext;

<OrganizationProvider value="ACME Co.">
  <UserProvider value="Yakko">
    <UserProviderConsumer>
      {value => <span>{value}</span>}
    </UserProviderConsumer>
  </UserProvider>
<OrganizationProvider value="some value">
```

## TO BE CONTINUED

---

&copy; 2018 Michael Chan Some Rights Reserved

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
