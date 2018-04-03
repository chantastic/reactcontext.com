# Let's talk about Context

**THIS IS DRAFT AF. READ WITH CAUTION.**

## TOC

* [How to Read This](#how-to-read-this)
* [A "shit" Example](#a-shit-example)

## How to Read This

This page is a supplement to the React doc on Context—found [here](https://reactjs.org/docs/context.html).

It's a collection of my motions that helped me understand Context.
Your mileage may vary.

### Thanks

This thing was much worse (read "wrong") before [Dan Abramov](https://twitter.com/dan_abramov/) reviewed it.

Thanks Dan for your patience, empathy, and clarity.

## A "Shit" Example

This is a shit example of Context.
Shit because it uses "shit" as an illustration and because it's simplistic.

Don't worry, well get to **the why** after we cover **the how**.

### "Shit" is a fine word

My kids are allowed tasteful explitives.
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

// What do you say when anything bad or exciting happens?
let VisitToGrandmasHouse = () => (
  <GrandmasHouse>
    <ContextualExclamation />
  </GrandmasHouse>
);

// => Oh poop!
```

---

&copy; 2018 Michael Chan Some Rights Reserved

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
