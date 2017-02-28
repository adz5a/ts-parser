import { addop, space, token, apply } from "./lexical";
import { sat, unit } from "./parser";
import { many, string } from "./recursive";
import { equal, deepEqual } from "assert";

describe("lexical.addop", function () {
    it("should add two number", function () {
        const res = addop("1+2");
        equal(res.length, 1);
        deepEqual(res[0], [3, ""]);
    });
    it("should substract two number", function () {
        const res = addop("1-2");
        equal(res.length, 1);
        deepEqual(res[0], [-1, ""]);
    });
});

describe("lexical.space", function () {
    it("should parse the leading space", function () {
        const res = space("   a");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ [" ", " ", " "], "a" ]
        );
    });
    describe("lexical.space.trim", function () {
        const manyLowers = many(sat(c => c >= "a" && c <= "z")); // will parse many lowercase chars
        const parser = space.bind(
            _ => manyLowers.bind(
                tokens => space.bind(_ => unit(tokens))
            )
        );
        const res = parser("  ab  ");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ ["a", "b"], "" ]
        );
    });
});

describe("lexical.token", function () {
    const p = string("hello");
    const parser = token(p);

    it("can parse token", function () {
        const res = parser("hello  ");
        equal(res.length, 1);
        deepEqual(
            res[0],
            ["hello", ""]
        );
    });
});

describe("lexical.apply", function () {
    const p = string("hello");
    const parser = apply(p);

    it("can parse token", function () {
        const res = parser("  hello");
        equal(res.length, 1);
        deepEqual(
            res[0],
            ["hello", ""]
        );
    });
});
