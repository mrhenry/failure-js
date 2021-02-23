"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Failure = void 0;
const CONSTRUCTOR_GUARD = Symbol();
class Failure {
    constructor(message, details, guard) {
        if (guard !== CONSTRUCTOR_GUARD) {
            throw new Error('Failure must be constructed with Failure.from()');
        }
        this.message = message;
        this.details = details;
        // make readonly
        Object.freeze(this);
    }
    static from(message, details) {
        if (message instanceof Error) {
            return new Failure(message.message, message, CONSTRUCTOR_GUARD);
        }
        if (typeof message !== 'string') {
            throw new Error('invariant: message must always be a string');
        }
        return new Failure(message, details, CONSTRUCTOR_GUARD);
    }
    static isFailure(value) {
        return value instanceof Failure;
    }
    static panicOnFailure(value) {
        if (Failure.isFailure(value)) {
            throw value.toError();
        }
    }
    get [Symbol.toStringTag]() {
        return this.toString();
    }
    toError() {
        return new Error(this.message);
    }
    toString() {
        return `failure: ${this.message}`;
    }
    toJSON() {
        return this.toString();
    }
    // Make a new Failure with a added a context label to the message.
    // This method is equivalent to Failure.from(`${label}: ${f.message}`, f.details)
    context(label) {
        return new Failure(`${label}: ${this.message}`, this.details, CONSTRUCTOR_GUARD);
    }
    // Make a new Failure while mapping the details using fn.
    // This method is equivalent to Failure.from(f.message, fn(f.details))
    map(fn) {
        return new Failure(this.message, fn(this.details), CONSTRUCTOR_GUARD);
    }
}
exports.Failure = Failure;
//# sourceMappingURL=index.js.map