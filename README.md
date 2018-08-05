## Generation.js

A stable, composable query mechnism for JavaScript iterators and
generators.

Generation lets you describe relationships between any kind of
iterable data, without actually doing any interation until you need it.

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
