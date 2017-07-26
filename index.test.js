'use strict'

const Emitter = require('.')

describe('Emitter', () => {
  let sub
  const callback = jest.fn()
  const emitter = new Emitter()

  test('should trigger nothing', () => {
    emitter.emit('sum', 1)
    expect(callback.mock.calls.length).toBe(0)
  })

  test('should trigger 1 callback', () => {
    sub = emitter.subscribe('sum', callback)
    emitter.emit('sum', 1)
    expect(callback.mock.calls.length).toBe(1)
    expect(callback.mock.calls[0][0]).toBe(1)
  })

  test('should trigger 2 callbacks', () => {
    emitter.subscribe('sum', callback)
    emitter.emit('sum', 2)
    expect(callback.mock.calls.length).toBe(3)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[2][0]).toBe(2)
  })

  test('should release first callback, and call the second', () => {
    sub()
    emitter.emit('sum', 3)
    expect(callback.mock.calls.length).toBe(3)
    expect(callback.mock.calls[0][0]).toBe(1)
    expect(callback.mock.calls[1][0]).toBe(2)
    expect(callback.mock.calls[2][0]).toBe(2)
  })

  test('should return the return values of all the events in the callstack', () => {
    emitter.subscribe('myEvent', jest.fn().mockReturnValue(1))
    emitter.subscribe('myEvent', jest.fn().mockReturnValue(2))
    emitter.subscribe('myEvent', jest.fn().mockReturnValue(true))
    const result = emitter.emit('myEvent')
    expect(result).toEqual([1, 2, true])
  })
})
