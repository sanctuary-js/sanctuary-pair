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

//. # sanctuary-tuples
//.
//. <img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="200" height="200" align="right">
//.

(function(f) {

  'use strict';

  /* istanbul ignore else */
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = f(require('sanctuary-type-classes'));
  } else if (typeof define === 'function' && define.amd != null) {
    define(['sanctuary-type-classes'], f);
  } else {
    self.sanctuaryTuples = f(self.sanctuaryTypeClasses);
  }

}(function(Z) {

  'use strict';

  //. The Unit (0-tuple) type has one value, Unit. It is the product of no
  //. types and represents values with no computational content.
  //.
  //. `Unit` satisfies the following [Fantasy Land][] specifications:
  //.
  //.   - [Setoid][]
  //.   - [Ord][]
  //.   - [Semigroup][]
  //.   - [Monoid][]

  //# Unit :: Unit
  //.
  //. ```javascript
  //. > Unit
  //. Unit
  //. ```
  var Unit = {constructor: {}};

  //# Unit.@@type :: String
  //.
  //. ```javascript
  //. > Unit.constructor['@@type']
  //. 'sanctuary-tuples/Unit'
  //. ```
  Unit.constructor['@@type'] = 'sanctuary-tuples/Unit';

  //# Unit.constructor.empty :: () -> Unit
  //.
  //. ```javascript
  //. > Z.empty(Unit.constructor)
  //. Unit
  //. ```
  Unit.constructor['fantasy-land/empty'] = function empty() {
    return Unit;
  };

  //# Unit.fantasy-land/equals :: Setoid a => Unit ~> a -> Boolean
  //.
  //. ```javascript
  //. > Z.equals(Unit, Unit)
  //. true
  //.
  //. > Z.equals(Unit, Object.assign({}, Unit))
  //. false
  //.
  //. > var u = Object.assign({}, Unit)
  //. undefined
  //.
  //. > Z.equals(u, u)
  //. false
  //. ```

  // The last example may be going too far
  Unit['fantasy-land/equals'] = function equals(other) {
    return this === Unit && other === Unit;
  };

  //# Unit.fantasy-land/lte :: Ord a => Unit ~> a -> Boolean
  //.
  //. ```javascript
  //. > Z.lte(Unit, Unit)
  //. true
  //.
  //. > Z.lte(Unit, Object.assign({}, Unit))
  //. false
  //.
  //. > var u = Object.assign({}, Unit);
  //. undefined
  //.
  //. > Z.lte(u, u)
  //. false
  //. ```
  Unit['fantasy-land/lte'] = Unit['fantasy-land/equals'];

  //# Unit.fantasy-land/concat :: Semigroup a => Unit ~> a -> Unit
  //.
  //. ```javascript
  //. > Z.concat(Unit, Unit)
  //. Unit
  //. ```
  Unit['fantasy-land/concat'] = function concat(other) {
    return Unit;
  };

  //# Unit.toString :: Unit ~> () -> String
  //.
  //. ```javascript
  //. > Z.toString(Unit)
  //. 'Unit'
  //. ```
  Unit.toString = function toString() {
    return 'Unit';
  };

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
  //.   - [Apply][] (if `a` satisfies Semigroup)
  //.   - [Chain][] (if `a` satisfies Semigroup)
  //.   - [Foldable][]
  //.   - [Traversable][]
  //.   - [Extend][]
  //.   - [Extract][]

  //# Pair :: (a, b) -> Pair a b
  //.
  //. ```javascript
  //. > Pair(1, 2)
  //. Pair(1, 2)
  //. ```
  function Pair(a, b) {
    if (!(this instanceof Pair)) return new Pair(a, b);
    this.a = a;
    this.b = b;
  }

  //# Pair.@@type :: String
  //.
  //. ```javascript
  //. > Pair['@@type']
  //. 'sanctuary-tuples/Pair'
  //. ```
  Pair['@@type'] = 'sanctuary-tuples/Pair';

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
    return Z.equals(this.a, other.a) && Z.equals(this.b, other.b);
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
    return Z.lte(this.a, other.a) && Z.lte(this.b, other.b);
  };

  //# Pair#fantasy-land/compose :: Pair a b ~> Pair b c -> Pair a c
  //.
  //. ```javascript
  //. > Z.compose(Pair('b', true), Pair(1, 'a'))
  //. Pair(1, true)
  //. ```
  Pair.prototype['fantasy-land/compose'] = function compose(other) {
    return Pair(this.a, other.b);
  };

  //# Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -> Pair a b
  //.
  //. ```javascript
  //. > Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
  //. Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
  //. ```
  Pair.prototype['fantasy-land/concat'] = function concat(other) {
    return Pair(Z.concat(this.a, other.a), Z.concat(this.b, other.b));
  };

  //# Pair#fantasy-land/map :: Pair a b ~> (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.map(Math.sqrt, Pair('hello', 64))
  //. Pair('hello', 8)
  //. ```
  Pair.prototype['fantasy-land/map'] = function map(f) {
    return Pair(this.a, f(this.b));
  };

  //# Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.ap(Pair(' there', Math.sqrt), Pair('hello', 64))
  //. Pair('hello there', 8)
  //. ```
  Pair.prototype['fantasy-land/ap'] = function ap(other) {
    return Pair(Z.concat(this.a, other.a), other.b(this.b));
  };

  //# Pair#fantasy-land/chain :: Semigroup a => Pair a b ~> (b -> Pair a c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.chain(n => Pair([n], n + 1), Pair([1], 2))
  //. Pair([1, 2], 3)
  //. ```
  Pair.prototype['fantasy-land/chain'] = function ap(f) {
    var result = f(this.b);
    return Pair(Z.concat(this.a, result.a), result.b);
  };

  //# Pair#fantasy-land/reduce :: Pair a b ~> ((c, a) -> c, c) -> c
  //.
  //. ```javascript
  //. > Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6]))
  //. [1, 2, 3, 4, 5, 6]
  //. ```
  Pair.prototype['fantasy-land/reduce'] = function reduce(f, x) {
    return f(x, this.b);
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
      return Pair(pair.a, x);
    }, f(pair.b));
  };

  //# Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.extend(pair => Z.extract(pair) + 1, Pair('forever', 99))
  //. Pair('forever', 100)
  //. ```
  Pair.prototype['fantasy-land/extend'] = function extend(f) {
    return Pair(this.a, f(this));
  };

  //# Pair#fantasy-land/extract :: Pair a b ~> () -> b
  //.
  //. ```javascript
  //. > Z.extract(Pair('the answer is', 42))
  //. 42
  //. ```
  Pair.prototype['fantasy-land/extract'] = function extract() {
    return this.b;
  };

  //# Pair#toString :: Pair a b ~> () -> String
  //.
  //. ```javascript
  //. > Z.toString(Pair(1, 2))
  //. 'Pair(1, 2)'
  //. ```
  Pair.prototype.toString = function toString() {
    return 'Pair(' + Z.toString(this.a) + ', ' + Z.toString(this.b) + ')';
  };

  //# fst :: Pair a b -> a
  //.
  //. ```javascript
  //. > fst(Pair('hello', 42))
  //. 'hello'
  //. ```
  function fst(p) {
    return p.a;
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
    return Pair(p.b, p.a);
  }

  return {
    Unit: Unit, Pair: Pair, fst: fst, snd: snd, swap: swap
  };

}));

//. [Apply]:            v:fantasyland/fantasy-land#apply
//. [Chain]:            v:fantasyland/fantasy-land#chain
//. [Extend]:           v:fantasyland/fantasy-land#extend
//. [Extract]:          v:fantasyland/fantasy-land#extract
//. [Fantasy Land]:     v:fantasyland/fantasy-land
//. [Foldable]:         v:fantasyland/fantasy-land#foldable
//. [Functor]:          v:fantasyland/fantasy-land#functor
//. [Monoid]:           v:fantasyland/fantasy-land#monoid
//. [Ord]:              v:fantasyland/fantasy-land#ord
//. [Semigroup]:        v:fantasyland/fantasy-land#semigroup
//. [Semigroupoid]:     v:fantasyland/fantasy-land#semigroupoid
//. [Setoid]:           v:fantasyland/fantasy-land#setoid
//. [Traversable]:      v:fantasyland/fantasy-land#traversable
