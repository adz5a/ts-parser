/*
 * Parser interface. 
 * Function call signature. 
 * Takes a string and returns an array with first member the
 * result of the parsing and second the string left to parse
 */
interface IParser<A> {

    (cs: string): [A, string][]

}

export interface Parser<A> extends IParser<A> {

    bind: <B> ( f: ( a: A ) => Parser<B> ) => Parser<B>;

}

export const item : IParser<string> = function ( cs : string ) {

    if (cs.length) {
    
        return [[cs[0], cs.slice(1)]]; 
    
    } else {
    
        return []; 
    
    }

}

export const unit = function <A> ( a: A ) {

    return ( cs: string ) => [ [a, cs] ];

}

export const bind = function _bind <A, B> ( p: Parser<A> ) {

    return function ( f: (a: A) => Parser<B> ) : Parser<B> {
    
        return function ( cs: string ) {
        
            return concat( p(cs).map( (res: [ A, string ]) => f(res[0])(res[1]))); 
        
        }; 
    
    };

};

export const concat = [].concat.apply.bind( [].concat, [] );

/**
 * Parser Monad constructor
 * Takes a parser of type IParser<A> 
 * and returns a Parser<A> with a bind method
 */
export function mp <A> ( p: IParser<A> ) : Parser<A> {

    p.bind = bind( p );

    return <Parser<A>>p;

}
