'use strict';

var assert = require('assert');

var Z = require('sanctuary-type-classes');

var Tuples = require('..');
var Unit = Tuples.Unit;
var Pair = Tuples.Pair;
var Identity = Tuples.Identity;
var fst = Tuples.fst;
var snd = Tuples.snd;

//  eq :: (Any, Any) -> Undefined !
function eq(actual, expected) {
  assert.strictEqual(arguments.length, eq.length);
  assert.strictEqual(Z.toString(actual), Z.toString(expected));
  assert.strictEqual(Z.equals(actual, expected), true);
}

//  compose :: (b -> c, a -> b) -> a -> c
function compose(f, g) {
  return function(x) {
    return f(g(x));
  };
}

test('equals', function() {
  eq(Z.equals(Unit, Unit), true);
  eq(Z.equals(Unit, Object.create(Unit)), false);

  eq(Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1])), true);
  eq(Z.equals(Z.equals(Pair([1, 2, 3], [3, 2, 1]),
                       Pair([1, 2, 3], [1, 2, 3]))), false);

  eq(Z.equals(Identity([1, 2, 3]), Identity([1, 2, 3])), true);
  eq(Z.equals(Identity([1, 2, 3]), Identity([3, 2, 1])), false);
});

test('lte', function() {
  eq(Z.lte(Unit, Unit), true);
  eq(Z.lte(Unit, Object.create(Unit)), false);

  eq(Z.lte(Pair(0, 1), Pair(0, 1)), true);
  eq(Z.lte(Pair(0, 1), Pair(1, 1)), true);
  eq(Z.lte(Pair(1, 1), Pair(0, 1)), false);

  eq(Z.lte(Identity(0), Identity(0)), true);
  eq(Z.lte(Identity(0), Identity(1)), true);
  eq(Z.lte(Identity(1), Identity(0)), false);
});

test('compose', function() {
  eq(Z.compose(Pair('b', true), Pair(1, 'a')), Pair(1, true));
});

test('concat', function() {
  eq(Z.concat(Unit, Unit), Unit);

  eq(Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1])),
     Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1]));

  eq(Z.concat(Identity([1, 2]), Identity([3, 4])), Identity([1, 2, 3, 4]));
});

test('map', function() {
  eq(Z.map(Math.sqrt, Pair('hello', 64)), Pair('hello', 8));

  eq(Z.map(Math.sqrt, Identity(9)), Identity(3));
});

test('ap', function() {
  eq(Z.ap(Pair(' there', Math.sqrt), Pair('hello', 64)),
     Pair('hello there', 8));

  eq(Z.ap(Identity(Math.sqrt), Identity(9)), Identity(3));
});

test('chain', function() {
  eq(Z.chain(compose(Identity, Math.sqrt), Identity(9)), Identity(3));
});

test('alt', function() {
  eq(Z.alt(Identity([1, 2]), Identity([3, 4])), Identity([1, 2, 3, 4]));
});

test('reduce', function() {
  eq(Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6])),
     [1, 2, 3, 4, 5, 6]);

  eq(Z.reduce(Z.concat, [1, 2], Identity([3, 4])), [1, 2, 3, 4]);
});

test('traverse', function() {
  eq(Z.traverse(Array, function(s) { return s.split(''); }, Pair(0, 'abc')),
     [Pair(0, 'a'), Pair(0, 'b'), Pair(0, 'c')]);

  eq(Z.traverse(Array, function(s) { return s.split(''); }, Identity('abc')),
     [Identity('a'), Identity('b'), Identity('c')]);
});

test('extend', function() {
  eq(Z.extend(function(pair) { return Z.extract(pair) + 1; },
              Pair('forever', 99)), Pair('forever', 100));

  eq(Z.extend(compose(Math.sqrt, Z.extract), Identity(9)), Identity(3));
});

test('extract', function() {
  eq(Z.extract(Pair(0, 1)), 1);

  eq(Z.extract(Identity(0)), 0);
});

test('toString', function() {
  eq(Z.toString(Pair([1, 2], 3)), 'Pair([1, 2], 3)');

  eq(Z.toString(Identity([1, 2, 3])), 'Identity([1, 2, 3])');
});

test('fst', function() {
  eq(fst(Pair('hello', 42)), 'hello');
});

test('snd', function() {
  eq(snd(Pair('hello', 42)), 42);
});
