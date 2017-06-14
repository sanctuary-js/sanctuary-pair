/*             ___________________
              /                  /\
             /                  /  \
            /_____       ______/   /
            \    /      /\     \  /
             \__/      /  \_____\/
               /      /   /
              /      /   /
             /      /   /
            /      /   /
           /      /   /
          /______/   /
          \      \  /
           \______\/                */

//. # sanctuary-pair
//.
//. <img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="200" height="200" align="right">
//.
//. Pair (2-tuple) is the canonical product type: a value of type `Pair a b`
//. always contains exactly two values, one of type `a`, the other `b`.
//.
//. `Pair a b` satisfies the following [Fantasy Land][] specifications:
//.
//.   - [Setoid][] (if `a` and `b` satisfy Setoid)
//.   - [Ord][] (if `a` and `b` satisfy Ord)
//.   - [Semigroupoid][]
//.   - [Semigroup][] (if `a` and `b` satisfy Semigroup)
//.   - [Functor][]
//.   - [Bifunctor][]
//.   - [Apply][] (if `a` satisfies Semigroup)
//.   - [Chain][] (if `a` satisfies Semigroup)
//.   - [Foldable][]
//.   - [Traversable][]
//.   - [Extend][]
//.   - [Extract][]

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-type-classes'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-type-classes'], f);
  } else {
    self.sanctuaryPair = f(self.sanctuaryTypeClasses);
  }

}(function(Z) {

  'use strict';

  //# Pair :: (a, b) -> Pair a b
  //.
  //. ```javascript
  //. > Pair(1, 2)
  //. Pair(1, 2)
  //. ```
  function Pair(fst, snd) {
    if (!(this instanceof Pair)) return new Pair(fst, snd);
    this.fst = fst;
    this.snd = snd;
  }

  /* global Symbol */
  // istanbul ignore next: browser support
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    //# Pair#[Symbol.iterator] :: Pair a b ~> () -> Iterator a b
    //.
    //. ```javascript
    //. > [...Pair(1, 2)]
    //. [1, 2]
    //. ```
    Pair.prototype[Symbol.iterator] = function values() {
      return [this.fst, this.snd][Symbol.iterator]();
    };
  }

  //# Pair.@@type :: String
  //.
  //. ```javascript
  //. > Pair['@@type']
  //. 'sanctuary-pair/Pair'
  //. ```
  Pair['@@type'] = 'sanctuary-pair/Pair';

  //# Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. ```javascript
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1]))
  //. true
  //.
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [1, 2, 3]))
  //. false
  //. ```
  Pair.prototype['fantasy-land/equals'] = function equals(other) {
    return Z.equals(this.fst, other.fst) && Z.equals(this.snd, other.snd);
  };

  //# Pair#fantasy-land/lte :: (Ord a, Ord b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. ```javascript
  //. > Z.lte(Pair(0, 1), Pair(0, 1))
  //. true
  //.
  //. > Z.lte(Pair(0, 1), Pair(1, 1))
  //. true
  //.
  //. > Z.lte(Pair(1, 1), Pair(0, 1))
  //. false
  //. ```
  Pair.prototype['fantasy-land/lte'] = function lte(other) {
    return Z.lte(this.fst, other.fst) && Z.lte(this.snd, other.snd);
  };

  //# Pair#fantasy-land/compose :: Pair a b ~> Pair b c -> Pair a c
  //.
  //. ```javascript
  //. > Z.compose(Pair('b', true), Pair(1, 'a'))
  //. Pair(1, true)
  //. ```
  Pair.prototype['fantasy-land/compose'] = function compose(other) {
    return Pair(this.fst, other.snd);
  };

  //# Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -> Pair a b
  //.
  //. ```javascript
  //. > Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
  //. Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
  //. ```
  Pair.prototype['fantasy-land/concat'] = function concat(other) {
    return Pair(Z.concat(this.fst, other.fst), Z.concat(this.snd, other.snd));
  };

  //# Pair#fantasy-land/map :: Pair a b ~> (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.map(Math.sqrt, Pair('hello', 64))
  //. Pair('hello', 8)
  //. ```
  Pair.prototype['fantasy-land/map'] = function map(f) {
    return Pair(this.fst, f(this.snd));
  };

  //# Pair#fantasy-land/bimap :: Pair a b ~> (a -> b) -> (c -> d) -> Pair b d
  //.
  //. ```javascript
  //. > Z.bimap(s => s + ' there', Math.sqrt, Pair('hello', 64))
  //. Pair('hello there', 8)
  //. ```
  Pair.prototype['fantasy-land/bimap'] = function bimap(f, g) {
    return Pair(f(this.fst), g(this.snd));
  };

  //# Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.ap(Pair('hello', Math.sqrt), Pair(' there', 64))
  //. Pair('hello there', 8)
  //. ```
  Pair.prototype['fantasy-land/ap'] = function ap(other) {
    return Pair(Z.concat(other.fst, this.fst), other.snd(this.snd));
  };

  //# Pair#fantasy-land/chain :: Semigroup a => Pair a b ~> (b -> Pair a c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.chain(n => Pair([n], n + 1), Pair([1], 2))
  //. Pair([1, 2], 3)
  //. ```
  Pair.prototype['fantasy-land/chain'] = function ap(f) {
    var result = f(this.snd);
    return Pair(Z.concat(this.fst, result.fst), result.snd);
  };

  //# Pair#fantasy-land/reduce :: Pair a b ~> ((c, a) -> c, c) -> c
  //.
  //. ```javascript
  //. > Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6]))
  //. [1, 2, 3, 4, 5, 6]
  //. ```
  Pair.prototype['fantasy-land/reduce'] = function reduce(f, x) {
    return f(x, this.snd);
  };

  //# Pair#fantasy-land/traverse :: Applicative f => Pair a b ~> (TypeRep f, b -> f c) -> f (Pair a c)
  //.
  //. ```javascript
  //. > Z.traverse(Array, x => [x, x], Pair(0, 1))
  //. [Pair(0, 1), Pair(0, 1)]
  //. ```
  Pair.prototype['fantasy-land/traverse'] = function traverse(typeRep, f) {
    var pair = this;
    return Z.map(function(x) {
      return Pair(pair.fst, x);
    }, f(pair.snd));
  };

  //# Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.extend(pair => Z.extract(pair) + 1, Pair('forever', 99))
  //. Pair('forever', 100)
  //. ```
  Pair.prototype['fantasy-land/extend'] = function extend(f) {
    return Pair(this.fst, f(this));
  };

  //# Pair#fantasy-land/extract :: Pair a b ~> () -> b
  //.
  //. ```javascript
  //. > Z.extract(Pair('the answer is', 42))
  //. 42
  //. ```
  Pair.prototype['fantasy-land/extract'] = function extract() {
    return this.snd;
  };

  //# Pair#toString :: Pair a b ~> () -> String
  //.
  //. ```javascript
  //. > Z.toString(Pair(1, 2))
  //. 'Pair(1, 2)'
  //. ```
  Pair.prototype.toString = function toString() {
    return 'Pair(' + Z.toString(this.fst) + ', ' + Z.toString(this.snd) + ')';
  };

  //# fst :: Pair a b -> a
  //.
  //. ```javascript
  //. > fst(Pair('hello', 42))
  //. 'hello'
  //. ```
  function fst(p) {
    return p.fst;
  }

  //# snd :: Pair a b -> b
  //.
  //. ```javascript
  //. > snd(Pair('the answer is', 42))
  //. 42
  //. ```
  var snd = Z.extract;

  //# swap :: Pair a b -> Pair b a
  //.
  //. ```javascript
  //. > swap(Pair(1, 2))
  //. Pair(2, 1)
  //. ```
  function swap(p) {
    return Pair(p.snd, p.fst);
  }

  return {
    Pair: Pair, fst: fst, snd: snd, swap: swap
  };

}));

//. [Apply]:            v:fantasyland/fantasy-land#apply
//. [Bifunctor]:        v:fantasyland/fantasy-land#bifunctor
//. [Chain]:            v:fantasyland/fantasy-land#chain
//. [Extend]:           v:fantasyland/fantasy-land#extend
//. [Extract]:          v:fantasyland/fantasy-land#extract
//. [Fantasy Land]:     v:fantasyland/fantasy-land
//. [Foldable]:         v:fantasyland/fantasy-land#foldable
//. [Functor]:          v:fantasyland/fantasy-land#functor
//. [Ord]:              v:fantasyland/fantasy-land#ord
//. [Semigroup]:        v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:     v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:           v:fantasyland/fantasy-land#setoid
//. [Traversable]:      v:fantasyland/fantasy-land#traversable
