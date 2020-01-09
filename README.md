# WIP: React Context

**THIS IS DRAFT AF. DON'T READ IT IF YOU DON'T LIKE CONFUSION.**

## TOC

- [Data Distribution, Not State Management](#data-distribution-not-state-management)

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
          typeof updater === "function" ? updater(prevState.state) : updater
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
            onClick={() => update(({ count }) => ({ count: count + 1 }))}
          >
            increment
          </button>
        </div>
      )}
    </StateContext.Consumer>
  </StateProvider>
);
```
