# React Context

Updated for React 19.

## Table of contents

## Learn other React stuff good too

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

## A "shit" example

*Shit* is fine word in my house.  
But my mom hates the word.

So I tell my kids to use another word when around grandma.  

The way we adapt language to our company is a great context for `Context`.

```jsx
// It's ok to say "shit" as a default
let ExpletiveContext = React.createContext("shit");

// Context is important communicating
function ContextualExclamation() {
  let word = React.use(ExpletiveContext);
  return <span>Oh {word}!</span>;
}

// When at Grandma's house, say "snap" as an expletive
let GrandmasHouse = props => (
  <ExpletiveContext value="snap">
    {props.children}
  </ExpletiveContext>
);

// => <span>Oh snap!</span>
let VisitToGrandmasHouse = () => (
  <GrandmasHouse>
    <ContextualExclamation />
  </GrandmasHouse>
);
```

## Create, use, and provide context

Context is a 3-part system:
**Create**, **Use**, **Provide**.

### Create

Create context with `React.createContext`.

```jsx
let NameContext = React.createContext();
```

This function takes an optional argument.

```jsx
let NameContext = React.createContext("Guest");
```

### Use

Use context with `React.use`.

```jsx
function ContextualGreeting() {
  let name = React.use(NameContext);

  return <h1>👋 {name}!</h1>;
}
```

### Provide

Provide contexnt "rendering" the returned Context element. Then provide `value` as a prop.

```jsx
let NameContext = React.createContext("Guest");

function App() {
  let user = { first_name: "Chan" };

  return (
    <NameContext value={user.first_name}>
      <ContextualGreeting />
    </NameContext>
  );
}

// => <h1>👋 Chan!</h1>
```

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

let MapAndSetContext = React.createContext(
  new Map([
    [
      'Taylor Swift',
      new Set(['Tortured Poets Department', 'Midnights', 'Evermore']),
    ],
  ])
);
```

`value` can be complex structures like React Elements, class components, and function components.

```jsx
let ReactElementContext = React.createContext(
  <span>React Element</span>
);

let FunctionalComponentContext = React.createContext(
  props => <span>Function Component</span>
);
```

### `value` is required on Context Providers

Where a Context is provided, the `value` prop is required.

```jsx
// NOPE
<SomeContext>
</SomeContext>

// YEP!
<SomeContext value="value is a required prop">
</SomeContext>
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

## Cascading Context

Context cascades.

Consumers use the value from the nearest `Context.Provider`.  
Where none is present, the `createContext` default value is used.

```jsx
let { Provider, Consumer } = React.createContext(
  "global default"
);

function App() {
  return (
    <>
      <Provider value="outer">
        <Consumer>
          {value => <div>{value}</div> /* "outer" */}
        </Consumer>

        <Provider value="inner">
          <Consumer>
            {value => <div>{value}</div> /* "inner" */}
          </Consumer>
        </Provider>
      </Provider>

      <Consumer>
        {value => <div>{value}</div> /* "global default" */}
      </Consumer>
    </>
  );
}
```

## Data Distribution, Not State Management

Context makes it possible to distribute data to every component in a component tree.

It's used to distribute data, not manage state.
That said, it provides the mechanism needed to state and updater functions managed by state containers.

Here's an example of a stateful container that uses Context to distribute local `state` and an `update` function.

```jsx
let StateContext = React.createContext();

class StateProvider extends React.Component {
  static defaultProps = {
    initialState: {}
  };

  update = (updater, done) => {
    this.setState(
      prevState => ({
        state:
          typeof updater === "function"
            ? updater(prevState.state)
            : updater
      }),
      done
    );
  };

  state = {
    state: this.props.initialState,
    update: this.update
  };

  render() {
    return (
      <StateContext.Provider value={this.state}>
        {this.props.children}
      </StateContext.Provider>
    );
  }
}

let App = () => (
  <StateProvider initialState={{ count: 0 }}>
    <StateContext.Consumer>
      {({ state, update }) => (
        <div>
          <div>{state.count}</div>

          <button
            type="button"
            onClick={() =>
              update(({ count }) => ({ count: count + 1 }))
            }
          >
            increment
          </button>
        </div>
      )}
    </StateContext.Consumer>
  </StateProvider>
);
```

### Modularazing Context

In the "real world", you'll likely expose Contexts via ES Modules.

```js title="person_context.jsx"
import React from "react";

export const Context = React.createContext();
```

```js title="organization_context.jsx"
import React from "react";

export const Context = React.createContext();
```

```jsx title="app.jsx"
import * as Person from "./person";
import * as Org from "./organization";

export function ContextBizCard() {
  const user = React.use(Person.Context);
  const org = React.use(Org.Context);

  return (
    <div className="business-card">
      <h1>{user.name}</h1>
      <h3>{org.name}</h3>
    </div>
  );
}

function App() {
  return (
    <Org.Context value={{ name: "ACME Co." }}>
      <Person.Context value={{ name: "Yakko" }}>
        <ContextBizCard />
      </Person.Context>
    </Org.Context>
  );
}

// => Yakko, ACME Co.
```

## A mental model for context

Props are like wires.  
Props "connect" data between components.  
Like wires, the components have to be "touching".  
Meaning that component thats *hold* data have to render components that *need* it.

Context is like a wireless.  
Context sends a "signal".  
Like wireless, components don't need to be "touching" they only need to be "in range".
Meaning that components children of `Context` can *recieve* the signal that `Context` sends.

<div style="margin-bottom: 8rem"></div>

<!--## `use` vs `useContext` hook-->

<div style="margin-bottom: 8rem"></div>

## What is Legacy Context?

Legacy Context refers to a set of APIs that were removed in React 19.  
These include class-based component context.

Read the [Legacy Context doc](https://reactjs.org/docs/legacy-context.html) for more details.

<div style="margin-bottom: 8rem"></div>

&copy; 2018 Michael Chan Some Rights Reserved

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
