import { pplus, Parser, char, unit, sat } from "./parser";
import { chainl1, many, string } from "./recursive";

const plus = char("+");
const minus = char("-");
export const digit = sat( c => c >= "0" && c <= "9" );
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

// takes a parser as input
// applies the parser once, then applies the space parser
// , throw out the result and returns the original token
export function token <A> ( p: Parser<A> ): Parser<A> {
    return p.bind(token => space.bind(_ => unit(token)));
}

export function symbol ( cs: string ): Parser<string> {
    return token( string(cs) );
}
// apply the given parser, throwing away any leading whitespace
export function apply <A> ( p: Parser<A> ): Parser<A> {
    return space.bind(
        _ => p.bind( res => unit(res))
    );
}
