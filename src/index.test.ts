import { item, seq, mp } from "./index";
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
