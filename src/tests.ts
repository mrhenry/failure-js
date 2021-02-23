import { Failure } from ".";

declare function foo(): string | Failure;
declare function bar(): void | Failure;
declare function baz(): string | number | Failure;
declare function mapper(v: string): number;

// Type tests
(() => {
    // cannot construct failure with new
    // @ts-expect-error
    let x = new Failure("", {});

    let y = foo();
    if (Failure.isFailure(y)) {
        let _: Failure = y;
    } else {
        let _: string = y;
    }

    let z = bar();
    if (Failure.isFailure(z)) {
        let _: Failure = z;
    } else {
        let _: void = z;
    }

    let f0: Failure<number> = Failure.from("", "").map(mapper);
    // @ts-expect-error
    let f1: Failure<string> = Failure.from("", "").map(mapper);
});
(() => {
    let v = foo();
    Failure.panicOnFailure(v);
    let v0: string = v;

    let w = baz();
    Failure.panicOnFailure(w);
    let v1: string | number = w;
});

// Runtime tests
(() => {
    let f0: Failure<undefined> = Failure.from("x");
    let f1: Failure<string[]> = Failure.from("x", ["details"]);
    let f2: Failure<Error> = Failure.from(new Error("some error"));

    assert(f0.message === 'x');
    assert(f0.details === undefined);
    assert(f1.details[0] === "details");
    assert(f2.details instanceof Error);
    assert(Failure.isFailure(f0));
    assert(Failure.isFailure(f1));
    assert(Failure.isFailure(f2));
})();

function assert(v: boolean, message?: string): asserts v {
    if (!v) {
        throw new Error(message);
    }
}