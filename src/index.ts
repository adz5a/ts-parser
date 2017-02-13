/*
 * Trie Algorithm
 * A trie is a prefixed tree. Each of its node as prefix and a value
 * The prefix must always be here but there can be no value.
 * The root can be with the empty prefix (empty string).
 *
 * Insertion algorithm of a value
 * A value is an object with two properties :
 * - tokens which are used to insert the value inside the trie
 * - a value
 *
 * For strings, the tokens are obtained by splitting the string
 * in atomic pieces with String.prototype.split("") for instance.
 *
 *
 *
 */
import { isNullOrUndefined } from "util";
interface ITrie <T> {
    children: {
        [key: string]: ITrie<T>
    },
    prefix: string,
    value: T
}

interface INode {
    content: string,
    tokens?: Array<string>,
    tokenIndex?: number
}

type Maybe<T> = T | null;


export default class Trie<T> implements ITrie<T> {

    node: INode
    children: {
        [key: string ]: ITrie<T>
    }
    prefix: string
    value: T


    static empty<T> (): ITrie<any> {
        return new Trie("");
    }

    constructor ( prefix: string ) {
        this.prefix = prefix;
        this.children = {};
    }

    /**
     * Converts a an array of strings to a Trie
     * Returns the root of the trie.
     * @param strings
     * @returns {Trie}
     */
    static from ( strings: string[] ): ITrie<any> {
        const root = Trie.empty();
        strings.forEach(string => Trie.insert(root, string));
        return root;
    }


    static fromData <T> ( data: [string, T][] ): ITrie<T> {

        const root = Trie.empty();

        data.forEach(( [prefix, value] ) => {
            const node = Trie.insert(root, prefix);
            node.value = value;
        });

        return root;

    }

    static canInsert <T> ( trie: ITrie<T>, prefix: string ): boolean {

        if ( trie.prefix === "" ) {
            return true;
        } else {

            if ( trie.prefix.length > prefix.length ) {
                return false;
            } else {

                return trie.prefix === prefix.slice(0, trie.prefix.length);

            }

        }

    }

    static insert <T> ( trie: ITrie<T>, string: string ): ITrie<T> {

        /*
         Let's check that the node can correctly bne inserted in the trie
         */
        if ( !Trie.canInsert(trie, string) ) {
            throw new TypeError(`Cannot insert prefix ${string} in trie with prefix ${trie.prefix}`);
        }

        if ( trie.prefix === string ) {

            return trie;

        } else {
            // the prefix is a substring of the string
            // we look for the deepest child with a correct prefix
            let tokens = string.slice(trie.prefix.length).split("");
            return <ITrie<T>>tokens.reduce(Trie.append, trie);

        }


    }

    /**
     * Creates a node for the specified token on the specified
     * trie. Can be noop if it already exists.
     * Returns the created Node
     * @param trie
     * @param token
     * @returns {ITrie<T>}
     */
    static append <T> ( trie: ITrie<T>, token: string ): ITrie<T> {

        if ( token.length === 0 ) throw new TypeError("Cannot insert an empty token");

        if ( !trie.children.hasOwnProperty(token) ) {
            trie.children[ token ] = <Trie<T>>new Trie(trie.prefix + token);
        }

        return trie.children[ token ];

    }

    static reduceChildren <T, A> ( t: ITrie<T>, f: ( res: A, t: ITrie<T> ) => A, acc: A ): A {

        return Object.keys(t.children)
            .reduce(( res: A, key: string ) => f(res, t.children[ key ]), acc);

    }

    static getTerminalPrefixes <T> ( trie: ITrie<T> ): string[] {

        const recur = ( res: string[], t: ITrie<T> ): Array<string> => {
            res.push.apply(res, [ trie.prefix ].concat());
            return res;
        };


        return <string[]>Trie.reduceChildren(trie, recur, []);

    }

    /**
     * Retrieves the node with the supplied prefix
     * @param trie
     * @param prefix
     * @returns {Maybe<ITrie>}
     */
    static find <T> ( trie: ITrie<T>, prefix: string ): Maybe<ITrie<T>> {

        const _prefix = trie.prefix;

        if ( trie.prefix !== prefix.substring(0, trie.prefix.length) ) {
            return null;
        } else {

            return prefix.slice(trie.prefix.length).split("")
                .reduce(( trie: Maybe<ITrie<T>>, token: string ) => {

                    if ( trie !== null ) {
                        if ( trie.children.hasOwnProperty(token) ) {
                            return trie;
                        } else {
                            return null;
                        }
                    } else return null;

                }, trie);

        }


    }

    find ( prefix: string ) {
        return Trie.find(this, prefix);
    }


    /**
     * Takes a prefix
     * Returns all the terminal leaves that contains the supplied prefix
     * The order is not guaranteed
     * @param trie
     * @param prefix
     * @returns {string[]}
     */
    static findAllPrefixes <T> ( trie: ITrie<T>, prefix?: string ): string[] {

        let finalTrie: Maybe<ITrie<T>>;

        if ( typeof prefix !== "string" ) {

            finalTrie = trie;

        } else {

            if ( !Trie.canInsert(trie, prefix) ) {
                throw new Error(`Cannot retrieve prefix ${prefix} in trie with prefix ${trie.prefix}`);
            } else {

                finalTrie = Trie.find(trie, prefix);

            }

        }

        if ( finalTrie === null ) {
            return [];
        } else {

            return Trie.reduceChildren(finalTrie, ( res: string[], trie: ITrie<T> ) => {
                res.push(trie.prefix);
                return res;
            }, [ finalTrie.prefix ]);


        }

    }

    /**
     * Retrieves the node with the specified prefix in the specified
     * Trie, creates it if it does not exist. Updates the value property
     * on the node and returns it.
     * @param trie
     * @param prefix
     * @param value
     * @returns {Maybe<ITrie<T>>}
     */
    static assoc <T> ( trie: ITrie<T>, prefix: string, value: any ): ITrie<T> {

        const node: Maybe<ITrie<T>> = Trie.insert(trie, prefix);

        node.value = value;

        return node;


    }


    /**
     * get and getAll are for retrieving values in nodes.
     * get retrieves the value for the specified prefix
     * If there are neither nodes nor values, returns null
     */
    static get <T> ( trie: ITrie<T>, prefix: string ): Maybe<T> {

        const node = Trie.find(trie, prefix);
        if ( node ) {
            if ( Trie.hasValue(node) ) return node.value;
            else return null;
        } else {
            return null;
        }

    }

    static hasValue <T> ( trie: ITrie<T> ): boolean {
        return trie.hasOwnProperty("value");
    }

    /**
     * get and getAll are for retrieving values
     *
     * getAll returns all the values under specified prefix.
     * Does it by going on all the Trie. Returns an array of
     * values.
     * @param trie
     * @param prefix
     * @returns {T[]}
     */
    static getAll <T> ( trie: ITrie<T>, prefix: string ): T[] {

        let results: T[] = [];
        if ( Trie.hasValue(trie) ) results.push(trie.value);

        const recur = ( results: T[], trie: ITrie<T> ) => {

            Trie.reduceChildren(trie, recur, results);

            return results;
        };

        return Trie.reduceChildren(trie, recur, results);

    }


}
