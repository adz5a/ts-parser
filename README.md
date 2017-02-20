# README

Monadic parsers in typescript. From a talk in the 2015 LambdaConf.


## Monads

m is a **Monad** if and only of is an Applicative Functor for which you can define
two operations :

- return, with signature : ` a -> m a `
- bind (>>=) with signature : ` m a -> ( a -> m b ) -> m b `

Those functions **must** follow the following rules :

### Monadic rules : TODO => give the real names and accurate description for those things

- return a >>= f = f a  

- p >>= return = p

- p >>= (\a -> (f a >>= g)) = (p >>= (\a -> f a)) >>= g


`return` is a left and right unit for the `>>=` operation and `>>=` is associative.

`>>=` is a sequencing operation. Which means it is used to combine monadic operations
while keeping the monadic essence of the types.


### Zero and Pplus (++) operations

Whitin a monad you can define a **zero element** and a **(++)** operation. 

zero :: m a  => it's a simple element in the monad

(++) :: m a -> m a -> m a


The zero acts like a null element and the ++ acts like a choice operation. Given two monads
of same type you can define a third using this operator which will "choose" what result keep
or discard within the monad.

The following rules applies in this case :

1) zero is a null element for the bind operation : it nullify everything

zero >>= f = zero

p >>= (\ _ -> zero) ) = zero

2) ++ and >>= are distributive 

( p ++ q ) >>= f = ( p >>= f ) ++ ( q >>= f )

( p ++ q ) >>= f = ( p >>= f ) ++ ( q >>= f )



### Parser Monad

In this repo the monad we are working with is the **Parser** monad. For a given type
**A** it returns a parser function. 

The parser has the following signature : ` Parser <A> : String -> [ ( a : A ) ] `


### Parser combinators

A parser combinator is a function for which, given an argument will return a new parser
combining the provided argument and a given parser.


#### Seq parser

Will combine the result of two parsers, returning a tuple with the result of each :

``
m a -> m b -> m [a, ]
``


### Choice combinators


