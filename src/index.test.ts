import { item } from "./index";
import { deepEqual, ok } from "assert";

describe("parser.item", function () {

    it("should parse the first character", function () {
    
        const result = item("hello");
        ok( result.length === 1 );
        deepEqual( result[0], ["h", "ello"]);
    
    });

});
