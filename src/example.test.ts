import { mulop, digit } from "./example";
import { ok, equal, deepEqual } from "assert";

describe("example.mulop", function () {
    it("should multiply numbers", function () {
        const res = mulop("2*3");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 6, "" ]
        );
    });
});

describe("example.digit", function () {
    it("should parse a number", function () {
        const res = digit("2");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 2, "" ]
        );
    });

    ["2", "  2", "2  ", "  2  "]
        .forEach( cs => {
            it(`shoud parse number : "${cs}"`, function () {
                const [ res ] = digit(cs);
                ok(res);
                deepEqual(
                    res,
                    [ 2, "" ]
                );
            });
        });
});

