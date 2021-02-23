"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
// Type tests
(() => {
    // cannot construct failure with new
    // @ts-expect-error
    let x = new _1.Failure("", {});
    let y = foo();
    if (_1.Failure.isFailure(y)) {
        let _ = y;
    }
    else {
        let _ = y;
    }
    let z = bar();
    if (_1.Failure.isFailure(z)) {
        let _ = z;
    }
    else {
        let _ = z;
    }
});
// Runtime tests
(() => {
    let f0 = _1.Failure.from("x");
    let f1 = _1.Failure.from("x", ["details"]);
    let f2 = _1.Failure.from(new Error("some error"));
    assert(f0.message === 'x');
    assert(f0.details === undefined);
    assert(f1.details[0] === "details");
    assert(f2.details instanceof Error);
    assert(_1.Failure.isFailure(f0));
    assert(_1.Failure.isFailure(f1));
    assert(_1.Failure.isFailure(f2));
})();
function assert(v, message) {
    if (!v) {
        throw new Error(message);
    }
}
//# sourceMappingURL=tests.js.map