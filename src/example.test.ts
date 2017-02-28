import { chainl1 } from "./recursive";
import { mulop, addop, digit, factor, term, expr } from "./example";
import { ok, equal, deepEqual } from "assert";

describe("example.addop", function () {
    const parser = chainl1(digit, addop);
    it("should add numbers", function () {
        const [ res ] = parser("2+2");
        ok(res);
        deepEqual(
            res,
            [ 4, "" ]
        );
    });
});
describe("example.mulop", function () {
    const parser = chainl1(digit, mulop);
    it("should multiply numbers", function () {
        const res = parser("2*3");
        equal(res.length, 1);
        deepEqual(
            res[0],
            [ 6, "" ]
        );
    });
    it("should still parse if there is padding", function () {
        const res = parser("  2  * 3 ");
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

describe("term / factor / expr", function () {
    describe("expr", function() {
        it(`2+2 is a valid expr`, function () {
            const [ res ] = expr("2+2");
            ok( res );
            deepEqual(
                res,
                [ 4, "" ]
            );
        });
        it("can be wrapped within parens", function () {
            const [ res ] = expr("(2+2)");
            ok( res );
            deepEqual(
                res,
                [ 4, "" ]
            );
        });
    });
    describe("factor", function () {
        it("can be a simple digit", function () {
            const [ res ] = factor("1");
            ok(res);
            deepEqual(
                res,
                [ 1, "" ]
            );
        });       
        it("can be a digit wrapped inside parens", function () {
            const res = factor("(1)");
            equal(res.length, 1);
            deepEqual(
                res[0],
                [ 1, "" ]
            );
        });
        it("can be an expr wrapped inside parens", function () {
            const res = factor("(1+1)");
            equal(res.length, 1);
            deepEqual(
                res[0],
                [ 2, "" ]
            );
        });
    });
    describe("term", function () {
        it("2*2 is a valid term", function () {
            const res = term("2*2");
            equal(res.length, 1);
            deepEqual(
                res[0],
                [ 4, "" ]
            );
        }); 
    });
});
