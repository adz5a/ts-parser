# README

Monadic parsers in typescript. From a talk in the 2015 LambdaConf.


## Monads

m is a **Monad** if and only of is an Applicative Functor for which you can define
two operations :

- return, with signature : ` a -> m a `
- bind (>>=) with signature : ` m a -> ( a -> m b ) -> m b `


## Parser Monad

In this repo the monad we are working with is the **Parser** monad. For a given type
**A** it returns a parser function. 

The parser has the following signature : ` Parser <A> : String -> [ ( a : A ) ] `


## Parser combinators


