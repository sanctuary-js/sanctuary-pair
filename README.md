# sanctuary-tuples

<img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="200" height="200" align="right">

The Unit (0-tuple) type has one value, Unit. It is the product of no
types and represents values with no computational content.

`Unit` satisfies the following [Fantasy Land][] specifications:

  - [Setoid][]
  - [Ord][]
  - [Semigroup][]

<h4 name="Unit"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L47">Unit :: Unit</a></code></h4>

```javascript
> Unit
Unit
```

<h4 name="Unit.@@type"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L55">Unit.@@type :: String</a></code></h4>

```javascript
> Unit['@@type']
'sanctuary-tuples/Unit'
```

<h4 name="Unit.fantasy-land/equals"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L63">Unit.fantasy-land/equals :: Setoid a => Unit ~> a -⁠> Boolean</a></code></h4>

```javascript
> Z.equals(Unit, Unit)
true

> Z.equals(Unit, Object.assign({}, Unit))
false

> var u = Object.assign({}, Unit)
undefined

> Z.equals(u, u)
false
```

<h4 name="Unit.fantasy-land/lte"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L84">Unit.fantasy-land/lte :: Ord a => Unit ~> a</a></code></h4>

```javascript
> Z.lte(Unit, Unit)
true

> Z.lte(Unit, Object.assign({}, Unit))
false

> var u = Object.assign({}, Unit);
undefined

> Z.lte(u, u)
false
```

<h4 name="Unit.fantasy-land/concat"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L101">Unit.fantasy-land/concat</a></code></h4>

```javascript
> Z.concat(Unit, Unit)
Unit
```

<h4 name="Unit.toString"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L111">Unit.toString :: Unit ~> () -⁠> String</a></code></h4>

```javascript
> Z.toString(Unit)
'Unit'
```

Pair (2-tuple) is the canonical product type: a value of type `Pair a b`
always contains exactly two values, one of type `a`, the other `b`.

`Pair a b` satisfies the following [Fantasy Land][] specifications:

  - [Setoid][] (if `a` and `b` satisfy Setoid)
  - [Ord][] (if `a` and `b` satisfy Ord)
  - [Semigroupoid][]
  - [Semigroup][] (if `a` and `b` satisfy Semigroup)
  - [Functor][]
  - [Apply][]
  - [Foldable][]
  - [Traversable][]
  - [Extend][]
  - [Extract][]

<h4 name="Pair"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L137">Pair :: (a, b) -⁠> Pair a b</a></code></h4>

```javascript
> Pair(1, 2)
Pair(1, 2)
```

<h4 name="Pair.@@type"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L149">Pair.@@type :: String</a></code></h4>

```javascript
> Pair['@@type']
'santuary-tuples/Pair'
```

<h4 name="Pair.prototype.fantasy-land/equals"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L157">Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -⁠> Boolean</a></code></h4>

```javascript
> Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1]))
true

> Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [1, 2, 3]))
false
```

<h4 name="Pair.prototype.fantasy-land/lte"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L170">Pair#fantasy-land/lte :: (Ord a, Ord b) => Pair a b ~> Pair a b -⁠> Boolean</a></code></h4>

```javascript
> Z.lte(Pair(0, 1), Pair(0, 1))
true

> Z.lte(Pair(0, 1), Pair(1, 1))
true

> Z.lte(Pair(1, 1), Pair(0, 1))
false
```

<h4 name="Pair.prototype.fantasy-land/compose"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L190">Pair#fantasy-land/compose :: Pair a b ~> Pair b c -⁠> Pair a c</a></code></h4>

```javascript
> Z.compose(Pair('b', true), Pair(1, 'a'))
Pair(1, true)
```

<h4 name="Pair.prototype.fantasy-land/concat"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L200">Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -⁠> Pair a b</a></code></h4>

```javascript
> Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
```

<h4 name="Pair.prototype.fantasy-land/map"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L211">Pair#fantasy-land/map :: Pair a b ~> (b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.map(Math.sqrt, Pair('hello', 64))
Pair('hello', 8)
```

<h4 name="Pair.prototype.fantasy-land/ap"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L221">Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.ap(Pair(' there', Math.sqrt), Pair('hello', 64))
Pair('hello there', 8)
```

<h4 name="Pair.prototype.fantasy-land/reduce"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L231">Pair#fantasy-land/reduce :: Pair a b ~> ((c, a) -⁠> c, c) -⁠> c</a></code></h4>

```javascript
> Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6]))
[1, 2, 3, 4, 5, 6]
```

<h4 name="Pair.prototype.fantasy-land/traverse"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L241">Pair#fantasy-land/traverse :: Applicative f => Pair a b ~> (TypeRep f, b -⁠> f c) -⁠> f (Pair a c)</a></code></h4>

```javascript
> Z.traverse(Array, x => [x, x], Pair(0, 1))
[Pair(0, 1), Pair(0, 1)]
```

<h4 name="Pair.prototype.fantasy-land/extend"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L254">Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.extend(pair => Z.extract(pair) + 1, Pair('forever', 99))
Pair('forever', 100)
```

<h4 name="Pair.prototype.fantasy-land/extract"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L264">Pair#fantasy-land/extract :: Pair a b ~> () -⁠> b</a></code></h4>

```javascript
> Z.extract(Pair('the answer is', 42))
42
```

<h4 name="Pair.prototype.toString"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L274">Pair#toString :: Pair a b ~> () -⁠> String</a></code></h4>

```javascript
> Z.toString(Pair(1, 2))
'Pair(1, 2)'
```

<h4 name="fst"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L284">fst :: Pair a b -⁠> a</a></code></h4>

```javascript
> fst(Pair('hello', 42))
'hello'
```

<h4 name="snd"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L294">snd :: Pair a b -⁠> b</a></code></h4>

```javascript
> snd(Pair('the answer is', 42))
42
```

Identity (1-tuple) is the simplest container type: a value of type
`Identity a` always contains exactly one value, of type `a`.

`Identity a` satisfies the following [Fantasy Land][] specifications:

  - [Setoid][] (if `a` satisfies Setoid)
  - [Ord][] (if `a` satisfies Ord)
  - [Semigroup][] (if `a` satisfies Semigroup)
  - [Functor][]
  - [Apply][]
  - [Applicative][]
  - [Chain][]
  - [Monad][]
  - [Alt][] (if `a` satisfies Alt)
  - [Foldable][]
  - [Traversable][]
  - [Extend][]
  - [Extract][]

<h4 name="Identity"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L321">Identity :: a -⁠> Identity a</a></code></h4>

```javascript
> Identity(42)
Identity(42)
```

<h4 name="Identity.@@type"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L333">Identity.@@type :: String</a></code></h4>

```javascript
> Identity['@@type']
'sanctuary-either/Identity'
```

<h4 name="Identity.fantasy-land/of"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L341">Identity.fantasy-land/of :: a -⁠> Identity a</a></code></h4>

```javascript
> Z.of(Identity, 42)
Identity(42)
```

<h4 name="Identity.prototype.fantasy-land/equals"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L349">Identity#fantasy-land/equals :: Setoid a => Identity a ~> Identity a -⁠> Boolean</a></code></h4>

```javascript
> Z.equals(Identity([1, 2, 3]), Identity([1, 2, 3]))
true

> Z.equals(Identity([1, 2, 3]), Identity([3, 2, 1]))
false
```

<h4 name="Identity.prototype.fantasy-land/lte"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L359">Identity#fantasy-land/lte :: Ord a => Identity a ~> Identity a -⁠> Boolean</a></code></h4>

```javascript
> Z.lte(Identity(0), Identity(0))
true

> Z.lte(Identity(0), Identity(1))
true

> Z.lte(Identity(1), Identity(0))
false
```

<h4 name="Identity.prototype.fantasy-land/concat"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L372">Identity#fantasy-land/concat :: Semigroup a => Identity a ~> Identity a -⁠> Identity a</a></code></h4>

```javascript
> Z.concat(Identity([1, 2, 3]), Identity([4, 5, 6]))
Identity([1, 2, 3, 4, 5, 6])
```

<h4 name="Identity.prototype.fantasy-land/map"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L379">Identity#fantasy-land/map :: Identity a ~> (a -⁠> b) -⁠> Identity b</a></code></h4>

```javascript
> Z.map(Math.sqrt, Identity(64))
Identity(8)
```

<h4 name="Identity.prototype.fantasy-land/ap"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L386">Identity#fantasy-land/ap :: Identity a ~> Identity (a -⁠> b) -⁠> Identity b</a></code></h4>

```javascript
> Z.ap(Identity(Math.sqrt), Identity(64))
Identity(8)
```

<h4 name="Identity.prototype.fantasy-land/chain"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L393">Identity#fantasy-land/chain :: Identity a ~> (a -⁠> Identity b) -⁠> Identity b</a></code></h4>

```javascript
> Z.chain(n => Identity(n + 1), Identity(99))
Identity(100)
```

<h4 name="Identity.prototype.fantasy-land/alt"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L403">Identity#fantasy-land/alt :: Alt a => Identity a ~> Identity a -⁠> Identity a</a></code></h4>

```javascript
> Z.alt(Identity([1, 2, 3]), Identity([4, 5, 6]))
Identity([1, 2, 3, 4, 5, 6])
```

<h4 name="Identity.prototype.fantasy-land/reduce"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L413">Identity#fantasy-land/reduce :: Identity a ~> ((b, a) -⁠> b, b) -⁠> b</a></code></h4>

```javascript
> Z.reduce(Z.concat, [1, 2, 3], Identity([4, 5, 6]))
[1, 2, 3, 4, 5, 6]
```

<h4 name="Identity.prototype.fantasy-land/traverse"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L420">Identity#fantasy-land/traverse :: Applicative f => Identity a ~> (TypeRep f, a -⁠> f b) -⁠> f (Identity b)</a></code></h4>

```javascript
> Z.traverse(Array, x => [x, x], Identity(0))
[Identity(0), Identity(0)]
```

<h4 name="Identity.prototype.fantasy-land/extend"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L427">Identity#fantasy-land/extend :: Identity a ~> (Identity a -⁠> b) -⁠> Identity b</a></code></h4>

```javascript
> Z.extend(identity => Z.extract(identity) + 1, Identity(99))
Identity(100)
```

<h4 name="Identity.prototype.fantasy-land/extract"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L434">Identity#fantasy-land/extract :: Identity a ~> () -⁠> a</a></code></h4>

```javascript
> Z.extract(Identity(42))
42
```

<h4 name="Identity.prototype.toString"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L441">Identity#toString :: Identity a ~> () -⁠> String</a></code></h4>

```javascript
> Z.toString(Identity([1, 2, 3]))
'Identity([1, 2, 3])'
```

[Alt]:              https://github.com/fantasyland/fantasy-land/tree/v3.3.0#alt
[Applicative]:      https://github.com/fantasyland/fantasy-land/tree/v3.3.0#applicative
[Apply]:            https://github.com/fantasyland/fantasy-land/tree/v3.3.0#apply
[Chain]:            https://github.com/fantasyland/fantasy-land/tree/v3.3.0#chain
[Extend]:           https://github.com/fantasyland/fantasy-land/tree/v3.3.0#extend
[Extract]:          https://github.com/fantasyland/fantasy-land/tree/v3.3.0#extract
[Fantasy Land]:     https://github.com/fantasyland/fantasy-land/tree/v3.3.0
[Foldable]:         https://github.com/fantasyland/fantasy-land/tree/v3.3.0#foldable
[Functor]:          https://github.com/fantasyland/fantasy-land/tree/v3.3.0#functor
[Monad]:            https://github.com/fantasyland/fantasy-land/tree/v3.3.0#monad
[Ord]:              https://github.com/fantasyland/fantasy-land/tree/v3.3.0#ord
[Semigroupoid]:     https://github.com/fantasyland/fantasy-land/tree/v3.3.0#semigroupoid
[Semigroup]:        https://github.com/fantasyland/fantasy-land/tree/v3.3.0#semigroup
[Setoid]:           https://github.com/fantasyland/fantasy-land/tree/v3.3.0#setoid
[Traversable]:      https://github.com/fantasyland/fantasy-land/tree/v3.3.0#traversable
