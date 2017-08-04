'use strict';

var assert = require('assert');

var Z = require('sanctuary-type-classes');
var type = require('sanctuary-type-identifiers');

var Pair = require('..');


//  eq :: (Any, Any) -> Undefined !
function eq(actual, expected) {
  assert.strictEqual(arguments.length, eq.length);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
}

//  Useless :: Useless
var Useless = {
  constructor: {'@@type': 'sanctuary-pair/Useless'},
  inspect: function() { return 'Useless'; },
  toString: function() { return 'Useless'; }
};

test('Z.Setoid.test', function() {
  eq(Z.Setoid.test(Pair(Useless, Useless)), false);
  eq(Z.Setoid.test(Pair(Useless, 'world')), false);
  eq(Z.Setoid.test(Pair('hello', Useless)), false);
  eq(Z.Setoid.test(Pair('hello', 'world')), true);
});

test('Z.Ord.test', function() {
  eq(Z.Ord.test(Pair(Useless, Useless)), false);
  eq(Z.Ord.test(Pair(Useless, 'world')), false);
  eq(Z.Ord.test(Pair('hello', Useless)), false);
  eq(Z.Ord.test(Pair('hello', 'world')), true);
});

test('Z.Semigroupoid.test', function() {
  eq(Z.Semigroupoid.test(Pair(Useless, Useless)), true);
});

test('Z.Category.test', function() {
  eq(Z.Category.test(Pair(Useless, Useless)), false);
});

test('Z.Semigroup.test', function() {
  eq(Z.Semigroup.test(Pair(Useless, Useless)), false);
  eq(Z.Semigroup.test(Pair(Useless, 'world')), false);
  eq(Z.Semigroup.test(Pair('hello', Useless)), false);
  eq(Z.Semigroup.test(Pair('hello', 'world')), true);
});

test('Z.Monoid.test', function() {
  eq(Z.Monoid.test(Pair(Useless, Useless)), false);
});

test('Z.Functor.test', function() {
  eq(Z.Functor.test(Pair(Useless, Useless)), true);
});

test('Z.Bifunctor.test', function() {
  eq(Z.Bifunctor.test(Pair(Useless, Useless)), true);
});

test('Z.Profunctor.test', function() {
  eq(Z.Profunctor.test(Pair(Useless, Useless)), false);
});

test('Z.Apply.test', function() {
  eq(Z.Apply.test(Pair(Useless, Useless)), false);
  eq(Z.Apply.test(Pair(Useless, 'world')), false);
  eq(Z.Apply.test(Pair('hello', Useless)), true);
  eq(Z.Apply.test(Pair('hello', 'world')), true);
});

test('Z.Applicative.test', function() {
  eq(Z.Applicative.test(Pair(Useless, Useless)), false);
});

test('Z.Chain.test', function() {
  eq(Z.Chain.test(Pair(Useless, Useless)), false);
  eq(Z.Chain.test(Pair(Useless, 'world')), false);
  eq(Z.Chain.test(Pair('hello', Useless)), true);
  eq(Z.Chain.test(Pair('hello', 'world')), true);
});

test('Z.ChainRec.test', function() {
  eq(Z.ChainRec.test(Pair(Useless, Useless)), false);
  eq(Z.ChainRec.test(Pair(Useless, 'world')), false);
  eq(Z.ChainRec.test(Pair('hello', Useless)), false);
  eq(Z.ChainRec.test(Pair('hello', 'world')), false);
});

test('Z.Monad.test', function() {
  eq(Z.Monad.test(Pair(Useless, Useless)), false);
});

test('Z.Alt.test', function() {
  eq(Z.Alt.test(Pair(Useless, Useless)), false);
});

test('Z.Plus.test', function() {
  eq(Z.Plus.test(Pair(Useless, Useless)), false);
});

test('Z.Alternative.test', function() {
  eq(Z.Alternative.test(Pair(Useless, Useless)), false);
});

test('Z.Foldable.test', function() {
  eq(Z.Foldable.test(Pair(Useless, Useless)), true);
});

test('Z.Traversable.test', function() {
  eq(Z.Traversable.test(Pair(Useless, Useless)), true);
});

test('Z.Extend.test', function() {
  eq(Z.Extend.test(Pair(Useless, Useless)), true);
});

test('Z.Comonad.test', function() {
  eq(Z.Comonad.test(Pair(Useless, Useless)), true);
});

test('Z.Contravariant.test', function() {
  eq(Z.Contravariant.test(Pair(Useless, Useless)), false);
});

test('type', function() {
  eq(type(Pair(0, 0)), 'sanctuary-pair/Pair@1');
});

test('equals', function() {
  eq(Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1])), true);
  eq(Z.equals(Z.equals(Pair([1, 2, 3], [3, 2, 1]),
                       Pair([1, 2, 3], [1, 2, 3]))), false);
});

test('lte', function() {
  eq(Z.lte(Pair(0, 1), Pair(0, 1)), true);
  eq(Z.lte(Pair(0, 1), Pair(1, 1)), true);
  eq(Z.lte(Pair(1, 1), Pair(0, 1)), false);
});

test('compose', function() {
  eq(Z.compose(Pair('b', true), Pair(1, 'a')), Pair(1, true));
});

test('concat', function() {
  eq(Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1])),
     Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]));
});

test('map', function() {
  eq(Z.map(Math.sqrt, Pair('hello', 64)), Pair('hello', 8));
});

test('bimap', function() {
  eq(Z.bimap(function(x) { return x + ' there'; }, Math.sqrt,
             Pair('hello', 64)), Pair('hello there', 8));
});

test('ap', function() {
  eq(Z.ap(Pair('hello', Math.sqrt), Pair(' there', 64)),
     Pair('hello there', 8));
});

test('chain', function() {
  eq(Z.chain(function(n) { return Pair([n], n + 1); },
             Pair([1], 2)), Pair([1, 2], 3));
});

test('reduce', function() {
  eq(Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6])),
     [1, 2, 3, 4, 5, 6]);
});

test('traverse', function() {
  eq(Z.traverse(Array, function(s) { return s.split(''); }, Pair(0, 'abc')),
     [Pair(0, 'a'), Pair(0, 'b'), Pair(0, 'c')]);
});

test('extend', function() {
  eq(Z.extend(function(pair) { return Z.extract(pair) + 1; },
              Pair('forever', 99)), Pair('forever', 100));
});

test('extract', function() {
  eq(Z.extract(Pair(0, 1)), 1);
});

test('toString', function() {
  eq(Z.toString(Pair([1, 2], 3)), 'Pair([1, 2], 3)');
});

test('Pair.fst', function() {
  eq(Pair.fst(Pair('hello', 42)), 'hello');
});

test('Pair.snd', function() {
  eq(Pair.snd(Pair('hello', 42)), 42);
});

test('Pair.swap', function() {
  eq(Pair.swap(Pair(1, 2)), Pair(2, 1));
});

/* global Symbol */
if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
  test('Symbol.iterator', function() {
    var p = Pair(1, 2);
    var itr = p[Symbol.iterator]();
    eq(itr.next().value, 1);
    eq(itr.next().value, 2);
    eq(itr.next().done, true);
  });
}
