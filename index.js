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

  //# Unit :: Unit
  //.
  //. ```javascript
  //. > Unit
  //. Unit
  //. ```
  var Unit = {};
  Unit.constructor = Object.create(Unit.constructor);

  //# Unit.@@type :: String
  //.
  //. ```javascript
  //. > Unit['@@type']
  //. 'sanctuary-tuples/Unit'
  //. ```
  Unit.constructor['@@type'] = 'sanctuary-tuples/Unit';

  //# Unit.fantasy-land/equals :: Setoid a => Unit ~> a -> Boolean
  //.
  //. ```javascript
  //. > Z.equals(Unit, Unit)
  //. true
  //.
  //. > Z.equals(Unit, new Unit.constructor)
  //. false
  //.
  //. > var u = new Unit.constructor; Z.equals(u, u)
  //. false
  //. ```

  // The last example may be going too far
  Unit['fantasy-land/equals'] = function equals(other) {
    return this === Unit && other === Unit;
  };

  //# Unit.fantasy-land/lte :: Ord a => Unit ~> a
  //.
  //. ```javascript
  //. > Z.lte(Unit, Unit)
  //. true
  //.
  //. > Z.lte(Unit, new Unit.constructor)
  //. false
  //.
  //. > var u = new Unit.constructor; Z.lte(u, u)
  //. false
  //. ```
  Unit['fantasy-land/lte'] = Unit['fantasy-land/equals'];

  //# Unit.fantasy-land/concat
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
  Unit.inspect =
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
  //.   - [Apply][]
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
  //. 'santuary-tuples/Pair'
  //. ```
  Pair['@@type'] = 'sanctuary-tuples/Pair';

  //# Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -> Boolean
  //.
  //. ```javascript
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1]))
  //. true
  //.
  //. > Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [1, 2, 3]))
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

  function makePair(p, a, b) {
    return p instanceof Identity ? Identity(b) : Pair(a, b);
  }

  //# Pair#fantasy-land/compose :: Pair a b ~> Pair b c -> Pair a c
  //.
  //. ```javascript
  //. > Z.compose(Pair('b', true), Pair(1, 'a'))
  //. Pair(1, true)
  //. ```
  Pair.prototype['fantasy-land/compose'] = function compose(other) {
    return makePair(this, this.a, other.b);
  };

  //# Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -> Pair a b
  //.
  //. ```javascript
  //. > Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
  //. Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
  //. ```
  Pair.prototype['fantasy-land/concat'] = function concat(other) {
    return makePair(this,
                    Z.concat(this.a, other.a), Z.concat(this.b, other.b));
  };

  //# Pair#fantasy-land/map :: Pair a b ~> (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.map(Math.sqrt, Pair('hello', 64))
  //. Pair('hello', 8)
  //. ```
  Pair.prototype['fantasy-land/map'] = function map(f) {
    return makePair(this, this.a, f(this.b));
  };

  //# Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.ap(Pair(' there', Math.sqrt), Pair('hello', 64))
  //. Pair('hello there', 8)
  //. ```
  Pair.prototype['fantasy-land/ap'] = function ap(other) {
    return makePair(this, Z.concat(this.a, other.a), other.b(this.b));
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
      return makePair(pair, pair.a, x);
    }, f(pair.b));
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
  //. > snd(Pair('hello', 42))
  //. 42
  //. ```
  var snd = Z.extract;

  //# Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -> c) -> Pair a c
  //.
  //. ```javascript
  //. > Z.extend(pair => Z.extract(pair) + 1, Pair('forever', 99))
  //. Pair('forever', 100)
  //. ```
  Pair.prototype['fantasy-land/extend'] = function extend(f) {
    return makePair(this, this.a, f(this));
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
  Pair.prototype.inspect =
  Pair.prototype.toString = function toString() {
    return 'Pair(' + Z.toString(this.a) + ', ' + Z.toString(this.b) + ')';
  };

  //. Identity (1-tuple) is the simplest container type: a value of type
  //. `Identity a` always contains exactly one value, of type `a`.
  //.
  //. `Identity a` satisfies the following [Fantasy Land][] specifications:
  //.
  //.   - [Setoid][] (if `a` satisfies Setoid)
  //.   - [Ord][] (if `a` satisfies Ord)
  //.   - [Semigroup][] (if `a` satisfies Semigroup)
  //.   - [Functor][]
  //.   - [Apply][]
  //.   - [Applicative][]
  //.   - [Chain][]
  //.   - [Monad][]
  //.   - [Alt][] (if `a` satisfies Alt)
  //.   - [Foldable][]
  //.   - [Traversable][]
  //.   - [Extend][]
  //.   - [Extract][]

  //# Identity :: a -> Identity a
  //.
  //. ```javascript
  //. > Identity(42)
  //. Identity(42)
  //. ```
  function Identity(value) {
    if (!(this instanceof Identity)) return new Identity(value);
    Pair.call(this, Unit, value);
  }
  Identity.prototype = Object.create(Pair.prototype);

  //# Identity.@@type :: String
  //.
  //. ```javascript
  //. > Identity['@@type']
  //. 'sanctuary-either/Identity'
  //. ```
  Identity['@@type'] = 'sanctuary-tuples/Identity';

  //# Identity.fantasy-land/of :: a -> Identity a
  //.
  //. ```javascript
  //. > Z.of(Identity, 42)
  //. Identity(42)
  //. ```
  Identity['fantasy-land/of'] = Identity;

  //# Identity#fantasy-land/equals :: Setoid a => Identity a ~> Identity a -> Boolean
  //.
  //. ```javascript
  //. > Z.equals(Identity([1, 2, 3]), Identity([1, 2, 3]))
  //. true
  //.
  //. > Z.equals(Identity([1, 2, 3]), Identity([3, 2, 1]))
  //. false
  //. ```

  //# Identity#fantasy-land/lte :: Ord a => Identity a ~> Identity a -> Boolean
  //.
  //. ```javascript
  //. > Z.lte(Identity(0), Identity(0))
  //. true
  //.
  //. > Z.lte(Identity(0), Identity(1))
  //. true
  //.
  //. > Z.lte(Identity(1), Identity(0))
  //. false
  //. ```

  //# Identity#fantasy-land/concat :: Semigroup a => Identity a ~> Identity a -> Identity a
  //.
  //. ```javascript
  //. > Z.concat(Identity([1, 2, 3]), Identity([4, 5, 6]))
  //. Identity([1, 2, 3, 4, 5, 6])
  //. ```

  //# Identity#fantasy-land/map :: Identity a ~> (a -> b) -> Identity b
  //.
  //. ```javascript
  //. > Z.map(Math.sqrt, Identity(64))
  //. Identity(8)
  //. ```

  //# Identity#fantasy-land/ap :: Identity a ~> Identity (a -> b) -> Identity b
  //.
  //. ```javascript
  //. > Z.ap(Identity(Math.sqrt), Identity(64))
  //. Identity(8)
  //. ```

  //# Identity#fantasy-land/chain :: Identity a ~> (a -> Identity b) -> Identity b
  //.
  //. ```javascript
  //. > Z.chain(n => Identity(n + 1), Identity(99))
  //. Identity(100)
  //. ```
  Identity.prototype['fantasy-land/chain'] = function(f) {
    return f(this.b);
  };

  //# Identity#fantasy-land/alt :: Alt a => Identity a ~> Identity a -> Identity a
  //.
  //. ```javascript
  //. > Z.alt(Identity([1, 2, 3]), Identity([4, 5, 6]))
  //. Identity([1, 2, 3, 4, 5, 6])
  //. ```
  Identity.prototype['fantasy-land/alt'] = function(other) {
    return Identity(Z.alt(this.b, other.b));
  };

  //# Identity#fantasy-land/reduce :: Identity a ~> ((b, a) -> b, b) -> b
  //.
  //. ```javascript
  //. > Z.reduce(Z.concat, [1, 2, 3], Identity([4, 5, 6]))
  //. [1, 2, 3, 4, 5, 6]
  //. ```

  //# Identity#fantasy-land/traverse :: Applicative f => Identity a ~> (TypeRep f, a -> f b) -> f (Identity b)
  //.
  //. ```javascript
  //. > Z.traverse(Array, x => [x, x], Identity(0))
  //. [Identity(0), Identity(0)]
  //. ```

  //# Identity#fantasy-land/extend :: Identity a ~> (Identity a -> b) -> Identity b
  //.
  //. ```javascript
  //. > Z.extend(identity => Z.extract(identity) + 1, Identity(99))
  //. Identity(100)
  //. ```

  //# Identity#fantasy-land/extract :: Identity a ~> () -> a
  //.
  //. ```javascript
  //. > Z.extract(Identity(42))
  //. 42
  //. ```

  //# Identity#toString :: Identity a ~> () -> String
  //.
  //. ```javascript
  //. > Z.toString(Identity([1, 2, 3]))
  //. 'Identity([1, 2, 3])'
  //. ```
  Identity.prototype.inspect =
  Identity.prototype.toString = function() {
    return 'Identity(' + Z.toString(this.b) + ')';
  };

  return {
    Unit: Unit, Pair: Pair, Identity: Identity, fst: fst, snd: snd
  };

}));

//. [Alt]:              v:fantasyland/fantasy-land#alt
//. [Applicative]:      v:fantasyland/fantasy-land#applicative
//. [Apply]:            v:fantasyland/fantasy-land#apply
//. [Chain]:            v:fantasyland/fantasy-land#chain
//. [Extend]:           v:fantasyland/fantasy-land#extend
//. [Extract]:          v:fantasyland/fantasy-land#extract
//. [Fantasy Land]:     v:fantasyland/fantasy-land
//. [Foldable]:         v:fantasyland/fantasy-land#foldable
//. [Functor]:          v:fantasyland/fantasy-land#functor
//. [Monad]:            v:fantasyland/fantasy-land#monad
//. [Ord]:              v:fantasyland/fantasy-land#ord
//. [Semigroupoid]:     v:fantasyland/fantasy-land#semigroupoid
//. [Semigroup]:        v:fantasyland/fantasy-land#semigroup
//. [Setoid]:           v:fantasyland/fantasy-land#setoid
//. [Traversable]:      v:fantasyland/fantasy-land#traversable
