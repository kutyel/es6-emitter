# es6-emitter

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

[![Node version](https://img.shields.io/node/v/es6-emitter.svg?style=flat-square)](https://www.npmjs.org/package/es6-emitter)
[![Build Status](https://img.shields.io/travis/kutyel/es6-emitter/master.svg?style=flat-square)](https://travis-ci.org/kutyel/es6-emitter)
[![Coverage Status](https://img.shields.io/coveralls/kutyel/es6-emitter.svg?style=flat-square)](https://coveralls.io/github/kutyel/es6-emitter)
[![Dependency status](https://img.shields.io/david/kutyel/es6-emitter.svg?style=flat-square)](https://david-dm.org/kutyel/es6-emitter)
[![Dev Dependencies Status](https://img.shields.io/david/dev/kutyel/es6-emitter.svg?style=flat-square)](https://david-dm.org/kutyel/es6-emitter#info=devDependencies)
[![NPM Status](https://img.shields.io/npm/dm/es6-emitter.svg?style=flat-square)](https://www.npmjs.org/package/es6-emitter)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/flaviocorpa)

> Smallest event emitter for JavaScript with all the power of ES6 Maps!

## Install

```bash
$ npm install es6-emitter --save
```

## Usage

```javascript
const Emitter = require('es6-emitter');

const emitter = new Emitter();
```

## API

### subscribe (name, callback)

Allows you to add subscriptions to your emitter given a certain name, **multiple subscriptions** under the same name are allowed!

```js
const sub1 = emitter.subscribe('myEvent', foo => console.log('a callback!'));

const sub2 = emitter.subscribe('myEvent', (bar, baz) => console.log('another callback!'));

sub1(); // releases the first subscription
```

**Returns** a function to release the subscription while the others remain intact.

#### name

*Required*<br>
Type: `any`

Can be literally [any](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) type, and corresponds to the name of the event that you want the Emitter to subscribe to.

#### callback

*Required*<br>
Type: `function`

Side effect that you want to associate with the name of the event.

### emit (name[, args])

Allows you to emit any subscription added to the emitter, with any number of arguments.

```js
emitter.emit('myEvent', 1, '2', null, () => 4);
```

**Returns** an array with every return value for each subscription callback.

```js
const s1 = emitter.subscribe('otherEvent', () => 1);
const s2 = emitter.subscribe('otherEvent', () => 2);
const s3 = emitter.subscribe('otherEvent', () => true);
const result = emitter.emit('otherEvent'); // > [1, 2, true]
```

#### name

*Required*<br>
Type: `any`

Just as in the `subscribe` function, this is the `name` of the event you want to emit.

#### args

Any number of values of `any` type to be passed to the subscription functions.

## ES6 Map Awesomeness ✨

Thanks to **ES Maps** goodness, the `name` of the event subscribed can be literally *anything*, even another function! 😱

```js
const em = new Emitter();

const eventObject = { name: 'click', debounce: 300 };
const eventFunction = e => console.log(e);

const sub1 = em.subscripbe(NaN, () => 'not a number');
const sub2 = em.subscribe(eventObject, () => 'called with an object!');
const sub3 = em.subscribe(eventFunction, () => 'called with a function!');

em.emit(NaN); // > ['not a number']
em.emit(eventObject); // > ['called with an object!']
em.emit(eventFunction); // > ['called with a function!']
```

## License

MIT © [Flavio Corpa](https://github.com/kutyel).
