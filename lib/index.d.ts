export declare class Failure<Details = unknown> {
    readonly message: string;
    readonly details: Details;
    private constructor();
    static from(message: string): Failure<undefined>;
    static from<Err extends Error>(error: Err): Failure<Err>;
    static from<Details>(message: string, details: Details): Failure<Details>;
    static isFailure(value: unknown): value is Failure;
    static panicOnFailure<V>(value: V | Failure): asserts value is V;
    get [Symbol.toStringTag](): string;
    toError(): Error;
    toString(): string;
    toJSON(): any;
    context(label: string): Failure<Details>;
    map<O>(fn: (details: Details) => O): Failure<O>;
}
//# sourceMappingURL=index.d.ts.map