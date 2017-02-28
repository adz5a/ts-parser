import { addop } from "./lexical";
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
