import {deepStrictEqual as eq} from 'node:assert';

import laws from 'fantasy-laws';
import jsc from 'jsverify';
import test from 'oletus';
import Identity from 'sanctuary-identity';
import show from 'sanctuary-show';
import Z from 'sanctuary-type-classes';
import type from 'sanctuary-type-identifiers';
import Useless from 'sanctuary-useless';

import Pair from '../index.js';


//    IdentityArb :: Arbitrary a -> Arbitrary (Identity a)
const IdentityArb = arb => arb.smap (Identity, Z.extract, show);

//    PairArb :: Arbitrary a -> Arbitrary b -> Arbitrary (Pair a b)
const PairArb = arbL => arbR => (jsc.pair (arbL, arbR)).smap (
  ([fst, snd]) => Pair (fst) (snd),
  p => [p.fst, p.snd],
  show
);

//    testLaws :: String -> Object -> Object -> Undefined
const testLaws = typeClass => laws => arbs => {
  (Object.keys (laws)).forEach (name => {
    eq (laws[name].length, arbs[name].length);
    const prettyName = name.replace (/[A-Z]/g, c => ' ' + c.toLowerCase ());
    test (`${typeClass} laws \x1B[2m›\x1B[0m ${prettyName}`,
          laws[name] (...arbs[name]));
  });
};


test ('metadata', () => {
  eq (typeof Pair, 'function');
  eq (Pair.name, 'Pair');
  eq (Pair.length, 1);
});

test ('@@type', () => {
  eq (type (Pair (0) (0)), 'sanctuary-pair/Pair@1');
  eq (type.parse (type (Pair (0) (0))),
      {namespace: 'sanctuary-pair', name: 'Pair', version: 1});
});

test ('@@show', () => {
  eq (show (Pair (['foo', 'bar', 'baz']) (-0)),
      'Pair (["foo", "bar", "baz"]) (-0)');
});

test ('@@iterator', () => {
  const pair = Pair ('foo') ('bar');
  const iterator = pair[Symbol.iterator] ();
  eq (iterator.next (), {value: 'foo', done: false});
  eq (iterator.next (), {value: 'bar', done: false});
  eq (iterator.next (), {value: undefined, done: true});
});

test ('Pair.pair', () => {
  eq (Pair.pair (a => b => 'Pair (' + show (a) + ') (' + show (b) + ')')
                (Pair ('abc') ([1, 2, 3])),
      'Pair ("abc") ([1, 2, 3])');
});

test ('Pair.fst', () => {
  eq (Pair.fst (Pair ('foo') (42)), 'foo');
});

test ('Pair.snd', () => {
  eq (Pair.snd (Pair ('foo') (42)), 42);
});

test ('Pair.swap', () => {
  eq (Pair.swap (Pair ('foo') (42)), Pair (42) ('foo'));
});

test ('Setoid', () => {
  eq (Z.Setoid.test (Pair (Useless) (Useless)), false);
  eq (Z.Setoid.test (Pair (Useless) ('world')), false);
  eq (Z.Setoid.test (Pair ('hello') (Useless)), false);
  eq (Z.Setoid.test (Pair ('hello') ('world')), true);
});

test ('Ord', () => {
  eq (Z.Ord.test (Pair (Useless) (Useless)), false);
  eq (Z.Ord.test (Pair (Useless) ('world')), false);
  eq (Z.Ord.test (Pair ('hello') (Useless)), false);
  eq (Z.Ord.test (Pair ('hello') ('world')), true);
});

test ('Semigroupoid', () => {
  eq (Z.Semigroupoid.test (Pair (Useless) (Useless)), true);
});

test ('Category', () => {
  eq (Z.Category.test (Pair (Math.sqrt) (Math.sqrt)), false);
});

test ('Semigroup', () => {
  eq (Z.Semigroup.test (Pair (Useless) (Useless)), false);
  eq (Z.Semigroup.test (Pair (Useless) ('world')), false);
  eq (Z.Semigroup.test (Pair ('hello') (Useless)), false);
  eq (Z.Semigroup.test (Pair ('hello') ('world')), true);
});

test ('Monoid', () => {
  eq (Z.Monoid.test (Pair ('hello') ('world')), false);
});

test ('Functor', () => {
  eq (Z.Functor.test (Pair (Useless) (Useless)), true);
});

test ('Bifunctor', () => {
  eq (Z.Bifunctor.test (Pair (Useless) (Useless)), true);
});

test ('Profunctor', () => {
  eq (Z.Profunctor.test (Pair (Math.sqrt) (Math.sqrt)), false);
});

test ('Apply', () => {
  eq (Z.Apply.test (Pair (Useless) (Useless)), false);
  eq (Z.Apply.test (Pair (Useless) ('world')), false);
  eq (Z.Apply.test (Pair ('hello') (Useless)), true);
  eq (Z.Apply.test (Pair ('hello') ('world')), true);
});

test ('Applicative', () => {
  eq (Z.Applicative.test (Pair ([]) ([])), false);
});

test ('Chain', () => {
  eq (Z.Chain.test (Pair (Useless) (Useless)), false);
  eq (Z.Chain.test (Pair (Useless) ('world')), false);
  eq (Z.Chain.test (Pair ('hello') (Useless)), true);
  eq (Z.Chain.test (Pair ('hello') ('world')), true);
});

test ('ChainRec', () => {
  eq (Z.ChainRec.test (Pair (Useless) (Useless)), false);
  eq (Z.ChainRec.test (Pair (Useless) ('world')), false);
  eq (Z.ChainRec.test (Pair ('hello') (Useless)), false);
  eq (Z.ChainRec.test (Pair ('hello') ('world')), false);
});

test ('Monad', () => {
  eq (Z.Monad.test (Pair ([]) ([])), false);
});

test ('Alt', () => {
  eq (Z.Alt.test (Pair ([]) ([])), false);
});

test ('Plus', () => {
  eq (Z.Plus.test (Pair ([]) ([])), false);
});

test ('Alternative', () => {
  eq (Z.Alternative.test (Pair ([]) ([])), false);
});

test ('Foldable', () => {
  eq (Z.Foldable.test (Pair (Useless) (Useless)), true);
});

test ('Traversable', () => {
  eq (Z.Traversable.test (Pair (Useless) (Useless)), true);
});

test ('Extend', () => {
  eq (Z.Extend.test (Pair (Useless) (Useless)), true);
});

test ('Comonad', () => {
  eq (Z.Comonad.test (Pair (Useless) (Useless)), true);
});

test ('Contravariant', () => {
  eq (Z.Contravariant.test (Pair (Math.sqrt) (Math.sqrt)), false);
});

testLaws ('Setoid') (laws.Setoid) ({
  reflexivity: [
    PairArb (jsc.string) (jsc.falsy),
  ],
  symmetry: [
    PairArb (jsc.bool) (jsc.bool),
    PairArb (jsc.bool) (jsc.bool),
  ],
  transitivity: [
    PairArb (jsc.bool) (jsc.bool),
    PairArb (jsc.bool) (jsc.bool),
    PairArb (jsc.bool) (jsc.bool),
  ],
});

testLaws ('Ord') (laws.Ord) ({
  totality: [
    PairArb (jsc.string) (jsc.number),
    PairArb (jsc.string) (jsc.number),
  ],
  antisymmetry: [
    PairArb (jsc.string) (jsc.number),
    PairArb (jsc.string) (jsc.number),
  ],
  transitivity: [
    PairArb (jsc.string) (jsc.number),
    PairArb (jsc.string) (jsc.number),
    PairArb (jsc.string) (jsc.number),
  ],
});

testLaws ('Semigroup') (laws.Semigroup (Z.equals)) ({
  associativity: [
    PairArb (jsc.string) (jsc.string),
    PairArb (jsc.string) (jsc.string),
    PairArb (jsc.string) (jsc.string),
  ],
});

testLaws ('Semigroupoid') (laws.Semigroupoid (Z.equals)) ({
  associativity: [
    PairArb (jsc.string) (jsc.string),
    PairArb (jsc.string) (jsc.string),
    PairArb (jsc.string) (jsc.string),
  ],
});

testLaws ('Functor') (laws.Functor (Z.equals)) ({
  identity: [
    PairArb (jsc.string) (jsc.number),
  ],
  composition: [
    PairArb (jsc.string) (jsc.number),
    jsc.constant (Math.sqrt),
    jsc.constant (Math.abs),
  ],
});

testLaws ('Bifunctor') (laws.Bifunctor (Z.equals)) ({
  identity: [
    PairArb (jsc.string) (jsc.number),
  ],
  composition: [
    PairArb (jsc.string) (jsc.number),
    jsc.constant (Math.sqrt),
    jsc.constant (s => s.length),
    jsc.constant (Math.sqrt),
    jsc.constant (Math.abs),
  ],
});

testLaws ('Apply') (laws.Apply (Z.equals)) ({
  composition: [
    PairArb (jsc.string) (jsc.constant (Math.sqrt)),
    PairArb (jsc.string) (jsc.constant (Math.abs)),
    PairArb (jsc.string) (jsc.number),
  ],
});

testLaws ('Chain') (laws.Chain (Z.equals)) ({
  associativity: [
    PairArb (jsc.string) (jsc.number),
    jsc.constant (n => Pair (show (n)) (n + 1)),
    jsc.constant (n => Pair (show (n)) (n * n)),
  ],
});

testLaws ('Foldable') (laws.Foldable (Z.equals)) ({
  associativity: [
    jsc.constant (Z.concat),
    jsc.string,
    PairArb (jsc.number) (jsc.string),
  ],
});

testLaws ('Traversable') (laws.Traversable (Z.equals)) ({
  naturality: [
    jsc.constant (Identity),
    jsc.constant (Array),
    jsc.constant (identity => [Z.extract (identity)]),
    PairArb (jsc.string) (IdentityArb (jsc.number)),
  ],
  identity: [
    jsc.constant (Identity),
    PairArb (jsc.string) (jsc.number),
  ],
  composition: [
    jsc.constant (Identity),
    jsc.constant (Pair),
    PairArb (jsc.string) (IdentityArb (PairArb (jsc.string) (jsc.number))),
  ],
});

testLaws ('Extend') (laws.Extend (Z.equals)) ({
  associativity: [
    PairArb (jsc.string) (jsc.integer),
    jsc.constant (pair => Z.extract (pair) + 1),
    jsc.constant (pair => Math.pow (Z.extract (pair), 2)),
  ],
});

testLaws ('Comonad') (laws.Comonad (Z.equals)) ({
  leftIdentity: [
    PairArb (jsc.string) (jsc.integer),
  ],
  rightIdentity: [
    PairArb (jsc.string) (jsc.integer),
    jsc.constant (pair => Math.pow (Z.extract (pair), 2)),
  ],
});
