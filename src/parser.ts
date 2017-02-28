/*
 * Parser interface. 
 * Function call signature. 
 * Takes a string and returns an array with first member the
 * result of the parsing and second the string left to parse
 */
export interface IParser<A> {

    (cs: string): [A, string][]

}

export interface Parser<A> extends IParser<A> {

    bind: <B> ( f: ( a: A ) => Parser<B> ) => Parser<B>;

}

export const item = mp( (cs: string) => cs.length ? [ [cs[0], cs.slice(1)] ] : []);

export function unit <A> ( a: A ) : Parser<A> {

    return mp(( cs: string ) => [ [a, cs] ]);

}

export function bind <A, B> ( p: Parser<A> ) {

    return function ( f: (a: A) => Parser<B> ) : Parser<B> {
    
        return function ( cs: string ) : [ B, string ][] {
        
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

    p.bind = f => mp( bind(p)(f) );

    return <Parser<A>>p;

}

export function seq <A, B> ( a: Parser<A>, b: Parser<B> ) : Parser<[A, B]> {

    return a.bind( x => b.bind( y => unit( <[A, B]>[x,y] ) ));

};

export function plus <A> ( a: Parser<A>, b: Parser<A> ) : Parser<A> {

    return mp( cs => a(cs).concat(b(cs)) );

};

export function pplus <A> ( a: Parser<A>, b: Parser<A> ) : Parser<A> {

    const parser = plus(a, b);

    return mp( cs => {
    
        const res = parser(cs);
      
        if (res.length === 0) {
        
            return [];    
      
        } else {
        
            return [ res[0] ]; 
        
        }
    
    } );

};

export function zero <T> () {

    return mp<T>( cs => [] );

};

export function sat ( f:( (cs: string) => boolean ) ) : Parser<string> {

    return item.bind( e => {
        if (f(e)) {
            return unit(e);
        } else {
            return <Parser<string>>zero();
        }
    });

}

export function char ( charString : string ) : Parser<string> {

    return sat( x => x === charString );

};
