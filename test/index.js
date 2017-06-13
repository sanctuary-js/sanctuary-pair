'use strict';

var assert = require('assert');

var Z = require('sanctuary-type-classes');

var P = require('..');
var Pair = P.Pair;
var fst = P.fst;
var snd = P.snd;
var swap = P.swap;

//  eq :: (Any, Any) -> Undefined !
function eq(actual, expected) {
  assert.strictEqual(arguments.length, eq.length);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
}

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

test('fst', function() {
  eq(fst(Pair('hello', 42)), 'hello');
});

test('snd', function() {
  eq(snd(Pair('hello', 42)), 42);
});

test('swap', function() {
  eq(swap(Pair(1, 2)), Pair(2, 1));
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
