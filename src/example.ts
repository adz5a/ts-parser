import { pplus, Parser, char, sat, unit } from "./parser";
import { chainl1 } from "./recursive";
import { symbol, apply, token, space } from "./lexical";

const digitChar = sat( c => c <= "9" && c >= "0" );
export const digit = apply(digitChar.bind( d => space.bind( _ => unit(parseInt(d))) ));

export const _mulop = <Parser<number>>chainl1(
    digit,
    char("*").bind( _ => unit((x: number, y:number) => x * y) )
);

const _mulop_ = unit( (x: number, y: number): number => x * y );
export const mulop = char("*").bind(_ => _mulop_);

const _adop_ = unit( (x: number, y: number): number => x + y );
export const addop = char("+").bind(_ => _adop_);

let term: Parser<number>;
let expr: Parser<number>;
let factor: Parser<number>;

const leftPar = symbol("(");
const rightPar = symbol(")");
// a factor is either a digit or an expression surrounded with parenthesis
factor = pplus(
    digit,
    leftPar.bind(
        _ => expr.bind(
            (n: number) => rightPar.bind(
                _ => unit(n)
            )
        )
    )
);

term = chainl1(
    factor,
    mulop
);

expr = chainl1(
    term,
    addop
);

export { factor, expr, term };
