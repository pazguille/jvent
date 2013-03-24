# Jvent

  Another EventEmitter Class for the browser based on NodeJS EventEmitter.

## Installation

    $ component install pazguille/jvent

See: https://github.com/component/component

### Standalone
Also, you can use the standalone version without components.
```html
<script src="../standalone/jvent.js"></script>
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
emitter.addListener('live', listener);
```

Emitsthe event with some data:
```js
emitter.emit('live', 'param1', 'param2');
```

## API

### Jvent#addListener(event, listener, once)
### Jvent#on(event, listener, once)
Adds a `listener` to the collection for a specified `event`.
- `event` - The name of the event you want to add.
- `listener` - Listener you want to add from given event.
- `once` (optional) - Indicates if the given listener should be executed only once.

```js
emitter.addListener('live', listener);

// or

emitter.on('live', listener);
```

### Jvent#once(event, listener)
Adds a one time `listener` to the collection for a specified `event`. It will execute only once.
- `event` - The name of the event.
- `listener` - Listener you want to add from the given event.

```js
emitter.once('live', listener);
```

### Jvent#removeListener(event, listener)
### Jvent#off(event, listener)
Removes a `listener` from the collection for a specified `event`.
- `event` - The name of the event.
- `listener` - Listener you want to remove from the given event.

```js
emitter.removeListener('live', listener);

// or

emitter.off('live', listener);
```

### Jvent#removeAllListeners(event)
Removes all `listeners` from the collection for a specified `event`.
- `event` - The name of the event you want to remove.

```js
emitter.removeAllListeners('live');
```

### Jvent#setMaxListeners(n)
By default Jvent will print a warning if more than 10 `listeners` are added for a particular `event`. This function allows that to be increased it. Set to zero for unlimited.
- `n` - The maximum number of listeners.

```js
emitter.setMaxListeners(20);
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
- `channel` - The name of the event you want to emit.

```js
emitter.emit('live', 'data1', 'data2');
```

## Contact
- Guillermo Paz (Frontend developer - JavaScript developer | Web standards lover)
- E-mail: [guille87paz@gmail.com](mailto:guille87paz@gmail.com)
- Twitter: [@pazguille](http://twitter.com/pazguille)
- Web: [http://pazguille.me](http://pazguille.me)


## License
### The MIT License
Copyright (c) 2012 [@pazguille](http://twitter.com/pazguille)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.