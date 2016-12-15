/**
 * Module dependencies
 */
const chai = require('chai');
const spies = require('chai-spies');
const Jvent = require('../');

const expect = chai.expect;

chai.use(spies);

/**
 * Tests
 */
describe('Jvent', function () {
  let emitter;
  let listener;
  let listener2;

  beforeEach(function() {
    emitter = new Jvent();
    listener = chai.spy();
    listener2 = chai.spy();
  });

  describe('Instance', function() {
    it('Should return an instance of Jvent', function () {
      expect(emitter).to.be.defined;
      expect(emitter).to.be.instanceOf(Jvent);
    });
  });

  describe('Public methods', function() {
    it('Should be defined "on" method', function () {
      expect(emitter).to.have.property('on');
    });

    it('Should be defined "once" method', function () {
      expect(emitter).to.have.property('once');
    });

    it('Should be defined "off" method', function () {
      expect(emitter).to.have.property('off');
    });

    it('Should be defined "removeAllListeners" method', function () {
      expect(emitter).to.have.property('removeAllListeners');
    });

    it('Should be defined "listeners" method', function () {
      expect(emitter).to.have.property('listeners');
    });

    it('Should be defined "emit" method', function () {
      expect(emitter).to.have.property('emit');
    });
  });

  describe('.on(event, listener)', function () {
    it('Should call all listeners when it emits an event', function () {
      emitter.on('something', listener);
      emitter.on('something', listener2);
      emitter.emit('something');
      expect(listener).to.have.been.called;
      expect(listener2).to.have.been.called;
    });
  });

  describe('.once(event, listener)', function () {
    it('Should call listener only one time', function () {
      emitter.once('something', listener);
      emitter.once('something', listener2);
      expect(emitter.listeners('something').length).to.be.equal(2);
      emitter.emit('something');
      expect(emitter.listeners('something')).to.be.undefined;
    });
  });


  describe('.off(event, listener)', function () {
    it('Should remove a listener', function () {
      emitter.on('something', listener);
      emitter.off('something', listener);
      emitter.emit('something');
      expect(listener).to.not.have.been.called;
    });

    it('Should remove a listener (once).', function () {
      emitter.once('something', listener);
      emitter.off('something', listener);
      emitter.emit('something');
      expect(listener).to.not.have.been.called;
    });

    it('Does not throw when trying to remove a listener that was never added', function() {
      expect(function() {
        emitter.off('something', listener);
      }).to.not.throw();
    });

  });

  describe('.removeAllListeners(event)', function () {
    it('Should remove all listener for an event', function () {
      emitter.on('something', listener);
      emitter.on('something', listener2);
      emitter.removeAllListeners('something');
      emitter.emit('something');
      expect(listener).to.not.have.been.called;
      expect(listener2).to.not.have.been.called;
    });

    it('Should remove all listener for an undefined event', function () {
      emitter.removeAllListeners('something');
      emitter.emit('something');
      expect(listener).to.not.have.been.called;
    });
  });

  describe('.listeners()', function () {
    it('Should recibe a undefined event as parameter and return undefined', function () {
      expect(emitter.listeners('something')).to.not.be.defined;
    });

    it('Should return a collection', function () {
      emitter.on('something', listener);
      expect(emitter.listeners('something')).to.be.an('array');
    });
  });

  describe('.emit(event, param1, param2, ..., paramsN)', function () {
    beforeEach(function () {
      emitter.on('something', listener);
      emitter.on('something', listener2);
    });

    it('Should emit call all listeners', function () {
      emitter.emit('something');
      expect(listener2).to.have.been.called;
      expect(listener2).to.have.been.called;
    });

    it('Should emit call all listeners with parameters', function () {
      emitter.emit('something', 'param1');
      expect(listener).to.have.been.called.with('param1');
    });
  });

  describe('.emit(event, param1, param2, ..., paramsN)', function () {
    it('Should not emit an undefined event', function () {
      emitter.emit('something');
      expect(listener).to.not.have.been.called;
    });

    it('Should emit call all listeners', function () {
      emitter.on('something', listener);
      emitter.on('something', listener2);
      emitter.emit('something');
      expect(listener2).to.have.been.called;
      expect(listener2).to.have.been.called;
    });
  });
});
