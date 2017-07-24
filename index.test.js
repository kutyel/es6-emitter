'use strict'

/* eslint-env jest */

const Emitter = require('.')

describe('Emitter', () => {
  let sub
  let aux = 0
  const emitter = new Emitter()

  test('should trigger nothing', () => {
    emitter.emit('sum', 1)
    expect(aux).toBe(0)
  })

  test('should trigger 1 callback', () => {
    sub = emitter.subscribe('sum', num => (aux = aux + num))
    emitter.emit('sum', 1)
    expect(aux).toBe(1)
  })

  test('should trigger 2 callbacks', () => {
    emitter.subscribe('sum', num => (aux = aux * num))
    emitter.emit('sum', 2)
    expect(aux).toBe(6)
  })

  test('should release first callback, and call the second', () => {
    sub()
    emitter.emit('sum', 3)
    expect(aux).toBe(18)
  })

  test('should return the return values of all the events in the callstack', () => {
    emitter.subscribe('myEvent', () => 1)
    emitter.subscribe('myEvent', () => 2)
    emitter.subscribe('myEvent', () => true)
    const result = emitter.emit('myEvent')
    expect(result).toEqual([1, 2, true])
  })
})
