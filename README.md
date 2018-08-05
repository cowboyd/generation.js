## Generation.js

A stable, composable query mechnism for JavaScript iterators and
generators.

Generation lets you describe relationships between any kind of
iterable data, without actually doing any interation until you need
it.

All query functions can take any object that implements the JavaScript
[iteration protocol][1], or any no-arg function that returns an object
that implements the iteration protocol such as a
[`GeneratorFunction`][2].

Quick example:

``` javascript
import { map, filter, union, query } from 'generation';

let todos = [
  { title: 'get milk', isCompleted: false, isInProgress: true },
  { title: 'get cookies', isCompleted: false, isInProgress: false },
  { title: 'eat snack', isCompleted: false, isInprogress: false }
]


let activeTodos = filter(todos, todo => !todo.isCompleted);
let inProgressTodos = filter(todos, todo => todo.isInProgress);
let completedTodos = filter(todos, todo => todo.isCompleted)

```

All we've done here is define the queries, but no filtering actually happens at this point until we actually
enumerate the result:


``` javascript
for (let todo of inProgressTodos) {
  console.log(todo);
}
console.log(inProgressTodos.length)
//=> { title: 'get milk', isCompleted: false, isInProgress: true }
```

Queries can be combined freely, for example if an interface is
selecting just the completed and in-progress items:

``` jsx
let visible = union(inProgressTodos, completedTodos);

let visibleComponents = map(visible, todo => <Todo todo={todo}/>)
```

### Stability

All queries are immutable and stable. What this means is that no
matter how many times you iterate over the same query object, you will
_always_ get the same result, even if the generator function from
which it was originally derived would yield a different set of objects
given a second go-round. This is especcially desirable behavior in the
context of a continually re-rendering user interface because it _equates
object identity with query content_. In other words, if a query object
has not changed, then there is no need to re-render it.

In order to determine if a query has in fact changed, every query has
a `recompute` method which will return a _new_ query if it has, but
return the _old_ query if it hasn't.

``` javascript
activeTodos.recompute() === activeTodos //=> true
todos[0].isCompleted = true;
activeTodos.recompute() === activeTodos //=> false
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/GeneratorFunction
