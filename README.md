# sanctuary-tuples

<img alt="Fantasy Land" src="https://raw.githubusercontent.com/fantasyland/fantasy-land/master/logo.png" width="200" height="200" align="right">

Pair (2-tuple) is the canonical product type: a value of type `Pair a b`
always contains exactly two values, one of type `a`, the other `b`.

`Pair a b` satisfies the following [Fantasy Land][] specifications:

  - [Setoid][] (if `a` and `b` satisfy Setoid)
  - [Ord][] (if `a` and `b` satisfy Ord)
  - [Semigroupoid][]
  - [Semigroup][] (if `a` and `b` satisfy Semigroup)
  - [Functor][]
  - [Apply][] (if `a` satisfies Semigroup)
  - [Chain][] (if `a` satisfies Semigroup)
  - [Foldable][]
  - [Traversable][]
  - [Extend][]
  - [Extract][]

<h4 name="Pair"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L54">Pair :: (a, b) -⁠> Pair a b</a></code></h4>

```javascript
> Pair(1, 2)
Pair(1, 2)
```

<h4 name="Pair"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L69">Pair :: (a, b) -⁠> Pair a b</a></code></h4>

```javascript
> [...Pair(1, 2)]
[1, 2]
```

<h4 name="Pair.@@type"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L80">Pair.@@type :: String</a></code></h4>

```javascript
> Pair['@@type']
'sanctuary-tuples/Pair'
```

<h4 name="Pair.prototype.fantasy-land/equals"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L88">Pair#fantasy-land/equals :: (Setoid a, Setoid b) => Pair a b ~> Pair a b -⁠> Boolean</a></code></h4>

```javascript
> Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [3, 2, 1]))
true

> Z.equals(Pair([1, 2, 3], [3, 2, 1]), Pair([1, 2, 3], [1, 2, 3]))
false
```

<h4 name="Pair.prototype.fantasy-land/lte"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L101">Pair#fantasy-land/lte :: (Ord a, Ord b) => Pair a b ~> Pair a b -⁠> Boolean</a></code></h4>

```javascript
> Z.lte(Pair(0, 1), Pair(0, 1))
true

> Z.lte(Pair(0, 1), Pair(1, 1))
true

> Z.lte(Pair(1, 1), Pair(0, 1))
false
```

<h4 name="Pair.prototype.fantasy-land/compose"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L117">Pair#fantasy-land/compose :: Pair a b ~> Pair b c -⁠> Pair a c</a></code></h4>

```javascript
> Z.compose(Pair('b', true), Pair(1, 'a'))
Pair(1, true)
```

<h4 name="Pair.prototype.fantasy-land/concat"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L127">Pair#fantasy-land/concat :: (Semigroup a, Semigroup b) => Pair a b ~> Pair a b -⁠> Pair a b</a></code></h4>

```javascript
> Z.concat(Pair([1, 2, 3], [6, 5, 4]), Pair([4, 5, 6], [3, 2, 1]))
Pair([1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1])
```

<h4 name="Pair.prototype.fantasy-land/map"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L137">Pair#fantasy-land/map :: Pair a b ~> (b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.map(Math.sqrt, Pair('hello', 64))
Pair('hello', 8)
```

<h4 name="Pair.prototype.fantasy-land/ap"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L147">Pair#fantasy-land/ap :: Semigroup a => Pair a b ~> Pair a (b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.ap(Pair('hello', Math.sqrt), Pair(' there', 64))
Pair('hello there', 8)
```

<h4 name="Pair.prototype.fantasy-land/chain"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L157">Pair#fantasy-land/chain :: Semigroup a => Pair a b ~> (b -⁠> Pair a c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.chain(n => Pair([n], n + 1), Pair([1], 2))
Pair([1, 2], 3)
```

<h4 name="Pair.prototype.fantasy-land/reduce"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L168">Pair#fantasy-land/reduce :: Pair a b ~> ((c, a) -⁠> c, c) -⁠> c</a></code></h4>

```javascript
> Z.reduce(Z.concat, [1, 2, 3], Pair('irrelevant', [4, 5, 6]))
[1, 2, 3, 4, 5, 6]
```

<h4 name="Pair.prototype.fantasy-land/traverse"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L178">Pair#fantasy-land/traverse :: Applicative f => Pair a b ~> (TypeRep f, b -⁠> f c) -⁠> f (Pair a c)</a></code></h4>

```javascript
> Z.traverse(Array, x => [x, x], Pair(0, 1))
[Pair(0, 1), Pair(0, 1)]
```

<h4 name="Pair.prototype.fantasy-land/extend"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L191">Pair#fantasy-land/extend :: Pair a b ~> (Pair a b -⁠> c) -⁠> Pair a c</a></code></h4>

```javascript
> Z.extend(pair => Z.extract(pair) + 1, Pair('forever', 99))
Pair('forever', 100)
```

<h4 name="Pair.prototype.fantasy-land/extract"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L201">Pair#fantasy-land/extract :: Pair a b ~> () -⁠> b</a></code></h4>

```javascript
> Z.extract(Pair('the answer is', 42))
42
```

<h4 name="Pair.prototype.toString"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L211">Pair#toString :: Pair a b ~> () -⁠> String</a></code></h4>

```javascript
> Z.toString(Pair(1, 2))
'Pair(1, 2)'
```

<h4 name="fst"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L221">fst :: Pair a b -⁠> a</a></code></h4>

```javascript
> fst(Pair('hello', 42))
'hello'
```

<h4 name="snd"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L231">snd :: Pair a b -⁠> b</a></code></h4>

```javascript
> snd(Pair('the answer is', 42))
42
```

<h4 name="swap"><code><a href="https://github.com/sanctuary-js/sanctuary-tuples/blob/v/index.js#L239">swap :: Pair a b -⁠> Pair b a</a></code></h4>

```javascript
> swap(Pair(1, 2))
Pair(2, 1)
```

[Apply]:            https://github.com/fantasyland/fantasy-land/tree/v3.3.0#apply
[Chain]:            https://github.com/fantasyland/fantasy-land/tree/v3.3.0#chain
[Extend]:           https://github.com/fantasyland/fantasy-land/tree/v3.3.0#extend
[Extract]:          https://github.com/fantasyland/fantasy-land/tree/v3.3.0#extract
[Fantasy Land]:     https://github.com/fantasyland/fantasy-land/tree/v3.3.0
[Foldable]:         https://github.com/fantasyland/fantasy-land/tree/v3.3.0#foldable
[Functor]:          https://github.com/fantasyland/fantasy-land/tree/v3.3.0#functor
[Ord]:              https://github.com/fantasyland/fantasy-land/tree/v3.3.0#ord
[Semigroup]:        https://github.com/fantasyland/fantasy-land/tree/v3.3.0#semigroup
[Semigroupoid]:     https://github.com/fantasyland/fantasy-land/tree/v3.3.0#semigroupoid
[Setoid]:           https://github.com/fantasyland/fantasy-land/tree/v3.3.0#setoid
[Traversable]:      https://github.com/fantasyland/fantasy-land/tree/v3.3.0#traversable
