import { pplus, Parser, char, sat, unit } from "./parser";
import { chainl1 } from "./recursive";
import { symbol, addop, apply, token, space } from "./lexical";

const digitChar = sat( c => c <= "9" && c >= "0" );
export const digit = apply(digitChar.bind( d => space.bind( _ => unit(parseInt(d))) ));

export const mulop = <Parser<number>>chainl1(
    digit,
    char("*").bind( _ => unit((x: number, y:number) => x * y) )
);
