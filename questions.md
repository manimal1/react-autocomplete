## 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

The difference between React.Component and React.PureComponent is how they compare props and state. A Component will not compare the props. It will simply rerender if there is a state or prop change or the parent rerenders. A PureComponent will do a shallow comparison of the props and state and will only rerender if either change - i.e. `shouldComponentUpdate()`. You should only use a PureComponent when that component will always render the same results given the same props or state. Any children of a PureComponent should also be pure. If you try to pass down a change that fails a shallow comparison, the app will not perform as expected and could indeed break.

## 2. Context + ShouldComponentUpdate might be dangerous. Can you think of why that is?

As per Reacts own documentation:

> The propagation from Provider to its descendant consumers (including `.contextType` and `useContext`) is not subject to the shouldComponentUpdate method, so the consumer is updated even when an ancestor component skips an update.

i.e. if there is state that should be in sync between an ancestor and a Context's consumer, it could become out of sync if that ancestor somehow skips that update.

## 3. Describe 3 ways to pass information from a component to its PARENT.

You can lift state by using `setState` defined in a parent that is passed down through props to a child. So a child could call the setState function that would then update the state in the parent. You can also use Context to pass information from a child to the parent, or set up some kind of state manager like Redux that could perform this function as well.

## 4. Give 2 ways to prevent components from re-rendering.

- If you are using functional components you can use React.memo(), which achieves the same results as a class based React.PureComponent. It will prevenet rerenderings if there are no changes to the props.
- If you have some logic that computes a value, and the component rerenders based on that value, you can use the useMemo hook to only compute it once and cache the value. It will only update if the inputs update.
- If you have a memoized component that receives a function as a prop from the outer component, it will still rerender every time the outer component does unless you use the useCallback hook to memoize the function being passed in. So this too can stop additional rerenders.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

Fragments are used to group lists of children together, as in react every component needs a parent wrapper element. But let's say you have a list of table cells (td) being returned by a component. If you wrap them with a div it will break the table. But using a Fragment solves this issue, as you can group them in the frament instead of an actual parent element. It also eliminates unnecessary wrapper divs. They could break the app if you use them when a component is expecting single child and not multiple children - i.e. for styling perhaps.

## 6. Give 3 examples of the HOC pattern.

`const NavbarWithRouter = withRouter(Navbar);`
`const CommentWithRelay = Relay.createContainer(Comment, config);`
`const ConnectedComment = connect(commentSelector, commentActions)(CommentList);`

## 7. what's the difference in handling exceptions in promises, callbacks and async...await.

You can use different patterns to handle exceptions. `Async...await` uses promises, so they are similar. You can `.catch()` them both. Or, some prefer to use `try...catch` with async. The important thing to note is that each will throw an error if the promise is rejected, which can then be handled. With callbacks the standard is to use error-first callbacks, where the callback's first argument returns either an error or null, and if it is an error it acts accordingly.

## 8. How many arguments does setState take and why is it async.

SetState accepts 2 argument. The second argument is an optional callback function. It is async because it allows all components to call setState in their event handlers before starting to re-render. As I understand it, it then somehow removes unnecessary invocations, which boosts performance.

## 9. List the steps needed to migrate a Class to Function Component.

1. Change the class declaration into a function
2. Remove `render()` and simply `return()` the view
3. Update state and lifecycle methods using `usestate()` and `useEffect()` accordingly.
4. If the class is a `PureComponent`, make sure to build the function component with `React.memo`

## 10. List a few ways styles can be used with components.

You can inline styles with the style prop. You can pass in a className string property, and then style it using css globals. You can use css-modules and pass in style variables that correspond to the created style. You can also use CSS-in-JS or Sass or less.

## 11. How to render an HTML string coming from the server.

You can use `dangerouslySetInnerHTML`, which is dangerous because you can introduce XSS attacks into your app.
