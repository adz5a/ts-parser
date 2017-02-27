import { Parser, pplus, char, unit } from "./index";

const plus = char("+");
const minus = char("-");

export const addop = pplus(
    plus.bind(_ => {
            return unit((x, y) => x + y)
        }),
    minus.bind(_ => {
        return unit((x, y) => x - y)
    })
);
