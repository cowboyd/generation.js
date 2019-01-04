[![npm](https://img.shields.io/npm/v/generation.svg)](https://www.npmjs.com/package/generation)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CircleCI](https://circleci.com/gh/cowboyd/generation.js.svg?style=shield)](https://circleci.com/gh/cowboyd/generation.js)

## Generation.js

The easiest way to compose JavaScript [iterables][1] and
[generators][2], Generation lets you use all the great `Array` methods you
know and love like `filter`, `map`, `reduce` (plus many more beyond)
with two distinct advantages: They're 100% lazy, and they work with
not only Arrays, but any iterable or generator function, including
infinite datasets.

<details>
  <summary><strong>Table of Contents</strong></summary>
<!-- toc -->

- [Synopsis](#synopsis)
- [Generation](#generationsource)
- [map](#mapfn)
- [filter](#filterfn)
- [concat](#concatsource)
- [union](#unionsource)
- [intersect](#intersectsource)
- [disjunct](#disjunctsource)
- [reduce](#reducefninitial)

<!-- tocstop -->
</details>

### Synopsis

``` javascript
import { map, filter, union } from 'generation';

let todos = [
  { title: 'get milk', isCompleted: false, isInProgress: true },
  { title: 'get cookies', isCompleted: false, isInProgress: false },
  { title: 'eat snack', isCompleted: false, isInprogress: false }
]


let activeTodos = filter(todos, todo => !todo.isCompleted);
let inProgressTodos = filter(todos, todo => todo.isInProgress);
let completedTodos = filter(todos, todo => todo.isCompleted)

```

All we've done here is define the generations, but no filtering
actually happens at this point until we actually enumerate the result:


``` javascript
for (let todo of inProgressTodos) {
  console.log(todo);
}
console.log(inProgressTodos.length)
//=> { title: 'get milk', isCompleted: false, isInProgress: true }
```

Generations can be combined freely, for example if an interface is
selecting just the completed and in-progress items:

``` jsx
let visible = union(inProgressTodos, completedTodos);

let visibleComponents = map(visible, todo => <Todo todo={todo}/>)
```

### Generation(source)

Creates a `Generation` object out of the provided `source`, where
`source` is either a [generator function][2], or anything that
implements the JavaScript [iterator][1] protocol. Note that the
`Generation` object itself is iterable.

``` javascript
let integers = Generation(function*() {
  let i = 1;
  while (true) {
    yield i++;
  }
});

let [one, two, three ] = integers;
```

The `Generation` interface is the fundamental building block of
generation.js and it contains all of the methods of composition like
`map`, `filter`, `union`, etc...


``` javascript
import Generation from 'generation';

// from an iterable like array
let items = Generation([1,2,3]);

// from a generator function:
let things = Generation(function*() {
  yield 1;
  yield 2;
  yield 3;
});

```

Use the methods of the `Generation` to derive new generations from the original:

``` javascript
let items = Generation([1,2,3]).map(x => x * 2).filter(x => x <= 4);

for (let item of items) {
  console.log('item = ', item);
}

// prints:
// item = 2
// item = 4
```

Note: every method of generation can be used either as an instance method, or as
a standalone function. So both of the following are equivalent:

``` javascript
import { Generation } from 'generation';

Generation([1, 2]).map(x => x*2);
```

and

``` javascript
import { map } from 'generation';

map([1,2], x => x * 2);
```

In all of the examples, both styles are shown.

### map(fn)

Lazily map `fn` over a generation.

``` javascript
import { Generation } from 'generation';

let [...doubles] = Generation([1, 2, 3]).map(x => x * 2);
//=> [2, 4, 6]
```

### filter(fn)

Remove all elements from a generation that do not match `fn`.

``` javascript
import { Generation } from 'generation';

let [...evens] = Generation([1,2,3,4,5]).filter(x => x % 2 === 0);
//=> [2, 4]
```

``` javascript
import { filter } from 'generation';

let [...evens] = filter([1,2,3,4,5], x => x % 2 === 0);
//=> [2, 4]
```

### concat(source)

Concatenate `source` onto the end of a generation.

``` javascript
import { Generation } from 'generation';

let [...numbers] = Generation([1,2,3]).concat([4,5,6]);
//=> [1,2,3,4,5,6]
```

``` javascript
import { concat } from 'generation';

let [...numbers] = concat([1,2,3], [4,5,6]);
//=> [1,2,3,4,5,6]
```

### union(source)

Creates a `Generation` which is the distinct set union of a generation and
`source`. The resulting generation will have all the members of both sets,
but only once.

``` javascript
import { Generation } from 'generation';

let numbers = Generation([1,2,3]);
let [...together] = numbers.union([2,3, 4]);
//=> [1, 2, 3, 4]
```

``` javascript
import { union } from 'generation';
let [...numbers] = union([1,2,3], [2,3,4]);
//=> [1, 2, 3, 4]
```

### intersect(source)

Create a `Generation` which is the set intersection with `source`. The
resulting generation will contain those items which are members of
_both_.

> Note: In order to correctly compute set intersection, at least one
> of the sets must be known in its entirety. Therefore, only the
> _first_ generation can be infinite, whereas the second must be finite.

``` javascript
import { Generation } from 'generation';

let [...intersection] = Generation([ 1, 2, 3]).intersect([3,4, 4, 5, 5, 6, 7, 1]);
//=> [1, 3]
```

``` javascript
import { intersect } from 'generation';
let [...intersection] = intersect([ 1, 2, 3], [3,4, 4, 5, 5, 6, 7, 1]);
//=> [1, 3];
```

### disjunct(source)

Create a `Generation` which is the disjunctive union (also known as
exclusive union) with `source`. The resulting generation will contain
those members which belong to either, but _not both_.


``` javascript
import { Generation } from 'generation';

let [...disjunction] = Generation([ 1, 2, 3]).disjunct([3,4, 4, 5, 5, 6, 7, 1]);
//=> [2, 4, 6, 7]
```

``` javascript
import { disjunct } from 'generation';

let [...disjunction] = disjunct([ 1, 2, 3], [3,4, 4, 5, 5, 6, 7, 1]);
//=> [2, 4, 6, 7]
```

### reduce(fn, initial)

Analog to [Array#reduce][3], folds a generation into a single value,
by passing each member successively to `fn`.

``` javascript
import { Generation } from 'generation';

let sum = Generation([1,2,3]).reduce((sum, x) => sum + x, 0);
//=> 6
```

``` javascript
import { reduce } from 'generation';

let sum = reduce([1,2,3], (sum, x) => sum + x, 0);
```

> Note: will not work on infinite generations!

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_GeneratorFunction/Objects
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
