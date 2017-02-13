import * as assert from "assert";
import Trie from "./index";

const { empty, canInsert, append } = Trie;


describe("Prefix insertion", function () {


    it("can insert any prefix in empty trie", function () {

        const t = empty();
        assert.equal(canInsert(t, ""), true, "empty prefix");
        assert.equal(canInsert(t, "an"), true, "non empty prefix");

    });

    it("cannot insert non valid prefix in non empty trie", function () {

        const t = new Trie("a");
        assert.equal(canInsert(t, "b"), false, "trie.prefix is not a substring ")
        assert.equal(canInsert(t, ""), false, "the empty prefix cannot be inserted");

    });

    it("can insert valid prefix in non empty trie", function () {

        const t = new Trie("a");
        assert.equal(canInsert(t, "a"), true, "can insert same prefix")
        assert.equal(canInsert(t, "ab"), true, "can insert the prefix when trie.prefix is a substring");

    });

});

describe("Token append", function () {

    it("Cannot insert empty token", function () {

        const t = empty();
        assert.throws(() => {
            append(t, "");
        }, "Trie.append throws on invalid tokens");
        assert.deepEqual(t.children, {}, "the trie was not modified");

    });

    it("Can insert any other valid token", function () {

        const t = empty();
        append(t, "a");
        append(t, "ab");
        append(t, "abc");

        assert.deepEqual(
            Object.keys(t.children),
            ["a", "ab", "abc"],
            "all tokens are considered valid and where inserted"
        );

    });

});
