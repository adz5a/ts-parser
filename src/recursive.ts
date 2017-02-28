import { Parser, unit, pplus, char } from "./parser";

export function string ( s: string ) :Parser<string> {

    if ( s.length === 0 ) {
    
        return unit( "" ); 
    
    } else {
        const charParsers = s.split("").map(char);
        return charParsers.slice(1)
                .reduce(( parser, charParser ) => {
                
                    return parser.bind( c => charParser.bind( d => unit( c + d ))); 
                
                }, charParsers[0]);
    }

};

export function many1 <A> (parser: Parser<A>): Parser<A[]> {
    return parser.bind(x => many(parser).bind(xs => unit([x].concat(xs))));
}

export function many <A> (parser: Parser<A>): Parser<A[]> {
    return pplus(many1(parser), unit([]));
}

// Parse repeated applications of a parser p, separated by applications
// of a parser *sep* whose result values are thrown away
export function sepby <A, B> ( p: Parser<A>, sep: Parser<B> ): Parser<A[]> {
    return pplus(sepby1(p, sep), unit([]));
}

export function sepby1 <A, B> ( p: Parser<A>, sep: Parser<B> ): Parser<A[]> {
    return p.bind(cs => many(sep.bind(_ => p)).bind(xs => unit([cs].concat(xs))));
}

// Parser repeated applications of a parser p, separated by applications 
// of a parser op whose result value is an operator that is assumed to associate
// to the left, and which is used to combine the results 
// 
// Differences between chainl and chainl1 :
// - fail case : if the input cannot be parsed then chainl will return its third argument
// whereas chainl1 will just fail and return empty array.
export function chainl <A> ( p: Parser<A>, op: Parser<((x: A, y: A) => A)>, a: A): Parser<A> {
    return pplus(chainl1(p, op), unit(a)); 
}

export function chainl1 <A> ( p: Parser<A>, op: Parser<(x: A, y: A) => A>): Parser<A> {
    const rest = (x: A): Parser<A> => {
        return pplus(
            op.bind( f => p.bind( y => rest(f( x, y )))),
                unit(x));
    };
    return p.bind( x => rest(x));
}

