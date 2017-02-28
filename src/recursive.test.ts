import { equal, deepEqual, ok } from "assert";
import { unit, sat, char, plus, pplus } from "./parser";
import { string, many1, many, sepby, sepby1, chainl, chainl1 } from "./recursive";

describe("parser.string", function () {

    it("should parse a string", function () {
  
        const parser = string("hello");

        const result = parser("helloWorld");

        ok(result.length === 1);
        deepEqual(
            result[0],
            [ "hello", "World" ]
        );
    
    });

    it("should fail if the string is not here", function () {
    
        const parser = string("hello");
        const result = parser("heloWorld");

        ok( result.length === 0 );
    
    });

    it("should return empty string for empty string", function () {
    
        const parser = string("");
        const result = parser("hello");
        ok( result.length === 1 );

        deepEqual(
            result[0],
            [ "", "hello" ]
        );
    
    });

});

describe("parser.many", function () {

    it("should concatenate the results", function () {
    
        const parser = many(char("c"));
        const res = parser("cccD");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [["c", "c", "c"], "D"]
        );
    
    });

    it("should return empty array when it cannot parse", function () {
        const parser = many(char("c"));
        const res = parser("D");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [[], "D"]
        );

    });


});

describe("parser.many1", function () {

    it("should concatenate the results", function () {
    
        const parser = many1(char("c"));
        const res = parser("cccD");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [["c", "c", "c"], "D"]
        );
    
    });

    it("should fail when it cannot parse", function () {
        const parser = many1(char("c"));
        const res = parser("D");
        equal(res.length, 0);
    });


});

describe("sepby", function () {
    const lower = sat(c => c >= "a" && c <= "z");
    const upper = sat(c => c >= "A" && c <= "Z");
    const letter = plus(lower, upper);
    const digit = sat(c => c >= "0" && c <= "9");
    const parser = sepby(letter, digit);
    
    it("should parse letters separated by digits with no trailing digit", function () {
        const res = parser("a1b2c");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ ["a", "b", "c"], ""]
        );
    });

    it("should parse letters separated by digits with trailing digit", function () {
        const res = parser("a1b2c3");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ ["a", "b", "c"], "3"]
        );
    });

    it("should parse the first letter", function () {
        const res = parser("ab2c");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ ["a"], "b2c" ]
        );
    });
    
    it("should parse the 1st digit and throw it, returns empty result and consumes 0 chars", function () {
        const res = parser("1ab2c");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ [], "1ab2c" ]
        );
    });
}); 

describe("chainl1", function () {
    const digit = sat(c => c >= "0" && c <= "9");
    const parser = chainl1(
        digit.bind( d => unit(parseInt(d)) ),
            unit( (a: number, b: number) => a + b )
    );

    it("should parse digits and sum them up", function () {
        const res = parser("123a");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 6, "a" ]
        );
    });

    it("should fail when it cannot parse", function () { const res = parser("a123");
        equal(res.length, 0);
    });

    it("should return the first value if there is only one", function () {
        const res = parser("1");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 1, "" ]
        );
    });
});

describe("chainl", function () {
    const digit = sat(c => c >= "0" && c <= "9");
    const parser = chainl(
        digit.bind( d => unit(parseInt(d)) ),
        unit( (a: number, b: number) => a + b ),
        1
    );

    it("should parse digits and sum them up", function () {
        const res = parser("123a");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 6, "a" ]
        );
    });

    it("should return the default arg when failing to parse", function () {
        const res = parser("a123");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 1, "a123" ]
        );
    });
});
