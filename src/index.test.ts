import { item, seq, mp, plus, pplus, zero, sat } from "./index";
import { deepEqual, ok } from "assert";

describe("parser.item", function () {

    it("should parse the first character", function () {
    
        const result = item("hello");
        ok( result.length === 1 );
        deepEqual( result[0], ["h", "ello"]);
    
    });

});

describe("parser.seq", function () {

    it("should combine two parser", function () {
    
        const parser = seq(mp(item), mp(item));
        const result = parser("hello");
        ok(result.length === 1);
        deepEqual(
            result,
            [ [ [ "h", "e"], "llo"] ]
        );
    
    });

});

describe("parser.plus", function () {

    it("sould concatenate the results of applying both parsers on the input", function () {
    
        const parser = plus(item, item);
        const result = parser("hello");

        ok(result.length === 2);
        deepEqual(
            result[0],
            [ "h", "ello"]
        );

        deepEqual(
            result[1],
            [ "h", "ello" ]
        );
    
    });

});

describe("parser.pplus", function () {

    it("should return the first result", function () {
    
        // this parser is very interesting :
        // a parser should return an array of results
        // or an empty array if it fails to parse anything.
        // Knowing this, this parser returns the first result
        // if there is one, or the empty array. It uses 
        // parser.plus

        const parser = pplus(item, item);
        const result = parser("hello");

        ok(result.length === 1); // both returns, only one should be returned at the end
        deepEqual(
            result[0],
            [ "h", "ello" ]
        );
    
    });

});

describe("parser.zero", function () {

    it("should always fail", function () {
   
        const parser = zero();
        const result = parser("hello");
        ok(result.length === 0);
        deepEqual( result, [] );
    
    });

});

describe("parser.sat", function () {

    it("should parse when predicate is matched", function () {
    
        const parser = sat( x => x === "h" );
        const res = parser("hello");
        ok( res.length === 1 );
        deepEqual( 
                  res[0],
                  [ "h", "ello" ]
                 );

    
    });

    it("should fail when predicate not matched", function () {
    
        const parser = sat( x => false );
        const res = parser("hello");
        ok(res.length === 0);
    
    });

});
