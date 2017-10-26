'use strict'

class Emitter {
  constructor () {
    this.events = {}
  }

  subscribe (name, cb) {
    this.events[name] = [...(this.events[name] || []), cb]

    return () => (this.events[name] = this.events[name].filter(fn => fn !== cb))
  }

  emit (name, ...args) {
    return (this.events[name] || []).map(fn => fn(...args))
  }
}

module.exports = Emitter
