const CONSTRUCTOR_GUARD = Symbol();

export class Failure<Details = unknown> {
    readonly message: string;
    readonly details: Details;

    private constructor(message: string, details: Details, guard: Symbol) {
        if (guard !== CONSTRUCTOR_GUARD) { throw new Error('Failure must be constructed with Failure.from()'); }

        this.message = message;
        this.details = details;

        // make readonly
        Object.freeze(this);
    }

    static from(message: string): Failure<undefined>
    static from<Err extends Error>(error: Err): Failure<Err>
    static from<Details>(message: string, details: Details): Failure<Details>
    static from(message: unknown, details?: unknown) {
        if (message instanceof Error) {
            return new Failure(message.message, message, CONSTRUCTOR_GUARD);
        }
        if (typeof message !== 'string') {
            throw new Error('invariant: message must always be a string');
        }
        return new Failure(message, details, CONSTRUCTOR_GUARD);
    }

    static isFailure(value: unknown): value is Failure {
        return value instanceof Failure;
    }

    static panicOnFailure<V>(value: V | Failure): asserts value is V {
        if (Failure.isFailure(value)) {
            throw value.toError();
        }
    }

    get [Symbol.toStringTag]() {
        return this.toString();
    }

    toError(): Error {
        return new Error(this.message);
    }

    toString(): string {
        return `failure: ${this.message}`;
    }

    toJSON(): any {
        return this.toString();
    }

    // Make a new Failure with a added a context label to the message.
    // This method is equivalent to Failure.from(`${label}: ${f.message}`, f.details)
    context(label: string): Failure<Details> {
        return new Failure(`${label}: ${this.message}`, this.details, CONSTRUCTOR_GUARD);
    }

    // Make a new Failure while mapping the details using fn.
    // This method is equivalent to Failure.from(f.message, fn(f.details))
    map<O>(fn: (details: Details) => O): Failure<O> {
        return new Failure(this.message, fn(this.details), CONSTRUCTOR_GUARD);
    }
}
