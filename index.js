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
  //. Takes two values of any type and returns a Pair of the given values.
  //.
  //. ```javascript
  //. > Pair(1, 2)
  //. Pair(1, 2)
  //. ```
  function Pair(fst, snd) {
    if (!(this instanceof Pair)) return new Pair(fst, snd);
    this.fst = fst;
    this.snd = snd;

    //  Add "fantasy-land/concat" method conditionally so that
    //  Pair('abc', 'def') satisfies the requirements of Semigroup but
    //  Pair(123, 456) does not.
    if (Z.Semigroup.test(this.fst)) {
      if (Z.Semigroup.test(this.snd)) {
        this['fantasy-land/concat'] = Pair$prototype$concat;
      }
      this['fantasy-land/ap'] = Pair$prototype$ap;
      this['fantasy-land/chain'] = Pair$prototype$chain;
    }

    if (Z.Setoid.test(this.fst) && Z.Setoid.test(this.snd)) {
      this['fantasy-land/equals'] = Pair$prototype$equals;
    }

    if (Z.Ord.test(this.fst) && Z.Ord.test(this.snd)) {
      this['fantasy-land/lte'] = Pair$prototype$lte;
    }
  }

  /* global Symbol */
  // istanbul ignore next: browser support
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    //# Pair#[Symbol.iterator] :: Pair a b ~> () -> Iterator a b
    //.
    //. Returns an [Iterator][] providing the `fst` and `snd` values of this.
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
  //. Pair [type identifier][].
  //.
  //. ```javascript
  //. > Pair['@@type']
  //. 'sanctuary-pair/Pair@1'
  //. ```
  Pair['@@type'] = 'sanctuary-pair/Pair@1';

  //# Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. Takes a value `p` of the same type and returns `true` if `this` and `p`
  //. are both Pairs, and the `fst` and `snd` values for both are equal.
  //.
  //. ```javascript
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1]))
  //. true
  //.
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [1, 2, 3]))
  //. false
  //. ```
  function Pair$prototype$equals(other) {
    return Z.equals(this.fst, other.fst) && Z.equals(this.snd, other.snd);
  }

  //# Pair#fantasy-land/lte :: (Ord a, Ord b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. Takes a value `p` of the same type and returns `true` if `this` and `p`
  //. are both Pairs, and the `fst` and `snd` values for both are less
  //. than or equal.
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
  function Pair$prototype$lte(other) {
    return Z.lte(this.fst, other.fst) && Z.lte(this.snd, other.snd);
  }

  //# Pair#fantasy-land/compose :: Pair a b ~> Pair b c -> Pair a c
  //.
  //. Takes a value `p` of any type and returns a Pair whose `fst` value is the
  //. same as the `fst` value of this, and whose `snd` value is the same as the
  //. `snd` value of `p`.
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
  //. Takes a value `p` of the same type and returns the result of
  //. concatenating the `fst` and `snd` values of this and `p`, respectively.
  //. `a` and `b` must both have a [Semigroup][].
  //.
  //. ```javascript
  //. > Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
  //. Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
  //. ```
  function Pair$prototype$concat(other) {
    return Pair(Z.concat(this.fst, other.fst), Z.concat(this.snd, other.snd));
  }

  //# Pair#fantasy-land/map :: Pair a b ~> (b -> c) -> Pair a c
  //.
  //. Takes a function and returns a Pair whose `fst` value is unchanged and
  //. whose `snd` value is the result of applying the function to the `snd`
  //. value of this.
  //.
  //. See also [`Pair#fantasy-land/bimap`][].
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
  //. Takes two functions and returns a Pair whose `fst` value is the result
  //. of applying the first function to the `fst` value of this and whose `snd`
  //. value is the result of applying the second function to the `snd` value of
  //. this.
  //.
  //. Similar to [`Pair#fantasy-land/map`][], but supports mapping over both
  //. values.
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
  //. Takes a Pair `p` and returns a Pair whose `fst` value is the result of
  //. concatenating the `fst` values of `this` and `p` and whose `snd` value
  //. is the result of applying `p`'s `snd` value to the `snd` value of this.
  //. `a` must have a [Semigroup][].
  //.
  //. ```javascript
  //. > Z.ap(Pair('hello', Math.sqrt), Pair(' there', 64))
  //. Pair('hello there', 8)
  //. ```
  function Pair$prototype$ap(other) {
    return Pair(Z.concat(other.fst, this.fst), other.snd(this.snd));
  }

  //# Pair#fantasy-land/chain :: Semigroup a => Pair a b ~> (b -> Pair a c) -> Pair a c
  //.
  //. Takes a function that returns a Pair `p`, and returns a Pair whose `fst`
  //. value is the result of concatenating the `fst` value of `p` with the
  //. `fst` value of `this` and whose `snd` value is the same as the `snd`
  //. value of `p`. `a` must have a [Semigroup][].
  //.
  //. ```javascript
  //. > Z.chain(n => Pair([n], n + 1), Pair([1], 2))
  //. Pair([1, 2], 3)
  //. ```
  function Pair$prototype$chain(f) {
    var result = f(this.snd);
    return Pair(Z.concat(this.fst, result.fst), result.snd);
  }

  //# Pair#fantasy-land/reduce :: Pair a b ~> ((c, a) -> c, c) -> c
  //.
  //. Takes a function and an initial value of any type, and returns the result
  //. of applying the function to the initial value and the `fst` value of this.
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
  //. Takes a type representative of some [Applicative][] and a function which
  //. returns a value of that Applicative, and returns the result of mapping
  //. [`Pair`](#Pair) (partially applied with the `fst` value of this) over the
  //. result of applying the first function to the `snd` value of this.
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
  //. Takes a function and returns a Pair whose `fst` value is the same as the
  //. `fst` value of this and whose `snd` value is the result of applying the
  //. function to `this`.
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
  //. Returns the `snd` value of this.
  //.
  //. See also [`Pair.snd`][].
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
  //. Returns the string representation of the Pair.
  //.
  //. ```javascript
  //. > Z.toString(Pair(1, 2))
  //. 'Pair(1, 2)'
  //. ```
  Pair.prototype.toString = function toString() {
    return 'Pair(' + Z.toString(this.fst) + ', ' + Z.toString(this.snd) + ')';
  };

  //# Pair.fst :: Pair a b -> a
  //.
  //. Returns the `fst` value of this.
  //.
  //. ```javascript
  //. > Pair.fst(Pair('hello', 42))
  //. 'hello'
  //. ```
  Pair.fst = function fst(p) { return p.fst; };

  //# Pair.snd :: Pair a b -> b
  //.
  //. Returns the `snd` value of this.
  //.
  //. See also [`Pair#fantasy-land/extract`][].
  //.
  //. ```javascript
  //. > Pair.snd(Pair('the answer is', 42))
  //. 42
  //. ```
  Pair.snd = function snd(p) { return p.snd; };

  //# Pair.swap :: Pair a b -> Pair b a
  //.
  //. Returns a Pair whose `fst` value is the same as the `snd` value of this
  //. and whose `snd` value is the same as the `fst` value of this.
  //.
  //. ```javascript
  //. > Pair.swap(Pair(1, 2))
  //. Pair(2, 1)
  //. ```
  Pair.swap = function(p) { return Pair(p.snd, p.fst); };

  return Pair;

}));

//. [Applicative]:      v:fantasyland/fantasy-land#applicative
//. [Apply]:            v:fantasyland/fantasy-land#apply
//. [Bifunctor]:        v:fantasyland/fantasy-land#bifunctor
//. [Chain]:            v:fantasyland/fantasy-land#chain
//. [Extend]:           v:fantasyland/fantasy-land#extend
//. [Extract]:          v:fantasyland/fantasy-land#extract
//. [Fantasy Land]:     v:fantasyland/fantasy-land
//. [Foldable]:         v:fantasyland/fantasy-land#foldable
//. [Functor]:          v:fantasyland/fantasy-land#functor
//. [Iterator]:         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterator_protocol
//. [Ord]:              v:fantasyland/fantasy-land#ord
//. [Semigroup]:        v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:     v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:           v:fantasyland/fantasy-land#setoid
//. [Traversable]:      v:fantasyland/fantasy-land#traversable
//. [type identifier]:  v:sanctuary-js/sanctuary-type-identifiers
//.
//. [`Pair#fantasy-land/bimap`]:   #Pair.prototype.fantasy-land/bimap
//. [`Pair#fantasy-land/extract`]: #Pair.prototype.fantasy-land/extract
//. [`Pair#fantasy-land/map`]:     #Pair.prototype.fantasy-land/map
//. [`Pair.snd`]:                  #Pair.snd
