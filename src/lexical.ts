import { pplus, char, unit, sat } from "./parser";
import { chainl1, many } from "./recursive";

const plus = char("+");
const minus = char("-");
const digit = sat( c => c >= "0" && c <= "9" );
const addopParser = pplus(
    plus.bind(_ => {
        return unit((x: number, y: number) => x + y)
    }),
    minus.bind(_ => {
        return unit((x: number, y: number) => x - y)
    })
);

export const addop = chainl1(
    digit.bind(d => unit(parseInt(d, 10))),
    addopParser
);

export const space = many(char(" "));
