# WIP: React Context

**THIS IS DRAFT AF. DON'T READ IT IF YOU DON'T LIKE CONFUSION.**

## TOC

* [Does Context "replace" or "deprecate" Redux?](#does-context-replace-or-deprecate-redux)

## Does Context "replace" or "deprecate" Redux?

No.

Not even a little.

Here's how [Redux](https://redux.js.org/) describes itself:

> Redux is a predictable state container for JavaScript apps.
>
> It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test... it provides a great developer experience, such as live code editing combined with a time traveling debugger.

React implements an architecture that is not React-specific.
This is an overwhelming value to companies that use multiple UI frameworks.
Angular, Ember, Vue, Backbone, no framework—Redux can manage state for all apps.
You can't achieve this same result with Context.
While you might use React's new Context API to implement the same architecture, it will always be React-spefic.

The bindings for Redux—[react-redux](https://github.com/reactjs/react-redux)—use the existing Context to `Connect` React components to Redux Stores—consuming data and dispatch actions.
While React's new Context API exposes a stable Context API,
it does not fundamentally change how react-redux has always worked.

In the future, Redux will continue implementing this architecture using React's new Context API.

The benefit of Redux is its framework agnosticism, vibrant community, powerfully tooling, tremendous documentation, and .
These are not things "replaced" or "deprecated" by the announcement of a stable Context API.