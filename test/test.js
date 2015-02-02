var Jvent = require('../');

function parameterized(emitterType, emitterFactory){

describe('Jvent (' + emitterType + ')', function () {
	var emitter,
		listener,
		listener2;

	beforeEach(function() {
		emitter = emitterFactory();

		listener = jasmine.createSpy('listener'),
		listener2 = jasmine.createSpy('listener2');
	});

	if(emitterType === 'instance') {
		describe('Instance', function() {
			it('Should return an instance of Jvent', function () {
				expect(emitter).toBeDefined();
				expect(typeof emitter).toEqual("object");
				expect(emitter instanceof Jvent).toBeTruthy();
			});
		});
	}

	describe('Public methods', function() {
		it('Should be defined "addListener" and "on" methods', function () {
			expect(emitter.on).toBeDefined();
		});

		it('Should be defined "once" method', function () {
			expect(emitter.once).toBeDefined();
		});

		it('Should be defined "removeListener" and "off" methods', function () {
			expect(emitter.off).toBeDefined();
		});

		it('Should be defined "removeAllListeners" method', function () {
			expect(emitter.removeAllListeners).toBeDefined();
		});

		it('Should be defined "listeners" method', function () {
			expect(emitter.listeners).toBeDefined();
		});

		it('Should be defined "emit" method', function () {
			expect(emitter.emit).toBeDefined();
		});
	});

	describe('.on(event, listener)', function () {

		it('Should call all listeners when it emits an event', function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);

			emitter.emit('something');

			expect(listener).toHaveBeenCalled();
			expect(listener2).toHaveBeenCalled();
		});

	});

	describe('.once(event, listener)', function () {
		it('Should call listener only one time', function () {
			emitter.once('something', listener);
			emitter.once('something', listener2);

			expect(emitter.listeners('something').length).toEqual(2);

			emitter.emit('something');

			expect(emitter.listeners('something') === undefined);
		});
	});


	describe('.off(event, listener)', function () {

		it('Should remove a listener', function () {
			emitter.on('something', listener);
			emitter.off('something', listener);
			emitter.emit('something');

			expect(listener).not.toHaveBeenCalled();
		});

	});

	describe('.removeAllListeners(event)', function () {

		it('Should remove all listener for an event', function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);
			emitter.removeAllListeners('something');
			emitter.emit('something');

			expect(listener).not.toHaveBeenCalled();
			expect(listener2).not.toHaveBeenCalled();
		});
	});

	describe('.listeners()', function () {

		it('Should recibe a undefined event as parameter and return undefined', function () {
			expect(emitter.listeners('something')).not.toBeDefined();
		});

		it('Should return a collection', function () {
			emitter.on('something', listener);
			expect(typeof emitter.listeners('something')).toEqual("object");

		});
	});

	describe('.emit(event, param1, param2, ..., paramsN)', function () {
		beforeEach(function () {
			emitter.on('something', listener);
			emitter.on('something', listener2);
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
}

parameterized('instance', function(){ 
	return new Jvent();
});
parameterized('attached', function(){
	var foo = { foo: 'foo' };
	Jvent.attach(foo);
	return foo;
});
