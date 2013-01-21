describe('Jvent', function () {
	var emitter,
		listener,
		listener2;
		//Jvent = require('jvent');

	beforeEach(function() {
		emitter = new Jvent();

		listener = jasmine.createSpy('listener'),
		listener2 = jasmine.createSpy('listener2');
	});

	describe('Instance', function() {
		it('Should return an instance of Jvent', function () {
			expect(emitter).toBeDefined();
			expect(typeof emitter).toEqual("object");
			expect(emitter instanceof Jvent).toBeTruthy();
		});
	});

	describe('Public methods', function() {
		it('Should be defined "addListener" and "on" methods', function () {
			expect(emitter.addListener).toBeDefined();
			expect(emitter.on).toBeDefined();
			expect(emitter.addListener).toEqual(emitter.on);
		});

		it('Should be defined "once" method', function () {
			expect(emitter.once).toBeDefined();
		});

		it('Should be defined "removeListener" and "off" methods', function () {
			expect(emitter.removeListener).toBeDefined();
			expect(emitter.off).toBeDefined();
			expect(emitter.removeListener).toEqual(emitter.off);
		});

		it('Should be defined "removeAllListeners" method', function () {
			expect(emitter.removeAllListeners).toBeDefined();
		});

		it('Should be defined "setMaxListeners" method', function () {
			expect(emitter.setMaxListeners).toBeDefined();
		});

		it('Should be defined "listeners" method', function () {
			expect(emitter.listeners).toBeDefined();
		});

		it('Should be defined "emit" method', function () {
			expect(emitter.emit).toBeDefined();
		});
	});

	describe('.on(event, listener)', function () {

		it('Should receive parameters', function () {
			expect(function(){
				emitter.on();
			}).toThrow();

			expect(function(){
				emitter.on('something');
			}).toThrow();

			expect(function(){
				emitter.on(listener);
			}).toThrow();

			expect(function () {
				emitter.on('something', listener);
			}).not.toThrow();
		});

		it('Should call all listeners when it emits an event', function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);

			emitter.emit('something');

			expect(listener).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

		it('Should emit "newListener" event any time someone adds a new listener', function () {
			emitter.on('newListener', listener);

			emitter.on('someEvent', listener2);

			expect(listener).toHaveBeenCalled();
		});

	});

	describe('.once(event, listener)', function () {
		it('Should call listener only one time', function () {
			emitter.once('something', listener);
			emitter.once('something', listener2);

			expect(emitter.listeners('something').length).toEqual(2);

			emitter.emit('something');

			expect(emitter.listeners('something').length).toEqual(0);
		});
	});


	describe('.off(event, listener)', function () {
		it('Should receive parameters', function () {
			expect(function(){
				emitter.off();
			}).toThrow();

			expect(function(){
				emitter.off('something');
			}).toThrow();

			expect(function(){
				emitter.off(listener);
			}).toThrow();

			expect(function () {
				emitter.off('something', listener);
			}).not.toThrow();
		});

		it('Should remove a listener', function () {
			emitter.on('something', listener);
			emitter.off('something', listener);
			emitter.emit('something');

			expect(listener).not.toHaveBeenCalled();
		});

	});

	describe('.removeAllListeners(event)', function () {
		it('Should receive parameters', function () {
			expect(function(){
				emitter.removeAllListeners();
			}).toThrow();
		});

		it('Should remove all listener for an event', function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);
			emitter.removeAllListeners('something');
			emitter.emit('something');

			expect(listener).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();
		});
	});

	describe('.setMaxListeners(n)', function () {
		it('Should recive a number', function () {
			expect(function(){
				emitter.setMaxListeners();
			}).toThrow();
		});

		it('Should throws an exception if the number of listeners is greater than value of "maxListerners"', function () {
			emitter.on('something', listener);

			expect(function(){
				emitter.on('something', listener);
			}).not.toThrow();

			emitter.setMaxListeners(1);

			expect(function(){
				emitter.on('something', listener2);
			}).toThrow();
		});

		it('Should store unlimited listeners', function () {
			emitter.setMaxListeners(1);
			emitter.on('something', listener);

			expect(function(){
				emitter.on('something', listener2);
			}).toThrow();

			emitter.setMaxListeners(0);

			expect(function(){
				emitter.on('something', listener2);
			}).not.toThrow();
		});
	});

	describe('.listeners()', function () {

		it('Should recibe event parameter', function () {
			expect(function(){
				emitter.listeners();
			}).toThrow();
		});

		it('Should recibe a undefined event as parameter and return undefined', function () {
			expect(emitter.listeners('something')).not.toBeDefined();
		});

		it('Should return a collection', function () {
			emitter.on('something', listener);

			expect(function(){
				emitter.listeners('something');
			}).not.toThrow();

			expect(typeof emitter.listeners('something')).toEqual("object");

		});
	});

	describe('.emit(event, param1, param2, ..., paramsN)', function () {
		beforeEach(function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);
		});

		it('Should receive parameters', function () {
			expect(function(){
				emitter.emit();
			}).toThrow();
		});

		it('Should emit call all listeners', function () {
			emitter.emit('something');

			expect(listener).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

		it('Should emit call all listeners with parameters', function () {
			emitter.emit('something', 'param1');

			expect(listener).toHaveBeenCalledWith('param1');
		});
	});
});