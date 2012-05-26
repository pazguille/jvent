(function (exports) {
	"use strict";

	var Events = function () {
		var that = this,
			collection = {},
			maxListeners = 10;

		/**
		* Adds a listener to the collection for a specified event.
		* @public
		* @function
		* @name Events#addListener
		* @param {string} event Event name.
		* @param {function} listener Listener function.
		* @example
		* // Will add a event listener to the "ready" event
		* var startDoingStuff = function () {
		*     // Some code here!
		* };
		*
		* me.addListener("ready", startDoingStuff);
		* // or
		* me.on("ready", startDoingStuff);
		*/
		this.addListener = this.on = function (event, listener) { // Event: 'newListener'
			if (typeof collection[event] === "undefined") {
				collection[event] = [];
			}

			if (collection[event].length + 1 > maxListeners) {
 				throw "Warning: So many listeners for an event.";
			}
			
			collection[event].push(listener);

			if (event !== "newListener") {
				this.emit("newListener");
			}

			return this;
		};

		/**
		* Adds a one time listener to the collection for a specified event. It will execute only once.
		* @public
		* @function
		* @name Events#once
		* @param {string} event Event name.
		* @param {function} listener Listener function.
		* @returns itself
		* @example
		* // Will add a event handler to the "contentLoad" event once
		* me.once("contentLoad", startDoingStuff);
		*/
		this.once = function (event, listener) {

			var fn = function (event, data) {
				listener.call(this, event, data);
				this.off(event.type, fn);
			};

			this.on(event, fn);

			return this;
		};

		/**
		* Removes a listener from the collection for a specified event.
		* @public
		* @function
		* @name Events#removeListener
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
		this.removeListener = this.off = function (event, listener) {
			if (collection[event] instanceof Array) {

				if (listener) {
					var listeners = collection[event],
						j = 0,
						len = listeners.length;

					for (j; j < len; j += 1) {
						if (listeners[j] === listener) {
							listeners.splice(j, 1);
							break;
						}
					}
				}
			}

			return this;
		};

		/**
		* Removes all listeners from the collection for a specified event.
		* @public
		* @function
		* @name Events#removeListener
		* @param {string} event Event name.
		* @returns itself
		* @example
		* me.removeAllListeners("ready");
		*/
		this.removeAllListeners = function (event) {
			delete collection[event];

			return this;
		};

		/**
		* Increases the number of listeners. Set to zero for unlimited.
		* @public
		* @function
		* @name Events#removeListener
		* @param {number} n Number of max listeners.
		* @returns itself
		* @example
		* me.setMaxListeners(20);
		*/
		this.setMaxListeners = function (n) {
			maxListeners = n;

			return this;
		};

		/**
		* Returns all listeners from the collection for a specified event.
		* @public
		* @function
		* @name Events#removeListener
		* @param {string} event Event name.
		* @returns Array
		* @example
		* me.listeners("ready");
		*/
		this.listeners = function (event) {
			return collection[event];
		};

		/**
		* Execute each of the listener collection in order with the data object.
		* @name Events#Emit
		* @public
		* @protected
		* @param {string} event The event name you want to emit.
		* @param {object} data 
		* @example
		* // Will add a event handler to the "ready" event
		* me.emit("ready", {});
		*/
		this.emit = function (event, data) {

			if (typeof event === "string") {
				event = { "type": event };
			}

			if (!event.target) {
				event.target = this;
			}

			if (!event.type) {
				throw new Error("Event object missing 'type' property.");
			}

			if (collection[event.type] instanceof Array) {
				var listeners = collection[event.type],
					i = 0,
					len = listeners.length;

				for (i; i < len; i += 1) {
					listeners[i].call(this, event, data);
				}
			}

			return this;

		};

		return this;
	};

	exports.jvent = exports.jVent = exports.jv = exports.EventEmiter = Events;

}(window));