(function (window) {
    'use strict';

    var Object = window.Object,
        Array = window.Array,
        isArray = (function () {
            if (typeof Array.isArray === 'function') {
                return Array.isArray;
            }

            return function (obj) {
                return (Object.prototype.toString.call(obj) === '[object Array]');
            };
        }());


    function Jvent() {
        this.collection = {};
        this.maxListeners = 10;
    }

    /**
     * Adds a listener to the collection for a specified event.
     * @public
     * @function
     * @name Jvent#addListener
     * @param {string} event Event name.
     * @param {function} listener Listener function.
     * @param {boolean} once Listener function will be called only one time.
     * @example
     * // Will add a event listener to the "ready" event
     * var startDoingStuff = function (event, param1, param2, ...) {
     *     // Some code here!
     * };
     *
     * me.addListener("ready", startDoingStuff);
     * // or
     * me.on("ready", startDoingStuff);
     */
    Jvent.prototype.addListener = function (event, listener, once) {

        if (event === undefined) {
            throw new Error('jvent - "addListener(event, listener)": It should receive an event.');
        }

        if (listener === undefined) {
            throw new Error('jvent - "addListener(event, listener)": It should receive a listener function.');
        }

        var collection = this.collection;

        listener.once = once || false;

        if (collection[event] === undefined) {
            collection[event] = [];
        }

        if (collection[event].length + 1 > this.maxListeners && this.maxListeners !== 0) {
            throw new Error('Warning: So many listeners for an event.');
        }

        collection[event].push(listener);

        // This event is emitted any time someone adds a new listener.
        this.emit('newListener');

        return this;
    };


    Jvent.prototype.on = Jvent.prototype.addListener;

    /**
     * Adds a one time listener to the collection for a specified event. It will execute only once.
     * @public
     * @function
     * @name Jvent#once
     * @param {string} event Event name.
     * @param {function} listener Listener function.
     * @returns itself
     * @example
     * // Will add a event handler to the "contentLoad" event once
     * me.once("contentLoad", startDoingStuff);
     */
    Jvent.prototype.once = function (event, listener) {

        this.on(event, listener, true);

        return this;
    };

    /**
     * Removes a listener from the collection for a specified event.
     * @public
     * @function
     * @name Jvent#removeListener
     * @param {string} event Event name.
     * @param {function} listener Listener function.
     * @returns itself
     * @example
     * // Will remove event handler to the "ready" event
     * var startDoingStuff = function () {
     *     // Some code here!
     * };
     *
     * me.removeListener("ready", startDoingStuff);
     * // or
     * me.off("ready", startDoingStuff);
     */
    Jvent.prototype.removeListener = function (event, listener) {
        if (event === undefined) {
            throw new Error('jvent - "removeListener(event, listener)": It should receive an event.');
        }

        if (listener === undefined) {
            throw new Error('jvent - "removeListener(event, listener)": It should receive a listener function.');
        }

        var listeners = this.collection[event],
            j = 0,
            len;

        if (isArray(listeners)) {
            len = listeners.length;
            for (j; j < len; j += 1) {
                if (listeners[j] === listener) {
                    listeners.splice(j, 1);
                    break;
                }
            }
        }

        return this;
    };

    Jvent.prototype.off = Jvent.prototype.removeListener;

    /**
     * Removes all listeners from the collection for a specified event.
     * @public
     * @function
     * @name Jvent#removeAllListeners
     * @param {string} event Event name.
     * @returns itself
     * @example
     * me.removeAllListeners("ready");
     */
    Jvent.prototype.removeAllListeners = function (event) {
        if (event === undefined) {
            throw new Error('jvent - "removeAllListeners(event)": It should receive an event.');
        }

        delete this.collection[event];

        return this;
    };

    /**
     * Increases the number of listeners. Set to zero for unlimited.
     * @public
     * @function
     * @name Jvent#setMaxListeners
     * @param {number} n Number of max listeners.
     * @returns itself
     * @example
     * me.setMaxListeners(20);
     */
    Jvent.prototype.setMaxListeners = function (n) {
        if (isNaN(n)) {
            throw new Error('jvent - "setMaxListeners(n)": It should receive a number.');
        }

        this.maxListeners = n;

        return this;
    };

    /**
     * Returns all listeners from the collection for a specified event.
     * @public
     * @function
     * @name Jvent#listeners
     * @param {string} event Event name.
     * @returns Array
     * @example
     * me.listeners("ready");
     */
    Jvent.prototype.listeners = function (event) {
        if (event === undefined) {
            throw new Error('jvent - "listeners(event)": It should receive an event.');
        }

        return this.collection[event];
    };

    /**
     * Execute each item in the listener collection in order with the specified data.
     * @name Jvent#emit
     * @public
     * @protected
     * @param {string} event The name of the event you want to emit.
     * @param {...object} var_args Data to pass to the listeners.
     * @example
     * // Will emit the "ready" event with "param1" and "param2" as arguments.
     * me.emit("ready", "param1", "param2");
     */
    Jvent.prototype.emit = function () {
        var args = Array.prototype.slice.call( arguments, 0 ), //converted to array
            event = args[0],
            listeners,
            i,
            len;

        if (event === undefined) {
            throw new Error('jvent - "emit(event)": It should receive an event.');
        }

        if (typeof event === 'string') {
            event = {'type': event};
        }

        if (!event.target) {
            event.target = this;
        }

        if (isArray(this.collection[event.type])) {
            listeners = this.collection[event.type];
            i = 0;
            len = listeners.length;
            
            var listenerArgs = args.splice(1); //remove event name

            for (i; i < len; i += 1) {
                listeners[i].apply(this, listenerArgs);

                if (listeners[i].once) {
                    this.off(event.type, listeners[i]);
                    len -= 1;
                    i -= 1;
                }
            }
        }

        return this;
    };

    /**
     * Expose Jvent
     */
    // AMD suppport
    if (typeof window.define === 'function' && window.define.amd !== undefined) {
        window.define('Jvent', [], function () {
            return Jvent;
        });

    // CommonJS suppport
    } else if (typeof module !== 'undefined' && module.exports !== undefined) {
        module.exports = Jvent;

    // Default
    } else {
        window.Jvent = window.EventEmitter = Jvent;
    }
}(this));