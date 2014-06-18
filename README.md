# jvent.js [![Build Status](https://secure.travis-ci.org/pazguille/jvent.png)](http://travis-ci.org/pazguille/jvent) [![devDependency Status](https://david-dm.org/pazguille/jvent/dev-status.png)](https://david-dm.org/pazguille/jvent#info=devDependencies)

>  EventEmitter Class for the browser based on NodeJS EventEmitter.

## Installation

    $ component install pazguille/jvent

See: https://github.com/component/component

### Standalone
Also, you can use the standalone version without components.
```html
<script src="../dist/jvent.js"></script>
```

## How-to

First, requires Jvent:
```js
var Jvent = require('jvent');
```

Creates a new instance:
```js
var emitter = new Jvent();
```

Now, defines a listener:
```js
function listener(arg1, arg2) {
    alert(arg1 + ' '+ arg2);
})
```

Then, adds a new event live with a listener:
```js
emitter.on('live', listener);
```

Emitsthe event with some data:
```js
emitter.emit('live', 'param1', 'param2');
```

## API

### Jvent#on(event, listener)
Adds a `listener` to the collection for a specified `event`.
- `event` - The name of the event you want to add.
- `listener` - Listener you want to add from given event.

```js
emitter.on('live', listener);
```

### Jvent#once(event, listener)
Adds a one time `listener` to the collection for a specified `event`. It will execute only once.
- `event` - The name of the event.
- `listener` - Listener you want to add from the given event.

```js
emitter.once('live', listener);
```

### Jvent#off(event, listener)
Removes a `listener` from the collection for a specified `event`.
- `event` - The name of the event.
- `listener` - Listener you want to remove from the given event.

```js
emitter.off('live', listener);
```

### Jvent#removeAllListeners(event)
Removes all `listeners` from the collection for a specified `event`.
- `event` - The name of the event you want to remove.

```js
emitter.removeAllListeners('live');
```

### Jvent#listeners(event)
Returns all `listeners` from the collection for a specified `event`.
- `event` - The name of the event.

```js
emitter.listeners('live');
```

### Jvent#emit(event, [arg1], [arg2], [...])
Execute each of the `listeners` collection in order with the given parameters.
All emitters emit the event `newListener` when new listeners are added.
- `event` - The name of the event you want to emit.

```js
emitter.emit('live', 'data1', 'data2');
```

## Maintained by
- Guille Paz (Front-end developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)

## License
Licensed under the MIT license.

Copyright (c) 2012 [@pazguille](http://twitter.com/pazguille).
