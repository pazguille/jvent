# Jvent

  Another EventEmitter Class for the browser based on NodeJS EventEmitter.

## Installation

    $ component install pazguille/jvent

See: https://github.com/component/component

## API

### Jvent#addListener(event, listener, once)
### Jvent#on(event, listener, once)
Adds a listener to the collection for a specified event.

### Jvent#once(event, listener)
Adds a one time listener to the collection for a specified event. It will execute only once.

### Jvent#removeListener(event, listener)
### Jvent#off(event, listener)
Removes a listener from the collection for a specified event.

### Jvent#removeAllListeners(event)
Removes all listeners from the collection for a specified event.

### Jvent#setMaxListeners(n)
Removes all listeners from the collection for a specified event.

### Jvent#listeners(event)
Returns all listeners from the collection for a specified event.

### Jvent#emit(event, [arg1], [arg2], [...])
Execute each of the listener collection in order with the data object.
All EventEmitters emit the event 'newListener' when new listeners are added.

## How-to

```js
// Create a new instance
var obj = new Jvent();

// Create a listener
var fn = function () {};

// Methods
obj.once('born', fn);
obj.addListener('live', fn);
obj.emit('live', 'param1', 'param2');
obj.removeListener('live', fn);
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