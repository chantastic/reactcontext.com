# React Context

*Updated for React 19.*

## TLDR on React Context

Use Context for *implicit*, client-only, data distribution.  
Context is an alternative props (which are *explicit* and available to both server and client components).

Context allows for component relationships similar to HTML elements `<li>` and `<ol>`.  
Here, data applied to the parent, has an implicit impact on how children render.

```jsx title="an HTML comparison"
<ol start="10">
  <li>Tenth</li>
  <li>Eleventh</li>
  <li>Twelfth</li>
</ol>
```

Context makes a value available to all descendents.

```jsx title="parent providing context"
<UserContext value={user}>
  <UserAvatar />
  <UserName />
</UserContext>
```

Those descendents must opt in to Context.

```jsx title="child component using context"
function UserAvatar() {
  let user = React.use(UserContext);

  return <img src={user.avatar_url} />;
}
```

Unlike HTML, Context does not require direct parent-child relationships.  
Contexts can be sent and recieved *"thru"* intermediate elements, components, and context providers.

```jsx title="child composing two contexts"
<OrgContext value="ACME Co.">
  <PersonContext value="Yakko">
    <div class="my-layout">
      <OrganizationBizCard /><!-- Yakko, ACME Co. -->
    </div>
  </PersonContext>
</OrgContext>
```

This doc is a guide for implementing Context in React.

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

## Table of contents

## Real-world React Context (a "shit" example)

*Shit* is fine word in my house. But my mom hates it.
So I tell my kids to use another word when around grandma.  

Here's how I'd implement that with React Context.

```jsx
// It's ok to say "shit" as a default expletive
let ExpletiveContext = React.createContext("shit");

// But context is important. Learn to account for it.
function ContextualExclamation() {
  let word = React.use(ExpletiveContext);

  return <span>Oh {word}!</span>;
}

// When at Grandma's house, say "snap" instead
function AtGrandmasHouse() {
  return (
    <ExpletiveContext value="snap">
      <ContextualExclamation />
    </ExpletiveContext>
  )
);

// => <span>Oh snap!</span>
```

## Context is a 3-part system: create, use, and provide

Context is a 3-part system:
**create**, **use**, **provide**.

**Create** context with `React.createContext`.

```jsx title="create context"
let NameContext = React.createContext("Guest");
```

**Use** context with `React.use`.

```jsx title="use context"
function ContextualGreeting() {
  let name = React.use(NameContext);

  return <h1>👋 {name}!</h1>;
}
```

**Provide** context by rendering the `Context` with a `value` prop.  

```jsx title="provide context value"
<NameContext value="Chan">
  <ContextualGreeting />
</NameContext>

// => <h1>👋 Chan!</h1>
```

## Context is an alternative to props that is implicit

Context is most useful when many components require the same data.

Here's an example:

```jsx title="app.jsx"
<>
  <UserAvatar user={user} />
  <UserTimeline user={user} />
  <UserRelatedPosts user={user} />
</>
```

These components may, in turn, also pass the same data to their children.

```jsx title="user_avatar.jsx" {9}
function UserRelatedPosts({ user }) {
  const related_posts = getRelatedPosts(user);

  return (
    <ul>
      {related_posts.map(post => (
        <li>
          <span>{post.body}</span>
          <UserMiniProfile user={user} />
        </li>
      ))}
    </ul>
  );
}
```

With Context, the data is set once on the parent.

```jsx title="app.jsx" ins=/(UserContext.*)>/ del=/ user={user}/
<UserContext value={user}>
  <UserAvatar user={user} />
  <UserTimeline user={user} />
  <UserRelatedPosts user={user} />
</UserContext>
```

And descendent components opt into this data with `use`.

```jsx title="user_avatar.jsx" ins=/const user =.+/ del=/{ user }/
function UserAvatar({ user }) {
  const user = React.use(UserContext);

  return <img src={user.avatar_url} />;
}
```

## Think of props like wired and Context like wireless (a mental model)

**Props are like wires.**  
They "connect" data between components.  
Like wires, the components have to be "touching".  
Meaning that components *holding* data have to render components that *need* it.

**Context is like a wireless.**  
It sends a "signal" that is received by children.  
Like wireless, components don't need to be "touching" they only need to be "in range".
Meaning that children of context can *recieve* the signal that context sends.

## Context is available to all descendents (indifferent to how deeply nested)

Every descendent/child of a Context provider can observe Context's value.

```jsx title="any descendent can recieve context" {4, 7, 10}
function App() {
  return (
    <UserContext value={user}>
      {/* UserContext can be received here… */}

      <div className="app-layout">
        {/* also here… */}

        <div className="page-layout">
          {/* and anywhere in this tree… */}
        </div>
      </div>
    </UserContext>
  );
}
```

## Context is composable

Contexts can be chidren of other Contexts. Order doesn't matter much unless it matters to your app.

```jsx title="two contexts; one component"
let OrgContext = React.createContext();
let PersonContext = React.createContext();

function App() {
  return (
    <OrgContext value="ACME Co.">
      <PersonContext value="Yakko">
        <UserOrgBizCard /><!-- Yakko, ACME Co. -->
      </PersonContext>
    </OrgContext>
  );
}

function UserOrgBizCard() {
  const org_name = React.use(OrgContext);
  const person_name = React.use(PersonContext);

  return (
    <div className="business-card">
      {person_name}, {org_name}
    </div>
  );
}
```

## Context can not be sent "over the wire" (it's not available to the server)

Context is only available to client components.  
Server components cannot recieve context.

## Context is used to implement the compound components pattern

The "compound component" pattern describes components that are isolated but interdependent.
In HTML, `li` and `ol` are interdepedent. As are `option` and `select`.

This same interdependent relationship can be implemented using React Context.

```jsx title="app.jsx"
import * as React from "react";
import * as User from "./user";

function App() {
  const [editing, setEditing] = React.useState(false);

  const [user, setUser] = React.useState({
    name: "Guest",
    avatar_url: "https://example.com/avatar.png"
  });

  return (
    <User.Context value={user}>
      {isEditing
        ? <User.Form
            action={formData => {
              setUser({ name: formData.get('name') });
              setEditing(false);
            }}
          />
        : <>
            <User.Avatar />
            <User.Name />
            <button onClick={() => setEditing(true)}>
              Edit
            </button>
          </>
      }
    </User.Context>
  );
}
```

<div style="margin-bottom: 2rem"></div>

```jsx title="user.jsx"
import * as React from "react";

export const Context = React.createContext();

function Avatar() {
  const user = React.use(UserContext);

  return <img className="user-avatar" src={user.avatar_url} />
}

function Name() {
  const user = React.use(UserContext);

  return (
    <span className="user-name">{user.name}</span>
  );
}

function Form({ action }) {
  const user = React.use(UserContext);

  return (
    <form
      className="user-form"
      action={action}
    >
      <input type="text" name="name" defaultValue={user.name} />
    </form>
  );
}
```

## Context can be used to implement distributed state management (with useReducer)

Context makes it possible to distribute data to every component in a component tree.

It's used to distribute data, not manage state.
That said, it provides the mechanism needed to both distribute state and dispatch updates.

Here's an minimum connection of the two.

```jsx title="app.jsx"
import * as React from 'react';
import * as ClickCount from './click_count';

function App() {
  const clickState = React.useReducer(
    ClickCount.reducer,
    ClickCount.initialState
  );

  return (
    <ClickCount.Context value={clickState}>
      <strong>
        <ClickCount.Show />
      </strong>
      <br />
      <ClickCount.IncrementAction />
    </ClickCount.Context>
  );
}
```

```jsx title="click_count.jsx"
import * as React from 'react';

export const initialState = { count: 0 };

export function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

export const Context = React.createContext();

export function Show() {
  let [state] = React.use(Context);

  return <>{state.count}</>;
}

export function IncrementAction() {
  let [, dispatch] = React.use(Context);

  return (
    <button onClick={() => dispatch({ type: 'increment' })}>
      Increment count
    </button>
  );
}
```

## Any JavaScript value can be be shared via Context

Context can take any shape.  
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

## You can set a default `value` when creating Context

Context can be initialized with a default `value`.
When a component attempts to `use` Context, but no corresponding `Context` is found, a default value will be used.

```jsx
let UserContext = React.createContext("Guest");

function UserGreeting () {
  let name = React.use(UserContext);

  return <span>Hi {name}!</span>;
}

let App = props => (
  <div>
    <ContextGreeting />
    {/* => Hi Guest! */}

    <UserContext value="Bulbasaur">
      <ContextGreeting />
      {/* => Hi Bulbasaur! */}
    </UserContext>
  </div>
);
```

## Context can be used inline with the render prop pattern

Context exposes a `Consumer` component for inline context use. This allows context to be consumed without creating new components.

```jsx
<SomeContext value="some value">
  <SomeContext.Consumer>
    {value => <span>{value}</span>}
  </SomeContext.Consumer>
</SomeContext>
```


Here's an example where multiple contexts are created and used.

```jsx
const OrgContext = React.createContext();
const PersonContext = React.createContext();

function App () {
  return (
    <OrgContext value="ACME Co.">
      <PersonContext value="Yakko">
        <OrgContext.Consumer>
          {organization => (
            <PersonContext.Consumer>
              {person => (
                <span>
                  {person}, {organization}
                </span>
              )}
            </PersonContext.Consumer>
          )}
        </Organization.Consumer>
      </PersonContext>
    </OrgContext>
  )
}

// => Yakko, ACME Co.
```

## Context can cascade

Consumers use the value from the nearest `Context`.  
Where none is present, the `createContext` default value is used.

```jsx
const MyContext = React.createContext("default");

function ShowContextValue() {
  const value = React.use(MyContext);

  return <>{value}</>;
}

function App() {
  return (
    <>
      <MyContext value="outer">
        <ShowContext /> {/* "outer" */}

        <MyContext value="inner">
          <ShowContext /> {/* "inner" */}
        </MyContext>
      </Provider>

      <ShowContext /> {/* "default" */}
    </>
  );
}
```

## What is Legacy Context?

Legacy Context refers to a set of APIs that were removed in React 19.  
These include class-based component context.

Read the [Legacy Context doc](https://reactjs.org/docs/legacy-context.html) for more details.

<div style="margin-bottom: 8rem"></div>

&copy; 2024 Michael Chan, Some Rights Reserved

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
